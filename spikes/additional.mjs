import assert from 'node:assert/strict';
import {spawnSync,spawn} from 'node:child_process';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {performance} from 'node:perf_hooks';
import {DatabaseSync} from 'node:sqlite';
import {once} from 'node:events';
import {createConnection} from 'node:net';
const root=mkdtempSync(join(tmpdir(),'gtr-extra-'));const results={};
try {
 const startup=[];for(let i=0;i<30;i++){const t=performance.now();const p=spawnSync(process.execPath,['-e','']);assert.equal(p.status,0);startup.push(performance.now()-t)}startup.sort((a,b)=>a-b);results.emptyNodeStartup={unit:'ms',n:30,median:startup[14],p95:startup[28],note:'empty Node subprocess, not TUI'};
 const dbfile=join(root,'state.db');let d=new DatabaseSync(dbfile);d.exec('create table state (status text); insert into state values(\'running\')');d.close();const p=spawnSync(process.execPath,['--input-type=module','-e',`import {DatabaseSync} from 'node:sqlite';const d=new DatabaseSync(${JSON.stringify(dbfile)});d.exec("update state set status='awaiting_approval'");process.kill(process.pid,'SIGKILL')`]);assert.equal(p.signal,'SIGKILL');d=new DatabaseSync(dbfile);assert.equal(d.prepare('select status from state').get().status,'awaiting_approval');d.close();results.persistedApprovalSurvivesKill=true;
 const socket=join(root,'sock');const child=spawn(process.execPath,['--input-type=module','-e',`import {createServer} from 'node:net';const s=createServer(c=>c.end('ready'));s.listen(${JSON.stringify(socket)},()=>console.log(JSON.stringify(process.memoryUsage())));`],{stdio:['ignore','pipe','inherit']});try{const [data]=await once(child.stdout,'data');results.minimalIpcServerMemory=JSON.parse(data.toString());const reply=await new Promise((resolve,reject)=>{let text='';const c=createConnection(socket);c.on('data',x=>text+=x);c.on('end',()=>resolve(text));c.on('error',reject)});assert.equal(reply,'ready');results.crossProcessIpc=true;}finally{child.kill();await once(child,'exit')}
 const source=Array.from({length:100},(_,i)=>'requirement '+(i%20)+' '+'x'.repeat(200));const unique=[...new Set(source)];results.exactDedup={beforeBytes:Buffer.byteLength(JSON.stringify(source)),afterBytes:Buffer.byteLength(JSON.stringify(unique)),beforeChunks:source.length,afterChunks:unique.length,note:'same JSON serialization; synthetic duplicates; no model tokens measured'};
 function rrf(lists,k=60){const scores=new Map();for(const list of lists)list.forEach((id,i)=>scores.set(id,(scores.get(id)??0)+1/(k+i+1)));return [...scores.entries()].sort((a,b)=>b[1]-a[1]).map(x=>x[0]);}assert.equal(rrf([['a','b','c'],['b','d','a']])[0],'b');results.syntheticRankFusion=true;
 console.log(JSON.stringify(results,null,2));
}finally{rmSync(root,{recursive:true,force:true})}

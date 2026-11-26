import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync,realpathSync,writeFileSync,mkdirSync} from 'node:fs';
import {relative,isAbsolute,join} from 'node:path';
import {tmpdir} from 'node:os';
import {DatabaseSync} from 'node:sqlite';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const src=readFileSync(new URL('../spikes/experiments.mjs',import.meta.url),'utf8');
// Extract unchanged single-line prototype functions from the reviewed source.
const get=name=>new Function('assert','relative','realpathSync','isAbsolute',`${src.split('\n').find(x=>x.startsWith('function '+name+'('))};return ${name}`)(assert,relative,realpathSync,isAbsolute);
const route=get('route'),validateGraph=get('validateGraph'),allowedPath=get('allowedPath');
test('Finding: paid session affinity outranks eligible subscription when paid is authorized',()=>{const base={provider:'p',authorized:true,tools:['read'],context:1000,remaining:1,profile:1,latency:1};const a=[{...base,id:'sub',kind:'subscription'},{...base,id:'paid',kind:'api'}];assert.equal(route({providers:['p'],tool:'read',context:10,profile:1,paid:true,affinity:'paid'},a).id,'paid');});
test('Finding: missing approval metadata and empty graph are accepted by prototype validator',()=>{assert.deepEqual(validateGraph([{id:'x'}]),['x']);assert.deepEqual(validateGraph([]),[]);});
test('Finding: path guard throws for new file rather than supporting a write target',()=>{const d=mkdtempSync(join(tmpdir(),'gtr-review-'));try{assert.throws(()=>allowedPath(d,join(d,'new.txt')),{code:'ENOENT'});}finally{rmSync(d,{recursive:true,force:true})}});
test('Additional positive evidence: competing approval CAS permits exactly one update',async()=>{const dir=mkdtempSync(join(tmpdir(),'gtr-review-'));const p=join(dir,'state.db');const d=new DatabaseSync(p);d.exec("create table run(id text primary key,phase int,status text,revision int,artifact text);insert into run values('r',0,'approval',1,'hash-a')");d.close();try{const code=`import {DatabaseSync} from 'node:sqlite';const d=new DatabaseSync(${JSON.stringify(p)});d.exec('pragma busy_timeout=5000');console.log(d.prepare("update run set phase=phase+1,status='running',revision=revision+1 where id=? and status='approval' and revision=? and artifact=?").run('r',1,'hash-a').changes);d.close()`;const run=async()=>{const child=spawn(process.execPath,['--input-type=module','-e',code]);let out='';child.stdout.on('data',x=>out+=x);const [status]=await once(child,'close');assert.equal(status,0);return Number(out.trim())};assert.deepEqual((await Promise.all([run(),run()])).sort(),[0,1]);const check=new DatabaseSync(p);assert.equal(check.prepare('select revision from run').get().revision,2);check.close();}finally{rmSync(dir,{recursive:true,force:true})}});

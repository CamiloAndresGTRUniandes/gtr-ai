import {test, after} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {mkdtempSync,rmSync,writeFileSync,readFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import {createHash} from 'node:crypto';
const root=mkdtempSync(join(tmpdir(),'gtr-followup-')); const metrics={node:process.version,platform:process.platform,arch:process.arch,benchmarks:{}};
function bench(name,fn,n=1000){for(let i=0;i<100;i++)fn();const a=[];for(let i=0;i<n;i++){const t=performance.now();fn();a.push(performance.now()-t)}a.sort((x,y)=>x-y);metrics.benchmarks[name]={n,unit:'ms',median:a[Math.ceil(n*.5)-1],p95:a[Math.ceil(n*.95)-1],max:a.at(-1)}}
function child(code){return spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8'})}
function git(cwd,...args){return execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim()}
function digest(x){return createHash('sha256').update(x).digest('hex')}
test('SPK-004/020 durable approval CAS rejects replay and stale artifact approval',()=>{
 const p=join(root,'approval.db');const d=new DatabaseSync(p);d.exec("create table run(id text primary key, phase int, status text, revision int, artifact text); insert into run values('r',0,'approval',1,'hash-a')");
 const approve=d.prepare("update run set phase=phase+1,status='running',revision=revision+1 where id=? and status='approval' and revision=? and artifact=?");
 assert.equal(approve.run('r',1,'wrong').changes,0);assert.equal(approve.run('r',1,'hash-a').changes,1);assert.equal(approve.run('r',1,'hash-a').changes,0);d.close();
 const r=child(`import {DatabaseSync} from 'node:sqlite';const d=new DatabaseSync(${JSON.stringify(p)});console.log(JSON.stringify(d.prepare('select * from run').get()))`);assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(r.stdout).phase,1);
});
test('SPK-019 external intent survives process death; unknown outcome blocks retry',()=>{
 const p=join(root,'journal.db');const d=new DatabaseSync(p);d.exec('create table journal(id text primary key,state text); create table simulated_remote(id text primary key)');d.close();
 const r=child(`import {DatabaseSync} from 'node:sqlite';const d=new DatabaseSync(${JSON.stringify(p)});d.exec("insert into journal values('op','intent'); insert into simulated_remote values('op')");process.kill(process.pid,'SIGKILL')`);assert.equal(r.signal,'SIGKILL');const e=new DatabaseSync(p);assert.equal(e.prepare('select state from journal').get().state,'intent');assert.equal(e.prepare('select count(*) n from simulated_remote').get().n,1);e.exec("update journal set state='confirmed' where id in(select id from simulated_remote)");assert.equal(e.prepare('select state from journal').get().state,'confirmed');e.exec("insert into journal values('unknown','intent')");const canRetry=id=>!e.prepare('select 1 from journal where id=?').get(id);assert.equal(canRetry('unknown'),false);e.close();
});
test('SPK-007 SQLite migration rollback, constraint and backup snapshot',()=>{
 const p=join(root,'migration.db');const b=join(root,'backup.db');const d=new DatabaseSync(p);d.exec('pragma foreign_keys=on; create table project(id text primary key); create table memory(id text primary key, project text references project(id)); insert into project values(\'a\'); pragma user_version=1');assert.throws(()=>d.exec("insert into memory values('m','missing')"));d.exec('begin; alter table memory add column body text; pragma user_version=2; rollback');assert.equal(d.prepare('pragma user_version').get().user_version,1);assert.equal(d.prepare('pragma table_info(memory)').all().length,2);d.exec(`vacuum into '${b}'`);d.exec("insert into project values('b')");const copy=new DatabaseSync(b);assert.equal(copy.prepare('select count(*) n from project').get().n,1);assert.equal(copy.prepare('pragma integrity_check').get().integrity_check,'ok');copy.close();d.close();
});
test('SPK-008/009 hybrid ranking mechanics using hand-authored vectors, not embeddings',()=>{
 const d=new DatabaseSync(':memory:');d.exec('create virtual table mem using fts5(id UNINDEXED, project UNINDEXED, status UNINDEXED, body)');const ins=d.prepare('insert into mem values(?,?,?,?)');const rows=[['a','p','accepted','Dapper data access'],['b','p','accepted','database persistence'],['c','p','superseded','Dapper persistence'],['x','other','accepted','Dapper secret']];for(const r of rows)ins.run(...r);
 const vectors={a:[0.5,0.5],b:[1,0],c:[1,0],x:[1,0]};const lexical=d.prepare("select id from mem where mem match ? and project=? and status='accepted' order by rank");const eligible=d.prepare("select id from mem where project=? and status='accepted'");
 function search(){const l=lexical.all('Dapper','p').map(x=>x.id);const v=eligible.all('p').map(x=>x.id).sort((a,b)=>vectors[b][0]-vectors[a][0]);const scores=new Map();for(const list of [l,v])list.forEach((id,i)=>scores.set(id,(scores.get(id)||0)+1/(60+i+1)));return [...scores].sort((a,b)=>b[1]-a[1]).map(x=>x[0]);}assert.deepEqual(search(),['a','b']);bench('toyHybridFusion',search);d.close();
});
test('SPK-014 mandatory context budget fails closed; dedup keeps provenance',()=>{
 function pack(chunks,budget){const m=new Map();for(const c of chunks){const h=digest(c.text);const old=m.get(h);if(old){old.required||=c.required;old.sources.push(c.source)}else m.set(h,{...c,sources:[c.source]});}const list=[...m.values()].sort((a,b)=>Number(b.required)-Number(a.required));let used=0;const out=[];for(const c of list){const bytes=Buffer.byteLength(c.text);if(used+bytes>budget){if(c.required)throw Error('mandatory context exceeds budget');continue}used+=bytes;out.push(c)}return out;}
 const chunks=[{text:'required',required:false,source:'a'},{text:'required',required:true,source:'b'},{text:'optional',required:false,source:'c'}];assert.throws(()=>pack(chunks,7));const result=pack(chunks,8);assert.equal(result.length,1);assert.deepEqual(result[0].sources,['a','b']);assert.equal(result[0].required,true);
});
test('SPK-017 interrupted worker changes survive and dirty worktree cleanup refuses removal',()=>{
 const repo=join(root,'repo'),w=join(root,'worker');mkdirSync(repo);git(repo,'init','-q');git(repo,'config','user.name','Spike');git(repo,'config','user.email','spike@example.invalid');writeFileSync(join(repo,'a'),'base');git(repo,'add','.');git(repo,'commit','-qm','base');const baseline=git(repo,'rev-parse','HEAD');git(repo,'worktree','add','-qb','worker',w,baseline);
 const r=child(`import {writeFileSync} from 'node:fs';writeFileSync(${JSON.stringify(join(w,'a'))},'partial');process.kill(process.pid,'SIGKILL')`);assert.equal(r.signal,'SIGKILL');assert.equal(git(w,'rev-parse','HEAD'),baseline);assert.equal(readFileSync(join(w,'a'),'utf8'),'partial');assert.throws(()=>git(repo,'worktree','remove',w));assert.equal(readFileSync(join(repo,'a'),'utf8'),'base');git(w,'add','a');git(w,'commit','-qm','recover');git(repo,'worktree','remove',w);
});
test('SPK-012 eligibility filter never silently falls back to paid account',()=>{
 const choose=(accounts,task)=>accounts.filter(a=>task.allowed.includes(a.provider)&&a.enabled&&a.remaining>0&&a.context>=task.context&&task.tools.every(t=>a.tools.includes(t))&&(a.mode!=='api'||task.allowPaid)).sort((a,b)=>Number(a.mode==='api')-Number(b.mode==='api')||a.id.localeCompare(b.id))[0]??null;
 const a=[{id:'a',provider:'one',enabled:true,remaining:0,context:100,tools:['read'],mode:'subscription'},{id:'b',provider:'one',enabled:true,remaining:10,context:100,tools:['read'],mode:'api'},{id:'c',provider:'other',enabled:true,remaining:10,context:100,tools:['read'],mode:'subscription'}];const t={allowed:['one'],context:50,tools:['read'],allowPaid:false};assert.equal(choose(a,t),null);assert.equal(choose(a,{...t,allowPaid:true}).id,'b');assert.equal(choose(a,{...t,allowPaid:true,tools:['write']}),null);
});
after(()=>{writeFileSync(new URL('../docs/benchmarks/raw-results/followup.json',import.meta.url),JSON.stringify(metrics,null,2)+'\n');rmSync(root,{recursive:true,force:true})});

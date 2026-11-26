import {mkdirSync,writeFileSync,existsSync,copyFileSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
const source=dirname(fileURLToPath(import.meta.url));
const root=resolve(source,'../..');
const workspace=join(root,'.spike-workspaces',`${process.platform}-${process.arch}`);
const evidence=join(workspace,'evidence',randomUUID());
mkdirSync(evidence,{recursive:true});
const results=[];
function save(name,data){writeFileSync(join(evidence,name),JSON.stringify(data,null,2));}
function run(name,cmd,args,timeout=120000){
 const r=spawnSync(cmd,args,{cwd:workspace,encoding:'utf8',timeout,maxBuffer:32*1024*1024,windowsHide:true,shell:process.platform==='win32'&&cmd==='npm.cmd'});
 const log=`${r.stdout??''}\n${r.stderr??''}\n${r.error?.message??''}\nExit: ${r.status}`;
 writeFileSync(join(evidence,name+'.log'),log); const ok=r.status===0;
 results.push({name,status:ok?'PASS':'FAIL',exit:r.status});console.log(`${name}: ${ok?'PASS':'FAIL'}`);return ok;
}
const npm=process.platform==='win32'?'npm.cmd':'npm';
const packages=['typescript','zod','@types/node','@earendil-works/pi-coding-agent','@langchain/core','@langchain/langgraph','@langchain/langgraph-checkpoint-sqlite','better-sqlite3','sqlite-vec'];
save('environment.json',{node:process.version,platform:process.platform,arch:process.arch,utc:new Date().toISOString(),execPath:process.execPath});
try {
 if(!existsSync(join(workspace,'package.json')))writeFileSync(join(workspace,'package.json'),JSON.stringify({name:'gtr-spike-sandbox',version:'0.0.0',private:true,type:'module'},null,2));
 for(const f of ['sqlite-native.test.mjs','sqlite-vector.test.mjs','pi.test.mjs','langgraph.mjs'])copyFileSync(join(source,f),join(workspace,f));
 run('sqlite-native',process.execPath,['--test','sqlite-native.test.mjs']);
 if(process.versions.node.split('.')[0]!=='24') console.warn('Node 24 LTS is the proposed baseline; this run is exploratory.');
 if(!run('registry-ping',npm,['ping','--fetch-retries=0','--fetch-timeout=10000']))throw Error('Registry inaccessible; external integrations BLOCKED');
 for(const p of packages)run('metadata-'+p.replace(/[^a-z0-9-]/gi,'_'),npm,['view',p,'version','engines','license','peerDependencies','--json','--fetch-retries=0']);
 const lock=join(workspace,'package-lock.json');
 const args=existsSync(lock)?['ci']:['install','--save-exact',...packages];
 if(!run('installation',npm,[...args,'--no-fund','--no-audit'],600000))throw Error('Dependency installation failed; external integrations BLOCKED');
 copyFileSync(lock,join(evidence,'package-lock.json'));
 run('dependency-tree',npm,['ls','--all','--json']);
 run('sqlite-vector',process.execPath,['--test','sqlite-vector.test.mjs']);
 run('pi',process.execPath,['--test','pi.test.mjs']);
 for(const action of ['approve','reject']){
 const db=join(evidence,action+'.db');
 if(run('langgraph-start-'+action,process.execPath,['langgraph.mjs','start',db]))run('langgraph-'+action,process.execPath,['langgraph.mjs',action,db]);
 else results.push({name:'langgraph-'+action,status:'BLOCKED'});
 }
} catch(e){console.error(e.message);results.push({name:'external-integrations',status:'BLOCKED',reason:e.message});}
finally{save('results.json',results);console.log('Evidence:',evidence);if(results.some(r=>r.status!=='PASS'))process.exitCode=1;}

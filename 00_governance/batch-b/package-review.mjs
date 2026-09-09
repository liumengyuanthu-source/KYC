import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const names=process.argv.slice(3),out=process.argv[2];
const body=names.map(name=>{let diff;try{diff=execFileSync('git',['diff','--no-index','--','/dev/null',name],{encoding:'utf8'});}catch(e){if(e.status!==1)throw e;diff=e.stdout;}return diff;}).join('\n');
writeFileSync(out,'# Review package\nBase HEAD: 1e202f5102aaf0726940e0ae8508341ad032b93a\nHead: same, no commits. Listed untracked incremental files are complete additions. app.mjs contains preserved baseline plus Batch B additions; only collaboration integration changes are in scope.\n\n'+body);

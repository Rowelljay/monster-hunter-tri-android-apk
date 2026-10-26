import {mkdir,readFile,readdir,writeFile,copyFile} from 'node:fs/promises';
import {dirname,resolve,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=join(root,'showcase');
const output=join(root,'dist');
for(const name of ['app.js','site.config.js']){
 const check=spawnSync(process.execPath,['--check',join(source,name)],{encoding:'utf8'});
 if(check.status!==0)throw new Error(check.stderr||'JavaScript syntax check failed');
}
await mkdir(output,{recursive:true});
let html=await readFile(join(source,'index.html'),'utf8');
html=html.replace('MH Tri - Rowell · Download page showcase','Monster Hunter Tri · Android downloads')
 .replace(/\s*<meta name="robots" content="noindex, nofollow">/,'')
 .replace(/\s*<p class="preview-note">[\s\S]*?<\/p>/,'');
await writeFile(join(output,'index.html'),html);
for(const name of ['styles.css','app.js','site.config.js'])await copyFile(join(source,name),join(output,name));
async function assets(directory){for(const entry of await readdir(directory,{withFileTypes:true})){
 if(entry.isSymbolicLink())throw new Error('Public assets must not be symbolic links');
 const file=join(directory,entry.name);
 if(entry.isDirectory())await assets(file);
 else if(entry.isFile()){const target=join(output,relative(source,file));await mkdir(dirname(target),{recursive:true});await copyFile(file,target);}
}}
await assets(join(source,'assets'));
console.log('Static page built in dist/. Nothing was uploaded.');

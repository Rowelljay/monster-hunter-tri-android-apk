import {mkdir,readFile,readdir,writeFile,copyFile,unlink} from 'node:fs/promises';
import {dirname,resolve,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {readSiteConfig,renderPage,renderSiteConfig} from './render-page.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=join(root,'showcase');
const output=join(root,'dist');
for(const name of ['app.js','site.config.js']){
 const check=spawnSync(process.execPath,['--check',join(source,name)],{encoding:'utf8'});
 if(check.status!==0)throw new Error(check.stderr||'JavaScript syntax check failed');
}
await mkdir(output,{recursive:true});
const template=await readFile(join(source,'index.html'),'utf8');
const configText=await readFile(join(source,'site.config.js'),'utf8');
const config=readSiteConfig(configText);
for(const [id,game] of Object.entries(config.games)){
 const directory=join(output,game.entry);
 if(!game.visible){
  if(!game.entry)throw new Error('The default game must remain public.');
  await unlink(join(directory,'index.html')).catch(error=>{if(error.code!=='ENOENT')throw error;});
  continue;
 }
 await mkdir(directory,{recursive:true});
 await writeFile(join(directory,'index.html'),renderPage(template,id,config,{production:true}));
}
for(const name of ['styles.css','app.js'])await copyFile(join(source,name),join(output,name));
await writeFile(join(output,'site.config.js'),renderSiteConfig(configText,{publicOnly:true}));
async function assets(directory){for(const entry of await readdir(directory,{withFileTypes:true})){
 if(entry.isSymbolicLink())throw new Error('Public assets must not be symbolic links');
 const file=join(directory,entry.name);
 if(entry.isDirectory())await assets(file);
 else if(entry.isFile()){const target=join(output,relative(source,file));await mkdir(dirname(target),{recursive:true});await copyFile(file,target);}
}}
await assets(join(source,'assets'));
console.log('Static page built in dist/. Nothing was uploaded.');

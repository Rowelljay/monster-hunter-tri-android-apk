import {runInNewContext} from 'node:vm';

export function readSiteConfig(text){
  const context={window:{}};
  runInNewContext(text,context,{timeout:1000});
  const games=context.window.HUNTER_GAMES;
  if(!games||!games.tri)throw new Error('Missing default game.');
  for(const [id,game] of Object.entries(games)){
    if(!/^[a-z0-9-]+$/.test(id)||! /^(?:[a-z0-9-]+\/)?$/.test(game.entry))throw new Error('Invalid game entry.');
  }
  return {games,downloads:context.window.TRI_DOWNLOADS};
}
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderPage(template,gameId,config,{production=false}={}){
  const game=config.games[gameId];if(!game||!game.visible)throw new Error('Game is not public.');
  const visibleGames=Object.entries(config.games).filter(([,entry])=>entry.visible);
  const title=`${game.title} · Downloads${production?'':' · Preview'}`;
  let html=template.replace('data-game="tri"',`data-game="${gameId}"`)
    .replace(/<title>[^<]*<\/title>/,`<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/,`$1${escape(game.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/,`$1${escape(`${game.title} · Downloads`)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${escape(game.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/,`$1https://monster-hunter-tri-android-apk.vercel.app/${game.entry}$2`);
  const prefix=game.entry?'../':'';
  html=html.replace(/\b(href|src)="((?:assets\/[^"<>]+)|styles\.css|site\.config\.js|app\.js)"/g,`$1="${prefix}$2"`);
  html=html.replace(/<a\b[^>]*data-game-link="([^"]+)"[^>]*>/g,(tag,id)=>{
    const selected=config.games[id];if(!selected)throw new Error('Unknown game tab.');
    return tag.replace(/ href="[^"]*"/,` href="${prefix}${selected.entry||'./'}"`)
      .replace(/ aria-current="[^"]*"/,'').replace(/>$/,`${id===gameId?' aria-current="page"':''}>`);
  });
  for(const [id,entry] of Object.entries(config.games)){
    if(entry.visible)continue;
    html=html.replace(new RegExp(`<!-- game:${id}:start -->[\\s\\S]*?<!-- game:${id}:end -->`,'g'),'')
      .replace(new RegExp(`<a\\b[^>]*data-game-link="${id}"[^>]*>[\\s\\S]*?<\\/a>`,'g'),'')
      .replace(new RegExp(`<span data-hero-game="${id}">[^<]*<\\/span>`,'g'),'');
  }
  if(visibleGames.length<2)html=html.replace('class="game-switcher"','class="game-switcher" hidden');
  if(production)html=html.replace(/\s*<meta name="robots" content="noindex, nofollow">/,'').replace(/\s*<p class="preview-note">[\s\S]*?<\/p>/,'');
  const lowSpec=config.downloads.lowSpec;
  if(lowSpec!==null){
    if(lowSpec!=='https://rowell-mode-app.vercel.app/download/mh-tri-low-spec/android')throw new Error('Low Spec must use its approved download gateway.');
    html=html.replace('class="button secondary-button unavailable" data-link="lowSpec" role="link" aria-disabled="true" tabindex="-1"',`class="button secondary-button" data-link="lowSpec" href="${lowSpec}"`).replace('data-low-spec-label>Temporarily unavailable','data-low-spec-label>Download 32-bit APK');
  }
  return html;
}

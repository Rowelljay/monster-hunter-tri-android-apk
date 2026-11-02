// Public links for the local design showcase. No keys, payment details or game files are bundled.
window.TRI_DOWNLOADS=Object.freeze({
  // Published APK and the owner-selected European/PAL game-file destination.
  apk:'https://github.com/Dling11/monster_hunter_tri_emulator/releases/download/rowell-1.4.13-netfix1/MH3_Rowell_Dev-arm64.apk',
  windows:'https://github.com/Dling11/monster_hunter_tri_emulator/releases/download/rowell-1.4.13/MH3-Rowell-Windows-x64.zip',
  // Enable only after the matching Low Spec source and APK are published and approved.
  lowSpec:null,
  game:'https://romsfun.com/download/monster-hunter-3-tri-id1-13483/2',
  source:'https://github.com/Dling11/monster_hunter_tri_emulator',
  credits:'https://github.com/Dling11/monster_hunter_tri_emulator/blob/main/CREDITS.md',
  youtube:'https://www.youtube.com/@Nikushimi-19/videos',
  support:'https://support-page-donation.vercel.app',
});

// Each game has its own entry page, links and metadata. No installer is inferred.
window.HUNTER_GAMES=Object.freeze({
  tri:Object.freeze({
    visible:true,
    title:'Monster Hunter Tri',
    description:'Monster Hunter Tri for Android and Windows. App downloads, experimental Low Spec information and setup instructions.',
    entry:'',
    links:window.TRI_DOWNLOADS,
  }),
  mh4u:Object.freeze({
    visible:false,
    title:'Monster Hunter 4 Ultimate',
    description:'Monster Hunter 4 Ultimate on Android. Explore the community app project; APK downloads and installation instructions are coming later.',
    entry:'mh4u/',
    links:Object.freeze({
      source:'https://github.com/Dling11/MH4-ULTIMATE',
      credits:'https://github.com/Dling11/MH4-ULTIMATE/blob/main/CREDITS.md',
    }),
  }),
});
window.resolveHunterGame=(address)=>{
  const url=new URL(address);
  const query=url.searchParams.get('game');
  if(query!==null)return Object.hasOwn(window.HUNTER_GAMES,query)&&window.HUNTER_GAMES[query].visible?query:'tri';
  return Object.keys(window.HUNTER_GAMES).find(id=>{
    const entry=window.HUNTER_GAMES[id].entry;
    return window.HUNTER_GAMES[id].visible&&entry&&(url.pathname.endsWith(`/${entry}`)||url.pathname.endsWith(`/${entry}index.html`)||url.pathname.endsWith(`/${entry.slice(0,-1)}`));
  })||'tri';
};
if(typeof document!=='undefined'){
  window.HUNTER_SITE_ROOT=new URL('.',document.currentScript.src);
  document.documentElement.dataset.game=window.resolveHunterGame(location.href);
}

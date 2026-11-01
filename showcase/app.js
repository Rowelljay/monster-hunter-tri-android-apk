(() => {
  const themes=['dark','light'];
  const button=document.getElementById('theme-toggle');
  function applyTheme(theme){
    document.documentElement.dataset.theme=theme;
    button.querySelector('span').textContent=theme==='dark'?'Light mode':'Dark mode';
    button.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
    button.setAttribute('aria-pressed',String(theme==='light'));
    document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#0c1722':'#f1f6fb';
  }
  try{const saved=localStorage.getItem('mh-tri-showcase-theme');if(themes.includes(saved))applyTheme(saved);}catch{}
  button.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('mh-tri-showcase-theme',theme);}catch{}});
  document.querySelectorAll('[data-link]').forEach(link=>{
    const gameId=link.closest('[data-game-panel]')?.dataset.gamePanel;
    const links=gameId?window.HUNTER_GAMES?.[gameId]?.links:window.TRI_DOWNLOADS;
    const target=links?.[link.dataset.link];
    let valid=false;try{valid=typeof target==='string'&&new URL(target).protocol==='https:';}catch{}
    if(valid){
      link.href=target;
      if(link.dataset.link==='lowSpec'){
        link.removeAttribute('aria-disabled');link.removeAttribute('tabindex');link.classList.remove('unavailable');
        link.querySelector('[data-low-spec-label]').textContent='Download 32-bit APK';
      }
    }else if(link.dataset.link==='lowSpec'){
      link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.setAttribute('tabindex','-1');link.classList.add('unavailable');
      link.querySelector('[data-low-spec-label]').textContent='Temporarily unavailable';
    }
  });

  const tabs=[...document.querySelectorAll('[data-game-link]')];
  const panels=[...document.querySelectorAll('[data-game-panel]')];
  const tablist=document.querySelector('.game-tabs');
  const copyButton=document.querySelector('[data-copy-game-link]');
  const copyStatus=document.getElementById('copy-status');
  const root=window.HUNTER_SITE_ROOT;
  let selectedGame;
  let copyTimer;
  const addressFor=id=>new URL(window.HUNTER_GAMES[id].entry,root);
  function selectGame(id){
    selectedGame=id;
    const game=window.HUNTER_GAMES[id];
    document.documentElement.dataset.game=id;
    document.title=`${game.title} · Downloads`;
    document.querySelector('meta[name="description"]').content=game.description;
    document.querySelector('meta[property="og:title"]').content=`${game.title} · Downloads`;
    document.querySelector('meta[property="og:description"]').content=game.description;
    document.querySelector('link[rel="canonical"]').href=`https://monster-hunter-tri-android-apk.vercel.app/${game.entry}`;
    for(const tab of tabs){
      const active=tab.dataset.gameLink===id;
      tab.setAttribute('role','tab');tab.setAttribute('aria-controls',`game-${tab.dataset.gameLink}`);
      tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;
      if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');
    }
    for(const panel of panels){panel.setAttribute('role','tabpanel');panel.hidden=panel.dataset.gamePanel!==id;}
    clearTimeout(copyTimer);copyButton.querySelector('span').textContent='Copy link';copyButton.setAttribute('aria-label','Copy link to the selected game');copyStatus.textContent='';
  }
  function navigate(id){
    if(id!==selectedGame){
      const target=addressFor(id);
      const current=new URL(location.href);
      target.search=current.search;target.searchParams.delete('game');
      try{history.pushState({game:id},'',target);}catch{location.assign(target);return;}
      selectGame(id);
    }
  }
  for(const tab of tabs){
    tab.href=addressFor(tab.dataset.gameLink).href;
    tab.addEventListener('click',event=>{
      if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      event.preventDefault();navigate(tab.dataset.gameLink);
    });
    tab.addEventListener('keydown',event=>{
      if(event.key===' '||event.key==='Enter'){event.preventDefault();navigate(tab.dataset.gameLink);return;}
      const index=tabs.indexOf(tab);
      const next={ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
      if(next===undefined)return;
      event.preventDefault();tabs[next].focus();navigate(tabs[next].dataset.gameLink);
    });
  }
  tablist.setAttribute('role','tablist');
  selectGame(window.resolveHunterGame(location.href));
  document.documentElement.classList.add('has-game-tabs');
  window.addEventListener('popstate',()=>selectGame(window.resolveHunterGame(location.href)));
  copyButton.addEventListener('click',async()=>{
    copyButton.disabled=true;
    try{
      await navigator.clipboard.writeText(addressFor(selectedGame).href);
      copyButton.querySelector('span').textContent='Link copied';copyButton.setAttribute('aria-label',`Link copied for ${window.HUNTER_GAMES[selectedGame].title}`);copyStatus.textContent=`${window.HUNTER_GAMES[selectedGame].title} link copied.`;
    }catch{copyStatus.textContent='Copy the address from your browser to share this game.';}
    finally{copyButton.disabled=false;copyTimer=setTimeout(()=>{copyButton.querySelector('span').textContent='Copy link';copyButton.setAttribute('aria-label','Copy link to the selected game');},2200);}
  });
})();

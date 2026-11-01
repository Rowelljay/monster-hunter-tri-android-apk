(() => {
  const themes=['dark','light'];
  const button=document.getElementById('theme-toggle');
  function applyTheme(theme){
    document.documentElement.dataset.theme=theme;
    button.querySelector('span').textContent=theme==='dark'?'Light mode':'Dark mode';
    button.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');
    button.setAttribute('aria-pressed',String(theme==='light'));
    document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#0c1722':'#f1f6fb';
  }
  try{const saved=localStorage.getItem('mh-tri-showcase-theme');if(themes.includes(saved))applyTheme(saved);}catch{}
  button.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('mh-tri-showcase-theme',theme);}catch{}});
  document.querySelectorAll('[data-link]').forEach(link=>{
    const target=window.TRI_DOWNLOADS?.[link.dataset.link];
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
})();

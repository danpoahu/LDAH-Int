/* Chrome check (Daniel 2026-11-13): the decks are built and tested in Google Chrome (voice,
   animations, full screen). In any other browser, ask once per browser session to switch. */
(function(){
 if(window._ldahChromeCheck)return;window._ldahChromeCheck=1;
 function isChrome(){const b=navigator.userAgentData&&navigator.userAgentData.brands;
  if(b&&b.length)return b.some(x=>x.brand==='Google Chrome');
  const ua=navigator.userAgent||'';
  return /CriOS\//.test(ua)||(/Chrome\//.test(ua)&&/Google Inc/.test(navigator.vendor||'')&&!/Edg\/|OPR\/|SamsungBrowser|Brave|Vivaldi/.test(ua))}
 if(isChrome())return;
 try{if(sessionStorage.getItem('ldahDeckNotChromeOk')==='1')return}catch(e){}
 const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const url=location.href.split('#')[0];
 const ov=document.createElement('div');
 ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','ldahChromeT');
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif';
 const btn='display:block;width:100%;border:none;border-radius:12px;padding:13px 16px;font-size:17px;font-weight:700;cursor:pointer;margin-top:10px';
 ov.innerHTML='<div style="background:#fff;border-radius:18px;max-width:440px;width:100%;padding:26px 24px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:center">'+
  '<div style="font-size:40px;line-height:1">&#127760;</div>'+
  '<h2 id="ldahChromeT" style="margin:10px 0 8px;font-size:23px;color:#0B3A53">Please open this in Google Chrome</h2>'+
  '<p style="margin:0 0 6px;font-size:16px;color:#475569;line-height:1.5">This training is made for Chrome. In other browsers the voice, the moving pointer and full screen may not work.</p>'+
  '<p style="margin:0 0 8px;font-size:15px;color:#64748B;line-height:1.5">Copy the link, then paste it into Chrome&rsquo;s address bar.</p>'+
  (ios?'<button type="button" data-k="open" style="'+btn+';background:#15803D;color:#fff">Open in Chrome</button>':'')+
  '<button type="button" data-k="copy" style="'+btn+';background:#0E7490;color:#fff">Copy the link</button>'+
  '<button type="button" data-k="stay" style="'+btn+';background:#F1F5F9;color:#334155">Keep going in this browser</button>'+
  '<div data-k="msg" style="min-height:20px;margin-top:10px;font-size:14px;font-weight:700;color:#15803D"></div></div>';
 const close=()=>{try{sessionStorage.setItem('ldahDeckNotChromeOk','1')}catch(e){}ov.remove()};
 ov.querySelector('[data-k=stay]').onclick=close;
 ov.querySelector('[data-k=copy]').onclick=()=>{const m=ov.querySelector('[data-k=msg]');
  const ok=()=>{m.textContent='Link copied. Now open Chrome and paste it into the address bar.'};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(ok,()=>{m.style.color='#334155';m.textContent=url});
  else{m.style.color='#334155';m.textContent=url}};
 const op=ov.querySelector('[data-k=open]');if(op)op.onclick=()=>{location.href=url.replace(/^https:/,'googlechromes:').replace(/^http:/,'googlechrome:')};
 (document.body?Promise.resolve():new Promise(r=>document.addEventListener('DOMContentLoaded',r))).then(()=>document.body.appendChild(ov));
})();

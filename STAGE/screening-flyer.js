/* Screening flyer (Daniel 2026-11-19). The flyer families get with the consent forms,
   one per confirmed screening day: school, that day's date, time and location, the
   screenings being done and the consent due date. Three designs (A Sunshine check-up,
   B Sticker board, C Ocean buddies). The default design is settings/screeningFlyer.template,
   picked in Virtual Event Builder > Series: Screenings. The screening worksheet's
   confirmation email draws one PDF per day with render() + pdf() and attaches them.
   Everything is sized in cqw so the letter page scales; text shrinks (--k) to fit. */
(function () {
'use strict';
if (window.ScreeningFlyer) return;
const LOGO = new URL('logo_blue.png', document.baseURI).href;
const FONTS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@600;700;800;900&family=Baloo+2:wght@600;700;800&display=swap';
const W = 1275, H = 1650;   // 8.5 x 11 in at 150 dpi
const CSS = `/* ===== shared flyer root: letter size, all sizes in cqw x --k (shrinks to fit) ===== */
.sf{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;width:100%;--k:1}
.sf svg.bgart{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sf .stack{position:absolute;display:flex;flex-direction:column;overflow:hidden}
.sf .logo{background:#fff;border-radius:2cqw;padding:1cqw 1.6cqw;display:inline-flex;box-shadow:0 .6cqw 1.6cqw rgba(0,0,0,.14)}
.sf .logo img{height:7cqw;display:block}
.sf .fband{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;gap:3cqw;padding:2.4cqw 6cqw}
.sf .foot{font-family:Nunito,Arial,sans-serif;font-weight:900;font-size:2.7cqw;line-height:1.3}
.sf .foot small{display:block;font-weight:700;font-size:2cqw;opacity:.9}
.sf .K{font-size:calc(var(--k)*var(--fs))}

/* ===== A: Sunshine check-up ===== */
.sfa{font-family:Fredoka,Arial,sans-serif;color:#13315C}
.sfa .stack{left:6cqw;right:6cqw;top:5cqw;bottom:17cqw;gap:calc(var(--k)*2.2cqw)}
.sfa .ttl{--fs:8.4cqw;font-weight:700;line-height:.98;letter-spacing:-.02em;width:58cqw}
.sfa .ttl em{font-style:normal;color:#E8590C;display:block}
.sfa .typ{display:flex;gap:1.4cqw;flex-wrap:wrap;width:62cqw}
.sfa .typ span{--fs:2.6cqw;background:#fff;border:.45cqw solid #13315C;border-radius:99px;padding:.3cqw 2.2cqw;font-weight:600}
.sfa .card{background:#fff;border-radius:3.6cqw;border:.6cqw solid #13315C;padding:calc(var(--k)*2.6cqw) 3.6cqw;box-shadow:1.2cqw 1.2cqw 0 #13315C;margin-right:1.2cqw}
.sfa .at{--fs:2.4cqw;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#E8590C}
.sfa .sch{--fs:5cqw;font-weight:700;line-height:1.05;margin:.3cqw 0 calc(var(--k)*1.6cqw)}
.sfa .sch small{display:block;font-size:.52em;font-weight:600;color:#475569;margin-top:.4cqw}
.sfa .days{display:grid;gap:calc(var(--k)*1.2cqw)}
.sfa .day{display:flex;align-items:center;gap:2.4cqw;font-family:Nunito,Arial,sans-serif}
.sfa .dot{flex:none;width:calc(var(--k)*8.6cqw);height:calc(var(--k)*8.6cqw);border-radius:50%;background:#FFD43B;border:.45cqw solid #13315C;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;font-family:Fredoka,Arial,sans-serif}
.sfa .dot b{font-size:calc(var(--k)*3.4cqw)}.sfa .dot i{font-style:normal;font-size:calc(var(--k)*1.7cqw);font-weight:600}
.sfa .dd{--fs:3cqw;font-weight:900;line-height:1.2}.sfa .dd small{display:block;font-weight:700;font-size:.78em;color:#475569}
.sfa .due{background:#E8590C;color:#fff;border-radius:3cqw;padding:calc(var(--k)*2.2cqw) 3.6cqw;font-family:Nunito,Arial,sans-serif}
.sfa .due b{--fs:3.9cqw;display:block;font-family:Fredoka,Arial,sans-serif;font-weight:700;line-height:1.1}
.sfa .due span{--fs:2.5cqw;font-weight:700;display:block;margin-top:.5cqw}
.sfa .why{--fs:2.6cqw;font-family:Nunito,Arial,sans-serif;font-weight:800;line-height:1.35;background:rgba(255,255,255,.88);border-radius:2.4cqw;padding:1.4cqw 2.6cqw}
.sfa .fband{color:#fff}
.sfa .foot{text-shadow:0 .3cqw .6cqw rgba(0,0,0,.25)}

/* ===== B: Sticker board ===== */
.sfb{font-family:'Baloo 2',Arial,sans-serif;color:#2B2D42}
.sfb .kick{position:absolute;left:6cqw;top:4.2cqw;color:#fff;font-weight:800;font-size:3.2cqw;letter-spacing:.06em}
.sfb .stack{left:6cqw;right:6cqw;top:17cqw;bottom:13cqw;gap:calc(var(--k)*2.4cqw)}
.sfb .ttl{--fs:6.8cqw;text-align:center;font-weight:800;line-height:1.02}
.sfb .ttl em{font-style:normal;color:#7B2CBF}
.sfb .stk{display:flex;justify-content:center;gap:3cqw}
.sfb .st{width:17cqw;text-align:center;font-weight:800;line-height:1.1}
.sfb .st span{--fs:2.4cqw;display:block}
.sfb .st .c{width:calc(var(--k)*14cqw);height:calc(var(--k)*14cqw);margin:0 auto 1cqw;border-radius:50%;display:flex;align-items:center;justify-content:center;border:.7cqw solid #fff;box-shadow:0 .8cqw 1.6cqw rgba(0,0,0,.18)}
.sfb .st svg{width:55%;height:55%}
.sfb .tix{display:grid;gap:calc(var(--k)*1.6cqw)}
.sfb .tk{display:flex;align-items:stretch;background:#fff;border-radius:2.4cqw;box-shadow:0 .6cqw 1.4cqw rgba(0,0,0,.1);overflow:hidden}
.sfb .tk .l{flex:none;width:16cqw;background:#7B2CBF;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;border-right:.6cqw dashed #fff;padding:calc(var(--k)*1.2cqw) 0}
.sfb .tk .l b{font-size:calc(var(--k)*4.8cqw)}.sfb .tk .l i{font-style:normal;font-size:calc(var(--k)*2cqw);font-weight:700;letter-spacing:.08em}
.sfb .tk .r{padding:1cqw 3cqw;font-family:Nunito,Arial,sans-serif;display:flex;flex-direction:column;justify-content:center}
.sfb .tk .r b{--fs:3cqw;font-weight:900}.sfb .tk .r span{--fs:2.3cqw;font-weight:700;color:#555}
.sfb .clip{background:#FFE066;border-radius:3cqw;padding:calc(var(--k)*2.2cqw) 3.6cqw;border:.55cqw solid #2B2D42}
.sfb .clip h3{--fs:3.7cqw;margin:0 0 .6cqw;line-height:1.05;font-weight:800}
.sfb .clip ol{margin:0;padding:0;list-style:none;font-family:Nunito,Arial,sans-serif;font-weight:800;line-height:1.35}
.sfb .clip li{--fs:2.6cqw;display:flex;gap:1.6cqw;align-items:flex-start;margin-top:.5cqw}
.sfb .clip li i{flex:none;font-style:normal;width:3.8cqw;height:3.8cqw;border-radius:50%;background:#2B2D42;color:#FFE066;display:flex;align-items:center;justify-content:center;font-size:2.2cqw;margin-top:.2cqw}
.sfb .why{--fs:2.5cqw;font-family:Nunito,Arial,sans-serif;font-weight:800;text-align:center}
.sfb .fband{background:#2B2D42;color:#fff}

/* ===== C: Ocean buddies ===== */
.sfc{font-family:Fredoka,Arial,sans-serif;color:#063B4C}
.sfc .stack{left:6cqw;right:6cqw;top:5cqw;bottom:18cqw;gap:calc(var(--k)*2.2cqw)}
.sfc .ttl{--fs:7.2cqw;font-weight:700;line-height:1;width:64cqw}
.sfc .ttl em{font-style:normal;color:#FF6B6B;display:block}
.sfc .lead{--fs:2.8cqw;font-family:Nunito,Arial,sans-serif;font-weight:800;line-height:1.35;width:62cqw}
.sfc .lbl{--fs:2.8cqw;font-weight:600;color:#0B7285;letter-spacing:.06em;text-transform:uppercase}
.sfc .bub{display:flex;flex-wrap:wrap;gap:2cqw}
.sfc .bb{flex:1 1 25cqw;background:rgba(255,255,255,.94);border:.55cqw solid #fff;border-radius:3.6cqw;padding:calc(var(--k)*1.8cqw) 2.4cqw;box-shadow:0 .7cqw 0 rgba(6,59,76,.16);font-family:Nunito,Arial,sans-serif}
.sfc .bb .d{--fs:3.9cqw;font-family:Fredoka,Arial,sans-serif;font-weight:700;line-height:1.05;color:#0B7285}
.sfc .bb .t{--fs:2.5cqw;font-weight:900}.sfc .bb .p{--fs:2.2cqw;font-weight:700;color:#35606B}
.sfc .ring{display:flex;gap:3cqw;align-items:center;background:#FF6B6B;color:#fff;border-radius:3.4cqw;padding:calc(var(--k)*2.2cqw) 3.4cqw}
.sfc .ring svg{flex:none;width:calc(var(--k)*11cqw);height:calc(var(--k)*11cqw)}
.sfc .ring b{--fs:3.8cqw;display:block;font-weight:700;line-height:1.08}
.sfc .ring span{--fs:2.4cqw;font-family:Nunito,Arial,sans-serif;font-weight:800;display:block;margin-top:.4cqw}
.sfc .fband{color:#fff}
`;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const D=iso=>new Date(iso+'T12:00:00');
const wd=iso=>D(iso).toLocaleDateString('en-US',{weekday:'short'});
const wdl=iso=>D(iso).toLocaleDateString('en-US',{weekday:'long'});
const mo=iso=>D(iso).toLocaleDateString('en-US',{month:'short'});
const dn=iso=>D(iso).getDate();
const nice=iso=>D(iso).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
const tm=t=>{if(!t)return'';let h=+t.slice(0,2),m=t.slice(3,5);return((h%12)||12)+(m!=='00'?':'+m:'')+(h<12?' a.m.':' p.m.')};
const span=d=>tm(d.start)+(d.end?' to '+tm(d.end):'');
const sameLoc=s=>s.days.every(d=>d.location===s.days[0].location);
const TYPE_LABEL={'Hearing':'Hearing','Vision':'Vision','Developmental':'Growing & learning','Social Emotional':'Feelings & friends'};
const typesText=s=>s.types.map(t=>TYPE_LABEL[t]||t);
const dueLine=s=>nice(s.consentDue)+(s.consentDueTime?' by '+tm(s.consentDueTime):'');
const FOOT=`Questions? Call (808) 536-9684<small>Leadership in Disabilities &amp; Achievement of Hawai<span style="font-family:Arial,sans-serif">ʻ</span>i · ldahawaii.org</small>`;
const LOGOIMG=`<span class="logo"><img src="${LOGO}" alt="LDAH"></span>`;

/* ---------- A: Sunshine check-up ---------- */
function A(s){
 const one=sameLoc(s);
 const days=s.days.map(d=>`<div class="day"><div class="dot"><b>${dn(d.date)}</b><i>${mo(d.date).toUpperCase()}</i></div><div class="dd K">${wdl(d.date)}, ${span(d)}${one?'':`<small>${esc(d.location)}</small>`}</div></div>`).join('');
 const sun=`<g transform="translate(83 15)"><g stroke="#FFB703" stroke-width="2.2" stroke-linecap="round">${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return`<line x1="${(Math.cos(a)*13).toFixed(2)}" y1="${(Math.sin(a)*13).toFixed(2)}" x2="${(Math.cos(a)*17.5).toFixed(2)}" y2="${(Math.sin(a)*17.5).toFixed(2)}"/>`}).join('')}</g><circle r="10.5" fill="#FFD43B" stroke="#FFB703" stroke-width="1.2"/><circle cx="-3.5" cy="-1.5" r="1.1" fill="#13315C"/><circle cx="3.5" cy="-1.5" r="1.1" fill="#13315C"/><path d="M-4 3 Q0 7 4 3" fill="none" stroke="#13315C" stroke-width="1.1" stroke-linecap="round"/><circle cx="-6.5" cy="2.5" r="1.4" fill="#FF8FA3" opacity=".7"/><circle cx="6.5" cy="2.5" r="1.4" fill="#FF8FA3" opacity=".7"/></g>`;
 const rainbow=`<g fill="none" stroke-width="2.4" opacity=".9" transform="translate(56 54)"><path d="M0 0 A20 20 0 0 1 40 0" stroke="#FF6B6B"/><path d="M2.4 0 A17.6 17.6 0 0 1 37.6 0" stroke="#FFA94D"/><path d="M4.8 0 A15.2 15.2 0 0 1 35.2 0" stroke="#FFD43B"/><path d="M7.2 0 A12.8 12.8 0 0 1 32.8 0" stroke="#69DB7C"/><path d="M9.6 0 A10.4 10.4 0 0 1 30.4 0" stroke="#4DABF7"/></g><g fill="#fff"><ellipse cx="58" cy="54" rx="6" ry="2.8"/><ellipse cx="62" cy="52.4" rx="4" ry="3"/><ellipse cx="95" cy="54" rx="5" ry="2.6"/><ellipse cx="91" cy="52.6" rx="3.4" ry="2.6"/></g>`;
 const hills=`<path d="M0 108 Q20 98 42 105 T84 101 T100 103 V130 H0Z" fill="#51CF66"/><path d="M0 114 Q26 105 54 112 T100 109 V130 H0Z" fill="#2F9E44"/>`;
 const flowers=[[4,104],[93,101]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><line y2="3.4" stroke="#2B8A3E" stroke-width=".6"/>${[0,72,144,216,288].map(a=>`<circle cx="${(Math.cos(a*Math.PI/180)*1.3).toFixed(2)}" cy="${(Math.sin(a*Math.PI/180)*1.3).toFixed(2)}" r="1" fill="${['#FF8FA3','#FFD43B','#fff'][i]}"/>`).join('')}<circle r=".8" fill="#E8590C"/></g>`).join('');
 return `<div class="sf sfa"><svg class="bgart" viewBox="0 0 100 129.4" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD3FF"/><stop offset=".6" stop-color="#D3F0FF"/><stop offset="1" stop-color="#FFF4CC"/></linearGradient></defs><rect width="100" height="130" fill="url(#skyA)"/>${rainbow}${sun}${hills}${flowers}</svg>
 <div class="stack">
  <div>${LOGOIMG}</div>
  <div class="ttl K">Free check-up day<em>at school!</em></div>
  <div class="typ">${typesText(s).map(t=>`<span class="K">${esc(t)}</span>`).join('')}</div>
  <div class="card"><div class="at K">We’re coming to</div><div class="sch K">${esc(s.school)}${one&&s.days[0].location?`<small>${esc(s.days[0].location)}</small>`:''}</div><div class="days">${days}</div></div>
  <div class="due"><b class="K">Send back the consent form by ${esc(dueLine(s))}</b><span class="K">Only children with a signed form can be screened. Hand it to your child’s teacher.</span></div>
  <div class="why K">Quick, gentle and play-based, right in the classroom. We share the results with you, so you know how your child is doing before kindergarten.</div>
 </div>
 <div class="fband"><div class="foot">${FOOT}</div></div></div>`;
}

/* ---------- B: Sticker board ---------- */
const ICON={
 Hearing:`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M7 10a5 5 0 0 1 10 0c0 3-3 3.5-3 6.5a2.5 2.5 0 0 1-5 0"/><path d="M10 10a2 2 0 0 1 4 0"/></svg>`,
 Vision:`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6" fill="#fff"/></svg>`,
 Developmental:`<svg viewBox="0 0 24 24" fill="#fff"><rect x="3" y="13" width="8" height="8" rx="1.4"/><rect x="13" y="13" width="8" height="8" rx="1.4"/><rect x="8" y="4" width="8" height="8" rx="1.4"/></svg>`,
 'Social Emotional':`<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg>`};
const STC={Hearing:'#FF6B6B',Vision:'#4DABF7','Developmental':'#51CF66','Social Emotional':'#FF922B'};
function B(s){
 const one=sameLoc(s);
 const tix=s.days.map(d=>`<div class="tk"><div class="l"><i>${wd(d.date).toUpperCase()}</i><b>${dn(d.date)}</b><i>${mo(d.date).toUpperCase()}</i></div><div class="r"><b class="K">${span(d)}</b><span class="K">${esc(one?(d.location||s.school):d.location)}</span></div></div>`).join('');
 const conf=Array.from({length:46},(_,i)=>{const x=(i*37.3)%100,y=14+(i*53.7)%104, c=['#FF6B6B','#4DABF7','#51CF66','#FFD43B','#B197FC','#FF922B'][i%6];return i%3?`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6+(i%4)*.22).toFixed(2)}" fill="${c}" opacity=".45"/>`:`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="2.2" height=".8" rx=".4" fill="${c}" opacity=".45" transform="rotate(${(i*29)%180} ${x.toFixed(1)} ${y.toFixed(1)})"/>`}).join('');
 const star=(x,y,r,c)=>`<path transform="translate(${x} ${y}) scale(${r})" d="M0-1 .29-.31 1-.31.43.12.62.81 0 .38-.62.81-.43.12-1-.31-.29-.31Z" fill="${c}"/>`;
 return `<div class="sf sfb"><svg class="bgart" viewBox="0 0 100 129.4" preserveAspectRatio="none" aria-hidden="true"><rect width="100" height="130" fill="#FFF7E8"/>${conf}<rect x="0" y="0" width="100" height="11" fill="#7B2CBF"/><path d="M0 11 Q12.5 15 25 11 T50 11 T75 11 T100 11 V9 H0Z" fill="#7B2CBF"/>${star(90,5.6,3.2,'#FFD43B')}${star(82,3.4,1.6,'#fff')}${star(95.5,10,1.2,'#FF8FA3')}</svg>
 <div class="kick">FREE SCREENING FOR YOUR KEIKI</div>
 <div class="stack">
  <div class="ttl K">Big check-up days are coming to<br><em>${esc(s.school)}!</em></div>
  <div class="stk">${s.types.map((t,i)=>`<div class="st"><div class="c" style="background:${STC[t]||'#7B2CBF'};transform:rotate(${[-6,4,-3,7][i%4]}deg)">${ICON[t]||''}</div><span class="K">${esc(TYPE_LABEL[t]||t)}</span></div>`).join('')}</div>
  <div class="tix">${tix}</div>
  <div class="clip"><h3 class="K">Two quick steps so your child gets a turn</h3><ol><li class="K"><i>1</i><span>Fill out and sign the consent form that came with this flyer.</span></li><li class="K"><i>2</i><span>Return it to your child’s teacher by <u>${esc(dueLine(s))}</u>.</span></li></ol></div>
  <div class="why K">Quick, gentle and play-based. We share the results with you.</div>
 </div>
 <div class="fband"><div class="foot">${FOOT}</div>${LOGOIMG}</div></div>`;
}

/* ---------- C: Ocean buddies ---------- */
function C(s){
 const one=sameLoc(s);
 const bubs=s.days.map(d=>`<div class="bb"><div class="d K">${wd(d.date)}, ${mo(d.date)} ${dn(d.date)}</div><div class="t K">${span(d)}</div>${one?'':`<div class="p K">${esc(d.location)}</div>`}</div>`).join('');
 const turtle=`<g transform="translate(83 22)"><ellipse cx="0" cy="0" rx="10" ry="7.4" fill="#38D9A9"/><path d="M-10 0a10 7.4 0 0 1 20 0" fill="#20C997"/><g fill="#0CA678" opacity=".55"><circle cx="-3.6" cy="-2.4" r="2.1"/><circle cx="3.2" cy="-2.8" r="1.8"/><circle cx="0" cy="2.2" r="1.9"/></g><ellipse cx="-6.5" cy="6.4" rx="3.3" ry="1.6" fill="#96F2D7" transform="rotate(25 -6.5 6.4)"/><ellipse cx="6.5" cy="6.4" rx="3.3" ry="1.6" fill="#96F2D7" transform="rotate(-25 6.5 6.4)"/><ellipse cx="-7" cy="-6.4" rx="3.1" ry="1.5" fill="#96F2D7" transform="rotate(-25 -7 -6.4)"/><ellipse cx="-12.4" cy="1.6" rx="4" ry="3.3" fill="#96F2D7"/><circle cx="-13.8" cy=".7" r=".8" fill="#063B4C"/><path d="M-14.6 2.8 q1.2 .9 2.4 0" stroke="#063B4C" stroke-width=".45" fill="none" stroke-linecap="round"/></g>`;
 const fish=(x,y,c,sc)=>`<g transform="translate(${x} ${y}) scale(${sc})"><ellipse rx="4" ry="2.4" fill="${c}"/><path d="M3.4 0 6.4-2.4V2.4Z" fill="${c}"/><circle cx="-2" cy="-.6" r=".5" fill="#063B4C"/></g>`;
 const bubbles=[[70,8,1.3],[74,4,.8],[94,38,1.2],[90,33,.8],[78,40,.9]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#0B7285" stroke-width=".35" opacity=".5"/>`).join('');
 const waves=`<path d="M0 108 Q8 104 16 108 T32 108 T48 108 T64 108 T80 108 T96 108 T112 108 V130 H0Z" fill="#22B8CF"/><path d="M0 113 Q10 109 20 113 T40 113 T60 113 T80 113 T100 113 V130 H0Z" fill="#0B7285"/>`;
 return `<div class="sf sfc"><svg class="bgart" viewBox="0 0 100 129.4" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="seaC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C5F6FA"/><stop offset="1" stop-color="#E9FBFD"/></linearGradient></defs><rect width="100" height="130" fill="url(#seaC)"/>${bubbles}${turtle}${fish(88,44,'#FFA94D',.9)}${fish(76,50,'#FF8FA3',.7)}${waves}${fish(90,104,'#FFD43B',.8)}</svg>
 <div class="stack">
  <div>${LOGOIMG}</div>
  <div class="ttl K">Free screening for your little one<em>at ${esc(s.school)}</em></div>
  <div class="lead K">${esc(typesText(s).join(' · '))}. Quick, gentle and play-based, right at school. We share the results with you.</div>
  <div class="lbl K">${one&&s.days[0].location?'At '+esc(s.days[0].location):'Screening days'}</div>
  <div class="bub">${bubs}</div>
  <div class="ring"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="#fff" stroke-width="7"/><g stroke="#FF6B6B" stroke-width="7"><path d="M20 5v6M20 29v6M5 20h6M29 20h6"/></g></svg><div><b class="K">Consent forms due ${esc(dueLine(s))}</b><span class="K">Only children with a signed form can be screened. Return it to your child’s teacher.</span></div></div>
 </div>
 <div class="fband"><div class="foot">${FOOT}</div></div></div>`;
}


const DESIGNS = [['A', 'Sunshine check-up', A], ['B', 'Sticker board', B], ['C', 'Ocean buddies', C]];
function fn(t) { const d = DESIGNS.find(x => x[0] === t) || DESIGNS[0]; return d[2]; }
/* One flyer = one day. spec: { school, types[], consentDue, consentDueTime, day:{date,start,end,location} } */
function norm(spec) { return Object.assign({ school: 'Your school', types: ['Hearing', 'Vision'], consentDue: '', consentDueTime: '12:00' }, spec, { days: [spec.day || (spec.days || [])[0] || { date: new Date().toISOString().slice(0, 10), start: '08:30', end: '11:30', location: '' }] }); }
function html(spec, tpl) { return fn(tpl)(norm(spec)); }
function fit(root) {
  const st = root.querySelector('.stack'); if (!st) return; let k = 1;
  root.style.setProperty('--k', k);
  while (k > 0.55 && st.scrollHeight > st.clientHeight + 1) { k -= 0.03; root.style.setProperty('--k', k.toFixed(2)); }
}
/* Inline preview: put flyers into a page element (the builder's design picker). */
let cssAdded = false;
function ensureCss(doc) {
  doc = doc || document;
  if (doc.getElementById('sfCss')) return;
  const l = doc.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS; doc.head.appendChild(l);
  const st = doc.createElement('style'); st.id = 'sfCss'; st.textContent = CSS; doc.head.appendChild(st);
}
function mount(el, spec, tpl) { ensureCss(); el.innerHTML = html(spec, tpl); const r = el.querySelector('.sf'); fit(r); if (document.fonts) document.fonts.ready.then(() => fit(r)); return r; }

/* ---- Rendering to an image, the same way the Virtual Event Builder does it ---- */
let renderer = null, fontCss = null;
function getRenderer() {
  if (renderer) return renderer;
  renderer = new Promise((resolve, reject) => {
    const f = document.createElement('iframe');
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;left:-30000px;top:0;width:' + (W + 40) + 'px;height:' + (H + 40) + 'px;border:0;';
    f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><base href="' + document.baseURI + '"><link rel="stylesheet" href="' + FONTS + '"><style>html,body{margin:0;background:#fff}' + CSS + '</style>'
      + '<script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js"><\/script></head><body><div id="r" style="width:' + W + 'px"></div></body></html>';
    f.onload = () => { const w = f.contentWindow; let n = 0; (function wait() { if (w.htmlToImage) return resolve(f); if (++n > 100) { renderer = null; return reject(new Error('The flyer image tool did not load.')); } setTimeout(wait, 100); })(); };
    document.body.appendChild(f);
  });
  return renderer;
}
// html-to-image cannot read the Google Fonts stylesheet across origins: inline the latin font files.
function getFontCss() {
  if (fontCss) return fontCss;
  fontCss = fetch(FONTS).then(r => r.text()).then(css => {
    const blocks = css.split(/(?=\/\* [a-z-]+ \*\/)/).filter(b => /^\/\* latin \*\//.test(b));
    return Promise.all(blocks.map(b => { const m = b.match(/url\((https:[^)]+)\)/); if (!m) return b;
      return fetch(m[1]).then(r => r.blob()).then(bl => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(b.replace(m[1], fr.result)); fr.readAsDataURL(bl); })); }))
      .then(p => p.join('\n'));
  }).catch(e => { fontCss = null; throw e; });
  return fontCss;
}
async function render(spec, tpl) {
  const f = await getRenderer(), doc = f.contentDocument, w = f.contentWindow, box = doc.getElementById('r');
  box.innerHTML = html(spec, tpl);
  await doc.fonts.ready;
  await Promise.all([].map.call(box.querySelectorAll('img'), im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; })));
  const node = box.firstElementChild; fit(node);
  await new Promise(r => setTimeout(r, 120));
  return w.htmlToImage.toJpeg(node, { quality: 0.9, pixelRatio: 1, width: W, height: H, cacheBust: true, backgroundColor: '#ffffff', fontEmbedCSS: await getFontCss() });
}
/* A letter-size PDF around the JPEG (jsPDF is already on the DAN page). Returns base64 (no prefix). */
function pdf(jpegDataUrl) {
  const J = window.jspdf && window.jspdf.jsPDF; if (!J) throw new Error('The PDF tool is not loaded.');
  const d = new J({ orientation: 'p', unit: 'in', format: 'letter' });
  d.addImage(jpegDataUrl, 'JPEG', 0, 0, 8.5, 11);
  return d.output('datauristring').split(',')[1];
}
/* The design staff picked (Virtual Event Builder > Screenings). */
async function getDefault() {
  try { const s = await firebase.firestore().collection('settings').doc('screeningFlyer').get(); const t = (s.data() || {}).template; return DESIGNS.some(d => d[0] === t) ? t : 'A'; } catch (e) { return 'A'; }
}
async function setDefault(t) {
  if (!DESIGNS.some(d => d[0] === t)) throw new Error('Unknown design');
  const me = window.currentUserData || {};
  await firebase.firestore().collection('settings').doc('screeningFlyer').set({ template: t, updatedBy: me.displayName || '', updatedByUid: me.uid || '', updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
}
/* From a screening request (providers doc): one spec per confirmed day. */
function specsFor(p) {
  const ws = p.worksheet || {};
  const days = (Array.isArray(ws.confirmedDays) && ws.confirmedDays.length ? ws.confirmedDays : (ws.confirmed && ws.confirmed.date ? [ws.confirmed] : [])).filter(d => d && d.date);
  let due = ws.consentDue;
  if (!due && days.length) { const x = new Date(days[0].date + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() - 7); due = x.toISOString().slice(0, 10); }
  const types = (ws.screenings && ws.screenings.length ? ws.screenings : (p.screenings || [])).slice();
  return days.map(d => ({ school: p.organizationName || 'your school', types: types.length ? types : ['Hearing', 'Vision'], consentDue: due || '', consentDueTime: ws.consentDueTime || '12:00',
    day: { date: d.date, start: d.start || '', end: d.end || '', location: d.location || '' } }));
}
function fileName(spec) {
  const d = new Date(spec.day.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, '');
  return ('Screening flyer - ' + spec.school + (spec.day.location && spec.day.location !== spec.school ? ' - ' + spec.day.location : '') + ' - ' + d).replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) + '.pdf';
}

/* ---- Virtual Event Builder > Series: Screenings ----
   Not an event: this picks the design every screening flyer uses, and shows / downloads
   the flyers for any school with a confirmed screening day. onSeries(name) switches the
   builder back to an event series. */
const SAMPLE = { school: 'Sunny Days Preschool', types: ['Hearing', 'Vision', 'Developmental', 'Social Emotional'], consentDue: '', consentDueTime: '12:00', day: { date: '', start: '08:30', end: '11:30', location: '' } };
(function () { const t = new Date(); t.setDate(t.getDate() + 14); while (t.getDay() === 0 || t.getDay() === 6) t.setDate(t.getDate() + 1);
  SAMPLE.day.date = t.toISOString().slice(0, 10); const u = new Date(t); u.setDate(u.getDate() - 7); SAMPLE.consentDue = u.toISOString().slice(0, 10); })();
let P = { tpl: 'A', saved: 'A', schools: [], pick: '' };
function e2(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
async function loadSchools() {
  try {
    const snap = await firebase.firestore().collection('providers').where('requestType', '==', 'screening').get(); const out = [];
    snap.forEach(d => { const p = Object.assign({ id: d.id }, d.data() || {}); if (p.archived === true) return; const sp = specsFor(p); if (sp.length) out.push({ id: p.id, name: p.organizationName || '(no name)', specs: sp, first: sp[0].day.date }); });
    out.sort((a, b) => b.first.localeCompare(a.first)); return out;
  } catch (e) { console.warn('[screening flyer] schools', e); return []; }
}
function curSpecs() { const s = P.schools.find(x => x.id === P.pick); return s ? s.specs : [SAMPLE]; }
function drawPanel(body, onSeries) {
  ensureCss();
  const opts = '<option value="">Sample school</option>' + P.schools.map(s => '<option value="' + e2(s.id) + '"' + (s.id === P.pick ? ' selected' : '') + '>' + e2(s.name) + ' (' + s.specs.length + ' day' + (s.specs.length > 1 ? 's' : '') + ', first ' + e2(s.first) + ')</option>').join('');
  const specs = curSpecs();
  body.innerHTML = '<div style="max-width:1200px">'
    + '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px">'
    + '<label style="font-weight:700;font-size:.85rem;display:flex;flex-direction:column;gap:3px">Series *<select id="sfSeries" style="padding:7px 9px;border:1px solid #CBD5E1;border-radius:8px;font-size:.9rem"><option>Learning Labs</option><option>Parent Talk Café</option><option>Random</option><option selected>Screenings</option></select></label>'
    + '<label style="font-weight:700;font-size:.85rem;display:flex;flex-direction:column;gap:3px;flex:1;min-width:240px">Show it for<select id="sfSchool" style="padding:7px 9px;border:1px solid #CBD5E1;border-radius:8px;font-size:.9rem">' + opts + '</select></label></div>'
    + '<div style="background:#F0FDFA;border:1px solid #99F6E4;border-radius:10px;padding:10px 14px;font-size:.88rem;color:#134E4A;margin-bottom:14px;line-height:1.5">'
    + '<b>Screening flyers</b> go to families with the consent forms. When the confirmation email is sent from a screening worksheet, DAN makes <b>one flyer for each confirmed day</b>, filled in with the school, that day’s date, time and location, the screenings and the consent due date. Pick the design they use below.</div>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:18px">'
    + DESIGNS.map(d => '<div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px"><b>' + d[0] + '. ' + e2(d[1]) + '</b>'
      + (d[0] === P.saved ? '<span style="background:#DCFCE7;color:#15803D;font-weight:700;font-size:.75rem;border-radius:999px;padding:2px 10px">In use</span>'
        : '<button type="button" class="btn btn-primary sf-use" data-t="' + d[0] + '" style="font-size:.78rem;padding:4px 12px">Use this design</button>') + '</div>'
      + '<div class="sf-prev" data-t="' + d[0] + '" style="box-shadow:0 8px 22px rgba(15,23,42,.16);border-radius:4px;overflow:hidden;outline:' + (d[0] === P.saved ? '3px solid #16A34A' : '0') + '"></div></div>').join('')
    + '</div>'
    + '<div style="margin-top:16px;font-weight:700">Flyers for ' + e2(P.pick ? (P.schools.find(x => x.id === P.pick) || {}).name : 'the sample school') + '</div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">' + specs.map((sp, i) => '<button type="button" class="btn btn-ghost sf-dl" data-i="' + i + '" style="font-size:.8rem">Download ' + e2(new Date(sp.day.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })) + (sp.day.location ? ' · ' + e2(sp.day.location) : '') + ' (PDF)</button>').join('') + '</div>'
    + '<div id="sfMsg" style="font-size:.82rem;color:#64748B;margin-top:6px">' + (specs.length > 1 ? 'The previews show the first day; each day gets its own flyer.' : '') + '</div></div>';
  body.querySelectorAll('.sf-prev').forEach(el => mount(el, specs[0], el.dataset.t));
  body.querySelector('#sfSeries').onchange = function () { if (this.value !== 'Screenings') onSeries(this.value); };
  body.querySelector('#sfSchool').onchange = function () { P.pick = this.value; drawPanel(body, onSeries); };
  body.querySelectorAll('.sf-use').forEach(b => b.onclick = async () => {
    b.disabled = true;
    try { await setDefault(b.dataset.t); P.saved = b.dataset.t; if (window.auditLog) window.auditLog('Screening flyer design changed', b.dataset.t); if (window._showToast) window._showToast('Screening flyers now use design ' + b.dataset.t + '.', '#15803D'); drawPanel(body, onSeries); }
    catch (e) { b.disabled = false; if (window._showToast) window._showToast('Could not save: ' + e.message, '#DC2626'); }
  });
  body.querySelectorAll('.sf-dl').forEach(b => b.onclick = async () => {
    const sp = specs[+b.dataset.i], m = body.querySelector('#sfMsg'); b.disabled = true; m.textContent = 'Making the PDF…';
    try { const b64 = pdf(await render(sp, P.saved)); const a = document.createElement('a'); a.href = 'data:application/pdf;base64,' + b64; a.download = fileName(sp); document.body.appendChild(a); a.click(); a.remove(); m.textContent = 'Downloaded ' + fileName(sp) + ' (design ' + P.saved + ').'; }
    catch (e) { m.textContent = 'Could not make it: ' + e.message; } b.disabled = false;
  });
}
async function openPanel(body, onSeries) {
  body.innerHTML = '<div style="padding:20px;color:#64748B">Loading screening flyers…</div>';
  const r = await Promise.all([getDefault(), loadSchools()]); P.saved = r[0]; P.schools = r[1];
  if (P.pick && !P.schools.some(s => s.id === P.pick)) P.pick = '';
  drawPanel(body, onSeries);
}
window.ScreeningFlyer = { DESIGNS: DESIGNS.map(d => [d[0], d[1]]), html, mount, ensureCss, fit, render, pdf, getDefault, setDefault, specsFor, fileName, openPanel };
})();

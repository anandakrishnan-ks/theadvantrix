{
const $ = s => document.querySelector(s);
/* countdown to a fixed launch time: 18 Dec 2026, 1:30 pm IST */
const LAUNCH = new Date('2026-12-18T13:30:00+05:30').getTime();
const p = n => String(n).padStart(2,'0');
const tick = () => { let t = Math.max(0, LAUNCH - Date.now()); const D = Math.floor(t/864e5); t -= D*864e5; const H = Math.floor(t/36e5); t -= H*36e5; const M = Math.floor(t/6e4); t -= M*6e4;
  $('#d').textContent = p(D); $('#h').textContent = p(H); $('#m').textContent = p(M); $('#s').textContent = p(Math.floor(t/1e3));
  if (LAUNCH <= Date.now()) $('.tag').textContent = 'We are live'; };
tick(); setInterval(tick, 1000);
$('#f').addEventListener('submit', e => { e.preventDefault(); const v = $('#em').value.trim(), m = $('#msg');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { m.style.color = '#ffb3bf'; m.textContent = 'Please enter a valid email.'; return; }
  m.style.color = '#bff5d6'; m.textContent = "Thanks! We'll let you know when we launch."; $('#em').value = ''; });
const dlg = $('#film'), fv = $('#fv');
$('#play').addEventListener('click', () => { try { dlg.showModal(); fv.currentTime = 0; fv.play().catch(()=>{}); } catch(_) {} });
const close = () => { try { fv.pause(); dlg.close(); } catch(_) {} };
$('#x').addEventListener('click', close); dlg.addEventListener('click', e => { if (e.target === dlg) close(); }); dlg.addEventListener('close', () => fv.pause());
/* digital-marketing cursor: icon changes on every click */
const I = ['<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>','<path d="M3 10.5v3a1 1 0 0 0 1 1h2.5L12 19V5L6.5 9.5H4a1 1 0 0 0-1 1z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>','<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>','<path d="M5 9h14M5 15h14M10.5 4 8.5 20M15.5 4l-2 16"/>','<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>','<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"/>','<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9v6l5-3z" fill="currentColor"/>','<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/>','<path d="M12 2.5c3.8 2 5.8 5.8 5.8 9.8L15 15H9l-2.8-2.7c0-4 2-7.8 5.8-9.8z"/><circle cx="12" cy="9" r="1.8"/>','<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>','<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/>','<path d="M8.5 6 2.5 12l6 6M15.5 6l6 6-6 6"/>'];
const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;
if (matchMedia('(pointer:fine)').matches) {
  document.documentElement.classList.add('has-cur');
  const cur = $('#cur'), ci = $('#ci'), calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let k = 0, x = innerWidth/2, y = innerHeight/2, tx = x, ty = y; ci.innerHTML = svg(k);
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur.classList.toggle('hot', !!(e.target.closest && e.target.closest('a,button,input'))); }, {passive:true});
  const loop = () => { x += (tx-x)*.32; y += (ty-y)*.32; cur.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); }; loop();
  addEventListener('pointerdown', e => { cur.classList.add('down'); k = (k+1) % I.length; ci.innerHTML = svg(k); if (calm) return;
    for (let i = 0; i < 7; i++) { const s = document.createElement('span'); s.className = 'spark'; s.innerHTML = svg((k+i) % I.length); s.style.left = e.clientX-9+'px'; s.style.top = e.clientY-9+'px'; document.body.appendChild(s);
      const a = i/7*Math.PI*2 + Math.random()*.5, d = 50 + Math.random()*40;
      s.animate([{transform:'translate(0,0) scale(.4)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(1)`,opacity:0}],{duration:700,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish = () => s.remove(); } });
  addEventListener('pointerup', () => cur.classList.remove('down'));
}
}

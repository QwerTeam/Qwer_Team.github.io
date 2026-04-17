// ── Cursor ──────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (dot && ring) {
  let rx = window.innerWidth/2, ry = window.innerHeight/2;
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
  });
  setInterval(() => {
    const dx = parseFloat(dot.style.left || rx) - rx;
    const dy = parseFloat(dot.style.top  || ry) - ry;
    rx += dx * 0.14; ry += dy * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  }, 16);
  document.querySelectorAll('a, button, .service-card, .team-card, .project-card, .contact-link, .footer-sleeping-outer').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ── Nav scroll ──────────────────────────
const nav = document.querySelector('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// ── Particles ───────────────────────────
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize(); window.addEventListener('resize', resize);

  const N = 55;
  const pts = Array.from({length: N}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r: Math.random() * 1.4 + 0.4,
    a: Math.random() * 0.5 + 0.12,
  }));

  (function tick() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,215,0,${p.a})`; ctx.fill();
    });
    for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(255,215,0,${0.07*(1-d/110)})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  })();
}

// ── Scroll reveal ───────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .timeline-item').forEach(el => obs.observe(el));

// ── Sleeping footer audio ────────────────
document.addEventListener('DOMContentLoaded', () => {
  const wrap  = document.getElementById('sleepingWrap');
  const audio = document.getElementById('snoreAudio');
  if (wrap && audio) {
    wrap.addEventListener('mouseenter', () => { audio.currentTime = 0; audio.play().catch(()=>{}); });
    wrap.addEventListener('mouseleave', () => { audio.pause(); audio.currentTime = 0; });
  }
});

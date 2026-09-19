(() => {
  const canvas = document.querySelector("[data-world-field]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const points = Array.from({ length: 122 }, (_, i) => {
    const z = 1 - (2 * i + 1) / 122;
    const r = Math.sqrt(1 - z * z);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(phi) * r, y: z, z: Math.sin(phi) * r, p: phi };
  });
  let size = 0, t = 0, mx = 0, my = 0;
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = box.width * dpr; canvas.height = box.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); size = Math.min(box.width, box.height) * .41;
  };
  const rotate = (p, a, b) => {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const x = p.x * ca - p.z * sa, z = p.x * sa + p.z * ca;
    return { x, y: p.y * cb - z * sb, z: p.y * sb + z * cb };
  };
  const draw = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight, cx = w * .60 + mx * 12, cy = h * .50 + my * 10;
    ctx.clearRect(0, 0, w, h);
    const projected = points.map((p, i) => {
      const q = rotate(p, t * .25, -.22 + my * .08);
      const k = 1.1 / (2.3 - q.z);
      return { i, x: cx + q.x * size * k, y: cy + q.y * size * k, z: q.z, k };
    });
    ctx.beginPath(); ctx.arc(cx, cy, size * .63, 0, Math.PI * 2); ctx.strokeStyle = "rgba(255,255,255,.13)"; ctx.lineWidth = 1; ctx.stroke();
    for (let i = 0; i < projected.length; i++) for (let j = i + 1; j < projected.length; j++) {
      const a = projected[i], b = projected[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
      if (d < 72 && a.z > -.25 && b.z > -.25) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = "rgba(255,255,255," + ((1 - d / 72) * .25) + ")"; ctx.lineWidth = .65; ctx.stroke(); }
    }
    projected.sort((a,b)=>a.z-b.z).forEach(p => { const r = Math.max(1, 2.5 * p.k); ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fillStyle = "rgba(255,255,255," + (.24 + .66 * Math.max(0,p.z)) + ")"; ctx.fill(); });
    t += .012; requestAnimationFrame(draw);
  };
  addEventListener("resize", resize); addEventListener("pointermove", e => { mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5); });
  resize(); draw();
})();
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Lens: follows the pointer, drifts on a Lissajous path when idle.
function setupLens() {
  const host = document.querySelector<HTMLElement>("[data-lens-host]");
  const lens = document.querySelector<HTMLElement>("[data-lens]");
  const ring = document.querySelector<HTMLElement>("[data-lens-ring]");
  if (!host || !lens) return;

  let tx: number | null = null;
  let ty: number | null = null;
  let x = host.clientWidth * 0.5;
  let y = host.clientHeight * 0.4;
  let raf = 0;
  let running = false;
  const t0 = performance.now();

  host.addEventListener("pointermove", e => {
    const r = host.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
  });
  host.addEventListener("pointerleave", () => {
    tx = ty = null;
  });

  const step = (now: number) => {
    let gx = tx;
    let gy = ty;
    if (gx === null || gy === null) {
      const t = reduce ? 0 : (now - t0) / 1000;
      gx = host.clientWidth * (0.62 + 0.22 * Math.sin(t * 0.45));
      gy = host.clientHeight * (0.45 + 0.25 * Math.sin(t * 0.7));
    }
    x += (gx - x) * 0.12;
    y += (gy - y) * 0.12;
    lens.style.setProperty("--mx", `${x + 20}px`);
    lens.style.setProperty("--my", `${y + 20}px`);
    if (ring) ring.style.transform = `translate(${x}px,${y}px)`;
    raf = requestAnimationFrame(step);
  };

  // Only animate while the hero is on screen.
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      raf = requestAnimationFrame(step);
    } else if (!entry.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }).observe(host);
}

// Typer: types, holds, deletes, moves to the next word.
function setupTyper() {
  const el = document.querySelector<HTMLElement>("[data-typer]");
  if (!el || reduce) return;
  const words: string[] = JSON.parse(el.dataset.words ?? "[]");
  if (!words.length) return;

  let wi = 0;
  let i = 0;
  let deleting = false;
  el.textContent = "";

  const tick = () => {
    const w = words[wi];
    if (!deleting) {
      el.textContent = w.slice(0, ++i);
      if (i === w.length) {
        deleting = true;
        return setTimeout(tick, 1800);
      }
      return setTimeout(tick, 70);
    }
    el.textContent = w.slice(0, --i);
    if (i === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      return setTimeout(tick, 300);
    }
    setTimeout(tick, 32);
  };
  tick();
}

// Background code: copy the <template> into both lens layers.
function setupCode() {
  const tpl = document.querySelector<HTMLTemplateElement>("[data-hero-code]");
  if (!tpl) return;
  document
    .querySelectorAll("[data-code-layer]")
    .forEach(layer => layer.replaceChildren(tpl.content.cloneNode(true)));
}

setupCode();
setupLens();
setupTyper();
export {};

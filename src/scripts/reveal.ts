// Scroll reveal, count-up and bar animations for [data-reveal] elements.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  const t0 = performance.now();
  const dur = 1800;
  const frame = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (reduce || !("IntersectionObserver" in window)) {
  els.forEach(el => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        io.unobserve(el);
      }
    },
    { threshold: 0.12 },
  );
  els.forEach(el => io.observe(el));
}
export {};

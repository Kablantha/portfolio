
// Respect reduced motion preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

/* =========================
   MONITOR FLICKER (2x)
   ========================= */

if (!prefersReducedMotion) {
  const monitorObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const monitor = entry.target;
      monitor.style.transition = 'filter 0.08s ease-in-out';

      // Flicker sequence (2 flickers)
      setTimeout(() => {
        monitor.style.filter = 'brightness(1.2)';
      }, 100);

      setTimeout(() => {
        monitor.style.filter = 'brightness(0.85)';
      }, 220);

      setTimeout(() => {
        monitor.style.filter = 'brightness(1.15)';
      }, 340);

      setTimeout(() => {
        monitor.style.filter = 'brightness(1)';
      }, 480);

      // Only run once
      observer.unobserve(monitor);
    });
  }, {
    threshold: 0.4
  });

  document.querySelectorAll('.monitor').forEach((monitor) => {
    monitorObserver.observe(monitor);
  });
}




/* =========================
   METADATA TYPE-ON
   ========================= */

if (!prefersReducedMotion) {
  const metaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const line = entry.target;
      const text = line.dataset.text;
      let i = 0;

      line.textContent = '';
      line.style.whiteSpace = 'nowrap';

      const typeInterval = setInterval(() => {
        line.textContent += text.charAt(i);
        i++;

        if (i >= text.length) {
          clearInterval(typeInterval);
        }
      }, 20); // fast, subtle

      observer.unobserve(line);
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll('.meta-line').forEach((line) => {
    // Store text safely
    line.dataset.text = line.textContent;
    metaObserver.observe(line);
  });
}

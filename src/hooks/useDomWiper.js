export function triggerSystemWipe(onFinished) {
  const elements = Array.from(
    document.querySelectorAll(
      'h1, h2, h3, p, a, button, span, img, svg, nav, section, .project-card, .github-heatmap svg rect, .topbar, .sidebar, .grain-overlay'
    )
  );

  // Fisher-Yates shuffle for random deletion order
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }

  const delayPerElement = 20;

  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('wiped');
    }, index * delayPerElement);
  });

  const totalWipeTime = elements.length * delayPerElement + 2000;
  setTimeout(() => {
    if (onFinished) onFinished();
  }, totalWipeTime);
}

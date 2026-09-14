
document.addEventListener('DOMContentLoaded', () => {
  const footerTarget = document.querySelector('[data-footer]');
  if (!footerTarget) return;

  const footerType = footerTarget.dataset.footer;

  const footerFiles = {
    simple: 'footer-simple.html',
    main: 'footer-main.html',
    logo: 'footer-logo.html'
  };

  const footerFile = footerFiles[footerType];
  if (!footerFile) return;

  fetch(footerFile)
    .then(response => {
      if (!response.ok) throw new Error(`Footer 載入失敗：${response.status}`);
      return response.text();
    })
    .then(html => {
      footerTarget.innerHTML = html;
    })
    .catch(console.error);
});
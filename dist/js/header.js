
document.addEventListener('DOMContentLoaded', () => {

  const headerTarget = document.querySelector('[data-header]');

  if (!headerTarget) {
    initMobileMenu();
    return;
  }

  const headerType = headerTarget.dataset.header;

  const headerFiles = {
    main: 'header-main.html',
    sub: 'header-sub.html'
  };

  const headerFile = headerFiles[headerType];

  if (!headerFile) {
    console.error(`不存在的 Header 類型：${headerType}`);
    return;
  }


  // =====================================================
  // Load Header
  // =====================================================

  fetch(headerFile)
    .then(response => {

      if (!response.ok) {
        throw new Error(
          `Header 載入失敗：${response.status}`
        );
      }

      return response.text();

    })
    .then(html => {

      headerTarget.innerHTML = html;

      initMobileMenu();

    })
    .catch(error => {

      console.error(error);

    });


});


// =========================================================
// Mobile Menu
// =========================================================

function initMobileMenu() {

  const menu = document.querySelector('.js-mobile-menu');
  const overlay = document.querySelector('.js-mobile-menu-overlay');

  const openButtons = document.querySelectorAll(
    '.js-mobile-menu-open'
  );

  const closeButton = document.querySelector(
    '.js-mobile-menu-close'
  );


  if (!menu || !overlay) {
    return;
  }


  // Open
  function openMenu() {

    menu.classList.add('is-open');
    overlay.classList.add('is-open');

    document.body.classList.add('mobile-menu-open');

  }


  // Close
  function closeMenu() {

    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');

    document.body.classList.remove('mobile-menu-open');

  }


  openButtons.forEach(button => {

    button.addEventListener('click', event => {

      // 桌機 icon 不開 Drawer
      if (
        !window.matchMedia('(max-width: 767.98px)').matches
      ) {
        return;
      }

      event.preventDefault();

      openMenu();

    });

  });


  if (closeButton) {

    closeButton.addEventListener(
      'click',
      closeMenu
    );

  }


  overlay.addEventListener(
    'click',
    closeMenu
  );


  // ESC 關閉
  document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
      closeMenu();
    }

  });


  // 如果手機打開 menu 後把瀏覽器拉回桌機，
  // 自動清除狀態
  window.addEventListener('resize', () => {

    if (
      window.matchMedia('(min-width: 768px)').matches
    ) {
      closeMenu();
    }

  });

}
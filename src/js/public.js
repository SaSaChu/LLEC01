
// 產品列表頁面 開始
document.addEventListener('DOMContentLoaded', () => {

  const initProductCardActions = () => {
    const buttons = document.querySelectorAll('.product-card__actions button');

    buttons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        button.classList.toggle('is-active');
      });
    });
  };

  const initFilterCategory = root => {
    if (!root) return;

    const toggles = root.querySelectorAll('.filter-category__toggle');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const item = toggle.parentElement;
        const icon = toggle.querySelector('i');

        if (!item) return;

        item.classList.toggle('is-open');

        if (icon) {
          icon.classList.toggle('bi-chevron-right', !item.classList.contains('is-open'));
          icon.classList.toggle('bi-chevron-down', item.classList.contains('is-open'));
        }
      });
    });
  };

  const initPriceRange = root => {
    if (!root) return;

    const ranges = root.querySelectorAll('[data-price-range]');

    ranges.forEach(range => {
      const minInput = range.querySelector('[data-range-min]');
      const maxInput = range.querySelector('[data-range-max]');
      const minText = range.querySelector('[data-range-min-text]');
      const maxText = range.querySelector('[data-range-max-text]');
      const rangeFill = range.querySelector('[data-range-fill]');

      if (!minInput || !maxInput || !rangeFill) return;

      const minimumGap = 1;

      const updateRange = changedInput => {
        let minValue = parseInt(minInput.value, 10);
        let maxValue = parseInt(maxInput.value, 10);

        if (maxValue - minValue < minimumGap) {
          if (changedInput === minInput) {
            minValue = maxValue - minimumGap;
            minInput.value = minValue;
          } else {
            maxValue = minValue + minimumGap;
            maxInput.value = maxValue;
          }
        }

        const min = parseInt(minInput.min, 10);
        const max = parseInt(minInput.max, 10);
        const minPercent = ((minValue - min) / (max - min)) * 100;
        const maxPercent = ((maxValue - min) / (max - min)) * 100;

        rangeFill.style.left = `${minPercent}%`;
        rangeFill.style.right = `${100 - maxPercent}%`;

        if (minText) minText.textContent = minValue;
        if (maxText) maxText.textContent = maxValue;
      };

      minInput.addEventListener('input', () => updateRange(minInput));
      maxInput.addEventListener('input', () => updateRange(maxInput));

      updateRange();
    });
  };

  const initDesktopFilter = () => {
    const desktopFilter = document.querySelector('.product-filter--desktop');

    if (!desktopFilter) return;

    initFilterCategory(desktopFilter);
    initPriceRange(desktopFilter);
  };

  const initMobileFilter = () => {
    const desktopFilter = document.querySelector('.product-filter--desktop');
    const mobileFilter = document.querySelector('[data-mobile-filter]');
    const mobileContent = document.querySelector('[data-mobile-filter-content]');
    const openButton = document.querySelector('[data-mobile-filter-open]');
    const closeButtons = document.querySelectorAll('[data-mobile-filter-close]');

    if (!desktopFilter || !mobileFilter || !mobileContent || !openButton) return;

    const filterClone = desktopFilter.cloneNode(true);

    filterClone.classList.remove('product-filter--desktop');
    filterClone.classList.add('product-filter--mobile');

    mobileContent.innerHTML = '';
    mobileContent.appendChild(filterClone);

    initFilterCategory(filterClone);
    initPriceRange(filterClone);

    const open = () => {
      mobileFilter.classList.add('is-open');
      document.body.classList.add('is-filter-open');
    };

    const close = () => {
      mobileFilter.classList.remove('is-open');
      document.body.classList.remove('is-filter-open');
    };

    openButton.addEventListener('click', open);

    closeButtons.forEach(button => {
      button.addEventListener('click', close);
    });

    const clearButton = mobileFilter.querySelector('[data-filter-clear]');

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        const checkboxes = filterClone.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });

        const ranges = filterClone.querySelectorAll('[data-price-range]');

        ranges.forEach(range => {
          const minInput = range.querySelector('[data-range-min]');
          const maxInput = range.querySelector('[data-range-max]');

          if (minInput) {
            minInput.value = minInput.min;
            minInput.dispatchEvent(new Event('input', { bubbles: true }));
          }

          if (maxInput) {
            maxInput.value = maxInput.max;
            maxInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      });
    }
  };

  const initMobileCategory = () => {
    const desktopCategory = document.querySelector('.product-filter__box--category');
    const mobileCategory = document.querySelector('[data-mobile-category]');
    const mobileContent = document.querySelector('[data-mobile-category-content]');
    const openButton = document.querySelector('[data-mobile-category-open]');
    const closeButtons = document.querySelectorAll('[data-mobile-category-close]');

    if (!desktopCategory || !mobileCategory || !mobileContent || !openButton) return;

    const categoryClone = desktopCategory.cloneNode(true);

    mobileContent.innerHTML = '';
    mobileContent.appendChild(categoryClone);

    initFilterCategory(categoryClone);

    const open = () => {
      mobileCategory.classList.add('is-open');
      document.body.classList.add('is-category-open');
    };

    const close = () => {
      mobileCategory.classList.remove('is-open');
      document.body.classList.remove('is-category-open');
    };

    openButton.addEventListener('click', open);

    closeButtons.forEach(button => {
      button.addEventListener('click', close);
    });
  };

  const initEscapeClose = () => {
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;

      const mobileFilter = document.querySelector('[data-mobile-filter]');
      const mobileCategory = document.querySelector('[data-mobile-category]');

      if (mobileFilter) {
        mobileFilter.classList.remove('is-open');
      }

      if (mobileCategory) {
        mobileCategory.classList.remove('is-open');
      }

      document.body.classList.remove('is-filter-open');
      document.body.classList.remove('is-category-open');
    });
  };

  initProductCardActions();
  initDesktopFilter();
  initMobileFilter();
  initMobileCategory();
  initEscapeClose();

});
// 產品列表頁面 結束



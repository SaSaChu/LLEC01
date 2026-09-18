
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



// 產品列詳細頁 開始
const initProductGallery = () => {
  const galleries = document.querySelectorAll('[data-product-gallery]');

  galleries.forEach(gallery => {
    const mainImage = gallery.querySelector('[data-gallery-main]');
    const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const prevButton = gallery.querySelector('[data-gallery-prev]');
    const nextButton = gallery.querySelector('[data-gallery-next]');

    if (!mainImage || !thumbs.length) return;

    let currentIndex = thumbs.findIndex(thumb => thumb.classList.contains('is-active'));

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const changeImage = index => {
      if (index < 0) {
        index = thumbs.length - 1;
      }

      if (index >= thumbs.length) {
        index = 0;
      }

      currentIndex = index;

      const currentThumb = thumbs[currentIndex];
      const image = currentThumb.dataset.image;

      if (!image) return;

      mainImage.src = image;

      thumbs.forEach(thumb => {
        thumb.classList.remove('is-active');
      });

      currentThumb.classList.add('is-active');

      currentThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        changeImage(index);
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        changeImage(currentIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        changeImage(currentIndex + 1);
      });
    }
  });
};

const initProductOptions = () => {
  const optionGroups = document.querySelectorAll('[data-option-group]');

  optionGroups.forEach(group => {
    const buttons = group.querySelectorAll('.product-options__choice:not(:disabled)');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(item => {
          item.classList.remove('is-active');
        });

        button.classList.add('is-active');
      });
    });
  });
};

const initProductQuantity = () => {
  const quantities = document.querySelectorAll('[data-product-quantity]');

  quantities.forEach(quantity => {
    const minusButton = quantity.querySelector('[data-quantity-minus]');
    const plusButton = quantity.querySelector('[data-quantity-plus]');
    const input = quantity.querySelector('[data-quantity-input]');

    if (!minusButton || !plusButton || !input) return;

    const getMin = () => {
      return parseInt(input.min, 10) || 1;
    };

    const getMax = () => {
      return parseInt(input.max, 10) || 99;
    };

    const normalizeValue = value => {
      const min = getMin();
      const max = getMax();

      if (Number.isNaN(value)) {
        return min;
      }

      return Math.min(Math.max(value, min), max);
    };

    const updateValue = value => {
      input.value = normalizeValue(value);
    };

    minusButton.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || getMin();
      updateValue(currentValue - 1);
    });

    plusButton.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || getMin();
      updateValue(currentValue + 1);
    });

    input.addEventListener('change', () => {
      updateValue(parseInt(input.value, 10));
    });

    input.addEventListener('blur', () => {
      updateValue(parseInt(input.value, 10));
    });
  });
};

const initProductFavorite = () => {
  const favoriteButtons = document.querySelectorAll('[data-product-favorite]');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');

      button.classList.toggle('is-active');

      if (!icon) return;

      if (button.classList.contains('is-active')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        button.setAttribute('aria-label', '取消收藏');
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        button.setAttribute('aria-label', '加入收藏');
      }
    });
  });
};

initProductGallery();
initProductOptions();
initProductQuantity();
initProductFavorite();

const initProductDetailTabs = () => {
  const tabGroups = document.querySelectorAll('[data-product-tabs]');

  tabGroups.forEach(group => {
    const tabs = Array.from(group.querySelectorAll('[data-product-tab]'));
    const panels = Array.from(group.querySelectorAll('[data-product-panel]'));

    if (!tabs.length || !panels.length) return;

    const changeTab = tabName => {
      tabs.forEach(tab => {
        const isActive = tab.dataset.productTab === tabName;

        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(panel => {
        const isActive = panel.dataset.productPanel === tabName;

        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        changeTab(tab.dataset.productTab);
      });
    });
  });
};

initProductDetailTabs();
// 產品列詳細頁 結束

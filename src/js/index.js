document.addEventListener('DOMContentLoaded', function () {

	// 01 熱門商品分類
	const categoryTrack = document.querySelector('.js-category-track');
	const categoryPrev = document.querySelector('.js-category-prev');
	const categoryNext = document.querySelector('.js-category-next');

	if (categoryTrack && categoryPrev && categoryNext) {
		const categoryItems = Array.from(categoryTrack.querySelectorAll('.home-category__item'));
		let currentPage = 0;

		function getCategoryPerPage() {
			if (window.innerWidth < 768) return 4;
			if (window.innerWidth < 992) return 8;
			return 12;
		}

		function renderCategoryPage() {
			const perPage = getCategoryPerPage();
			const totalPages = Math.ceil(categoryItems.length / perPage);

			if (currentPage >= totalPages) {
				currentPage = Math.max(totalPages - 1, 0);
			}

			const start = currentPage * perPage;
			const end = start + perPage;

			categoryItems.forEach(function (item, index) {
				item.classList.toggle('is-page-visible', index >= start && index < end);
			});

			categoryPrev.disabled = currentPage === 0;
			categoryNext.disabled = currentPage >= totalPages - 1;
		}

		categoryPrev.addEventListener('click', function () {
			if (currentPage <= 0) return;

			currentPage--;
			renderCategoryPage();
		});

		categoryNext.addEventListener('click', function () {
			const totalPages = Math.ceil(categoryItems.length / getCategoryPerPage());

			if (currentPage >= totalPages - 1) return;

			currentPage++;
			renderCategoryPage();
		});

		let categoryResizeTimer;

		window.addEventListener('resize', function () {
			clearTimeout(categoryResizeTimer);

			categoryResizeTimer = setTimeout(function () {
				currentPage = 0;
				renderCategoryPage();
			}, 150);
		});

		renderCategoryPage();
	}


	// 02 廣告輪播
	const adTrack = document.querySelector('.js-ad-track');
	const adPrev = document.querySelector('.js-ad-prev');
	const adNext = document.querySelector('.js-ad-next');
	const adSlider = document.querySelector('.home-ad');

	if (adTrack && adPrev && adNext && adSlider) {
		const adItems = Array.from(adTrack.querySelectorAll('.home-ad__item'));
		let adIndex = 0;
		let adTimer = null;
		const adDelay = 4000;

		function getAdPerView() {
			if (window.innerWidth < 768) return 1;
			if (window.innerWidth < 992) return 2;
			return 3;
		}

		function getAdMaxIndex() {
			return Math.max(adItems.length - getAdPerView(), 0);
		}

		function renderAdSlider() {
			const perView = getAdPerView();
			const maxIndex = getAdMaxIndex();

			if (adIndex > maxIndex) {
				adIndex = 0;
			}

			const itemWidth = 100 / perView;
			adTrack.style.transform = `translateX(-${adIndex * itemWidth}%)`;
		}

		function nextAd() {
			const maxIndex = getAdMaxIndex();

			if (adIndex >= maxIndex) {
				adIndex = 0;
			} else {
				adIndex++;
			}

			renderAdSlider();
		}

		function prevAd() {
			const maxIndex = getAdMaxIndex();

			if (adIndex <= 0) {
				adIndex = maxIndex;
			} else {
				adIndex--;
			}

			renderAdSlider();
		}

		function startAdAutoPlay() {
			stopAdAutoPlay();

			adTimer = setInterval(function () {
				nextAd();
			}, adDelay);
		}

		function stopAdAutoPlay() {
			if (adTimer) {
				clearInterval(adTimer);
				adTimer = null;
			}
		}

		function restartAdAutoPlay() {
			stopAdAutoPlay();
			startAdAutoPlay();
		}

		adNext.addEventListener('click', function () {
			nextAd();
			restartAdAutoPlay();
		});

		adPrev.addEventListener('click', function () {
			prevAd();
			restartAdAutoPlay();
		});

		adSlider.addEventListener('mouseenter', function () {
			stopAdAutoPlay();
		});

		adSlider.addEventListener('mouseleave', function () {
			startAdAutoPlay();
		});

		window.addEventListener('resize', function () {
			adIndex = 0;
			renderAdSlider();
			restartAdAutoPlay();
		});

		renderAdSlider();
		startAdAutoPlay();
	}


	// 03 週間好福利商品輪播
	const productSliders = document.querySelectorAll('.js-home-product-slider');

	productSliders.forEach(function (slider) {
		const track = slider.querySelector('.js-home-product-track');
		const prev = slider.querySelector('.js-home-product-prev');
		const next = slider.querySelector('.js-home-product-next');

		if (!track || !prev || !next) return;

		const items = Array.from(track.querySelectorAll('.home-product-card'));
		let currentIndex = 0;

		function getProductPerView() {
			if (window.innerWidth < 768) return 2;
			if (window.innerWidth < 992) return 3;
			return 4;
		}

		function getProductGap() {
			if (window.innerWidth < 768) return 12;
			return 20;
		}

		function renderProductSlider() {
			const perView = getProductPerView();
			const maxIndex = Math.max(items.length - perView, 0);

			if (currentIndex > maxIndex) {
				currentIndex = maxIndex;
			}

			const itemWidth = items[0] ? items[0].getBoundingClientRect().width : 0;
			const gap = getProductGap();

			track.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;

			prev.disabled = currentIndex === 0;
			next.disabled = currentIndex >= maxIndex;
		}

		prev.addEventListener('click', function () {
			if (currentIndex <= 0) return;

			currentIndex--;
			renderProductSlider();
		});

		next.addEventListener('click', function () {
			const maxIndex = Math.max(items.length - getProductPerView(), 0);

			if (currentIndex >= maxIndex) return;

			currentIndex++;
			renderProductSlider();
		});

		window.addEventListener('resize', function () {
			currentIndex = 0;
			renderProductSlider();
		});

		renderProductSlider();
	});


	// 03 優惠專區商品篩選
	const saleFilterButtons = document.querySelectorAll('[data-product-filter]');
	const saleProducts = document.querySelectorAll('.js-sale-products .home-product-card');

	saleFilterButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			const filter = button.dataset.productFilter;

			saleFilterButtons.forEach(function (btn) {
				btn.classList.remove('is-active');
			});

			button.classList.add('is-active');

			saleProducts.forEach(function (product) {
				const tags = product.dataset.productTags ? product.dataset.productTags.split(' ') : [];
				const isMatch = tags.includes(filter);

				product.classList.toggle('is-hidden', !isMatch);
			});
		});
	});

});




// 06 編輯嚴選商品輪播
const editorSliders = document.querySelectorAll('.js-editor-slider');

editorSliders.forEach(function (slider) {
	const track = slider.querySelector('.js-editor-track');
	const prev = slider.querySelector('.js-editor-prev');
	const next = slider.querySelector('.js-editor-next');

	if (!track || !prev || !next) return;

	const items = Array.from(track.querySelectorAll('.editor-card'));
	let currentIndex = 0;

	function getEditorPerView() {
		if (window.innerWidth < 768) return 1;
		return 2;
	}

	function getEditorGap() {
		return 20;
	}

	function renderEditorSlider() {
		const perView = getEditorPerView();
		const maxIndex = Math.max(items.length - perView, 0);

		if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}

		const itemWidth = items[0] ? items[0].getBoundingClientRect().width : 0;
		const gap = getEditorGap();

		track.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;

		prev.disabled = currentIndex === 0;
		next.disabled = currentIndex >= maxIndex;
	}

	prev.addEventListener('click', function () {
		if (currentIndex <= 0) return;

		currentIndex--;
		renderEditorSlider();
	});

	next.addEventListener('click', function () {
		const maxIndex = Math.max(items.length - getEditorPerView(), 0);

		if (currentIndex >= maxIndex) return;

		currentIndex++;
		renderEditorSlider();
	});

	window.addEventListener('resize', function () {
		currentIndex = 0;
		renderEditorSlider();
	});

	renderEditorSlider();
});
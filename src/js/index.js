document.addEventListener('DOMContentLoaded', function () {
	const track = document.querySelector('.js-category-track');
	const prevBtn = document.querySelector('.js-category-prev');
	const nextBtn = document.querySelector('.js-category-next');

	if (!track || !prevBtn || !nextBtn) return;

	const items = Array.from(track.querySelectorAll('.home-category__item'));
	let currentPage = 0;

	function getPerPage() {
		if (window.innerWidth < 768) return 4;
		if (window.innerWidth < 992) return 8;
		return 12;
	}

	function renderCategoryPage() {
		const perPage = getPerPage();
		const totalPages = Math.ceil(items.length / perPage);

		if (currentPage >= totalPages) {
			currentPage = Math.max(totalPages - 1, 0);
		}

		const start = currentPage * perPage;
		const end = start + perPage;

		items.forEach(function (item, index) {
			item.classList.toggle('is-page-visible', index >= start && index < end);
		});

		prevBtn.disabled = currentPage === 0;
		nextBtn.disabled = currentPage >= totalPages - 1;

		prevBtn.classList.toggle('is-active', currentPage > 0);
		nextBtn.classList.toggle('is-active', currentPage < totalPages - 1);
	}

	prevBtn.addEventListener('click', function () {
		if (currentPage <= 0) return;
		currentPage--;
		renderCategoryPage();
	});

	nextBtn.addEventListener('click', function () {
		const totalPages = Math.ceil(items.length / getPerPage());

		if (currentPage >= totalPages - 1) return;

		currentPage++;
		renderCategoryPage();
	});

	let resizeTimer;

	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);

		resizeTimer = setTimeout(function () {
			currentPage = 0;
			renderCategoryPage();
		}, 150);
	});

	renderCategoryPage();
});



// 02 廣告區
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


// 03 產品區
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

	function renderProductSlider() {
		const perView = getProductPerView();
		const maxIndex = Math.max(items.length - perView, 0);
		const gap = window.innerWidth < 768 ? 12 : 20;

		if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}

		const itemWidth = items[0] ? items[0].getBoundingClientRect().width : 0;
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
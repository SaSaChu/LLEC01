$(function() {

	// web 點擊全選
	$('#check-all-cart').on('change', function() {
		$('.web_list_content_body').find('input[type=checkbox]').click();

		if ($(this).is(":checked"))  {
			console.log('click');
		} else {
			console.log('not click');
		}	
	})

	// mobile 點擊全選
	$('#mobile-check-all-cart').on('change', function() {
		$('.mobile_list_content_body').find('input[type=checkbox]').click();

		if ($(this).is(":checked"))  {
			console.log('click')
		} else {
			console.log('not click');
		}	
	})

	// web & mobile 清單列表控制數量 可刪除
	$('.count_btn').on('click', function (){
		let countInput = $(this).parent().find('.count_value') 
		let countValue = parseInt(countInput.val());
		
		if($(this).hasClass('increase-count')) {
			countInput.val(++countValue);
			
		} else {
			if(countValue - 1) {
				countInput.val(--countValue);
			}
		}
	})

	// step 1 start
	// 輪播因爲 step1-3 的 js 都寫一起需要判斷該頁是否有輪播以防產生 bug ，可分開
	// 好像可以等 render 後再執行 new Swiper();
	if($('.gifts-swiper').length) {
		var swiperPoint = new Swiper(".gifts-swiper", {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 18,
			loop: true,
			navigation: {
				nextEl: '.gifts-button-next',
				prevEl: '.gifts-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
	
				1024: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
			},
		});
	}

	if($('.point-swiper').length) {
		var swiperPoint = new Swiper(".point-swiper", {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 18,
			loop: true,
			navigation: {
				nextEl: '.point-button-next',
				prevEl: '.point-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
	
				1024: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
			},
		});
	}
	
	if($('.like-swiper').length) {
		var swiperLike = new Swiper(".like-swiper", {
			slidesPerView: 1,
			slidesPerGroup: 1,
			loop: true,
			navigation: {
				nextEl: '.likeWeb-button-next',
				prevEl: '.likeWeb-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
	
				1024: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
			},
		});
	}

	if($('.add-swiper').length) {
		var swiperPoint = new Swiper(".add-swiper", {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 18,
			loop: true,
			navigation: {
				nextEl: '.add-button-next',
				prevEl: '.add-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
	
				1024: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
			},
		});
	}

	// 變更尺寸顏色 modal 
	$('#changeModal').on('show.bs.modal', function(event) {
		let cartListItem = $(event.relatedTarget).parents('.cart-list-item');
		
		// 點擊顏色
		$('.cart-color-item').on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.cart-modal').find(".cart_info img").first().attr("src", $(this).find('img').attr('data-img'));
		});

		// 點擊尺寸
		$('.cart-size-item').on('click', function() {
			if(!$(this).hasClass('sold_out')) {
				$(this).addClass('active').siblings().removeClass('active');	
			}
		})

		// 確認後更改列表頁圖片
		$('.change-modal-btn').on('click', function() {
			cartListItem.find('.img_field img').first().attr("src", $(this).find('img').attr('data-img'));
		});
	})	

	// 點擊也許你也喜歡 顏色時，變更圖片
	$('.like-item .color-item').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.product-card').find(".card-img img").first().attr("src", $(this).attr('data-img'));
        $(this).parents('.product-card').find(".card-img img").last().attr("src", $(this).attr('data-img-hover'));
        $(this).parent().next().find('p').text($(this).attr('data-color-name'));  
	})	

	// 贈品變更顏色圖片要跟著換
	$('.shopping_cart_gifts').find('.form-select').on('change', function(){
		let img = $(this).find('option:selected').attr('data-img');

		if(img) {
			$(this).parents('.card').find('.card-img .figure-img').attr('src', img);
		}
	})

	// 手機版 cart offcanvas 開啟時
    $('#offcanvasChangeBottom').on('show.bs.offcanvas', function(event) {
        
        let content = $(event.relatedTarget).parents('.row') ;
        
        // offcanvas 開啟時點擊顏色
        $('.cart-offcanvas').find('.color-item').on('click', function() {
            // 連動列表的顏色及圖片
            // offcanvas 點擊顏色時也要切換圖片
			content.find('.img_field img').first().attr("src", $(this).attr('data-img'));
			content.find('.img_field img').last().attr("src", $(this).attr('data-img-hover'));
            $(this).parents('.cart-offcanvas').find(".offcanvas_picture img").first().attr("src", $(this).attr('data-img'));
            $(this).parents('.cart-offcanvas').find(".offcanvas_picture img").last().attr("src", $(this).attr('data-img-hover'));

            // 選擇的顏色加上 active 並刪除之前的選擇
            $(this).addClass('active').siblings().removeClass('active'); 
        })

        // offcanvas 開啟時點擊尺寸
        $('.cart-offcanvas').find('.size-item').on('click', function() {            
            if(!$(this).hasClass('sold_out')) {
                $(this).addClass('active').siblings().removeClass('active'); 
            }
        })
    })

    // 手機版 cart offcanvas 關閉時
    $('#offcanvasCartBottom').on('hidden.bs.offcanvas', function(event) {
        
    })

	// step 1 end

	//step 2 start
	function deliveryType(type) {
		console.log(type);
		let allType = $('.delivery-type');
		let activeType = $('.delivery-'+type);
		allType.hide();
		allType.find('input, select').attr('disabled', 'disabled');
		activeType.find('input, select').removeAttr('disabled');
		activeType.show();
	}

	function invoiceType(type) {
		console.log(type);	
		let allType = $('.invoice-type');
		let activeType = $('.invoice-'+type);
		allType.hide();
		allType.find('input, select').attr('disabled', 'disabled');
		activeType.find('input, select').removeAttr('disabled');
		activeType.show();
	}

	let delivery = $('input[name="delivery_type"]'); 
	if(delivery.length) {
		delivery.on('change', function() {
			deliveryType($(this).val())
			
		})
	}

	// 選擇常用門市
	
	let storeModal = $('#storeModal');
	storeModal.on('show.bs.modal', function() {
		// Ajax 抓資料
		console.log('storeModal Ajax')
	});
	
	// 發票資料
	let invoice =  $('select[name="invoice_type"]'); 
	invoice.on('change', function() {
		invoiceType($(this).val());
	})

	$('.sync-name').on('click', function() {
		$(this).addClass('active').parents('.col').siblings().find('.radio_label').removeClass('active');
		
		$('input[name="invoice_name"]').val($('input[name="'+$(this).attr("data-target")+'"]').val())
	})
	
	// 提交完成訂單
	let chekcOrder = $('.check-order') 
	if(chekcOrder.length) {
		chekcOrder.on('click', function() {
			console.log($('#step-second-form').serializeArray());
		})
	}
	// 選擇常用門市
	$('.select-store').on('click', function() {
		// 抓 input 或者 點擊的 btn 放 data-xxx 直接抓 data; 
		let storeName = $(this).parents('.row').find('.select-store-name').text();
		let storeAddress = $(this).parents('.row').find('.select-store-address').text();
			console.log(storeName);
		$('.store-name').text(storeName);
		$('.store-address').text(storeAddress);
	});
	
	// 選擇常用收件人
	// step-2 & step-3 可共用
	$('.select-recipient').on('click', function() {
		// 抓 input 或者 點擊的 btn 放 data-xxx 直接抓 data; 
		// recipient_city recipient_area 可放 data ，或分解 address;
		let selectName = $(this).parents('.row').find('.select-name').text();
		let selectPhone = $(this).parents('.row').find('.select-phone').text();
		let selectAddress = $(this).parents('.row').find('.select-address').text();
			
		$('input[name="recipient_name"]').val(selectName);
		$('input[name="recipient_phone"]').val(selectPhone);
		$('input[name="recipient_address"').val(selectAddress);
	});

	$('.select-company').on('click', function() {
		// 抓 input 或者 點擊的 btn 放 data-xxx 直接抓 data; 
		let companyNumber = $(this).parents('.row').find('.select-company-number').text();
		let companyName = $(this).parents('.row').find('.select-company-name').text();
		
		$('input[name="company_number"]').val(companyNumber);
		$('input[name="company_name"]').val(companyName);
	});
	// step2 end


	// step3 stert
	$('.change-recipient').on('click', function() {
		// ajax 後 資料帶回頁面，要補上 city 跟 area
		let recipientName = $('input[name="recipient_name"]').val();
		let recipientPhone = $('input[name="recipient_phone"]').val();
		let recipientAddress = $('input[name="recipient_phone"]').val();
		
		if(recipientName && recipientPhone && recipientAddress) {
			$('.order-recipient-name').text($('input[name="recipient_name"]').val());
			$('.order-recipient-phone').text($('input[name="recipient_phone"]').val());
			$('.order-recipient-address').text($('input[name="recipient_address"]').val());
			$(this).prev().click();
		}
	})
	// step3 end
})



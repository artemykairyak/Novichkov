$(function() {
    let documentWidth = parseInt(document.documentElement.clientWidth);
    let windowsWidth = parseInt(window.innerWidth);
    let scrollbarWidth = windowsWidth - documentWidth;

    $('.gallery__slider').owlCarousel({
        navText: [$('.gallery__slider-arr_left'), $('.gallery__slider-arr_right')],
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    let rtv = $('.rivertime-video__slider').owlCarousel({
        navText: [$('.rivertime-video__slider-arr_left'), $('.rivertime-video__slider-arr_right')],
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    let rtvn = $('.rivertime-video__nav').owlCarousel({
        loop: false,
        margin: 97,
        dots: false,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    let dhv = $('.deephouse-video__slider').owlCarousel({
        navText: [$('.deephouse-video__slider-arr_left'), $('.deephouse-video__slider-arr_right')],
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    let dhvn = $('.deephouse-video__nav').owlCarousel({
        loop: false,
        margin: 97,
        dots: false,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    $('.rivertime-video__slider-arr_right').on('click', function() {
        rtvn.trigger('next.owl.carousel');
        $('.rivertime-video__nav').find('.owl-item.active:first').find('.rivertime-video__navitem').addClass('rivertime-video__navitem_active');
        $('.rivertime-video__nav').find('.owl-item.active:first').siblings().find('.rivertime-video__navitem').removeClass('rivertime-video__navitem_active');

    });

    $('.rivertime-video__slider-arr_left').on('click', function() {
        rtvn.trigger('prev.owl.carousel');
        $('.rivertime-video__nav').find('.owl-item.active:first').find('.rivertime-video__navitem').addClass('rivertime-video__navitem_active');
        $('.rivertime-video__nav').find('.owl-item.active:first').siblings().find('.rivertime-video__navitem').removeClass('rivertime-video__navitem_active');
    });

    $('.deephouse-video__slider-arr_right').on('click', function() {
        dhvn.trigger('next.owl.carousel');
        $('.deephouse-video__nav').find('.owl-item.active:first').find('.deephouse-video__navitem').addClass('deephouse-video__navitem_active');
        $('.deephouse-video__nav').find('.owl-item.active:first').siblings().find('.deephouse-video__navitem').removeClass('deephouse-video__navitem_active');

    });

    $('.deephouse-video__slider-arr_left').on('click', function() {
        dhvn.trigger('prev.owl.carousel');
        $('.deephouse-video__nav').find('.owl-item.active:first').find('.deephouse-video__navitem').addClass('deephouse-video__navitem_active');
        $('.deephouse-video__nav').find('.owl-item.active:first').siblings().find('.deephouse-video__navitem').removeClass('deephouse-video__navitem_active');
    })

    // rtv.on('change.owl.carousel', function(e) {
    //   console.log(e.item)
    //     rtvn.trigger('to.owl.carousel', [e.item.index, 300]);
    //   })

    let totalMembersSlides = null;

    let membersSlider = $('.members-info__slider').owlCarousel({
        navText: [$('.members__nav-arr_left'), $('.members__nav-arr_right')],
        loop: false,
        margin: 30,
        nav: true,
        lazyLoad: true,
        autoWidth: true,
        navContainer: '.members__nav',
        onInitialized: function(e) {
            $('.members__slider-count_total').text('0' + this.items().length);
            totalMembersSlides = this.items().length;
            $('.members-info__slide').each((index, item) => {
                $(item).attr('data-num', index);
            })
        },
        // rewind: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    $('.members .owl-next, .members .owl-prev').on('click', function() {
        let cur = $('.members-info__slider .owl-item.active:first')
            .find('.members-info__slide').attr('data-num');
        $('.members__slider-count_cur').text('0' + (+cur + 1))
        $('.members-info__slider .owl-item.active').removeClass('members-info__slide_active');

        $('.members-info__slider .owl-item.active:first').addClass('members-info__slide_active');
        // if($(this).hasClass('owl-next')) {
        //     if(+cur + 1 < totalMembersSlides) {
        //          $('.members-info__slider').trigger('next.owl.carousel');
        //     }
        // }
    });

    let videoloaded = false;

    $(window).on('scroll', function() {
        if (($(window).scrollTop() + $(window).height()) >= $('.video').offset().top) {
            videoloaded = true;
        }

        if (videoloaded) {
            //console.log(1);
            // $('.video').animate({
            //  height : "430px"
            //  }, 500);
        }
    });

    Revealator.effects_padding = -700;
    Revealator.scroll_padding = -500;

    if (window.location.hash === '#rivertime') {
        $('.main-container').addClass('main-container_rivertime')
        $('.main-section').addClass('disable-animation');
        setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
        setMenuClasses($('.main-section__menu-item_cover'));

        loadRivertimeSection();
    }

    if (window.location.hash === '#deephousesax') {
        $('.main-container').addClass('main-container_deephouse');
        $('.main-section').addClass('disable-animation');
        setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
        setMenuClasses($('.main-section__menu-item_deephouse'));
        loadDeephouseSection();
    }

    $(document).ready(function() {
        setTimeout(function() {
            $('.main-section').addClass('disable-animation');
        }, 2000);
    });

    $('.main-section__order-btn').on('click', function(e) {
        e.preventDefault();
        let fix = $('.clients').offset().top + $('.clients').height();
         $('html, body').animate({ scrollTop: fix }, 500);
    });

    $('.main-section__readmore-btn').on('click', function(e) {
        e.preventDefault();
         $('html, body').animate({ scrollTop: $('.container').height() }, 500);
    });

    $('.order-form__input').on('focus', function() {
        $(this).parent().addClass('order-form__input-container_focused');
    });

    $('.order-form__input').on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('order-form__input-container_focused');
        }

        if (($(this).hasClass('order-form__phone') &&
                !$(this).val().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/) ||
                $(this).hasClass('order-form__name') && !$(this).val() ||
                $(this).hasClass('order-form__date') && !$(this).val().match(/^[0-9]+$/))) {
            $(this).parent().addClass('order-form__input-container_error');
            $(this).parent().removeClass('order-form__input-container_success');
        } else {
            $(this).parent().removeClass('order-form__input-container_error');
            $(this).parent().addClass('order-form__input-container_success');
        }
    });

    $('.rivertime__pic, .deephouse__pic').on('click', function() {
        $('html, body').animate({ scrollTop: $(this).offset().top }, 500);
        removeScrollbar();

        if ($(this).hasClass('deephouse__pic')) {
            $('.deephouse-wrapper').addClass('deephouse-wrapper_clicked');
            $('.main-container').removeClass('main-container_rivertime');
            $('.main-container').addClass('main-container_deephouse');
            $('html, body').animate({ scrollTop: 0 }, 100, function() {
                $('.deephouse__pic').animate({ 'opacity': 0 }, 300, function() {
                    $('.deephouse__pic').css({ 'opacity': 1 });
                    $('.deephouse-wrapper').removeClass('deephouse-wrapper_clicked');
                });
                setMenuClasses($('.main-section__menu-item_deephouse'));
                setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
                displayScrollbar();
                loadDeephouseSection();
            });
        } else {
            $('.rivertime-wrapper').addClass('rivertime-wrapper_clicked');
            $('.main-container').addClass('main-container_rivertime');
            $('.main-container').removeClass('main-container_deephouse');
            $('html, body').animate({ scrollTop: 0 }, 100, function() {
                $('.rivertime__pic').animate({ 'opacity': 0 }, 300, function() {
                    $('.rivertime__pic').css({ 'opacity': 1 });
                    $('.rivertime-wrapper').removeClass('rivertime-wrapper_clicked');
                });
                setMenuClasses($('.main-section__menu-item_cover'));
                setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
                displayScrollbar();
                loadRivertimeSection();

            });
        }
    });

    $('.modal-success__btn').on('click', function() {
        $('.overlay').fadeOut(300, function() {
            $(this).removeClass('overlay_active');
        })
        $('.modal').fadeOut(300, function() {
            $(this).removeClass('modal_active');
        });
    });

    $('.video-container').on('click', function() {
        let src = $(this).find('.video__video').attr('src');
        $(this).find('.video__video').removeClass('video__video_hidden').attr('src', src + '&autoplay=1');
    });

    $('.main-section__menu-item_solo').on('click', function() {
        window.location.hash = '';
        $('.main-section').addClass('disable-animation');
        $('.main-container').removeClass('main-container_deephouse');
        $('.main-container').removeClass('main-container_rivertime');
        setSectionClasses($('.voice, .gallery, .rivertime'), $('.members, .rivertime-video, .deephouse, .deephouse-video'));
        setMenuClasses($('.main-section__menu-item_solo'));
    });

    $('.main-section__menu-item_cover').on('click', function() {
        window.location.hash = '#rivertime';
        $('.main-section').addClass('disable-animation');
        $('.main-container').removeClass('main-container_deephouse');
        $('.main-container').addClass('main-container_rivertime');
        setMenuClasses($('.main-section__menu-item_cover'));
        setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime'));
        loadRivertimeSection();

    });

    $('.main-section__menu-item_deephouse').on('click', function() {
        window.location.hash = '#deephousesax';
        $('.main-section').addClass('disable-animation');
        $('.main-container').addClass('main-container_deephouse');
        $('.main-container').removeClass('main-container_rivertime');
        setMenuClasses($('.main-section__menu-item_deephouse'));
        setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
        loadDeephouseSection();
    });

    function setMenuClasses(activeElem) {
        activeElem.addClass('main-section__menu-item_active');
        activeElem.siblings().removeClass('main-section__menu-item_active');
    }

    function setSectionClasses(enabledSections, disabledSections) {
        enabledSections.removeClass('section_hidden');
        disabledSections.addClass('section_hidden');
    }

    function enableRev(elem, duration, delay) {
        elem.addClass(`revealator-slideup revealator-duration${duration} revealator-once revealator-delay${delay}`);
    }

    function loadRivertimeSection() {
        $(membersSlider).trigger('refresh.owl.carousel');
        enableRev($('.members-info__genres, .members-info__genres-title, .members-info__desc, .members-info__slider, .members-info__group'), 5, 9);
        enableRev($('.members__slider-nav'), 5, 10);
        enableRev($('.rivertime-video__title'), 5, 2);
        enableRev($('.rivertime-video__slider'), 5, 1);
        enableRev($('.rivertime-video__slider-arr'), 5, 7);
        enableRev($('.rivertime-video__nav'), 5, 6);
        window.location.hash = '#rivertime';
        $('.deephouse__pic').addClass('revealator-fade revealator-duration3 revealator-once revealator-delay1');
    }

    function loadDeephouseSection() {
        window.location.hash = '#deephousesax';
        enableRev($('.deephouse-video-info'), 5, 9);
        enableRev($('.deephouse-video__slider'), 5, 6);
        enableRev($('.deephouse-video__slider-arr'), 5, 7);
        enableRev($('.deephouse-video__nav'), 5, 6);
    }

    function removeScrollbar() {
        $('html').addClass('disabled-scroll');
        $('body').css('margin-right', -scrollbarWidth);
    }

    function displayScrollbar() {
        $('html').removeClass('disabled-scroll');
    }
});
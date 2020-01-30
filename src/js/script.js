$(function() {
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

    let totalMembersSlides = null;

    $('.members-info__slider').owlCarousel({
        navText: [$('.members__nav-arr_left'), $('.members__nav-arr_right')],
        loop: false,
        margin: 30,
        nav: true,
        lazyLoad: true,
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
                items: 3
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
    })

    Revealator.effects_padding = '-300';
    Revealator.scroll_padding = '0';
    console.log(window.location.hash);
    if (window.location.hash === '#rivertime') {

        console.log(111)
        $('.main-container').addClass('main-container_rivertime')
        $('.main-section').addClass('disable-animation');
        setSectionClasses($('.members'), $('.voice, .gallery'));
        setMenuClasses($('.main-section__menu-item_cover'));
    }


    $(document).ready(function() {
        setTimeout(function() {
            $('.main-section').addClass('disable-animation');
        }, 3000);
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

    $('.rivertime__pic').on('click', function() {
        $('html, body').animate({ scrollTop: $(this).offset().top }, 500);
        $('.rivertime-wrapper').addClass('rivertime-wrapper_clicked');
        $('html').addClass('disabled-scroll');
        $('.main-container').addClass('main-container_rivertime');

        $('html, body').animate({ scrollTop: 0 }, 100, function() {
            $('.rivertime__pic').animate({ 'opacity': 0 }, 300, function() {
                $('.rivertime__pic').css({ 'opacity': 1 });
                $('.rivertime-wrapper').removeClass('rivertime-wrapper_clicked');
            });
            setMenuClasses($('.main-section__menu-item_cover'));
            setSectionClasses($('.members'), $('.voice, .gallery'));
            $('html').removeClass('disabled-scroll');

        });

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

    $('.main-section__menu-item_cover').on('click', function() {
        history.pushState(null, null, '#rivertime');
        // location.hash = '#' + 'rivertime';
        $('.main-section').addClass('disable-animation');
        $('.main-container').addClass('main-container_rivertime');
        setMenuClasses($('.main-section__menu-item_cover'));
         setSectionClasses($('.members'), $('.voice, .gallery'));
    });

    $('.main-section__menu-item_solo').on('click', function() {
        $('.main-section').addClass('disable-animation');
        $('.main-container').removeClass('main-container_rivertime');
        setSectionClasses($('.voice, .gallery'), $('.members'));
        setMenuClasses($('.main-section__menu-item_solo'));
    });

    function setMenuClasses(activeElem) {
        activeElem.addClass('main-section__menu-item_active');
        activeElem.siblings().removeClass('main-section__menu-item_active');
    }

    function setSectionClasses(enabledSections, disabledSections) {
        enabledSections.removeClass('section_hidden');
        disabledSections.addClass('section_hidden');
    }
});
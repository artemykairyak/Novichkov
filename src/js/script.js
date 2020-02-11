$(function() {
    setTimeout(() => initSliders(), 100)

    $('.members-info__slider').on('init', function(event, slick) {
        $('.members__slider-count_total').text('0' + slick.slideCount);
    });

    $('.rivertime-video__slide, .deephouse-video__slide').on('click', function() {
        loadSlide($(this))
    });

    $('.rivertime-video__slider').on('afterChange', function(event, slick, currentSlide) {
        if (currentSlide + 1 === slick.slideCount) {
            toggleArrow('rivertime-video__slider', 'right', true);
        } else {
            toggleArrow('rivertime-video__slider', 'right', false);
        }

        if (currentSlide === 0) {
            toggleArrow('rivertime-video__slider', 'left', true);
        } else {
            toggleArrow('rivertime-video__slider', 'left', false);
        }
    });

    $('.deephouse-video__slider').on('afterChange', function(event, slick, currentSlide) {
        if (currentSlide + 1 === slick.slideCount) {
            toggleArrow('deephouse-video__slider', 'right', true);
        } else {
            toggleArrow('deephouse-video__slider', 'right', false);
        }

        if (currentSlide === 0) {
            toggleArrow('deephouse-video__slider', 'left', true);
        } else {
            toggleArrow('deephouse-video__slider', 'left', false);
        }
    });

    $('.overlay').on('click', function() {
        $(this).hide();
        $('.modal-success').fadeOut(300, function() {
            $(this).removeClass('modal_active');
        });
    });

    function showModal() {
        $('.modal-success').addClass('modal_active');
        $('.modal-success').fadeIn(300);
        $('.overlay').show();
    }
    $('.order-form').on('submit', function(e) {
        e.preventDefault();
        if (validateForm($(this))) {
            let data = $(this).serializeArray()
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/http://novichkov.asap-lp.ru/mail/index.php',
                type: "POST",
                data: data,
                success: function(data) {
                    showModal();

                },
                error: function(error) {
                    console.log(error)
                },
                dataType: 'json'

            });

            let inputs = $(this).find('.order-form__input-container');
            inputs.each((i, item) => {
                $(item).removeClass('order-form__input-container_focused').removeClass('order-form__input-container_success');
            })

            $(this)[0].reset();
        }
    });

    $('.members-info__slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('.members__slider-count_cur').text('0' + (currentSlide + 1));

        if (currentSlide + 1 === slick.slideCount) {
            $(`.members-info__slider`).closest('.members__slider-container').find(`.members__nav-arr_right`).addClass(`members__nav-arr_disable`);
        } else {
            $(`.members-info__slider`).closest('.members__slider-container').find(`.members__nav-arr_right`).removeClass(`members__nav-arr_disable`);
        }

        if (currentSlide === 0) {
            $(`.members-info__slider`).closest('.members__slider-container').find(`.members__nav-arr_left`).addClass(`members__nav-arr_disable`);
        } else {
            $(`.members-info__slider`).closest('.members__slider-container').find(`.members__nav-arr_left`).removeClass(`members__nav-arr_disable`);
        }
    });

    $(window).on('scroll', function() {
        if (($(window).scrollTop() + $(window).height()) >= $('.video-wrapper:first').offset().top) {
            setTimeout(() => $('.video-wrapper:first').delay(1000).addClass('video-wrapper_visible'), 0);
        }

        if (($(window).scrollTop() + $(window).height()) >= $('.video-wrapper:last').offset().top) {
            setTimeout(() => $('.video-wrapper:last').addClass('video-wrapper_visible'), 0);
        }
    });

    Revealator.effects_padding = -700;
    Revealator.scroll_padding = -500;

    if (window.location.hash === '#rivertime') {
        $('.main-container').addClass('main-container_rivertime')
        $('.main-section').addClass('disable-animation');
        setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
        setMenuClasses($('.main-section__menu-item_cover'));
        setMobileMenuClasses($('.main-section__mobile-item_cover'));
        loadRivertimeSection();
    }

    if (window.location.hash === '#deephousesax') {
        $('.main-container').addClass('main-container_deephouse');
        $('.main-section').addClass('disable-animation');
        setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
        setMenuClasses($('.main-section__menu-item_deephouse'));
        setMobileMenuClasses($('.main-section__mobile-item_deephouse'));
        loadDeephouseSection();
    }

    $('.main-section__order-btn, .main-section__mobile-orderbtn').on('click', function(e) {
        e.preventDefault();
        if ($('.main-section__mobile').hasClass('main-section__mobile_active')) {
            $('.main-section__mobile').removeClass('main-section__mobile_active');
        }
        let fix = $('.clients').offset().top + $('.clients').height();
        $('html, body').animate({ scrollTop: fix }, 700);
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
            $('.main-container').removeClass('main-container_rivertime');
            $('.main-container').addClass('main-container_deephouse');
            if ($(window).width() > 1270) {
                $('.deephouse-wrapper').addClass('deephouse-wrapper_clicked');

                $('html, body').animate({ scrollTop: 0 }, 100, function() {
                    $('.deephouse__pic').animate({ 'opacity': 0 }, 300, function() {
                        $('.deephouse__pic').css({ 'opacity': 1 });
                        $('.deephouse-wrapper').removeClass('deephouse-wrapper_clicked');
                    });
                    setMenuClasses($('.main-section__menu-item_deephouse'));
                    setMobileMenuClasses($('.main-section__mobile-item_deephouse'));
                    setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
                    displayScrollbar();
                    loadDeephouseSection();
                });
            } else {
                $('html, body').animate({ scrollTop: 0 }, 100, function() {
                    setMenuClasses($('.main-section__menu-item_deephouse'));
                    setMobileMenuClasses($('.main-section__mobile-item_deephouse'));
                    setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
                    displayScrollbar();
                    loadDeephouseSection();
                });
            }

        } else {
            $('.main-container').addClass('main-container_rivertime');
            $('.main-container').removeClass('main-container_deephouse');

            if ($(window).width() > 1270) {
                $('.rivertime-wrapper').addClass('rivertime-wrapper_clicked');

                $('html, body').animate({ scrollTop: 0 }, 100, function() {
                    $('.rivertime__pic').animate({ 'opacity': 0 }, 300, function() {
                        $('.rivertime__pic').css({ 'opacity': 1 });
                        $('.rivertime-wrapper').removeClass('rivertime-wrapper_clicked');
                    });
                    setMenuClasses($('.main-section__menu-item_cover'));
                    setMobileMenuClasses($('.main-section__mobile-item_cover'));
                    setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
                    displayScrollbar();
                    loadRivertimeSection();
                });
            } else {
                $('html, body').animate({ scrollTop: 0 }, 100, function() {
                    setMenuClasses($('.main-section__menu-item_cover'));
                    setMobileMenuClasses($('.main-section__mobile-item_cover'));
                    setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
                    displayScrollbar();
                    loadRivertimeSection();
                });
            }
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

    $('.video__stub').on('click', function() {
        let src = $(this).attr('data-src');
        $(this).after(`<iframe class="video__video" src="${src}&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
    });

    $('.main-section__menu-item_solo').on('click', function() {
        loadSolo();
    });

    $('.main-section__menu-item_cover').on('click', function() {
        loadRivertime();
    });

    $('.main-section__menu-item_deephouse').on('click', function() {
        loadDeephouse();
    });

    $('.main-section__mobile-menu').on('click', function(e) {
        e.preventDefault();
        $('.main-section__mobile').addClass('main-section__mobile_active');
    });

    $('.main-section__mobile-close').on('click', function(e) {
        e.preventDefault();
        $('.main-section__mobile').removeClass('main-section__mobile_active');
    });

    $('.main-section__mobile-item').on('click', function(e) {
        $('.main-section__mobile').removeClass('main-section__mobile_active');
        if ($(this).hasClass('main-section__mobile-item_solo')) {
            loadSolo(true);
        } else if ($(this).hasClass('main-section__mobile-item_cover')) {
            loadRivertime(true);
        } else {
            loadDeephouse(true);
        }
    })

    function loadSolo(mobile) {
        window.location.hash = '';
        $('.main-section').addClass('disable-animation');
        $('.main-container').removeClass('main-container_deephouse');
        $('.main-container').removeClass('main-container_rivertime');
        setSectionClasses($('.voice, .gallery, .rivertime'), $('.members, .rivertime-video, .deephouse, .deephouse-video'));
        !mobile ? setMenuClasses($('.main-section__menu-item_solo')) : setMobileMenuClasses($('.main-section__mobile-item_solo'));
        setTimeout(() => $('.gallery__slider').slick('refresh'), 100);
    }

    function loadRivertime(mobile) {
        window.location.hash = '#rivertime';
        $('.main-section').addClass('disable-animation');
        $('.main-container').removeClass('main-container_deephouse');
        $('.main-container').addClass('main-container_rivertime');
        !mobile ? setMenuClasses($('.main-section__menu-item_cover')) : setMobileMenuClasses($('.main-section__mobile-item_cover'));
        setSectionClasses($('.members, .rivertime-video, .deephouse'), $('.voice, .gallery, .rivertime, .deephouse-video'));
        loadRivertimeSection();
    }

    function loadDeephouse(mobile) {
        window.location.hash = '#deephousesax';
        $('.main-section').addClass('disable-animation');
        $('.main-container').addClass('main-container_deephouse');
        $('.main-container').removeClass('main-container_rivertime');
        !mobile ? setMenuClasses($('.main-section__menu-item_deephouse')) : setMobileMenuClasses($('.main-section__mobile-item_deephouse'));
        setSectionClasses($('.deephouse-video'), $('.voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse'));
        loadDeephouseSection();
    }

    function initSliders() {
        $('.gallery__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.gallery__slider-arr_left'),
            nextArrow: $('.gallery__slider-arr_right'),
            fade: false,
            infinite: false,
            lazyLoad: 'ondemand',
            edgeFriction: 0.05,
            responsive: [{
                breakpoint: 900,
                settings: {
                    arrows: false,
                    slidesToShow: 1.2,
                    variableWidth: true,
                    centerMode: true,
                }
            }, ]
        });

        $('.rivertime-video__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.rivertime-video__slider-arr_left'),
            nextArrow: $('.rivertime-video__slider-arr_right'),
            fade: false,
            asNavFor: '.rivertime-video__nav',
            infinite: true,
            responsive: [{
                breakpoint: 900,
                settings: {
                    arrows: false,
                }
            }, ]
        });

        $('.rivertime-video__nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            respondTo: 'slider',
            dots: false,
            arrows: false,
            centerMode: false,
            asNavFor: '.rivertime-video__slider',
            responsive: [{
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 670,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        $('.deephouse-video__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.deephouse-video__slider-arr_left'),
            nextArrow: $('.deephouse-video__slider-arr_right'),
            fade: false,
            asNavFor: '.deephouse-video__nav',
            infinite: true,
            responsive: [{
                breakpoint: 900,
                settings: {
                    arrows: false,
                }
            }, ]
        });

        $('.deephouse-video__nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            asNavFor: '.deephouse-video__slider',
            responsive: [{
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 670,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });

        $('.members-info__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            centerMode: false,
            focusOnSelect: true,
            prevArrow: $('.members__nav-arr_left'),
            nextArrow: $('.members__nav-arr_right'),
            draggable: false,
            responsive: [{
                    breakpoint: 1192,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 570,
                    settings: {
                        slidesToShow: 2,

                    }
                },
            ]
        });
    }

    function validateForm(form) {
        let correct = true;
        if (!form.find('.order-form__input-container_error').length) {
            let inputs = form.find('.order-form__input');
            inputs.each((i, item) => {
                if (!$(item).val()) {
                    $(item).parent().addClass('order-form__input-container_error');
                    $(item).parent().removeClass('order-form__input-container_success');
                    correct = false;
                }
            });
        } else {
            correct = false;
        }
        return correct;
    }

    function loadSlide(slide) {
        let src = $(slide).attr('data-src');
        $(slide).html(`<iframe class="video__video" src="${src}&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
    }

    function toggleArrow(slider, dir, disable) {
        if (disable) {
            $(`.${slider}`).parent().find(`.${slider}-arr_${dir}`).addClass(`${slider}-arr_disable`);
        } else {
            $(`.${slider}`).parent().find(`.${slider}-arr_${dir}`).removeClass(`${slider}-arr_disable`);
        }
    }

    function setMenuClasses(activeElem) {
        activeElem.addClass('main-section__menu-item_active');
        activeElem.siblings().removeClass('main-section__menu-item_active');
    }

    function setMobileMenuClasses(activeElem) {
        activeElem.addClass('main-section__mobile-item_active');
        activeElem.siblings().removeClass('main-section__mobile-item_active');
    }

    function setSectionClasses(enabledSections, disabledSections) {
        enabledSections.removeClass('section_hidden');
        disabledSections.addClass('section_hidden');
    }

    function enableRev(elem, duration, delay) {
        elem.addClass(`revealator-slideup revealator-duration${duration} revealator-once revealator-delay${delay}`);
    }

    function loadRivertimeSection() {
        enableRev($('.members-info__genres, .members-info__genres-title, .members-info__desc, .members-info__slider, .members-info__group'), 5, 9);
        enableRev($('.members__slider-nav'), 5, 10);
        enableRev($('.rivertime-video__title'), 5, 2);
        enableRev($('.rivertime-video__slider'), 5, 1);
        enableRev($('.rivertime-video__slider-arr'), 5, 7);
        enableRev($('.rivertime-video__nav'), 5, 6);
        window.location.hash = '#rivertime';
        $('.deephouse__pic').addClass('revealator-fade revealator-duration3 revealator-once revealator-delay1');
        setTimeout(() => {
            $('.members-info__slider').slick('refresh');
            $('.rivertime-video__slider').slick('refresh');
        }, 100);
    }

    function loadDeephouseSection() {
        window.location.hash = '#deephousesax';
        enableRev($('.deephouse-video-info__genres, .deephouse-video-info__desc'), 5, 9);
        enableRev($('.deephouse-video__slider'), 5, 6);
        enableRev($('.deephouse-video__slider-arr'), 5, 7);
        enableRev($('.deephouse-video__nav'), 5, 6);
        setTimeout(() => $('.deephouse-video__slider').slick('refresh'), 100);
    }

    function removeScrollbar() {
        let documentWidth = parseInt(document.documentElement.clientWidth);
        let windowsWidth = parseInt(window.innerWidth);
        let scrollbarWidth = windowsWidth - documentWidth;
        $('body').css('margin-right', -scrollbarWidth);
        $('html').addClass('disabled-scroll');
    }

    function displayScrollbar() {
        $('html').removeClass('disabled-scroll');
    }
});
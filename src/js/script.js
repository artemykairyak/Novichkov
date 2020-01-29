$(function() {
    $('.gallery__slider').owlCarousel({
        navText: [$('.gallery__slider-arr_left'), $('.gallery__slider-arr_right')],
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    Revealator.effects_padding = '-300';
    Revealator.scroll_padding = '0';



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
    })

});
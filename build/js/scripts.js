"use strict";$(function(){function e(e){e.addClass("main-section__menu-item_active"),e.siblings().removeClass("main-section__menu-item_active")}function i(e,i){e.removeClass("section_hidden"),i.addClass("section_hidden")}function o(e,i,o){e.addClass("revealator-slideup revealator-duration".concat(i," revealator-once revealator-delay").concat(o))}function r(){$(v).trigger("refresh.owl.carousel"),o($(".members-info__genres, .members-info__genres-title, .members-info__desc, .members-info__slider, .members-info__group"),5,9),o($(".members__slider-nav"),5,10),o($(".rivertime-video__title"),5,2),o($(".rivertime-video__slider"),5,1),o($(".rivertime-video__slider-arr"),5,7),o($(".rivertime-video__nav"),5,6),$(".deephouse__pic").addClass("revealator-fade revealator-duration3 revealator-once revealator-delay1")}function a(){$("html").addClass("disabled-scroll"),$("body").css("margin-right",-d)}function n(){$("html").removeClass("disabled-scroll")}var t=parseInt(document.documentElement.clientWidth),s=parseInt(window.innerWidth),d=s-t;$(".gallery__slider").owlCarousel({navText:[$(".gallery__slider-arr_left"),$(".gallery__slider-arr_right")],loop:!1,margin:10,nav:!0,dots:!1,lazyLoad:!0,responsive:{0:{items:1}}});var m=($(".rivertime-video__slider").owlCarousel({navText:[$(".rivertime-video__slider-arr_left"),$(".rivertime-video__slider-arr_right")],loop:!1,margin:10,nav:!0,dots:!1,lazyLoad:!0,responsive:{0:{items:1}}}),$(".rivertime-video__nav").owlCarousel({loop:!1,margin:97,dots:!1,nav:!1,mouseDrag:!1,touchDrag:!1,pullDrag:!1,autoWidth:!0,responsive:{0:{items:1}}})),_=($(".deephouse-video__slider").owlCarousel({navText:[$(".deephouse-video__slider-arr_left"),$(".deephouse-video__slider-arr_right")],loop:!1,margin:10,nav:!0,dots:!1,lazyLoad:!0,responsive:{0:{items:1}}}),$(".deephouse-video__nav").owlCarousel({loop:!1,margin:97,dots:!1,nav:!1,mouseDrag:!1,touchDrag:!1,pullDrag:!1,autoWidth:!0,responsive:{0:{items:1}}}));$(".rivertime-video__slider-arr_right").on("click",function(){m.trigger("next.owl.carousel"),$(".rivertime-video__nav").find(".owl-item.active:first").find(".rivertime-video__navitem").addClass("rivertime-video__navitem_active"),$(".rivertime-video__nav").find(".owl-item.active:first").siblings().find(".rivertime-video__navitem").removeClass("rivertime-video__navitem_active")}),$(".rivertime-video__slider-arr_left").on("click",function(){m.trigger("prev.owl.carousel"),$(".rivertime-video__nav").find(".owl-item.active:first").find(".rivertime-video__navitem").addClass("rivertime-video__navitem_active"),$(".rivertime-video__nav").find(".owl-item.active:first").siblings().find(".rivertime-video__navitem").removeClass("rivertime-video__navitem_active")}),$(".deephouse-video__slider-arr_right").on("click",function(){_.trigger("next.owl.carousel"),$(".deephouse-video__nav").find(".owl-item.active:first").find(".deephouse-video__navitem").addClass("deephouse-video__navitem_active"),$(".deephouse-video__nav").find(".owl-item.active:first").siblings().find(".deephouse-video__navitem").removeClass("deephouse-video__navitem_active")}),$(".deephouse-video__slider-arr_left").on("click",function(){_.trigger("prev.owl.carousel"),$(".deephouse-video__nav").find(".owl-item.active:first").find(".deephouse-video__navitem").addClass("deephouse-video__navitem_active"),$(".deephouse-video__nav").find(".owl-item.active:first").siblings().find(".deephouse-video__navitem").removeClass("deephouse-video__navitem_active")});var l=null,v=$(".members-info__slider").owlCarousel({navText:[$(".members__nav-arr_left"),$(".members__nav-arr_right")],loop:!1,margin:30,nav:!0,lazyLoad:!0,autoWidth:!0,navContainer:".members__nav",onInitialized:function(){$(".members__slider-count_total").text("0"+this.items().length),l=this.items().length,$(".members-info__slide").each(function(e,i){$(i).attr("data-num",e)})},responsive:{0:{items:1}}});$(".members .owl-next, .members .owl-prev").on("click",function(){var e=$(".members-info__slider .owl-item.active:first").find(".members-info__slide").attr("data-num");$(".members__slider-count_cur").text("0"+(+e+1)),$(".members-info__slider .owl-item.active").removeClass("members-info__slide_active"),$(".members-info__slider .owl-item.active:first").addClass("members-info__slide_active")});var c=!1;$(window).on("scroll",function(){$(window).scrollTop()+$(window).height()>=$(".video").offset().top&&(c=!0)}),Revealator.effects_padding=-700,Revealator.scroll_padding=-500,console.log(window.location.hash),"#rivertime"===window.location.hash&&($(".main-container").addClass("main-container_rivertime"),$(".main-section").addClass("disable-animation"),i($(".members, .rivertime-video, .deephouse"),$(".voice, .gallery, .rivertime, .deephouse-video")),e($(".main-section__menu-item_cover")),r()),"#deephousesax"===window.location.hash&&($(".main-container").addClass("main-container_deephouse"),$(".main-section").addClass("disable-animation"),i($(".deephouse-video"),$(".voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse")),e($(".main-section__menu-item_deephouse"))),$(document).ready(function(){setTimeout(function(){$(".main-section").addClass("disable-animation")},2e3)}),$(".order-form__input").on("focus",function(){$(this).parent().addClass("order-form__input-container_focused")}),$(".order-form__input").on("blur",function(){$(this).val()||$(this).parent().removeClass("order-form__input-container_focused"),$(this).hasClass("order-form__phone")&&!$(this).val().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/)||$(this).hasClass("order-form__name")&&!$(this).val()||$(this).hasClass("order-form__date")&&!$(this).val().match(/^[0-9]+$/)?($(this).parent().addClass("order-form__input-container_error"),$(this).parent().removeClass("order-form__input-container_success")):($(this).parent().removeClass("order-form__input-container_error"),$(this).parent().addClass("order-form__input-container_success"))}),$(".rivertime__pic, .deephouse__pic").on("click",function(){$("html, body").animate({scrollTop:$(this).offset().top},500),a(),$(this).hasClass("deephouse__pic")?($(".deephouse-wrapper").addClass("deephouse-wrapper_clicked"),$(".main-container").removeClass("main-container_rivertime"),$(".main-container").addClass("main-container_deephouse"),$("html, body").animate({scrollTop:0},100,function(){$(".deephouse__pic").animate({opacity:0},300,function(){$(".deephouse__pic").css({opacity:1}),$(".deephouse-wrapper").removeClass("deephouse-wrapper_clicked")}),e($(".main-section__menu-item_deephouse")),i($(".deephouse-video"),$(".voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse")),n()})):($(".rivertime-wrapper").addClass("rivertime-wrapper_clicked"),$(".main-container").addClass("main-container_rivertime"),$(".main-container").removeClass("main-container_deephouse"),$("html, body").animate({scrollTop:0},100,function(){$(".rivertime__pic").animate({opacity:0},300,function(){$(".rivertime__pic").css({opacity:1}),$(".rivertime-wrapper").removeClass("rivertime-wrapper_clicked")}),e($(".main-section__menu-item_cover")),i($(".members, .rivertime-video, .deephouse"),$(".voice, .gallery, .rivertime, .deephouse-video")),n(),r()}))}),$(".modal-success__btn").on("click",function(){$(".overlay").fadeOut(300,function(){$(this).removeClass("overlay_active")}),$(".modal").fadeOut(300,function(){$(this).removeClass("modal_active")})}),$(".video-container").on("click",function(){var e=$(this).find(".video__video").attr("src");$(this).find(".video__video").removeClass("video__video_hidden").attr("src",e+"&autoplay=1")}),$(".main-section__menu-item_solo").on("click",function(){$(".main-section").addClass("disable-animation"),$(".main-container").removeClass("main-container_deephouse"),$(".main-container").removeClass("main-container_rivertime"),i($(".voice, .gallery, .rivertime"),$(".members, .rivertime-video, .deephouse, .deephouse-video")),e($(".main-section__menu-item_solo"))}),$(".main-section__menu-item_cover").on("click",function(){history.pushState(null,null,"#rivertime"),$(".main-section").addClass("disable-animation"),$(".main-container").removeClass("main-container_deephouse"),$(".main-container").addClass("main-container_rivertime"),e($(".main-section__menu-item_cover")),i($(".members, .rivertime-video, .deephouse"),$(".voice, .gallery, .rivertime")),r()}),$(".main-section__menu-item_deephouse").on("click",function(){history.pushState(null,null,"#deephousesax"),$(".main-section").addClass("disable-animation"),$(".main-container").addClass("main-container_deephouse"),$(".main-container").removeClass("main-container_rivertime"),e($(".main-section__menu-item_deephouse")),i($(),$(".voice, .gallery, .rivertime, .members, .rivertime-video, .deephouse"))})});
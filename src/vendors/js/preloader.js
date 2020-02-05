window.onload = function() {
    document.querySelector('.preloader').classList.add('preloader_hidden');
    document.querySelector('html').classList.remove('disabled-scroll');
    document.querySelector('.main-section').classList.remove('disable-animation');
    document.querySelector('.main-container').classList.remove('main-container_hidden');

    setTimeout(function() {
        document.querySelector('.main-section').classList.add('disable-animation');
    }, 3000);
}
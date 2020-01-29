var preloader = null;

document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive') {
        preloader = document.querySelector('.preloader__progress');
        preloader.style.height = '70%';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    preloader.style.height = '10%';
});

window.onload = function() {
    preloader.style.height = '0%';
    document.querySelector('.preloader').classList.add('preloader_hidden');
    document.querySelector('html').classList.remove('disabled-scroll');
}
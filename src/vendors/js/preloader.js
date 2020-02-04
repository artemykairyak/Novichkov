var preloader = null;
var startPos = 100;
var timer = null;
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive') {
        preloader = document.querySelector('.preloader__progress');
        document.querySelector('.main-section').classList.remove('disable-animation');
        timer = setInterval(function() {
            if (startPos > 0) {
                startPos -= 20;
                preloader.style.height = startPos + '%';
            } else {
                clearInterval(timer);
                document.querySelector('.preloader').classList.add('preloader_hidden');
                document.querySelector('html').classList.remove('disabled-scroll');
            }
        }, 50);
    }
});
// document.addEventListener('DOMContentLoaded', function() {
// 	setTimeout(function() {
//  preloader.style.height = '0%';
//     clearInterval(timer);
//     document.querySelector('.preloader').classList.add('preloader_hidden');
//     document.querySelector('html').classList.remove('disabled-scroll');
// 	}, 300)
// });
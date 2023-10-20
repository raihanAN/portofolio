// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const navfix = header.offsetTop;

    if (window.pageYOffset > navfix) {
        header.classList.add('navbar-fixed');

    } else {
        header.classList.remove('navbar-fixed')
    }
}

// hamburger

const hamburger = document.querySelector('#hamburger');
const navbar = document.querySelector('#navbar');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navbar.classList.toggle('hidden')
});
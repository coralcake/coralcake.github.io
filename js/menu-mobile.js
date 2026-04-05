const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const body = document.body;

function showMenu() {
    menu.classList.add('active');
    overlay.classList.add('active');
}

function hideMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
}

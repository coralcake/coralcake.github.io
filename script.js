const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-items');
const body = document.body;
const overlay = document.querySelector('.overlay');

toggleButton.addEventListener('click', (e) => {
  menu.classList.toggle('open');
  overlay.classList.toggle('active');
  body.classList.toggle('menu-open');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
    menu.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  }
});

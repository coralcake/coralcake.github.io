const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function showMenu() {
    menu.style.transition = 'transform 0.3s ease';
    menu.style.transform = 'translateX(0)';
    overlay.classList.add('active');
}

function hideMenu() {
    menu.style.transition = 'transform 0.3s ease';
    menu.style.transform = 'translateX(-100%)';
    overlay.classList.remove('active');
}

// RESET przy resize
function handleResize() {
    if (window.innerWidth > 1090) {
        // Desktop – menu zawsze widoczne
        menu.style.transition = 'none';  // bez animacji
        menu.style.transform = 'translateX(0)';
        overlay.classList.remove('active');
    } else {
        // Mobile – ukryj menu domyślnie, jeśli nie było otwarte
        menu.style.transition = 'none';
        if (!overlay.classList.contains('active')) {
            menu.style.transform = 'translateX(-100%)';
        }
    }
}

// Podłączamy event
window.addEventListener('resize', handleResize);

// Zamykanie po kliknięciu w link w menu
document.querySelectorAll('.nav-section a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1090) {
            hideMenu();
        }
    });
});

// Wywołanie przy starcie strony
handleResize();

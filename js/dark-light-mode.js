// Funkcja, która ustawia tryb na podstawie stanu przełącznika
window.onload = function() {
    const toggle1 = document.getElementById('modeToggle');
    const image1 = document.getElementById('modeImage');
    const image2 = document.getElementById('githubIcon');
    const image3 = document.getElementById('homeIcon');
    const image4 = document.getElementById('xmarkIcon');
    
    // Sprawdzamy, czy stan trybu jest zapisany w localStorage
    const savedMode = localStorage.getItem('darkMode');
    
    // Jeśli jest zapisany tryb ciemny, włączamy checkboxa
    if (savedMode === 'enabled') {
        toggle1.checked = true;
        if (image1) image1.src = '/svg/mode-dark.svg';
        if (image2) image2.src = '/svg/GitHub_Invertocat_White.svg';
        if (image3) image3.src = '/svg/home-night.svg';
        if (image4) image4.src = '/svg/xmark-night.svg';
        document.body.classList.add('dark-mode');
    } else {
        toggle1.checked = false;
        if (image1) image1.src = '/svg/mode-light.svg';
        if (image2) image2.src = '/svg/GitHub_Invertocat_Black.svg';
        if (image3) image3.src = '/svg/home-day.svg';
        if (image4) image4.src = '/svg/xmark-day.svg';
        document.body.classList.remove('dark-mode');
    }
    
    // Funkcja do zapisania stanu przełącznika
    toggle1.addEventListener('change', function() {
        if (toggle1.checked) {
            localStorage.setItem('darkMode', 'enabled');
            document.body.classList.add('dark-mode');
            if (image1) image1.src = '/svg/mode-dark.svg';
            if (image2) image2.src = '/svg/GitHub_Invertocat_White.svg';
            if (image3) image3.src = '/svg/home-night.svg';
            if (image4) image4.src = '/svg/xmark-night.svg';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            document.body.classList.remove('dark-mode');
            if (image1) image1.src = '/svg/mode-light.svg';
            if (image2) image2.src = '/svg/GitHub_Invertocat_Black.svg';
            if (image3) image3.src = '/svg/home-day.svg';
            if (image4) image4.src = '/svg/xmark-day.svg';
        }
    });
};

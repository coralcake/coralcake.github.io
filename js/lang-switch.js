let currentLang = localStorage.getItem('lang') || 'en';

async function loadLang(lang) {
    const filesAttr = document.body.dataset.langFiles;
    const files = filesAttr
        ? filesAttr.split(',').map(f => f.trim())
        : ['common'];

    if (!files.includes('common')) {
        files.unshift('common');
    }

    /*let translations = {};*/
    window.i18n = {};

    const responses = await Promise.all(
        files.map(file => fetch(`/lang/${lang}/${file}.json`))
    );

    const jsons = await Promise.all(responses.map(r => r.json()));

    jsons.forEach(obj => {
        /*translations = { ...translations, ...obj };*/
        window.i18n = { ...window.i18n, ...obj };
    });

    /*
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
    */
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = window.i18n[key] || key;
    });

    localStorage.setItem('lang', lang);
    currentLang = lang;

    updateFlags(lang);

    // odśwież generator
    /*
    if (typeof rerenderAllTables === 'function') {
        rerenderAllTables();
    }
    */
    // lepiej za pomocą eventu - generators.js nasłuchuje
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang }
    }));
}

function updateFlags(lang) {
    const flag1 = document.getElementById('flag1');
    const flag2 = document.getElementById('flag2');

    flag1.classList.toggle('darkened', lang !== 'en');
    flag2.classList.toggle('darkened', lang !== 'pl');
}

// init
document.addEventListener('DOMContentLoaded', () => {
    loadLang(currentLang);

    document.getElementById('flag1').addEventListener('click', () => loadLang('en'));
    document.getElementById('flag2').addEventListener('click', () => loadLang('pl'));
});

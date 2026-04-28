// =========================
// LANGUAGE
// =========================
function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
}

// =========================
// CONFIG
// =========================
const topicSources = {
    "tab-gen-8": "/json/8-category-generator.json",
    "tab-gen-10": "/json/10-category-generator.json",
    "tab-gen-chaos": "/json/chaos-based-generator.json",
    "tab-gen-3-act": "/json/3-act-generator.json",
    "tab-gen-arch": "/json/archetype-generator.json",
    "tab-gen-tex": "/json/textures-generator.json"
};

const generators = {
    "tab-gen-8": [
        "theme_or_object","location","emotion","style",
        "color_palette","perspective","weirdness_element","creative_constraint"
    ],
    "tab-gen-10": [
        "theme_or_object","location","era_or_mood","emotion",
        "color_palette","perspective","motion_element",
        "weirdness_element","symbol_or_motif","creative_constraint"
    ],
    "tab-gen-chaos": ["object","mutation","action","environment"],
    "tab-gen-3-act": ["act_1_start","act_2_complication","act_3_finale"],
    "tab-gen-arch": ["core_idea","influencing_force","twist"],
    "tab-gen-tex": [
        "characters","accessories","architecture","technology",
        "nature","atmospheric","animal","miscellaneous"
    ]
};

// =========================
// CACHE
// =========================
let cachedTopics = {};
let lastGenerated = {};

// =========================
// FETCH
// =========================
async function loadTopics(type) {
    if (cachedTopics[type]) return cachedTopics[type];

    const res = await fetch(topicSources[type]);
    const json = await res.json();

    cachedTopics[type] = json;
    return json;
}

// =========================
// UTILS
// =========================
function flattenValues(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "object") {
        return Object.values(value).flatMap(flattenValues);
    }
    return [];
}

function getValue(item) {
    const lang = getCurrentLang();

    if (typeof item === "object") {
        return item[lang] || item.en;
    }
    return item;
}

// =========================
// GENERATE
// =========================
async function generateRandomTopic(type, tableId) {
    const topics = await loadTopics(type);
    const keys = generators[type];

    const picks = {};

    keys.forEach(key => {
        const arr = flattenValues(topics[key]);
        picks[key] = Math.floor(Math.random() * arr.length);
    });

    lastGenerated[tableId] = { type, picks };

    renderTable(tableId);
}

// =========================
// RENDER
// =========================
function renderTable(tableId) {
    const entry = lastGenerated[tableId];
    if (!entry) return;

    const { type, picks } = entry;
    const topics = cachedTopics[type];
    const keys = generators[type];
    const lang = getCurrentLang();

    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');

    table.style.display = "table";
    tbody.innerHTML = '';

    keys.forEach(key => {
        const arr = flattenValues(topics[key]);
        const value = getValue(arr[picks[key]]);
        /*const label = translations[lang][key] || key;*/
        const label = window.i18n[key] || key;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${label}</strong></td>
            <td>${value}</td>
        `;
        tbody.appendChild(row);
    });
}

// =========================
// RE-RENDER ALL
// =========================
function rerenderAllTables() {
    Object.keys(lastGenerated).forEach(renderTable);
}

// =========================
// EVENTS
// =========================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.generateButton').forEach(btn => {
        btn.addEventListener('click', () => {
            generateRandomTopic(btn.dataset.type, btn.dataset.target);
        });
    });
});
document.addEventListener('languageChanged', () => {
    rerenderAllTables();
});

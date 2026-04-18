// =========================
// CONFIG: źródła danych
// =========================
const topicSources = {
    "tab-gen-8": "/json/8-category-generator.json",
    "tab-gen-10": "/json/10-category-generator.json",
    "tab-gen-chaos": "/json/chaos-based-generator.json",
    "tab-gen-3-act": "/json/3-act-generator.json",
    "tab-gen-arch": "/json/archetype-generator.json",
    "tab-gen-tex": "/json/textures-generator.json"
};

// =========================
// CONFIG: mapowanie pól
// =========================
const generators = {
    "tab-gen-8": {
        "Theme / Object": "theme_or_object",
        "Location": "location",
        "Emotion": "emotion",
        "Style": "style",
        "Color palette": "color_palette",
        "Perspective": "perspective",
        "Weirdness element": "weirdness_element",
        "Creative constraint": "creative_constraint"
    },

    "tab-gen-10": {
        "Theme / Object": "theme_or_object",
        "Location": "location",
        "Era / Mood": "era_or_mood",
        "Emotion": "emotion",
        "Color palette": "color_palette",
        "Perspective": "perspective",
        "Motion element": "motion_element",
        "Weirdness element": "weirdness_element",
        "Symbol / Motif": "symbol_or_motif",
        "Creative constraint": "creative_constraint"
    },
    
    "tab-gen-chaos": {
        "Object": "object",
        "Mutation": "mutation",
        "Action": "action",
        "Environment": "environment"
    },
    
    "tab-gen-3-act": {
        "Act 1: Start": "act_1_start",
        "Act 2: Complication": "act_2_complication",
        "Act 3: Finale": "act_3_finale"
    },
    
    "tab-gen-arch": {
        "Core idea": "core_idea",
        "Influencing force": "influencing_force",
        "Twist": "twist"
    },

    "tab-gen-tex": {
        "Characters": "characters",
        "Objects / Accessories": "accessories",
        "Architecture": "architecture",
        "Technology": "technology",
        "Nature": "nature",
        "Atmospheric / Weather": "atmospheric",
        "Animal": "animal",
        "Abstract / Miscellaneous": "miscellaneous"
    }
};

// =========================
// FETCH JSON
// =========================
async function loadTopics(type) {
    const path = topicSources[type];

    if (!path) {
        console.error("❌ Nieznany typ:", type);
        return null;
    }

    try {
        const response = await fetch(path);
        return await response.json();
    } catch (e) {
        console.error("❌ Błąd ładowania JSON:", e);
        return null;
    }
}

// =========================
// RANDOM SAFE
// =========================
function getRandomItem(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return "⚠ Brak danych";
    }
    return array[Math.floor(Math.random() * array.length)];
}

// =========================
// FLATTEN (obsługa zagnieżdżeń)
// =========================
function flattenValues(value) {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    if (typeof value === "object") {
        return Object.values(value).flatMap(v => flattenValues(v));
    }

    return [];
}

// =========================
// FORMAT
// =========================
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// =========================
// GENERATOR
// =========================
async function generateRandomTopic(type, targetTableId) {
    const topics = await loadTopics(type);
    if (!topics) return;

    const config = generators[type];
    if (!config) {
        console.error("❌ Brak configu:", type);
        return;
    }

    const result = {};

    for (const [label, key] of Object.entries(config)) {
        const raw = topics[key];

        if (!raw) {
            console.warn(`⚠ Brak klucza w JSON: ${key}`);
            result[label] = "⚠ Missing";
            continue;
        }

        const flattened = flattenValues(raw);
        result[label] = getRandomItem(flattened);
    }
    
    // Pokazuje tabelę przed renderowaniem
    const table = document.getElementById(targetTableId);
    if (table) {
        table.style.display = "table"; // Zmieniamy na table, aby była widoczna
    }
    
    renderTable(result, targetTableId);
}

// =========================
// RENDER DO KONKRETNEJ TABELI
// =========================
function renderTable(data, tableId) {
    const table = document.getElementById(tableId);

    if (!table) {
        console.error("❌ Nie znaleziono tabeli:", tableId);
        return;
    }

    const tbody = table.querySelector('tbody');

    if (!tbody) {
        console.error("❌ Tabela nie ma <tbody>:", tableId);
        return;
    }

    tbody.innerHTML = '';

    for (const [key, value] of Object.entries(data)) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><strong>${capitalize(key)}</strong></td>
            <td>${value}</td>
        `;

        tbody.appendChild(row);
    }
}

// =========================
// EVENTS
// =========================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.generateButton').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const target = button.dataset.target;

            if (!type || !target) {
                console.error("❌ Brakuje data-type lub data-target");
                return;
            }

            generateRandomTopic(type, target);
        });
    });
});

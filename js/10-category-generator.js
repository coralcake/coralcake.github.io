// Fetch data from the external JSON file
async function loadTopics() {
    const response = await fetch('../json/10-category-generator.json');
    const data = await response.json();
    return data;
}

// Function to get a random item from an array
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Helper to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate random topic and fill the table
async function generateRandomTopic() {
    const topics = await loadTopics();

    const result = {
        theme: getRandomItem(topics.theme),
        location: getRandomItem(topics.location),
        era: getRandomItem(topics.era_or_mood),
        emotion: getRandomItem(topics.emotion),
        color: getRandomItem(topics.color_palette),
        perspective: getRandomItem(topics.perspective),
        motion: getRandomItem(topics.motion_element),
        weirdness: getRandomItem(topics.weirdness_element),
        symbol: getRandomItem(topics.symbol_or_motif),
        constraint: getRandomItem(topics.creative_constraint)
    };

    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    for (const [key, value] of Object.entries(result)) {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.innerHTML = `<strong>${capitalize(key)}</strong>`;

        const valueCell = document.createElement('td');
        valueCell.textContent = value;

        row.appendChild(categoryCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    }

    return result;
}

// Event listener
document.getElementById('generateButton').addEventListener('click', generateRandomTopic);

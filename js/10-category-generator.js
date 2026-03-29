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
document.getElementById('generateButton').addEventListener('click', generateRandomTopic);// Fetch data from the external JSON file
async function loadTopics() {
    const response = await fetch('../json/10-category-generator.json');
    const data = await response.json();
    return data;
}

// Function to generate random index and get random item from array
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to generate random topic
async function generateRandomTopic() {
    const topics = await loadTopics();

    const theme = getRandomItem(topics.theme);
    const location = getRandomItem(topics.location);
    const era = getRandomItem(topics.era_or_mood);
    const emotion = getRandomItem(topics.emotion);
    const color = getRandomItem(topics.color_palette);
    const perspective = getRandomItem(topics.perspective);
    const motion = getRandomItem(topics.motion_element);
    const weirdness = getRandomItem(topics.weirdness_element);
    const symbol = getRandomItem(topics.symbol_or_motif);
    const constraint = getRandomItem(topics.creative_constraint);

    // Display the result
    const resultText = `
        <strong>Theme:</strong> ${theme} <br>
        <strong>Location:</strong> ${location} <br>
        <strong>Era/Mood:</strong> ${era} <br>
        <strong>Emotion:</strong> ${emotion} <br>
        <strong>Color Palette:</strong> ${color} <br>
        <strong>Perspective:</strong> ${perspective} <br>
        <strong>Motion Element:</strong> ${motion} <br>
        <strong>Weirdness Element:</strong> ${weirdness} <br>
        <strong>Symbol/Motif:</strong> ${symbol} <br>
        <strong>Creative Constraint:</strong> ${constraint}
    `;
    document.getElementById('result').innerHTML = resultText;
}

// Event listener for the button click
document.getElementById('generateButton').addEventListener('click', generateRandomTopic);


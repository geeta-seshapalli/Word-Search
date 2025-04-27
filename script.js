const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
const toggleButton = document.getElementById('toggleDarkMode');  // Dark Mode Toggle Button
const body = document.body;
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Event listener to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

// Function to show toast notifications (success or error)
function showToast(message, color = "#ff4d4d") { // default = red
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.backgroundColor = color;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000); // hide after 3 seconds
}

// Function to fetch word info from the dictionary API
const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = `
        <div class="spinner"></div>
        <p class="loading-text">Looking up the dictionary... 📖</p>
    `;
        // Success Toast
        showToast("✅ Word fetched successfully!", "#4BB543"); // green color

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `
            <h2><strong>Word: </strong> ${data[0].word} </h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning: </strong>${definitions.definition === undefined ? "Not Found!" : definitions.definition}</p>
            <p><strong>Example: </strong>${definitions.example === undefined ? "Not Found!" : definitions.example}</p>
            <p><strong>Antonyms:</strong></p>
        `;

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found!</span>`;
        } else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
            }
        }

        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More...</a></div>`;

    } catch (error) {
        resultDiv.innerHTML = "";
        showToast("❌ Sorry, the word could not be found!");
    }
}

// Toggle Dark Mode functionality
toggleButton.addEventListener('click', () => {
    // Toggle the dark mode class on the body, header, footer, and resultDiv
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    resultDiv.classList.toggle('dark-mode');
    // Toggle button icon (Moon/Sun)
    toggleButton.innerHTML = body.classList.contains('dark-mode') ? '🌙' : '🌞';
});

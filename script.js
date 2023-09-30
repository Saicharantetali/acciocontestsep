document.addEventListener("DOMContentLoaded", getCurrentImageOfTheDay);

// NASA API Key (Replace with your own key)
const apiKey = "EYQcUhU4sGXeYnBdBESvfbMe9f8c7bGz4PCwNANb";

// Event listener for form submission
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    getImageOfTheDay(selectedDate);
});

// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

// Function to fetch and display the image of the day for a specific date
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    
    // Fetch data from NASA API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Display the image and title in the current-image-container
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}" />
                <p>${data.explanation}</p>
            `;
            
            // Save the search date to local storage
            saveSearch(date);
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Function to save a date to local storage
function saveSearch(date) {
    // Retrieve the existing searches from local storage
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    
    // Add the new date to the searches array
    searches.push(date);
    
    // Save the updated searches array to local storage
    localStorage.setItem("searches", JSON.stringify(searches));
    
    // Display the updated search history
    addSearchToHistory(date);
}

// Function to display the search history in the UI
function addSearchToHistory(date) {
    // Retrieve the searches from local storage
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    
    // Get the search-history ul element
    const searchHistoryList = document.getElementById("search-history");
    
    // Clear the existing list items
    searchHistoryList.innerHTML = "";
    
    // Iterate through the searches and add them to the list
    searches.forEach((searchDate) => {
        const listItem = document.createElement("li");
        listItem.textContent = searchDate;
        
        // Add a click event listener to fetch and display the selected date's image
        listItem.addEventListener("click", () => getImageOfTheDay(searchDate));
        
        searchHistoryList.appendChild(listItem);
    });
}

// Load and display the search history when the page loads
addSearchToHistory();

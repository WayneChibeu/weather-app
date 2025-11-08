// This is the "hook" to your HTML elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weather-display');

// *** PASTE YOUR API KEY HERE ***
const apiKey = '9cd0cf6fa7efba7072e7d59eb6582cf2';

// Listen for a click on the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    
    // Only search if the user actually typed something
    if (city) {
        getWeather(city);
    }
});

// This is the function that gets the weather
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Update the weather display box with the results
        weatherDisplay.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
        
    } catch (error) {
        // Show an error message if the city isn't found
        weatherDisplay.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
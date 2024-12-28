const APIKey = '749ed3b23161f681db9687b704e47604'; // Keep this secure
const input = document.getElementById('inn');
const btn = document.getElementById('bbb');
const weatherDiv = document.getElementById('weather');
const loadingDiv = document.getElementById('loading');

btn.addEventListener('click', async () => {
    const city = input.value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`;
    loadingDiv.style.display = 'block'; // Show loading text

    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const tempCelsius = (data.main.temp - 273.15).toFixed(2);
        weatherDiv.innerHTML =
            `<h2>Weather in ${data.name}</h2>
            <p>Temperature: ${tempCelsius}°C</p>
            <p>Weather: ${data.weather[0].description}</p>`;
    } catch (error) {
        console.error('Error:', error);
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
        loadingDiv.style.display = 'none'; // Hide loading text
    }
});
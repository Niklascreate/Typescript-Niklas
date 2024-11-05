document.addEventListener('DOMContentLoaded', () => {
    const contentRef = document.querySelector('#savedWeatherContent');
    // Hämta sparad väderdata
    const savedWeather = JSON.parse(localStorage.getItem('weatherBank') || '[]');
    console.log('Sparad väderdata:', savedWeather);
    if (savedWeather.length > 0) {
        savedWeather.forEach(entry => {
            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-card'; // Lägg till en klass för kortet
            weatherItem.innerHTML = `
                <h2 class="weather-location">${entry.name}, ${entry.country}</h2>
                <p class="weather-temperature">Temperature: ${entry.temperature}°C</p>
                <p class="weather-description">Description: ${entry.weatherDescription}</p>
            `;
            // Lägg till click-eventlistener för att ta bort kortet
            weatherItem.addEventListener('click', () => {
                // Ta bort väderkortet från localStorage
                const updatedWeather = savedWeather.filter(item => item.name !== entry.name);
                localStorage.setItem('weatherBank', JSON.stringify(updatedWeather));
                // Ta bort kortet från DOM
                contentRef.removeChild(weatherItem);
            });
            contentRef.appendChild(weatherItem);
        });
    }
    else {
        contentRef.innerHTML = '<p class="no-weather">No Weatherdata saved, go back and search.</p>';
    }
});
export {};

document.addEventListener('DOMContentLoaded', () => {
    const contentRef = document.querySelector('#savedWeatherContent');
    if (!contentRef)
        return;
    const savedWeather = JSON.parse(localStorage.getItem('weatherBank') || '[]');
    if (savedWeather.length > 0) {
        savedWeather.forEach((entry) => {
            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-card';
            weatherItem.innerHTML = `
                <h2 class="weather-location">${entry.name}, ${entry.country}</h2>
                <p class="weather-temperature"><strong>Temperature:</strong> ${entry.temperature}°C</p>
                <p class="weather-description"><strong>Description:</strong> ${entry.weatherDescription}</p>
                <p class="weather-wind"><strong>Wind Speed:</strong> ${entry.wind_speed} km/h</p>
                <p class="weather-humidity"><strong>Humidity:</strong> ${entry.humidity}%</p>
                <p class="weather-time"><strong>Observation Time:</strong> ${entry.observation_time}</p>
            `;
            weatherItem.addEventListener('click', () => {
                const updatedWeather = savedWeather.filter(item => item.name !== entry.name);
                localStorage.setItem('weatherBank', JSON.stringify(updatedWeather));
                if (contentRef)
                    contentRef.removeChild(weatherItem);
            });
            contentRef.appendChild(weatherItem);
        });
    }
    else {
        contentRef.innerHTML = '<p class="no-weather">No Weather data saved, go back and search.</p>';
    }
});


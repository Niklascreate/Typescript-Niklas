document.addEventListener('DOMContentLoaded', () => {
    const savedWeather = JSON.parse(localStorage.getItem('weatherBank') || '[]');
    console.log('Sparad väderdata:', savedWeather);
    const contentRef = document.querySelector('#savedWeatherContent');
    if (savedWeather.length > 0) {
        savedWeather.forEach(entry => {
            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-card';
            weatherItem.innerHTML = `
                <h2>Väder i ${entry.name}, ${entry.country}</h2>
                <p><strong>Temperatur:</strong> ${entry.temperature}°C</p>
                <p><strong>Beskrivning:</strong> ${entry.weatherDescription}</p>
            `;
            contentRef.appendChild(weatherItem);
        });
    }
    else {
        contentRef.innerHTML = '<p>Ingen väderdata sparad.</p>';
    }
});

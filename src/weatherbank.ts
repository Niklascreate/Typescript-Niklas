import { WeatherBankResponse } from '../src/interfaces';

document.addEventListener('DOMContentLoaded', () => {
    const savedWeather: WeatherBankResponse[] = JSON.parse(localStorage.getItem('weatherBank') || '[]');
    console.log('Sparad väderdata:', savedWeather);
    const contentRef = document.querySelector('#savedWeatherContent') as HTMLElement;

    if (savedWeather.length > 0) {
        savedWeather.forEach(entry => {
            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-card';  // Lägg till en klass för kortet
            weatherItem.innerHTML = `
                <h2>Väder i ${entry.name}, ${entry.country}</h2>
                <p><strong>Temperatur:</strong> ${entry.temperature}°C</p>
                <p><strong>Beskrivning:</strong> ${entry.weatherDescription}</p>
            `;
            contentRef.appendChild(weatherItem);
        });
    } else {
        contentRef.innerHTML = '<p>Ingen väderdata sparad.</p>';
    }
});

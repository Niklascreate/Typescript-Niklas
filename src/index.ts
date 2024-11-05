import { Weather, ErrorResponse } from '../src/interfaces';

const API_KEY = 'fbcc6a07256c4c832d2facbc73645e52';
const BASE_URL = 'https://api.weatherstack.com/current';

document.addEventListener('DOMContentLoaded', () => {
    // Ändra till rätt ID för knappen
    const searchButton = document.querySelector('#SearchButton') as HTMLButtonElement; 
    const cityInput = document.querySelector('#cityInput') as HTMLInputElement;

    searchButton.addEventListener('click', async () => {
        const cityName = cityInput.value;
        if (cityName) {
            const weatherData = await fetchWeather(cityName);
            if (weatherData) {
                renderWeatherData(weatherData);
            }
        }
    });
});

async function fetchWeather(city: string): Promise<Weather | void> {
    try {
        const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${city}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Weather | ErrorResponse = await response.json();
        if ('error' in data) {
            throw new Error(data.error.info);
        }
        
        return data; // Returnera väderdata
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function renderWeatherData(data: Weather): void {
    const contentRef = document.querySelector('#weatherContent') as HTMLElement;

    if (contentRef) {
        const { location, current } = data;
        contentRef.innerHTML = `
            <h2>Väder i ${location.name}, ${location.country}</h2>
            <p><strong>Temperatur:</strong> ${current.temperature}°C</p>
            <p><strong>Beskrivning:</strong> ${current.weather_descriptions.join(', ')}</p>
            <p><strong>Vindhastighet:</strong> ${current.wind_speed} km/h</p>
            <p><strong>Fuktighet:</strong> ${current.humidity}%</p>
            <p><strong>Observerad tid:</strong> ${current.observation_time}</p>
        `;
    }
}

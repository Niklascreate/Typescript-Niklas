import { Location, CurrentWeather, Weather, ErrorResponse, WeatherBankResponse } from '../src/interfaces';

const API_KEY = 'fbcc6a07256c4c832d2facbc73645e52';
const BASE_URL = 'https://api.weatherstack.com/current';

document.addEventListener('DOMContentLoaded', () => {
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
        
        return data;
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
            <button id="saveWeatherBtn" class="weather-btn">Spara till Weatherbank</button>
        `;

        // Lägg till event listener för "Spara" knappen
        const saveButton = document.querySelector('#saveWeatherBtn') as HTMLButtonElement;
        saveButton.addEventListener('click', () => saveToWeatherBank(location, current));
    }
}

function saveToWeatherBank(location: Location, current: CurrentWeather): void {
    const savedWeather: WeatherBankResponse[] = JSON.parse(localStorage.getItem('weatherBank') || '[]');

    // Kolla om staden redan finns i Weather Bank
    if (!savedWeather.some(entry => entry.name === location.name)) {
        const weatherData: WeatherBankResponse = {
            name: location.name,
            country: location.country,
            temperature: current.temperature,
            weatherDescription: current.weather_descriptions.join(', '),
        };

        // Lägg till den nya väderinformationen i listan
        savedWeather.push(weatherData);
        localStorage.setItem('weatherBank', JSON.stringify(savedWeather));
        alert(`${location.name} har sparats i Weatherbank!`);
    } else {
        alert(`${location.name} finns redan i Weatherbank.`);
    }
}
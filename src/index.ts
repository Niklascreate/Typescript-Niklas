import { Location, CurrentWeather, Weather, ErrorResponse, WeatherBankResponse } from '../src/interfaces';

const API_KEY = 'ab65f288711882703ee086db2c5b75ce';
const BASE_URL = 'https://api.weatherstack.com/current';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#SearchButton') as HTMLButtonElement;
    const cityInput = document.querySelector('#cityInput') as HTMLInputElement;
    const notification = document.querySelector('#notification') as HTMLElement;

    
    const showNotification = (message: string, success: boolean = false): void => {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    searchButton.addEventListener('click', async () => {
        const cityName = cityInput.value;
        if (cityName) {
            const weatherData = await fetchWeather(cityName);
            if (weatherData) {
                renderWeatherData(weatherData);
            } else {
                showNotification('Could not fetch weather data. Please check the city name and try again.', false);
            }
        } else {
            showNotification('Please enter a city name to fetch weather data.', false);
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
            <h2 class="location-name">${location.name}, ${location.country}</h2>
            <p class="current-temperature">Temperature: ${current.temperature}°C</p>
            <p class="current-wind">Wind Speed: ${current.wind_speed} km/h</p>
            <p class="current-humidity">Humidity: ${current.humidity}%</p>
            <p class="current-time">Observation Time: ${current.observation_time}</p>
            <button id="saveWeatherBtn" class="save-btn">Save city to Weatherbank</button>
        `;

        // Event listener för "Spara"-knappen
        const saveButton = document.querySelector('#saveWeatherBtn') as HTMLButtonElement;
        saveButton.addEventListener('click', () => saveToWeatherBank(location, current));
    }
}
function saveToWeatherBank(location: Location, current: CurrentWeather): void {
    const savedWeather: WeatherBankResponse[] = JSON.parse(localStorage.getItem('weatherBank') || '[]');

    if (!savedWeather.some(entry => entry.name === location.name)) {
        const weatherData: WeatherBankResponse = {
            name: location.name,
            country: location.country,
            temperature: current.temperature,
            weatherDescription: current.weather_descriptions.join(', '),
            humidity: current.humidity,
            wind_speed: current.wind_speed,
            observation_time: current.observation_time
        };

        savedWeather.push(weatherData);
        localStorage.setItem('weatherBank', JSON.stringify(savedWeather));
        showNotification(`${location.name} saved to Weatherbank!`);
    } else {
        showNotification(`${location.name} already in Weatherbank.`);
    }
}

    function showNotification(message: string): void {
        const notification = document.getElementById('notification');
        if (!notification) return;
    
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('visible');
    
        setTimeout(() => {
            notification.classList.remove('visible');
            notification.classList.add('hidden');
        }, 3000);
}

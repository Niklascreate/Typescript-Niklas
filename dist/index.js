var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = 'fbcc6a07256c4c832d2facbc73645e52';
const BASE_URL = 'https://api.weatherstack.com/current';
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#SearchButton');
    const cityInput = document.querySelector('#cityInput');
    searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const cityName = cityInput.value;
        if (cityName) {
            const weatherData = yield fetchWeather(cityName);
            if (weatherData) {
                renderWeatherData(weatherData);
            }
            else {
                alert('Could not fetch weather data. Please check the city name and try again.');
            }
        }
        else {
            alert('Please enter a city name to fetch weather data.');
        }
    }));
});
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}?access_key=${API_KEY}&query=${city}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            if ('error' in data) {
                throw new Error(data.error.info);
            }
            return data;
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
        }
    });
}
function renderWeatherData(data) {
    const contentRef = document.querySelector('#weatherContent');
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
        const saveButton = document.querySelector('#saveWeatherBtn');
        saveButton.addEventListener('click', () => saveToWeatherBank(location, current));
    }
}
function saveToWeatherBank(location, current) {
    const savedWeather = JSON.parse(localStorage.getItem('weatherBank') || '[]');
    // Kolla om staden redan finns i Weather Bank
    if (!savedWeather.some(entry => entry.name === location.name)) {
        const weatherData = {
            name: location.name,
            country: location.country,
            temperature: current.temperature,
            weatherDescription: current.weather_descriptions.join(', '),
        };
        // Lägg till den nya väderinformationen i listan
        savedWeather.push(weatherData);
        localStorage.setItem('weatherBank', JSON.stringify(savedWeather));
        alert(`${location.name} have been saved in Weatherbank!`);
    }
    else {
        alert(`${location.name} Already in Weatherbank.`);
    }
}


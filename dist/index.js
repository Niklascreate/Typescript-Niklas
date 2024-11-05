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
    // Ändra till rätt ID för knappen
    const searchButton = document.querySelector('#SearchButton');
    const cityInput = document.querySelector('#cityInput');
    searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const cityName = cityInput.value;
        if (cityName) {
            const weatherData = yield fetchWeather(cityName);
            if (weatherData) {
                renderWeatherData(weatherData);
            }
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
            return data; // Returnera väderdata
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
            <h2>Väder i ${location.name}, ${location.country}</h2>
            <p><strong>Temperatur:</strong> ${current.temperature}°C</p>
            <p><strong>Beskrivning:</strong> ${current.weather_descriptions.join(', ')}</p>
            <p><strong>Vindhastighet:</strong> ${current.wind_speed} km/h</p>
            <p><strong>Fuktighet:</strong> ${current.humidity}%</p>
            <p><strong>Observerad tid:</strong> ${current.observation_time}</p>
        `;
    }
}

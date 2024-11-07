interface Location {
    name: string;
    country: string;
    region: string;
}

interface CurrentWeather {
    temperature: number;
    weather_descriptions: string[];
    humidity: number;
    wind_speed: number;
    observation_time: string;
}

interface Weather {
    location: Location;
    current: CurrentWeather;
}

interface WeatherBankResponse {
    name: string;
    country: string;
    temperature: number;
    weatherDescription: string;
    humidity: number;
    wind_speed: number;
    observation_time: string;
}

interface ErrorResponse {
    error: {
        code: number;
        type: string;
        info: string;
    };
}

export { Location, CurrentWeather, Weather, WeatherBankResponse, ErrorResponse };
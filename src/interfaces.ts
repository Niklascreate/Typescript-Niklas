interface Weather {
    location: {
        name: string;
        country: string;
        region: string;
    };
    current: {
        temperature: number;
        weather_descriptions: string[];
        humidity: number;
        wind_speed: number;
        observation_time: string;
    };
}

interface ErrorResponse {
    error: {
        code: number;
        type: string;
        info: string;
    };
}


export { Weather, ErrorResponse };
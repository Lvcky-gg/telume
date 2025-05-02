import axios from "axios"
import {view  }from "./map"

interface WeatherApiResponse {
    weather: { main: string }[];
    clouds: { all: number };
}

interface WeatherEnvironment {
    type: "rainy" | "snowy" | "cloudy";
    cloudCover: number;
    precipitation?: number;
}

declare const apiKey: string;

export const getWeather = async (lat: number, lon: number): Promise<void> => {
    const apiKey = import.meta.env.VITE_WEATHER_ID as string;

    return await axios.get<WeatherApiResponse>(`
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=daily&appid=${apiKey}
    `)
    .then(response => {
        let data = response.data;
        let weather = data.weather[0].main;
        switch (weather) {
            case 'Rain':
                (view.environment.weather as WeatherEnvironment) = {
                    type: "rainy",
                    cloudCover: data.clouds.all / 100,
                    precipitation: 0.6
                };
                break;
            case 'Snow':
                (view.environment.weather as WeatherEnvironment) = {
                    type: "snowy",
                    cloudCover: data.clouds.all / 100,
                    precipitation: 0.6
                };
                break;
            case 'Clouds':
                (view.environment.weather as WeatherEnvironment) = {
                    type: "cloudy",
                    cloudCover: data.clouds.all / 100
                };
                break;
            default:
                break;
        }
    })
    .catch((err: unknown) => {
        console.error(err);
    });
}

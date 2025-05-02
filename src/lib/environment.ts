import axios from "axios"
import {view  }from "./map"


interface WeatherApiResponse {
    weather: { main: string }[];
    clouds: { all: number };
    coord: { lat: number; lon: number };
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
    .then(async response => {
        let data = response.data;
        let weather = data.weather[0].main;
        // const timeZone = await getTimeZoneFromPoint(data.coord.lat, data.coord.lon);


        // view.environment.lighting ={
        //     type: "sun",
        //     date: new Date(timeZone as string)
        // };
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
                view.environment
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
        console.log(view.environment.weather);
    })
    .catch((err: unknown) => {
        console.error(err);
    });
}

// export async function getTimeZoneFromPoint(lat: number , lon: number): Promise<string | null> {
// const url = `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`;
// const response = await fetch(url);
// const data = await response.json();
// return data.currentLocalTime;

// }

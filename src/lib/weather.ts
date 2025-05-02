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
        // const localTime = getLocalTimeForZone(timeZone as string);
        // console.log(localTime);
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

// export async function getTimeZoneFromPoint(lat: number, lon: number): Promise<string | null> {
//     const url = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Time_Zones/FeatureServer/0/query";
//     const params = {
//         f: "json",
//         geometry: `${lon},${lat}`,
//         geometryType: "esriGeometryPoint",
//         inSR: 4326,
//         spatialRel: "esriSpatialRelIntersects",
//         outFields: "*",
//         returnGeometry: false
//     };
//     const response = await axios.get(url, { params });
//     const features = response.data.features;
//     console.log(features[0].ZONE)
//     if (features && features.length > 0) {

//         return features[0].ZONE;
//     }
//     return null;
// }

// export function getLocalTimeForZone(offset: number): Date {
//     const now = new Date();

//     const localTime = new Date(now.getTime() + (offset * 60 * 60 * 1000));
//     console.log(localTime)
//     return localTime;
// }

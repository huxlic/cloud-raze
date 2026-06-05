import axios from "axios";


const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,pressure_msl,relative_humidity_2m,rain&timezone=auto

export const getCoordinates = async(city: string) => {
    const response = await axios(`${GEO_URL}?name=${city}&count=1`)
    if (!response.data.results) return;
    const { latitude, longitude, name, country } = response.data.results[0];

    return {
        latitude,
        longitude,
        name,
        country
    }
}

export const getWeather = async(lat: number, lon: number) => {
    const response = await axios(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,pressure_msl,relative_humidity_2m,rain&timezone=auto`);
    const { temperature_2m, weather_code, pressure_msl, relative_humidity_2m, rain } = response.data.hourly;

    return {
        temperature_2m,
        weather_code,
        pressure_msl,
        relative_humidity_2m,
        rain
    }

}

const getWeatherByCity = async(city: string) => {
    // const {latitude, longitude, name, country} = await getCoordinates(city);
    const response = await getCoordinates(city);

    if (!response) return;

    const { latitude, longitude, name, country } = response;
    const weather = await(getWeather(latitude, longitude));

    return {
        latitude,
        longitude,
        name,
        country,
        temperature_2m: weather.temperature_2m,
        weather_code: weather.weather_code,
        pressure_msl: weather.pressure_msl,
        relative_humidity_2m: weather.relative_humidity_2m,
        rain: weather.rain
    }
}

export default getWeatherByCity;

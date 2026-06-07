import axios from "axios";


const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

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
    const response = await axios(
      `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,weather_code,pressure_msl,relative_humidity_2m,rain,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,weather_code&current=temperature_2m,apparent_temperature,weather_code,pressure_msl,relative_humidity_2m,rain,wind_speed_10m,wind_direction_10m&timezone=auto`,
    );
    const data = {...response.data.current, ...response.data.daily};

    return data;

}

const getWeatherByCity = async(city: string) => {
    const response = await getCoordinates(city);

    if (!response) return;

    const { latitude, longitude, name, country } = response;
    const weather = await(getWeather(latitude, longitude));

    return {name, country, ...weather};
}

export default getWeatherByCity;

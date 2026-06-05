import axios from "axios";


const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const getCoordinates = async(city: string) => {
    const response = await axios(`${GEO_URL}?name=${city}&count=1`)
    const { latitude, longitude, name, country } = response.data.results[0];

    return {
        latitude,
        longitude,
        name,
        country
    }
}

export const getWeather = () => {
    
}
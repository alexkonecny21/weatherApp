import MessageToast from "../components/MessageToast";

const reverseGeocodingAPI = import.meta.env.VITE_REVERSE_GEOCODING_API_KEY;

// fetch weather data
export const getWeatherDataByCity = async (city) => {
    try{
        const place = await geocodeCity(city);

        if(!place || place.length === 0){
            MessageToast("City not found", "Check the spelling and try again.");
            return null;
        }

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${place[0].latitude}&longitude=${place[0].longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,visibility,is_day,wind_direction_10m,uv_index,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&hourly=temperature_2m,weather_code&timezone=auto`;

        const response = await fetch(weatherURL);
        if(!response.ok){
            throw new Error("Couldn't fetch the data.");
        }

        const data = await response.json();

        return {
            place: place[0],
            data
        };

    }catch(e){
        console.log(e);
        MessageToast("Couldn't load weather", "Check your connection and try again.");
        return null;
    }
}

export const getWeatherDataByCoordinates = async (lat, lon) => {
    try{
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,visibility,is_day,wind_direction_10m,uv_index,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&hourly=temperature_2m,weather_code&timezone=auto`;

        const [weatherResponse, place] = await Promise.all([
            fetch(weatherURL),
            geocodeCoordinates(lat, lon),
        ]);

        if(!weatherResponse.ok){
            throw new Error("Couldn't fetch the data.");
        }

        const data = await weatherResponse.json();

        return {
            place,
            data
        };

    }catch(e){
        console.log(e);
        MessageToast("Couldn't load weather", "Check your connection and try again.");
        return null;
    }
}

// geocoding
export async function geocodeCity(city) {
    try {
        const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

        const response = await fetch(geocodingURL);

        if (!response.ok) {
            throw new Error("Couldn't fetch the data.");
        }

        const place = await response.json();

        if (!place.results || place.results.length === 0) {
            return [];
        }

        return place.results;
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function geocodeCoordinates(lat, lon, lang = "en") {
    try {
        const response = await fetch(
            `https://api-bdc.net/data/reverse-geocode-with-timezone?latitude=${lat}&longitude=${lon}&localityLanguage=${lang}&key=${reverseGeocodingAPI}`
        );

        if (!response.ok) {
            throw new Error("Couldn't look up that city.");
        }

        const data = await response.json();

        return {
            name: data.locality || "Current Location",
            country_code: data.countryCode || "",
        };
    } catch (error) {
        console.log(error.message)
        MessageToast("Couldn't identify location", "Showing weather without a place name.");
        return { name: "Current Location", country_code: "" };
    }
}

// current location
export function getUsersCurrentLocation(){
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            MessageToast("Location unavailable", "Your browser doesn't support geolocation.");
            reject(new Error("Geolocation is not supported by this browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                resolve({ latitude, longitude });
            },
            (error) => {
                console.log("User denied or an error occurred.");
                MessageToast("Location access denied", "Allow location access or search for a city instead.");
                reject(error);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    });
}

export async function isGPSAllowed(){
    if (!navigator.permissions) {
        console.log("Permissions API not supported.");
        return "unsupported";
    }

    const status = await navigator.permissions.query({ name: "geolocation" });

    if (status.state === "granted") return true;
    return false;
}
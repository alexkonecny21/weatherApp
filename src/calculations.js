
// LOCAL TIME
export function getLocationLocalTime(timeZone){
    return new Intl.DateTimeFormat("sk-SK", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "numeric",
    }).format(new Date());
}

// WEATHER ICONS
export function getWeatherIconPath(code, isDay) {
    const dayNight = isDay ? "day" : "night";
    let condition;

    if (code === 0) {
        condition = `clear-${dayNight}`;
    } else if (code === 1 || code === 2) {
        condition = `partly-cloudy-${dayNight}`;
    } else if (code === 3) {
        condition = "overcast";
    } else if (code === 45 || code === 48) {
        condition = "fog";
    } else if ([51, 53, 55, 56, 57].includes(code)) {
        condition = "drizzle";
    } else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        condition = "rain";
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        condition = "snow";
    } else if ([95, 96, 99].includes(code)) {
        condition = "thunderstorms";
    } else {
        condition = "cloudy";
    }

    return `${condition}.svg`;
}

// WEATHER CONDITION
export function describeWeatherCode(code) {
    const descriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    };

    return descriptions[code] || "Unknown";
}

export function getWindDirection(degrees) {
    const compassDirections = [
        { label: "N", min: 337.5, max: 22.5 },
        { label: "NE", min: 22.5, max: 67.5 },
        { label: "E", min: 67.5, max: 112.5 },
        { label: "SE", min: 112.5, max: 157.5 },
        { label: "S", min: 157.5, max: 202.5 },
        { label: "SW", min: 202.5, max: 247.5 },
        { label: "W", min: 247.5, max: 292.5 },
        { label: "NW", min: 292.5, max: 337.5 },
    ];

    const matchedObject = compassDirections.reduce((prev, current) => {
        const isMatch =
            current.min > current.max
                ? degrees >= current.min || degrees < current.max
                : degrees >= current.min && degrees < current.max;

        return isMatch ? current : prev;
    }, compassDirections[0]);

    return matchedObject.label;
}

export function getVisibilityCondition(visibility){
    if (visibility === undefined || visibility === null) {
        return "—";
    } else if (visibility >= 10000) {
        return `Unlimited`;
    } else if (visibility >= 9000) {
        return `Mostly unlimited`;
    } else if (visibility >= 5000) {
        return `Moderate visibility`;
    } else {
        return `Restricted visibility`;
    }
}

export function convertTemperature(unit, value) {
    if (unit === "F") return Math.round(((value * (9 / 5)) + 32) * 10) / 10;
    return Math.round((value) * 10) / 10;
}

export function calculateSportsCondition(
    todaysTemperature,
    rainProbability,
    windSpeed,
    humidity,
    visibility,
    uvIndex
) {
    let hikingPoints = 100;
    let cyclingPoints = 100;
    let runningPoints = 100;
    let tennisPoints = 100;
    let golfPoints = 100;
    let campingPoints = 100;

    // =========================
    // 🥾 HIKING
    // =========================

    // temperature
    if (todaysTemperature >= 10 && todaysTemperature <= 22) {
        hikingPoints -= 0;
    } else if (todaysTemperature >= 5 && todaysTemperature < 10 || todaysTemperature > 22 && todaysTemperature <= 27) {
        hikingPoints -= 5;
    } else if (todaysTemperature >= 0 && todaysTemperature < 5 || todaysTemperature > 27 && todaysTemperature <= 32) {
        hikingPoints -= 10;
    } else {
        hikingPoints -= 15;
    }

    // rain
    if (rainProbability <= 10) {
        hikingPoints -= 0;
    } else if (rainProbability <= 30) {
        hikingPoints -= 5;
    } else if (rainProbability <= 50) {
        hikingPoints -= 10;
    } else if (rainProbability <= 70) {
        hikingPoints -= 20;
    } else if (rainProbability <= 85) {
        hikingPoints -= 25;
    } else {
        hikingPoints -= 30;
    }

    // wind
    if (windSpeed < 15) {
        hikingPoints -= 0;
    } else if (windSpeed <= 25) {
        hikingPoints -= 5;
    } else if (windSpeed <= 35) {
        hikingPoints -= 10;
    } else if (windSpeed <= 45) {
        hikingPoints -= 15;
    } else {
        hikingPoints -= 20;
    }

    // humidity
    if (humidity >= 30 && humidity <= 70) {
        hikingPoints -= 0;
    } else if (humidity > 70 && humidity <= 80 || humidity >= 20 && humidity < 30) {
        hikingPoints -= 5;
    } else if (humidity > 80 && humidity <= 90 || humidity >= 10 && humidity < 20) {
        hikingPoints -= 7;
    } else {
        hikingPoints -= 10;
    }

    // visibility
    if (visibility > 10) {
        hikingPoints -= 0;
    } else if (visibility >= 5) {
        hikingPoints -= 5;
    } else if (visibility >= 2) {
        hikingPoints -= 7;
    } else {
        hikingPoints -= 15;
    }

    // UV
    if (uvIndex <= 3) {
        hikingPoints -= 0;
    } else if (uvIndex <= 6) {
        hikingPoints -= 3;
    } else if (uvIndex <= 9) {
        hikingPoints -= 5;
    } else {
        hikingPoints -= 10;
    }


    // =========================
    // 🚴 CYCLING
    // =========================

    // temperature
    if (todaysTemperature >= 12 && todaysTemperature <= 24) {
        cyclingPoints -= 0;
    } else if (todaysTemperature >= 7 && todaysTemperature < 12 || todaysTemperature > 24 && todaysTemperature <= 29) {
        cyclingPoints -= 5;
    } else if (todaysTemperature >= 2 && todaysTemperature < 7 || todaysTemperature > 29 && todaysTemperature <= 33) {
        cyclingPoints -= 10;
    } else {
        cyclingPoints -= 15;
    }

    // rain
    if (rainProbability <= 10) {
        cyclingPoints -= 0;
    } else if (rainProbability <= 30) {
        cyclingPoints -= 5;
    } else if (rainProbability <= 50) {
        cyclingPoints -= 10;
    } else if (rainProbability <= 70) {
        cyclingPoints -= 15;
    } else if (rainProbability <= 85) {
        cyclingPoints -= 20;
    } else {
        cyclingPoints -= 25;
    }

    // wind
    if (windSpeed < 15) {
        cyclingPoints -= 0;
    } else if (windSpeed <= 25) {
        cyclingPoints -= 5;
    } else if (windSpeed <= 35) {
        cyclingPoints -= 15;
    } else if (windSpeed <= 45) {
        cyclingPoints -= 20;
    } else {
        cyclingPoints -= 30;
    }

    // humidity
    if (humidity >= 30 && humidity <= 70) {
        cyclingPoints -= 0;
    } else if (humidity <= 80) {
        cyclingPoints -= 5;
    } else if (humidity <= 90) {
        cyclingPoints -= 7;
    } else {
        cyclingPoints -= 10;
    }

    // visibility
    if (visibility > 10) {
        cyclingPoints -= 0;
    } else if (visibility >= 5) {
        cyclingPoints -= 3;
    } else if (visibility >= 2) {
        cyclingPoints -= 7;
    } else {
        cyclingPoints -= 10;
    }

    // UV
    if (uvIndex <= 3) {
        cyclingPoints -= 0;
    } else if (uvIndex <= 6) {
        cyclingPoints -= 3;
    } else if (uvIndex <= 9) {
        cyclingPoints -= 5;
    } else {
        cyclingPoints -= 10;
    }


    // =========================
    // 🏃 RUNNING
    // =========================

    // temperature
    if (todaysTemperature >= 8 && todaysTemperature <= 20) {
        runningPoints -= 0;
    } else if (todaysTemperature >= 5 && todaysTemperature < 8 || todaysTemperature > 20 && todaysTemperature <= 25) {
        runningPoints -= 7;
    } else if (todaysTemperature >= 0 && todaysTemperature < 5 || todaysTemperature > 25 && todaysTemperature <= 30) {
        runningPoints -= 15;
    } else {
        runningPoints -= 25;
    }

    // rain
    if (rainProbability <= 10) {
        runningPoints -= 0;
    } else if (rainProbability <= 30) {
        runningPoints -= 5;
    } else if (rainProbability <= 50) {
        runningPoints -= 10;
    } else if (rainProbability <= 70) {
        runningPoints -= 15;
    } else if (rainProbability <= 85) {
        runningPoints -= 18;
    } else {
        runningPoints -= 20;
    }

    // wind
    if (windSpeed < 15) {
        runningPoints -= 0;
    } else if (windSpeed <= 25) {
        runningPoints -= 5;
    } else if (windSpeed <= 35) {
        runningPoints -= 10;
    } else if (windSpeed <= 45) {
        runningPoints -= 12;
    } else {
        runningPoints -= 15;
    }

    // humidity
    if (humidity >= 30 && humidity <= 60) {
        runningPoints -= 0;
    } else if (humidity > 60 && humidity <= 70 || humidity >= 20 && humidity < 30) {
        runningPoints -= 5;
    } else if (humidity > 70 && humidity <= 80 || humidity >= 10 && humidity < 20) {
        runningPoints -= 10;
    } else {
        runningPoints -= 20;
    }

    // visibility
    if (visibility > 10) {
        runningPoints -= 0;
    } else if (visibility >= 5) {
        runningPoints -= 3;
    } else if (visibility >= 2) {
        runningPoints -= 7;
    } else {
        runningPoints -= 10;
    }

    // UV
    if (uvIndex <= 3) {
        runningPoints -= 0;
    } else if (uvIndex <= 6) {
        runningPoints -= 3;
    } else if (uvIndex <= 9) {
        runningPoints -= 5;
    } else {
        runningPoints -= 10;
    }


    // =========================
    // 🎾 TENNIS
    // =========================

    // temperature
    if (todaysTemperature >= 15 && todaysTemperature <= 25) {
        tennisPoints -= 0;
    } else if (todaysTemperature >= 10 && todaysTemperature < 15 || todaysTemperature > 25 && todaysTemperature <= 30) {
        tennisPoints -= 5;
    } else if (todaysTemperature >= 5 && todaysTemperature < 10 || todaysTemperature > 30 && todaysTemperature <= 33) {
        tennisPoints -= 10;
    } else {
        tennisPoints -= 15;
    }

    // rain
    if (rainProbability <= 10) {
        tennisPoints -= 0;
    } else if (rainProbability <= 30) {
        tennisPoints -= 5;
    } else if (rainProbability <= 50) {
        tennisPoints -= 10;
    } else if (rainProbability <= 70) {
        tennisPoints -= 15;
    } else if (rainProbability <= 85) {
        tennisPoints -= 20;
    } else {
        tennisPoints -= 25;
    }

    // wind
    if (windSpeed < 15) {
        tennisPoints -= 0;
    } else if (windSpeed <= 25) {
        tennisPoints -= 5;
    } else if (windSpeed <= 35) {
        tennisPoints -= 15;
    } else if (windSpeed <= 45) {
        tennisPoints -= 25;
    } else {
        tennisPoints -= 30;
    }

    // humidity
    if (humidity >= 30 && humidity <= 70) {
        tennisPoints -= 0;
    } else if (humidity <= 80) {
        tennisPoints -= 5;
    } else if (humidity <= 90) {
        tennisPoints -= 7;
    } else {
        tennisPoints -= 10;
    }

    // visibility
    if (visibility > 10) {
        tennisPoints -= 0;
    } else if (visibility >= 5) {
        tennisPoints -= 3;
    } else if (visibility >= 2) {
        tennisPoints -= 7;
    } else {
        tennisPoints -= 10;
    }

    // UV
    if (uvIndex <= 3) {
        tennisPoints -= 0;
    } else if (uvIndex <= 6) {
        tennisPoints -= 3;
    } else if (uvIndex <= 9) {
        tennisPoints -= 5;
    } else {
        tennisPoints -= 10;
    }


    // =========================
    // ⛳ GOLF
    // =========================

    // temperature
    if (todaysTemperature >= 12 && todaysTemperature <= 25) {
        golfPoints -= 0;
    } else if (todaysTemperature >= 7 && todaysTemperature < 12 || todaysTemperature > 25 && todaysTemperature <= 30) {
        golfPoints -= 5;
    } else if (todaysTemperature >= 2 && todaysTemperature < 7 || todaysTemperature > 30 && todaysTemperature <= 33) {
        golfPoints -= 10;
    } else {
        golfPoints -= 15;
    }

    // rain
    if (rainProbability <= 10) {
        golfPoints -= 0;
    } else if (rainProbability <= 30) {
        golfPoints -= 5;
    } else if (rainProbability <= 50) {
        golfPoints -= 10;
    } else if (rainProbability <= 70) {
        golfPoints -= 15;
    } else if (rainProbability <= 85) {
        golfPoints -= 20;
    } else {
        golfPoints -= 25;
    }

    // wind
    if (windSpeed < 15) {
        golfPoints -= 0;
    } else if (windSpeed <= 25) {
        golfPoints -= 5;
    } else if (windSpeed <= 35) {
        golfPoints -= 12;
    } else if (windSpeed <= 45) {
        golfPoints -= 18;
    } else {
        golfPoints -= 25;
    }

    // humidity
    if (humidity >= 30 && humidity <= 70) {
        golfPoints -= 0;
    } else if (humidity <= 80) {
        golfPoints -= 5;
    } else if (humidity <= 90) {
        golfPoints -= 7;
    } else {
        golfPoints -= 10;
    }

    // visibility
    if (visibility > 10) {
        golfPoints -= 0;
    } else if (visibility >= 5) {
        golfPoints -= 5;
    } else if (visibility >= 2) {
        golfPoints -= 10;
    } else {
        golfPoints -= 15;
    }

    // UV
    if (uvIndex <= 3) {
        golfPoints -= 0;
    } else if (uvIndex <= 6) {
        golfPoints -= 3;
    } else if (uvIndex <= 9) {
        golfPoints -= 5;
    } else {
        golfPoints -= 10;
    }


    // =========================
    // 🏕️ CAMPING
    // =========================

    // temperature
    if (todaysTemperature >= 15 && todaysTemperature <= 25) {
        campingPoints -= 0;
    } else if (todaysTemperature >= 10 && todaysTemperature < 15 || todaysTemperature > 25 && todaysTemperature <= 30) {
        campingPoints -= 10;
    } else if (todaysTemperature >= 5 && todaysTemperature < 10 || todaysTemperature > 30 && todaysTemperature <= 33) {
        campingPoints -= 15;
    } else {
        campingPoints -= 25;
    }

    // rain
    if (rainProbability <= 10) {
        campingPoints -= 0;
    } else if (rainProbability <= 30) {
        campingPoints -= 5;
    } else if (rainProbability <= 50) {
        campingPoints -= 10;
    } else if (rainProbability <= 70) {
        campingPoints -= 20;
    } else if (rainProbability <= 85) {
        campingPoints -= 25;
    } else {
        campingPoints -= 30;
    }

    // wind
    if (windSpeed < 15) {
        campingPoints -= 0;
    } else if (windSpeed <= 25) {
        campingPoints -= 5;
    } else if (windSpeed <= 35) {
        campingPoints -= 10;
    } else if (windSpeed <= 45) {
        campingPoints -= 15;
    } else {
        campingPoints -= 20;
    }

    // humidity
    if (humidity >= 30 && humidity <= 70) {
        campingPoints -= 0;
    } else if (humidity <= 80) {
        campingPoints -= 5;
    } else if (humidity <= 90) {
        campingPoints -= 7;
    } else {
        campingPoints -= 10;
    }

    // visibility
    if (visibility > 10) {
        campingPoints -= 0;
    } else if (visibility >= 5) {
        campingPoints -= 2;
    } else if (visibility >= 2) {
        campingPoints -= 3;
    } else {
        campingPoints -= 5;
    }

    // UV
    if (uvIndex <= 3) {
        campingPoints -= 0;
    } else if (uvIndex <= 6) {
        campingPoints -= 3;
    } else if (uvIndex <= 9) {
        campingPoints -= 5;
    } else {
        campingPoints -= 10;
    }

    const condition = (points) => {
        return points >= 85 ? "Great" : points >= 70 ? "Good" : points >= 50 ? "Fair" : "Poor";
    }

    return [
        { sportName: "Hiking", icon: "hiking.svg", condition: condition(hikingPoints) },
        { sportName: "Cycling", icon: "cycling.svg", condition: condition(cyclingPoints) },
        { sportName: "Running", icon: "golf.svg", condition: condition(runningPoints) },
        { sportName: "Tennis", icon: "tennis.svg", condition: condition(tennisPoints) },
        { sportName: "Golf", icon: "golf.svg", condition: condition(golfPoints) },
        { sportName: "Camping", icon: "camping.svg", condition: condition(campingPoints) }
    ];
}
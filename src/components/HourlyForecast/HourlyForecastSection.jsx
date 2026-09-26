import { useMemo } from "react";
import { ScrollShadow } from "@heroui/react";
import { getLocationLocalTime, getWeatherIconPath } from "../../calculations";
import HourlyForecastCard from "./HourlyForecastCard";

function HourlyForecastSection({ data, tempUnit }) {
    const currentHour = Number(
        getLocationLocalTime(data.timezone).substr(0, 2)
    );

    const nightHours = [
        "21", "22", "23", "00", "01",
        "02", "03", "04", "05", "06"
    ];
    const hourlyForecast = useMemo(() => {
        const result = [];
        for (let i = currentHour + 1; i <= currentHour + 24; i++) {
            result.push({
                hour: data.hourly.time[i].substr(11, 5),
                temperature: data.hourly.temperature_2m[i],
                weatherCode: data.hourly.weather_code[i],
            });
        }
        return result;
    }, [data, currentHour]);

    return (
        <ScrollShadow
            orientation="horizontal"
            className="pb-4 pt-4"
        >
            <div className="hourly-forecast-cards flex w-max gap-4">
                {hourlyForecast.map(
                    ({ hour, temperature, weatherCode }, index) => (
                        <HourlyForecastCard
                            key={index}
                            time={hour}
                            icon={getWeatherIconPath(
                                weatherCode,
                                nightHours.includes(hour.substr(0, 2))
                                    ? false
                                    : true
                            )}
                            temp={temperature}
                            tempUnit={tempUnit}
                        />
                    )
                )}
            </div>
        </ScrollShadow>
    );
}

export default HourlyForecastSection;
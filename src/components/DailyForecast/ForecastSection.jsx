import { useMemo } from "react";
import ActivityCard from "./ActivityCard"
import DailyForecastCard from "./DailyForecastCard"
import { calculateSportsCondition, getWeatherIconPath } from "../../calculations"

function ForecastSection({ apiData, tempUnit }) {

  const {
      temperature_2m_max: maxTemps,
      temperature_2m_min: minTemps,
      weather_code: weatherCodes,
      time: dates,
      precipitation_probability_max: rainProbability,
  } = apiData.data.daily;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Recompute only when apiData actually changes (e.g. new city/coords),
  // not on unrelated re-renders like the unit toggle.
  const forecastDayObject = useMemo(() => {
    return dates.map((dateString, index) => {
      const weatherIcon = getWeatherIconPath(weatherCodes[index], true);

      const date = new Date(dateString);
      const dayName = index === 0 ? "Today" : days[date.getDay()];

      return {
          currentDay: dayName,
          weatherIcon: weatherIcon,
          minTemp: minTemps[index],
          maxTemp: maxTemps[index],
          rainProbability: rainProbability[index],
      };
    });
  }, [dates, weatherCodes, minTemps, maxTemps, rainProbability]);

  const sportsConditions = useMemo(() => {
    return calculateSportsCondition(
      apiData.data.current.temperature_2m,
      apiData.data.current.precipitation_probability,
      apiData.data.current.wind_speed_10m,
      apiData.data.current.relative_humidity_2m,
      apiData.data.current.visibility / 1000,
      apiData.data.current.uv_index
    );
  }, [apiData.data.current]);

  return (
    <>
        <div className="forecast-section forecast-section-layout">
              <div className="forecast-weather-cards-section">

              <div className="forecast-cards">
                {forecastDayObject.map(({ currentDay, weatherIcon, maxTemp, minTemp, rainProbability }, index) => {
                  return (
                    <DailyForecastCard key={index} day={currentDay} rainProbability={rainProbability} icon={weatherIcon} maxTemp={maxTemp} minTemp={minTemp} tempUnit={tempUnit}/>
                  )
                })}
              </div>
              </div>

              <div className="activity-conditions-panel">
                <div className="activity-cards">
                  {sportsConditions.map((sport, index) => {
                    return (
                      <ActivityCard key={index} icon={sport.icon} sportName={sport.sportName} condition={sport.condition}/>
                    )
                  })}
                </div>
              </div>
            </div>
    </>
  )
}

export default ForecastSection
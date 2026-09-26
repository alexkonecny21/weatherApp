import { getVisibilityCondition } from "../../calculations";

import CurrentWeather from "./CurrentWeather"
import CurrentWeatherCard from "./CurrentWeatherCard";

function CurrentWeatherSection({apiData, currentUnit}) {

    const weatherCardsParameters = [
        { icon: "humidity.svg", title: "Humidity", value: apiData.data.current.relative_humidity_2m, unit: "%" },
        { icon: "wind.svg", title: "Wind", value: apiData.data.current.wind_speed_10m, unit: "km/h" },
        { icon: "visibility.svg", title: "Visibility", value: getVisibilityCondition(apiData.data.current.visibility), unit: "" },
        { icon: "pressure.svg", title: "Pressure", value: apiData.data.current.surface_pressure, unit: "hPa" }
    ];

  return (
    <>
        <CurrentWeather
            apiData={apiData}
            tempUnit={currentUnit}
        />

        <div className="current-weather-cards">
            {weatherCardsParameters.map((card, index) => {
                return(
                    <CurrentWeatherCard key={index} icon={card.icon} title={card.title} value={card.value} unit={card.unit} />
                )
            })}
        </div>
    </>
  )
}

export default CurrentWeatherSection
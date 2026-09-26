import { describeWeatherCode, getLocationLocalTime, getWeatherIconPath, convertTemperature } from "../../calculations"

function CurrentWeather({ apiData, tempUnit }) {
  return (
    <div className="current-weather">
        <div className="current-weather-left-side">
            <div className="city-current-weather">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-5 h-5 text-white"
                    aria-hidden="true"
                >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>

                <div>
                    <h2 id="city-name">
                        {`${apiData.place.name}, ${apiData.place.country_code}`} <span className="local-time">· {getLocationLocalTime(apiData.data.timezone)}</span>
                    </h2>
                    <p id="weather-condition">{describeWeatherCode(apiData.data.current.weather_code)}</p>
                </div>
            </div>

            <div className="city-current-temperature">
                <span className="temp" id="temperature">
                    {convertTemperature(tempUnit, apiData.data.current.temperature_2m)}
                </span>
                <span className="units">°{tempUnit}</span>
            </div>
            
            <div className="city-coordinates">
                <div className="highest">
                    <span className="letter">H: </span>
                    <span className="number" id="lat-coordinate">
                        {convertTemperature(tempUnit, apiData.data.daily.temperature_2m_max[0]).toFixed(1)} °{tempUnit}
                    </span>
                </div>

                <div className="lowest">
                    <span className="letter">L: </span>
                    <span className="number" id="lon-coordinate">
                        {convertTemperature(tempUnit, apiData.data.daily.temperature_2m_min[0]).toFixed(1)} °{tempUnit}
                    </span>
                </div>
            </div>
        </div>

        <div className="current-weather-right-side">
            <div className="weather-icon">
                <img
                    src={`./weatherIcons/${getWeatherIconPath(apiData.data.current.weather_code, apiData.data.current.is_day)}`}
                    alt=""
                    id="weather-icon"
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    </div>

  )
}

export default CurrentWeather
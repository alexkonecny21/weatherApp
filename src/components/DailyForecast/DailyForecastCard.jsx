import { memo } from "react";
import { convertTemperature } from "../../calculations"

function DailyForecastCard({ day, rainProbability, icon, maxTemp, minTemp, tempUnit }) {
  return (
    <div className="forecast-card">
        <div>
            <span className="forecast-day">{day}</span>
            <div className="content-wrapper">
                <div className="rain-probability">
                    <div className="probability-img">
                        <img src="./weatherIcons/raindrop.svg" width="10" height="10" loading="lazy" decoding="async" alt="" />
                    </div>
                    
                    <div className="probability-value"><p>{rainProbability}%</p></div>
                </div>

                <div className="forecast-img">
                    <img src={`./weatherIcons/${icon}`} width="48" height="48" loading="lazy" decoding="async" alt="" />
                </div>

                <div className="forecast-temperatures">
                    <span className="forecast-max-temp">{Math.round((convertTemperature(tempUnit, maxTemp)) * 1) / 1}°</span>
                    <span className="forecast-min-temp">{Math.round((convertTemperature(tempUnit, minTemp)) * 1) / 1}°</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(DailyForecastCard)
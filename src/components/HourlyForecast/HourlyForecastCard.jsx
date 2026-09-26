import { memo } from "react";
import { convertTemperature } from "../../calculations";

function HourlyForecastCard({ time, icon, temp, tempUnit }) {
  return (
      <div className="hourly-card">
        <div>
          <span className="hour">{time}</span>
          <div className="hourly-card-img">
            <img src={`./weatherIcons/${icon}`} width="48" height="48" loading="lazy" decoding="async" alt="" />
          </div>
          <div className="hourly-temperatures">
            <span className="hourly-temp">{convertTemperature(tempUnit, temp).toFixed(1)}°</span>
          </div>
        </div>
      </div>
  )
}

export default memo(HourlyForecastCard);
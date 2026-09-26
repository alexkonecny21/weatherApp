import { memo } from "react";

function CurrentWeatherCard({ icon, title, value, unit}) {
   return (
         <div className="card">
            <div className="weather-card-header">
               <div className="weather-card-icon">
                  <img src={`./currentWeatherCardsIcons/${icon}`} alt="" width={22} height={22} loading="lazy" decoding="async"/>
               </div>
               <h2>{title}</h2>
            </div>

            <div className="value" id="humidity-value">{value} {unit}</div>
         </div>
   )
}

export default memo(CurrentWeatherCard)
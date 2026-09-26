import { useEffect, useState } from "react";

import "./index.css";

import CityInput from "./components/CityInput";
import SectionDivider from "./components/SectionDivider";
import { getUsersCurrentLocation, getWeatherDataByCity, getWeatherDataByCoordinates, isGPSAllowed } from "./api/fetchWeather";
import LoadingSpinner from "./components/LoadingSpinner";

import HourlyForecastSection from "./components/HourlyForecast/HourlyForecastSection";
import CurrentWeatherSection from "./components/CurrentWeather/CurrentWeatherSection";
import ForecastSection from "./components/DailyForecast/ForecastSection";
import GpsCard from "./components/GpsCard";
import { Toast } from "@heroui/react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(() => localStorage.getItem("weatherUnit") || "C");

  const handleCitySubmit = async (city) => {
    try{
      setIsLoading(true);
      setIsInputDisabled(true);
      
      const data = await getWeatherDataByCity(city);

      setApiData(data);
    }catch(e){
      console.log(e);
    }finally{
      setIsLoading(false);
      setIsInputDisabled(false)
    }
  }

  const handleCurrentGpsSubmit = async () => {
    try{
      setIsLoading(true);
      setIsInputDisabled(true);

      const coordinates = await getUsersCurrentLocation();

      const data = await getWeatherDataByCoordinates(coordinates.latitude, coordinates.longitude);
      setApiData(data);
    }catch(e){
      console.log(e);
    }finally{
      setIsLoading(false);
      setIsInputDisabled(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("weatherUnit", currentUnit);
  }, [currentUnit])

  useEffect(() => {
    const checkGPS = async () => {
      const isGPSEnabled = await isGPSAllowed();
      if(isGPSEnabled) handleCurrentGpsSubmit();
    };

    checkGPS()
  },[])

  return (
    <div className="weather-app">
      <Toast.Provider />
      <form 
        className="search-box" 
        onSubmit={(e) => {
          e.preventDefault();
          handleCitySubmit(city);
        }}
      >
        <div className="logo">
            <div className="logo-img">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-5 h-5 text-white"
                    aria-hidden="true"
                >
                    <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            </div>
            <h1>WeatherNow</h1>
        </div>

        <CityInput value={city} onChangeValue={setCity} isDisabled={isInputDisabled} setCurrentUnit={setCurrentUnit} currentUnit={currentUnit} onSelectCity={handleCitySubmit}/>
      </form>

      <main>
        {isLoading === true ? (
          <LoadingSpinner />
        ): apiData === null ? (
          <GpsCard handleCurrentGpsSubmit={handleCurrentGpsSubmit}/>
        ):(
          <>

            <CurrentWeatherSection apiData={apiData} currentUnit={currentUnit}/>
            
            <SectionDivider text={"24-Hour Forecast"} />

            <HourlyForecastSection data={apiData.data} tempUnit={currentUnit}/>

            <SectionDivider text={"7-Day Forecast & Activity Conditions"} />

            <ForecastSection apiData={apiData} tempUnit={currentUnit}/>
          </>
        )
        }
      </main>
    </div>
  );
}
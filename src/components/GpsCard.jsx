function GpsCard({ handleCurrentGpsSubmit }) {
  return (
    <div className="gps-panel">
        <div className="gps-card">
          <div className="gps-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-map-pin w-5 h-5 text-white" aria-hidden="true"
            >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
            <circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <h1>Turn on your location</h1>
          <p>WeatherNow uses your location to show real-time weather and a 7-day forecast.</p>
          <div className="gps-actions">
            <button className="gps-btn gps-btn-primary" id="allow-btn" onClick={async () => await handleCurrentGpsSubmit()}>
              <span className="gps-spinner"></span>
              <span className="gps-btn-label">Enable location</span>
            </button>
            <span className="gps-btn-secondary" id="skip-btn">or search for a city instead</span>
          </div>
          <div className="gps-status" id="gps-status"></div>
        </div>
      </div>
  )
}

export default GpsCard
# Weather App

A modern weather application that provides current weather conditions, hourly and daily forecasts, activity-based weather recommendations, and city search suggestions.

## Features

* 🌤️ **Current Weather**

  * Current temperature
  * Weather condition
  * Humidity
  * Wind speed
  * Visibility

* 🕐 **Hourly Forecast**

  * 24-Hour weather forecast
  * Temperature

* 📅 **Daily Forecast**

  * Multi-day weather forecast
  * Daily high and low temperatures
  * Precipitation probability

* 🏃 **Activity Conditions**

  * Weather-based activity recommendations

* 🔎 **City Search**

  * Search for cities and locations
  * Autocomplete search suggestions
  * Select a location from suggested results

## Screenshots

<p align="left">
  <img src="./readme-images/MobileView.png" alt="Desktop view" width="25%">
  <img src="./readme-images/DesktopView.png" alt="Mobile view" width="70%">
</p>



## Tech Stack

* **Frontend:** React / Next.js
* **Language:** JavaScript
* **Styling:** CSS
* **Weather API:** OpenMeteo Weather API
* **Geocoding:** Open-Meteo Geocoding API & BigDataCloud Reverse Geocoding API
* **Deployment:** Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js 18+
* npm
* A Reverse Geocoding API key from [BigDataCloud](https://www.bigdatacloud.com/reverse-geocoding)

### Installation

**Clone the repository:**

```bash
git clone https://github.com/alexkonecny21/weatherApp.git
cd weatherApp
```

**Install dependencies:**

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_REVERSE_GEOCODING_API_KEY=your_api_key_here
```

### Run the Development Server

```bash
npm run dev
```

Open the application at the local URL shown in your terminal.

### Build for Production

```bash
npm run build
```

**Preview the production build:**

```bash
npm run preview
```

## Error Handling

The application should handle common failure scenarios, including:

* City not found
* No search results
* Network connection failure
* Missing or incomplete weather data

## Responsive Design

The application should work across:

* 📱 Mobile devices
* 📱 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

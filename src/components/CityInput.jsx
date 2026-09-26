import { useEffect, useState } from "react";

import { geocodeCity } from "../api/fetchWeather";

function CityInput({ value, onChangeValue, isDisabled, setCurrentUnit, currentUnit, onSelectCity }) {

    const handleUnitChange = (unit) => {
        setCurrentUnit(unit);
    }

    const handleSuggestionSelect = (suggestion) => {
        onChangeValue(suggestion.name);
        setSuggestions([]);
        setIsInputFocused(false);
        onSelectCity(suggestion.name);
    }

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        if (value.trim() === "") {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                const data = await geocodeCity(value);
                setSuggestions(data);
            } catch (error) {
                console.error("Failed to fetch city suggestions:", error);
                setSuggestions([]);
            }finally{
                setIsLoading(false);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [value]);

    return (
        <>
            <div className="input-components">
                <input
                    className="city-input"
                    type="text"
                    placeholder="Search for a city"
                    autoComplete="off"
                    enterKeyHint="search"
                    value={value}
                    onChange={(e) => onChangeValue(e.target.value)}
                    disabled={isDisabled}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />

                {/* SUGGESTIONS */}
                {isInputFocused && value.trim() !== "" && (
                    <ul className="suggestions">
                        {isLoading ? (
                            <li className="suggestion-message">Searching...</li>
                        ) : suggestions.length > 0 ? (
                            suggestions.map((suggestion) => (
                                <li
                                    className="suggestion active"
                                    key={suggestion.id}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSuggestionSelect(suggestion)}
                                >
                                    <span className="suggestion-name">{suggestion.name}</span>
                                    <span className="suggestion-details">
                                        {suggestion.admin1}, {suggestion.country}
                                    </span>
                                </li>
                            ))
                        ) : (
                        <li className="suggestion-message">No cities found</li>
                        )}
                    </ul>
                )}


                {/* UNIT TOGGLER */}
                <div
                    className="unit-toggle"
                    id="unit-toggle"
                    role="group"
                    aria-label="Temperature unit"
                    >
                    <button 
                        type="button" 
                        className={`unit-btn ${currentUnit === "C" ? "active" : ""}`} 
                        data-unit="C" 
                        onClick={() => handleUnitChange("C")}
                        >°C</button>
                    <button 
                        type="button" 
                        className={`unit-btn ${currentUnit === "F" ? "active" : ""}`} 
                        data-unit="F" 
                        onClick={() => handleUnitChange("F")}
                        >°F</button>
                </div>
            </div>
        </>
    )
}

export default CityInput
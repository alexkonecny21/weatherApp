import { ScrollShadow } from "@heroui/react";
import { useCallback, useState } from "react";
import RecentCityCard from "./RecentCityCard";

const STORAGE_KEY = "recentCities";
const MAX_CITIES = 7;

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeStorage(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
        console.log("Storage Unavailable");
    }
}

export function useRecentCities(max = MAX_CITIES) {
    const [cities, setCities] = useState(readStorage);

    const addCity = useCallback(
        (name) => {
            const city = name?.trim();
            if (!city) return;

            setCities((prev) => {
                const next = [
                    city,
                    ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
                ].slice(0, max);
                writeStorage(next);
                return next;
            });
        },
        [max]
    );

    const removeCity = useCallback((name) => {
        setCities((prev) => {
            const next = prev.filter((c) => c.toLowerCase() !== name.toLowerCase());
            writeStorage(next);
            return next;
        });
    }, []);

    return { cities, addCity, removeCity };
}

export default function RecentCities({
    cities = [],
    currentCity = "",
    onSelect,
    onRemove,
}) {
    if (cities.length === 0) return null;

    return (
        <nav className="recent-cities" aria-label="Recent cities">
            <span className="recent-cities__label">Recent</span>

            <ScrollShadow
                orientation="horizontal"
                className="pb-4 pt-4"
                size={30}
            >
                <ul className="recent-cities__list">
                    {cities.map((city, index) => {
                        const isActive = city.toLowerCase() === currentCity.toLowerCase();

                        return (
                            <RecentCityCard key={index} city={city} currentCity={currentCity} isActive={isActive} onSelect={onSelect} onRemove={onRemove} />
                        );
                    })}
                </ul>
            </ScrollShadow>
        </nav>
    );
}
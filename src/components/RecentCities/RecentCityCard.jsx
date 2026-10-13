function ClockIcon() {
    return (
        <svg
            className="recent-cities__icon"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            className="recent-cities__close-icon"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export default function RecentCityCard({city, currentCity, isActive, onSelect, onRemove}) {
  return (
    <li
        key={city}
        className={
            "recent-cities__item" +
            (isActive ? " recent-cities__item--active" : "")
        }
    >
        <button
            type="button"
            className="recent-cities__chip"
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect?.(city)}
        >
            <ClockIcon />
            {city}
        </button>

        <button
            type="button"
            className="recent-cities__remove"
            aria-label={`Remove ${city} from recent cities`}
            onClick={() => onRemove?.(city)}
        >
            <CloseIcon />
        </button>
    </li>
  )
}
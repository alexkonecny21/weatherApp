import { memo } from "react";

function ActivityCard({ icon, sportName, condition }) {
  return (
    <div className="activity-card">
        <div className="activity-icon">
            <img src={`./activityIcons/${icon}`} width="20" height="20" loading="lazy" decoding="async" alt="" />
        </div>

        <div className="activity-info">
            <span className="activity-name">{sportName}</span>
        </div>
        
        <span className={`activity-rating ${condition.toLowerCase()}`}>{condition}</span>
    </div>
  )
}

export default memo(ActivityCard)
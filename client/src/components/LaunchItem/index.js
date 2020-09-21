import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import "../../global/index.scss";

const LaunchItem = ({
  lastLaunchItemRef,
  launch: {
    flight_number,
    mission_name,
    launch_success,
    launch_year,
    launch_date_local,
    details,
  },
}) => {
  return (
    <li
      className="launch-item"
      {...(lastLaunchItemRef ? { ref: lastLaunchItemRef } : {})}
    >
      <div className="row-between">
        <h4>
          Mission:{" "}
          <span
            className={`mission-name ${
              launch_success === null
                ? "mission-name--future"
                : launch_success
                ? "mission-name--success"
                : "mission-name--failure"
            }`}
          >
            {" "}
            {mission_name}
          </span>
        </h4>
        <Link className="btn mg-left-50" to={`/launch/${flight_number}`}>
          Launch Details
        </Link>
      </div>

      <div className="row-between">
        <span className="date">Date: {launch_date_local.slice(0, 10)}</span>
      </div>

      <div className="row-between">
        <span className="date">Time: {launch_date_local.slice(11, 19)}</span>
      </div>
    </li>
  );
};

export default LaunchItem;

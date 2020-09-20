import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItem from "../LaunchItem";
import "./index.scss";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_success
      launch_year
      launch_date_local
      details
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return "Loading...";
  if (error) return "Error :(";

  console.log("Launches: ", data);
  return (
    <div className="container-full container-flex-row-wrap pd-all-20">
      {data.launches.map((launch) => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
};

export default Launches;

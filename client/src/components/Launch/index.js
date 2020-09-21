import React, { useEffect } from "react";
import "./index.scss";
import "../../global/index.scss";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
  useEffect(() => {
    console.log("MOUNTED");
  });

  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: {
      flight_number,
    },
  });

  if (loading) return <Loader />;
  if (error) return "Error :(";

  const {
    launch: {
      mission_name,
      launch_year,
      launch_success,
      launch_date_local,
      rocket: { rocket_id, rocket_name, rocket_type },
    },
  } = data;

  return (
    <div className="container-md container-flex-row-wrap mg-auto">
      <h1 className="h-2rem width-100">
        Mission: <span>{mission_name}</span>
      </h1>

      <h3 className="h-125rem width-100 mg-top-20">Launch Details</h3>

      <div className="container-md container-flex-row-wrap bg-gray pd-all-15 mg-top-20">
        <span className="block width-100 mg-top-10 font-lightgray">
          Mission name: <span className="font-white">{mission_name}</span>
        </span>
        <span className="block width-100 mg-top-10 font-lightgray">
          Flight number: <span className="font-white">{flight_number}</span>
        </span>
        <span className="block width-100 mg-top-10 font-lightgray">
          Launch year: <span className="font-white">{launch_year}</span>
        </span>
        <span className="block width-100 mg-top-10 font-lightgray">
          Launch success:{" "}
          <span className="font-white">
            {launch_success ? "Success" : "Failure"}
          </span>
        </span>
      </div>

      <h3 className="h-125rem width-100 mg-top-20">Rocket Details</h3>

      <div className="container-md container-flex-row-wrap bg-gray pd-all-15 mg-top-20">
        <span className="block width-100 mg-top-10 font-lightgray">
          Rocket ID: <span className="font-white">{rocket_id}</span>
        </span>
        <span className="block width-100 mg-top-10 font-lightgray">
          Rocket name: <span className="font-white">{rocket_name}</span>
        </span>
        <span className="block width-100 mg-top-10 font-lightgray">
          Rocket type: <span className="font-white">{rocket_type}</span>
        </span>
      </div>

      <Link className="btn mg-top-20" to="/">
        Go back
      </Link>
    </div>
  );
};

export default Launch;

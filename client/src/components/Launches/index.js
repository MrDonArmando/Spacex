import React, { useEffect, useCallback, useRef } from "react";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import LaunchItem from "../LaunchItem";
import "./index.scss";
import "../../global/index.scss";
import Loader from "../Loader";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
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
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    LAUNCHES_QUERY,
    {
      variables: {
        offset: 0,
        limit: 10,
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: "cache-first",
    }
  );

  useEffect(() => {
    console.log("REMOUNTED");
  });

  function loadMore() {
    //console.log("DATA LENGTH: ", data.launches.length);
    fetchMore({
      variables: {
        offset: data.launches.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log("fetchMoreResult: ", fetchMoreResult);
        // console.log("prev: ", prev);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          launches: [...prev.launches, ...fetchMoreResult.launches],
        });
      },
    });
  }

  const observer = useRef();

  const lastLaunchItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [data]
  );

  if (loading) return <Loader />;
  if (error) return "Error :(";

  return (
    <ul
      className="container-md container-flex-row-wrap mg-auto"
      onScroll={() => console.log("SCROLLING..........")}
    >
      {/* <button onClick={loadMore}>Load more</button> */}
      {data.launches.map((launch, index) => {
        if (index + 1 === data.launches.length)
          return (
            <LaunchItem
              lastLaunchItemRef={lastLaunchItemRef}
              key={launch.flight_number}
              launch={launch}
            />
          );
        return <LaunchItem key={launch.flight_number} launch={launch} />;
      })}
    </ul>
  );
};

export default Launches;

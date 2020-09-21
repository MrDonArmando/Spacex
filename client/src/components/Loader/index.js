import React from "react";
import "./index.scss";
import "../../global/index.scss";

const Loader = () => {
  return (
    <div className="container-full flex-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

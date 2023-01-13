import React from "react";
import Button from "../../Common/Button";
import "./styles.css";
import gradient from "../../../assets/gradient.png";
import iphone from "../../../assets/iphone.png";

function MainComponent() {
  return (
    <div className="main-flex">
      <div className="info-landing">
        <h1 className="heading1">Track Crypto</h1>
        <h1 className="heading2">Real Time.</h1>
        <p className="info-text">
          Track crypto through a public api in real time. Visit the dashboard to
          do so!{" "}
        </p>
        <div className="btn-flex">
          <Button text={"Dashboard"} />
          <Button text={"Share App"} outlined={true} />
        </div>
      </div>
      <div className="gradient-div">
        <img src={gradient} className="gradient" />
        <img src={iphone} className="iphone" />
      </div>
    </div>
  );
}

export default MainComponent;

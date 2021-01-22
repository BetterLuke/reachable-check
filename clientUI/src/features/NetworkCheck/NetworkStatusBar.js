import React from "react";
import { useSelector } from "react-redux";
import { networkReachSelector } from "./networkCheckSlice";

function NetworkStatusBar(params) {
  const reachable = useSelector(networkReachSelector);

  return (
    <div
      style={{
        backgroundColor: reachable ? "green" : "red",
        color: "white",
        fontSize: "24px",
      }}
    >
      {reachable ? "Online" : "Offline"}
    </div>
  );
}

export default NetworkStatusBar;

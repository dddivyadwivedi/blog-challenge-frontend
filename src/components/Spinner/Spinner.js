import React from 'react';
import Spinner from "react-bootstrap/Spinner";

function Spin() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin : '0 auto',
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
}

export default Spin;

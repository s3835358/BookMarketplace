import React from "react";

// Based on https://hackernoon.com/create-react-modal-using-reactjs-popup-m24m231v1

export default ({ close }) => (
  <div className="modal">
    <button className="close" onClick={close}>
      &times;
    </button>
  </div>
);
import React from "react";

export const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-success">
        {props.message}
      </div>
    </div>
  );
};

export default Alert;

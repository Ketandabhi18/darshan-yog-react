import React from "react";
import { useLocation } from "react-router-dom";

const ViewDetails = () => {
  const location = useLocation();
  const content = location.state?.content;
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(247, 247, 247)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            marginTop: "2%",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

export default ViewDetails;

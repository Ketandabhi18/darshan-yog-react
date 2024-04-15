import React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import eventdetailimage from "../Components/assets/eventdetailimage.jpg";
import { useLocation } from "react-router-dom";

const EventDetailPage = () => {
  const location: any = useLocation();
  console.log("location :: ", location);
  const {
    eventName,
    eventCode,
    startDateTime,
    endDateTime,
    lastDateToReg,
    organiserName,
    mode,
    city,
    district,
    state,
    country,
    pincode,
  } = location.state;

  return (
    <>
      {/* <div className="hero-event">
        <div className="hero-content">
          <h1 style={{ paddingTop: '25px' }}>Event Details</h1>
        </div>
      </div> */}
      <div style={{ marginBottom: "2%", marginTop: "2%" }}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "black",
              marginBottom: "20px",
              textAlign: "center",
              textTransform: "uppercase",
              paddingBottom: "20px"
            }}
          >
            {eventName}
          </Typography>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>Start Date: </strong>{" "}
                {startDateTime}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>End Date: </strong>{" "}
                {endDateTime}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>Last Date to Register:</strong>{" "}
                {lastDateToReg}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>Organiser:</strong>{" "}
                {organiserName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>City:</strong> {city}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>District:</strong> {district}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>State:</strong> {state}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>Country:</strong> {country}
              </Typography>
              <Typography variant="body1">
                <strong style={{ color: "black" }}>Pincode:</strong> {pincode}
              </Typography>
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src={eventdetailimage}
              alt="Event"
              style={{
                maxWidth: "100%",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </Paper>
      </div>
    </>

  );
};

export default EventDetailPage;

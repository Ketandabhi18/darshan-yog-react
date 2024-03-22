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
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {eventName}
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>Start Date: </strong>{" "}
              {startDateTime}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>End Date: </strong>{" "}
              {endDateTime}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>Last Date to Register:</strong>{" "}
              {lastDateToReg}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>Organiser:</strong>{" "}
              {organiserName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>City:</strong> {city}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>District:</strong> {district}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>State:</strong> {state}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>Country:</strong> {country}
            </Typography>
            <Typography variant="body1">
              <strong style={{ color: "#555" }}>Pincode:</strong> {pincode}
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
  );
};

export default EventDetailPage;

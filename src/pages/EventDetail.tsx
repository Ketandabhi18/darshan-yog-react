import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

const EventDetailPage = ({ event }: { event: any }) => {
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
  } = event;

  return (
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
        style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}
      >
        {eventName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Event Code:</strong> {eventCode}
          </Typography>
          <Typography variant="body1">
            <strong>Start Date & Time:</strong> {startDateTime}
          </Typography>
          <Typography variant="body1">
            <strong>End Date & Time:</strong> {endDateTime}
          </Typography>
          <Typography variant="body1">
            <strong>Last Date to Register:</strong> {lastDateToReg}
          </Typography>
          <Typography variant="body1">
            <strong>Organiser:</strong> {organiserName}
          </Typography>
          <Typography variant="body1">
            <strong>Mode:</strong> {mode}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>City:</strong> {city}
          </Typography>
          <Typography variant="body1">
            <strong>District:</strong> {district}
          </Typography>
          <Typography variant="body1">
            <strong>State:</strong> {state}
          </Typography>
          <Typography variant="body1">
            <strong>Country:</strong> {country}
          </Typography>
          <Typography variant="body1">
            <strong>Pincode:</strong> {pincode}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <img
          src="https://via.placeholder.com/300"
          alt="Event"
          style={{
            maxWidth: "100%",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </Paper>
  );
};

export default EventDetailPage;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { baseUrl } from "../config/constants";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const user: any = localStorage.getItem("userDetail") || "";
  const userDetails = JSON.parse(user);
  const defaultMobileNumber = userDetails.mobileNumber;
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [backDrop, setBackDrop] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [alertType, setAlertType] = useState<any>("");
  const authToken = localStorage.getItem("authToken") || "";
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("password :: ", password);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8 || password.length > 16) {
      setError("Password length should be between 8 and 16");
      return;
    } else {
      setError("");
      // Proceed with form submission
    }
    try {
      setBackDrop(true);
      const res = await axios.post(
        `${baseUrl}/update-password`,
        {
          password,
          mobileNumber: defaultMobileNumber,
        },
        {
          headers: { Authorization: authToken },
        }
      );
      if (res.data.status === 200) {
        setBackDrop(false);
        setAlertType("success");
        setAlertMessage("Password Updated Successfully.");
        setOpenAlert(true);
      } else if (res.data.status === 401) {
        setAlertType("error");
        setAlertMessage("Your token Expired Please login again.!!");
        setOpenAlert(true);
        setTimeout(() => {
          localStorage.clear();
          navigate("/log-in");
        }, 2000);
      }
      console.log("Register event :: res ::", res);
      setBackDrop(false);
    } catch (error) {
      console.log("error ::", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <div className="hero-event">
        <div className="hero-content">
          <h1 style={{ paddingTop: "25px" }}>Set New Password</h1>
        </div>
      </div>
      {/* <Typography
        variant="h5"
        style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}
      >
        Set New Password
      </Typography> */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "2% auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Mobile Number"
          type="text"
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
            value: defaultMobileNumber,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            marginBottom: "20px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          value={password}
          style={{ marginBottom: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          error={error !== ""}
          helperText={error}
          autoComplete="new-password"
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          value={confirmPassword}
          style={{ marginBottom: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          error={error !== ""}
          helperText={error}
          autoComplete="new-password" // Make sure to set this for security
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Set Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;

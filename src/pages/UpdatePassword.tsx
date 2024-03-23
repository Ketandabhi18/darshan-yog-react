import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassword = () => {
  const user: any = localStorage.getItem("userDetail") || "";
  const userDetails = JSON.parse(user);
  const defaultMobileNumber = userDetails.mobileNumber;
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const authToken = localStorage.getItem("authToken") || "";
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("password :: ", password);
    if (password.length < 8 || password.length > 16) {
      setError("Password length should be between 8 and 16");
      return;
    } else {
      setError("");
      // Proceed with form submission
    }
    try {
      const res = await axios.post(
        "https://darshan-yog-node-apis.onrender.com/update-password",
        // "http://localhost:7001/update-password",
        {
          password,
          mobileNumber: defaultMobileNumber,
        },
        {
          headers: { Authorization: authToken },
        }
      );
      if (res.data.status === 200) {
        setOpenAlert(true);
      }
      console.log("Register event :: res ::", res);
    } catch (error) {
      console.log("error ::", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Password Successfully Updated.
        </Alert>
      </Snackbar>
      <Typography
        variant="h5"
        style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}
      >
        Set New Password
      </Typography>
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
          autoComplete="off"
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
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;

import { FunctionComponent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Grid, Snackbar } from "@mui/material";

const Login: FunctionComponent = () => {
  const [step, setStep] = useState<any>(false);
  const [mobile, setMobile] = useState<any>();
  const [countrycode, setCountryCode] = useState<any>("+91");
  const [otp, setOtp] = useState<any>("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<any>("success");
  const [loader, setLoader] = useState<boolean>(false);
  const [loginwithPassword, setLoginWithPassword] = useState(false);
  const navigate = useNavigate();
  const handleVerfiyOtp = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    try {
      const username: any = `${countrycode}${mobile}`;
      const password = otp;
      axios
        // .post("http://localhost:7001/login", {
        .post("https://darshan-yog-node-apis.onrender.com/login", {
          username,
          password,
          type: 0,
        })
        .then((response) => {
          // Handle the successful response
          console.log("Response:", response);
          if (response.data.status === 200) {
            const { token, ...userDetails } = response.data.data;
            localStorage.removeItem("authToken");
            localStorage.removeItem("useDetail");
            setLoader(false);
            localStorage.setItem("authToken", response.data.data.token);
            localStorage.setItem(
              "userDetail",
              JSON.stringify({
                ...userDetails,
              })
            );
            navigate("/");
            loginwithPassword
              ? setAlertMessage("Login Successfully")
              : setAlertMessage("Otp Verified Successfully");
            setAlertType("success");
            setOpenAlert(true);
          } else {
            loginwithPassword
              ? setAlertMessage("Invalid Credentials !!")
              : setAlertMessage("Invalid Otp !!");
            setAlertType("error");
            setOpenAlert(true);
            console.log("login failed :: due to invalid creds");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetOtp = async () => {
    try {
      const mobileNumber = `${countrycode}${mobile}`;
      console.log("mobile :: in get otp ", mobileNumber);
      axios
        .post(
          // "http://localhost:7001/get-otp",
          "https://darshan-yog-node-apis.onrender.com/get-otp",
          {
            username: mobileNumber,
          }
        )
        .then((res) => {
          console.log("data :: get otp :: ", res);
          if (res.data.status === 200) {
            setAlertMessage(res.data.message);
            setAlertType("success");
            setOpenAlert(true);
            setStep(true);
          } else {
            setAlertMessage(res.data.message);
            setAlertType("error");
            setOpenAlert(true);
            if (res.data.message === "Try resend otp only after 5 mins") {
              setStep(true);
            }
          }
        });
    } catch (error) {
      console.log("error :: ", error);
    }
  };

  const handleClick = () => {
    setLoginWithPassword(!loginwithPassword);
  };
  const defaultTheme = createTheme();

  return (
    <>
      {/* {loader && <Loader />} */}
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
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {step === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    alignItems: "baseline",
                    // marginBottom: "1rem",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Country Code"
                    value={countrycode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                    style={{ marginRight: "1rem" }}
                  />
                  <TextField
                    margin="normal"
                    required
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Mobile Number"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                {loginwithPassword && (
                  <TextField
                    margin="normal"
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    fullWidth
                    name="password"
                    label={loginwithPassword ? "Password" : "OTP"}
                    id="password"
                    autoComplete="current-password"
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={loginwithPassword ? handleVerfiyOtp : handleGetOtp}
                >
                  {loginwithPassword ? "Login" : "Get OTP"}
                </Button>

                <Grid item xs sx={{ marginTop: "2%" }}>
                  <Typography
                    variant="body2"
                    className="forgot-password-typography"
                    color="primary"
                    onClick={handleClick}
                  >
                    {loginwithPassword
                      ? "Login with OTP"
                      : "Login with Password"}
                  </Typography>
                </Grid>
              </div>
            )}
            {step && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      alignItems: "baseline",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="Country Code"
                      value={countrycode}
                      disabled
                      onChange={(e) => setCountryCode(e.target.value)}
                      required
                      style={{ marginRight: "1rem" }}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile Number"
                      name="mobile"
                      autoComplete="mobile"
                      autoFocus
                      value={mobile}
                      disabled
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <TextField
                    margin="normal"
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    fullWidth
                    name="password"
                    label="OTP"
                    id="password"
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleVerfiyOtp}
                  >
                    Verify Otp
                  </Button>
                </div>
              </>
            )}
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
// Set up the Axios request configuration with headers for basic authentication
// const config = {
//   headers: {
//     Authorization: `Basic ${basicAuth}`,
//   },
// };

// Make the GET request
// axios
//   .get(
//     "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/user",
//     config
//   )
//   .then((response) => {
//     // Handle the successful response
//     console.log("Response:", response.data);
//     setLoader(false);
//   })
//   .catch((error) => {
//     // Handle the error
//     console.error("Error:", error);
//   });

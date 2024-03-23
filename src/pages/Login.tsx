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
import { Snackbar } from "@mui/material";

const Login: FunctionComponent = () => {
  const [step, setStep] = useState<any>(false);
  const [mobile, setMobile] = useState<any>();
  const [otp, setOtp] = useState<any>("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleVerfiyOtp = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    try {
      const username: any = mobile;
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
            setAlertMessage("Otp Verified Successfully");
            setOpenAlert(true);
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
      console.log("mobile :: in get otp ", mobile);
      setStep(true);
      const { data } = await axios.post(
        // "http://localhost:7001/get-otp",
        "https://darshan-yog-node-apis.onrender.com/get-otp",
        {
          username: mobile,
        }
      );
      setAlertMessage("Otp Sent Successfully");
      setOpenAlert(true);
      console.log("data :: get otp :: response", data);
    } catch (error) {
      console.log("error :: ", error);
    }
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
          severity="success"
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
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {step === false && (
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Mobile Number"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setMobile(e.target.value)}
                />

                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleGetOtp}
                >
                  Get Otp
                </Button>
                {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
              </Box>
            )}
            {step && (
              <>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    id="email"
                    label="Mobile Number"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={mobile}
                  />
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
                </Box>
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

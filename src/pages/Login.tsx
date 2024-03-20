import { FunctionComponent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "../Components/Loader/Loader";
import AuthService from "../api/auth/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    try {
      const data = new FormData(event.currentTarget);
      const username: any = data.get("email");
      const password = data.get("password");

      axios
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
                mobileNumber: "+919998982350",
                countrycode: "+91",
                email: "fs1ad@gmail.com",
                role: "ROLE_USER",
                firstName: "Raj",
                middleName: null,
                lastName: null,
                whatsappNumber: "",
                gender: "Male",
                dateOfBirth: "07-05-1994",
                edQualification: "B.E",
                profession: "Software engineer",
                guardianName: null,
                maritalStatus: "Unmarried",
                bloodGroup: "B+",
                addrLine1: "Ahmedabad",
                addrLine2: "science city",
                city: "Ahmedabad",
                district: "Ahmedabad",
                state: "Gujarat",
                country: "india",
                pincode: "380052",
              })
            );
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <>
      {/* {loader && <Loader />} */}
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Mobile Number"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              >
                Log In
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

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
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import {
  EducationalQualification,
  Profession,
  baseUrl,
  statesWithDistricts,
} from "../config/constants";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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
  const [openEventForm, setOpenEventForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    groupDetails: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location :: ", location);
  const handleVerfiyOtp = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    try {
      const username: any = `${countrycode}${mobile}`;
      const password = otp;
      axios
        .post(`${baseUrl}/login`, {
          username,
          password,
          type: 0,
        })
        .then((response) => {
          // Handle the successful response
          console.log("Response:", response);
          if (response.data.status === 200) {
            const { token, ...userDetails }: any = response.data.data;
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
            if (location.state && !loginwithPassword) {
              const checkRegistered = axios
                .get(`${baseUrl}/events/event-registrations`, {
                  headers: {
                    Authorization: localStorage.getItem("authToken"),
                  },
                })
                .then((res) => {
                  if (res.data.data) {
                    const registeredEvent = res.data.data.find(
                      (o: any) =>
                        o.eventCode === location?.state.eventCode &&
                        o.mobileNumber === `${countrycode}${mobile}`
                    );
                    console.log("registeredEvent :: ", registeredEvent);
                    if (registeredEvent) {
                      setAlertType("error");
                      setAlertMessage(
                        "You have already registered for this event."
                      );
                      setOpenAlert(true);
                      setTimeout(() => {
                        navigate("/events");
                      }, 2000);
                    } else {
                      let user: any = localStorage.getItem("userDetail");
                      user = JSON.parse(user);
                      console.log("first if");
                      setFormData((prevFormData: any) => {
                        return {
                          ...prevFormData,
                          ...user,
                        };
                      });
                      setOpenEventForm(true);
                    }
                  }
                });
            } else {
              navigate("/");
              loginwithPassword
                ? setAlertMessage("Login Successfully")
                : setAlertMessage("Otp Verified Successfully");
              setAlertType("success");
              setOpenAlert(true);
            }
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
        .post(`${baseUrl}/get-otp`, {
          username: mobileNumber,
        })
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

  const handleChange: any = (e: any) => {
    console.log("e :: ", e);
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      state: selectedState,
      district: "", // Reset district when state changes
    }));
  };

  const handleGroupDetailsChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const updatedGroupDetails: any = [...formData.groupDetails];
    updatedGroupDetails[index][name] = value;

    setFormData({ ...formData, groupDetails: updatedGroupDetails });
  };

  const removeGroupMember = (indexToRemove: any) => {
    const updatedGroupDetails = formData.groupDetails.filter(
      (member: any, index: any) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      groupDetails: updatedGroupDetails,
    });
  };

  const addGroupMember = () => {
    setFormData({
      ...formData,
      groupDetails: [
        ...formData.groupDetails,
        { name: "", relation: "", gender: "", age: "" },
      ],
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formData :: ", formData);
    const {
      email,
      firstName,
      middleName,
      lastName,
      whatsappNumber,
      gender,
      dateOfBirth,
      edQualification,
      profession,
      guardianName,
      maritalStatus,
      bloodGroup,
      addrLine1,
      addrLine2,
      city,
      district,
      state,
      country,
      pincode,
    } = formData;
    const { data } = await axios.post(
      `${baseUrl}/update-user`,
      {
        mobileNumber: mobile,
        countrycode,
        email,
        firstName,
        middleName,
        lastName,
        whatsappNumber,
        gender,
        dateOfBirth,
        edQualification,
        profession,
        guardianName,
        maritalStatus,
        bloodGroup,
        addrLine1,
        addrLine2,
        city,
        district,
        state,
        country,
        pincode,
      },
      {
        headers: { Authorization: localStorage.getItem("authToken") },
      }
    );

    if (data.status === 200) {
      localStorage.removeItem("userDetail");
      localStorage.setItem("userDetail", JSON.stringify(data.data));
    }
    const reqObj = { ...formData, eventCode: location.state.eventCode };
    const { eventCode, arrivalDate, departureDate, groupDetails, notes } =
      reqObj;
    const res = await axios.post(
      `${baseUrl}/events/register`,
      {
        mobileNumber: formData.mobileNumber,
        firstName,
        gender,
        dateOfBirth,
        eventCode,
        arrivalDate,
        departureDate,
        groupDetails,
        notes,
      },
      {
        headers: { Authorization: localStorage.getItem("authToken") },
      }
    );

    if (res.data.status === 200) {
      setAlertMessage("Registration successfully done");
      setAlertType("success");
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    console.log("res :: register event :: ", res);
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

                  {!openEventForm && (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleVerfiyOtp}
                    >
                      Verify Otp
                    </Button>
                  )}
                </div>
              </>
            )}
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
        {step && openEventForm && (
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              marginTop: "2%",
            }}
          >
            <div style={{ width: "80%", justifyContent: "center" }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData?.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      required
                      value={formData?.firstName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={formData?.middleName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData?.lastName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={formData?.gender}
                        onChange={handleChange}
                        name="gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={enGB}
                  >
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        onChange={(e: any) => {
                          const value = `${new Date(e)
                            .getDate()
                            .toString()
                            .padStart(2, "0")}-${(new Date(e).getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}-${new Date(e).getFullYear()}`;
                          setFormData({ ...formData, dateOfBirth: value });
                        }}
                        label="Date Of Birth"
                        slotProps={{
                          textField: {
                            helperText: "DD/MM/YYYY",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Educational Qualification</InputLabel>
                        <Select
                          value={formData?.edQualification}
                          onChange={handleChange}
                          name="edQualification"
                        >
                          {EducationalQualification.map(
                            (qualification: any, index: any) => (
                              <MenuItem key={index} value={qualification}>
                                {qualification}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Profession</InputLabel>
                        <Select
                          value={formData?.profession}
                          onChange={handleChange}
                          name="profession"
                        >
                          {Profession.map((profession: any, index: any) => (
                            <MenuItem key={index} value={profession}>
                              {profession}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Guardian Name"
                        name="guardianName"
                        value={formData?.guardianName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Marital Status</InputLabel>
                        <Select
                          value={formData?.maritalStatus}
                          onChange={handleChange}
                          name="maritalStatus"
                        >
                          <MenuItem value="Married">Married</MenuItem>
                          <MenuItem value="Unmarried">Unmarried</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Blood Group"
                        name="bloodGroup"
                        value={formData?.bloodGroup}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Country*</InputLabel>
                        <Select
                          name="country"
                          required
                          value={formData?.country}
                          onChange={handleChange}
                        >
                          <MenuItem value="india">India</MenuItem>
                          <MenuItem value="afghanistan">Afghanistan</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>State*</InputLabel>
                        <Select
                          name="state"
                          required
                          value={formData?.state}
                          onChange={(event) => {
                            handleStateChange(event);
                            handleChange(event);
                          }}
                        >
                          {Object.keys(statesWithDistricts).map(
                            (state, index) => (
                              <MenuItem key={index} value={state}>
                                {state}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City / Village"
                        name="city"
                        value={formData?.city}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>District*</InputLabel>
                        <Select
                          name="district"
                          required
                          value={formData?.district}
                          onChange={handleChange}
                          disabled={!formData?.state || formData?.state === ""}
                        >
                          {formData?.state &&
                            statesWithDistricts[formData?.state] &&
                            statesWithDistricts[formData?.state].map(
                              (district: any, index: any) => (
                                <MenuItem key={index} value={district}>
                                  {district}
                                </MenuItem>
                              )
                            )}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Address 1"
                        name="addrLine1"
                        value={formData?.addrLine1}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address 2"
                        name="addrLine2"
                        value={formData?.addrLine2}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Pincode"
                        name="pincode"
                        type="number"
                        value={formData?.pincode}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <DateTimePicker
                          label="Arrival Date"
                          name="arrivalDate"
                          onChange={(e: any) => {
                            const originalDate = new Date(e)
                              .toISOString()
                              .split("T")[0];
                            const originalTime = new Date(e).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            );
                            const convertedDate = `${originalDate
                              .split("-")
                              .reverse()
                              .join("-")} ${originalTime.slice(0, 5)} IST`;
                            setFormData({
                              ...formData,
                              ["arrivalDate"]: convertedDate,
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <DateTimePicker
                          label="Departure Date"
                          name="departureDate"
                          onChange={(e: any) => {
                            const originalDate = new Date(e)
                              .toISOString()
                              .split("T")[0];
                            const originalTime = new Date(e).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            );
                            const convertedDate = `${originalDate
                              .split("-")
                              .reverse()
                              .join("-")} ${originalTime.slice(0, 5)} IST`;
                            setFormData({
                              ...formData,
                              ["departureDate"]: convertedDate,
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </LocalizationProvider>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Pickup place</InputLabel>
                      <Select
                        name="pickupPlace"
                        value={formData?.pickupPlace}
                        onChange={handleChange}
                      >
                        <MenuItem value="Kalupur Railway Station">
                          Kalupur Railway Station
                        </MenuItem>
                        <MenuItem value="Sabarmati Railway Station">
                          Sabarmati Railway Station
                        </MenuItem>
                        <MenuItem value="Ahmedabad Airport">
                          Ahmedabad Airport
                        </MenuItem>
                        <MenuItem value="Prantij bus stop">
                          Prantij bus stop
                        </MenuItem>
                        <MenuItem value="Self ">Self </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mb={2}>
                      <Typography variant="subtitle1">
                        Group Details:
                      </Typography>
                      {formData?.groupDetails &&
                        formData.groupDetails.length > 0 &&
                        formData.groupDetails.map((member: any, index: any) => (
                          <Box
                            key={index}
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "16px",
                              marginBottom: "16px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{ marginBottom: "8px" }}
                            >
                              Participant {index + 1}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Name"
                                  name="name"
                                  required
                                  value={member.name}
                                  onChange={(e) =>
                                    handleGroupDetailsChange(index, e)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Relation"
                                  name="relation"
                                  value={member.relation}
                                  onChange={(e) =>
                                    handleGroupDetailsChange(index, e)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Gender"
                                  name="gender"
                                  required
                                  value={member.gender}
                                  onChange={(e) =>
                                    handleGroupDetailsChange(index, e)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Age"
                                  name="age"
                                  required
                                  value={member.age}
                                  onChange={(e) =>
                                    handleGroupDetailsChange(index, e)
                                  }
                                  fullWidth
                                />
                              </Grid>
                            </Grid>

                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => removeGroupMember(index)}
                              style={{ marginTop: "16px" }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                      <Button
                        variant="contained"
                        onClick={addGroupMember}
                        style={{ marginTop: "10px" }}
                      >
                        Add Member
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Anything else you want to inform us"
                      name="notes"
                      value={formData?.notes}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      margin: "16px",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </div>
          </div>
        )}
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

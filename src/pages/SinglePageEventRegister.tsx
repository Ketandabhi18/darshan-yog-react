import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  Backdrop,
  CircularProgress,
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

const SinglePageEventRegister = () => {
  const [step, setStep] = useState<any>(false);
  const [mobile, setMobile] = useState<any>();
  const [countrycode, setCountryCode] = useState<any>("+91");
  const [otp, setOtp] = useState<any>("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<any>("success");
  const [openEventForm, setOpenEventForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    groupDetails: [],
  });
  const [backDrop, setBackDrop] = useState<any>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleVerfiyOtp = async (event: any) => {
    event.preventDefault();
    setBackDrop(true);
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
            localStorage.setItem("authToken", response.data.data.token);
            localStorage.setItem(
              "userDetail",
              JSON.stringify({
                ...userDetails,
              })
            );
            setAlertMessage("Otp Verified Successfully");
            setAlertType("success");
            setOpenAlert(true);

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
                      o.eventCode === "YOGDHAM_FEB24" &&
                      o.mobileNumber === `${countrycode}${mobile}`
                  );
                  if (registeredEvent) {
                    setBackDrop(false);
                    setAlertType("error");
                    setAlertMessage(
                      `You have already registered for this event with Reg Id : ${registeredEvent.eventRegId}.`
                    );
                    setOpenAlert(true);
                    const userDetail: any = localStorage.getItem("userDetail");
                    if (localStorage.getItem("userDetail")) {
                      setFormData((prevFormData: any) => {
                        return {
                          ...JSON.parse(userDetail),
                          arrivalDate: registeredEvent.arrivalDate,
                          departureDate: registeredEvent.departureDate,
                          groupDetails: registeredEvent.groupDetails,
                          notes: registeredEvent.notes,
                          eventCode: "YOGDHAM_FEB24",
                        };
                      });
                      setOpenEventForm(true);
                    }
                  } else {
                    let user: any = localStorage.getItem("userDetail");
                    user = JSON.parse(user);
                    setFormData((prevFormData: any) => {
                      return {
                        ...prevFormData,
                        ...user,
                      };
                    });
                    setBackDrop(false);
                    setOpenEventForm(true);
                  }
                }
              });
          } else {
            setBackDrop(false);
            setAlertMessage("Invalid Otp !!");
            setAlertType("error");
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
      setBackDrop(true);
      const mobileNumber = `${countrycode}${mobile}`;
      axios
        .post(`${baseUrl}/get-otp`, {
          username: mobileNumber,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setBackDrop(false);
            setAlertMessage(res.data.message);
            setAlertType("success");
            setOpenAlert(true);
            setStep(true);
          } else {
            setBackDrop(false);
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
    setBackDrop(true);
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
        mobileNumber: `${countrycode}${mobile}`,
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
    } else {
      setBackDrop(false);
      setAlertMessage(data.message);
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    const reqObj = { ...formData, eventCode: "YOGDHAM_FEB24" };
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
      setBackDrop(false);
      setAlertMessage("Registration successfully done");
      setAlertType("success");
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setBackDrop(false);
      setAlertType("error");
      setAlertMessage(res.data.message);
      setOpenAlert(true);
    }
  };

  const defaultTheme = createTheme();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
          </Box>

          {step === false && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
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

              <Button
                type="submit"
                variant="contained"
                style={{ width: "100%", marginBottom: "2%" }}
                onClick={handleGetOtp}
              >
                Get OTP
              </Button>
            </div>
          )}
          {step && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
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
              {!openEventForm && (
                <div
                  style={{
                    marginBottom: "2%",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
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
                    variant="contained"
                    sx={{ margin: "2%", width: "50%", borderRadius: "40px" }}
                    onClick={handleVerfiyOtp}
                  >
                    Verify Otp
                  </Button>
                </div>
              )}
            </>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ marginBottom: "2%", marginTop: "2%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled={openEventForm ? false : true}
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData?.email ?? ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled={openEventForm ? false : true}
                  label="First Name"
                  name="firstName"
                  required
                  value={formData?.firstName ?? ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled={openEventForm ? false : true}
                  label="Middle Name"
                  name="middleName"
                  value={formData?.middleName ?? ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled={openEventForm ? false : true}
                  label="Last Name"
                  name="lastName"
                  value={formData?.lastName ?? ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    disabled={openEventForm ? false : true}
                    label={"Gender"}
                    arial-label={"Gender"}
                    value={formData?.gender ?? "Male"}
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
                    value={
                      formData.dateOfBirth
                        ? new Date(
                            formData.dateOfBirth.split("-").reverse().join("-")
                          )
                        : null
                    }
                    onChange={(e: any) => {
                      const value = `${new Date(e)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}-${(new Date(e).getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}-${new Date(e).getFullYear()}`;
                      setFormData({
                        ...formData,
                        ["dateOfBirth"]: value,
                      });
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
                      disabled={openEventForm ? false : true}
                      label={"Educational Qualification"}
                      arial-label={"Educational Qualification"}
                      value={formData?.edQualification ?? ""}
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
                      disabled={openEventForm ? false : true}
                      label={"Profession"}
                      arial-label={"Profession"}
                      value={formData?.profession ?? ""}
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
                    disabled={openEventForm ? false : true}
                    fullWidth
                    label="Guardian Name"
                    name="guardianName"
                    value={formData?.guardianName ?? ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      disabled={openEventForm ? false : true}
                      label={"Marital Status"}
                      arial-label={"Marital Status"}
                      value={formData?.maritalStatus ?? ""}
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
                    disabled={openEventForm ? false : true}
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={formData?.bloodGroup ?? ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country*</InputLabel>
                    <Select
                      disabled={openEventForm ? false : true}
                      label={"Country"}
                      arial-label={"Country"}
                      name="country"
                      required
                      value={formData?.country ?? ""}
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
                      disabled={openEventForm ? false : true}
                      label={"State"}
                      arial-label={"State"}
                      name="state"
                      required
                      value={formData?.state ?? ""}
                      onChange={(event) => {
                        handleStateChange(event);
                        handleChange(event);
                      }}
                    >
                      {Object.keys(statesWithDistricts).map((state, index) => (
                        <MenuItem key={index} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={openEventForm ? false : true}
                    label="City / Village"
                    name="city"
                    value={formData?.city ?? ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>District*</InputLabel>
                    <Select
                      disabled={
                        openEventForm
                          ? false
                          : true || !formData?.state || formData?.state === ""
                      }
                      label={"District"}
                      arial-label={"District"}
                      name="district"
                      required
                      value={formData?.district ?? ""}
                      onChange={handleChange}
                      //   disabled={!formData?.state || formData?.state === ""}
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
                    disabled={openEventForm ? false : true}
                    label="Address 1"
                    name="addrLine1"
                    value={formData?.addrLine1 ?? ""}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={openEventForm ? false : true}
                    label="Address 2"
                    name="addrLine2"
                    value={formData?.addrLine2 ?? ""}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={openEventForm ? false : true}
                    label="Pincode"
                    name="pincode"
                    type="number"
                    value={formData?.pincode ?? ""}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{
                      min: 100000, // example minimum value
                      max: 999999, // example maximum value
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <DateTimePicker
                      disabled={openEventForm ? false : true}
                      label="Arrival Date"
                      name="arrivalDate"
                      value={
                        formData.arrivalDate
                          ? new Date(formData?.arrivalDate)
                          : new Date()
                      }
                      onChange={(e: any) => {
                        const convertedDate =
                          new Date(e)
                            .toLocaleDateString("en-US", {
                              timeZone: "Asia/Kolkata",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(/\//g, "-") +
                          " " +
                          ("0" + new Date(e).getHours()).slice(-2) +
                          ":" +
                          ("0" + new Date(e).getMinutes()).slice(-2);
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
                      disabled={openEventForm ? false : true}
                      label="Departure Date"
                      name="departureDate"
                      value={
                        formData.departureDate
                          ? new Date(formData?.departureDate)
                          : new Date()
                      }
                      onChange={(e: any) => {
                        const convertedDate =
                          new Date(e)
                            .toLocaleDateString("en-US", {
                              timeZone: "Asia/Kolkata",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(/\//g, "-") +
                          " " +
                          ("0" + new Date(e).getHours()).slice(-2) +
                          ":" +
                          ("0" + new Date(e).getMinutes()).slice(-2);
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
                    disabled={openEventForm ? false : true}
                    name="pickupPlace"
                    value={formData?.pickupPlace ?? ""}
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
                  <Typography variant="subtitle1">Group Details:</Typography>
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
                              disabled={openEventForm ? false : true}
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
                              disabled={openEventForm ? false : true}
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
                              disabled={openEventForm ? false : true}
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
                              disabled={openEventForm ? false : true}
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
                          disabled={openEventForm ? false : true}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  <Button
                    variant="contained"
                    onClick={addGroupMember}
                    style={{ marginTop: "10px" }}
                    disabled={openEventForm ? false : true}
                  >
                    Add Member
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={openEventForm ? false : true}
                  label="Anything else you want to inform us"
                  name="notes"
                  value={formData?.notes ?? ""}
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
                disabled={openEventForm ? false : true}
              >
                {localStorage.getItem("userDetail") ? "Update" : "Submit"}
              </Button>
            </Grid>
          </form>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SinglePageEventRegister;

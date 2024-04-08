import React, { useState, useEffect } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Grid,
  FormHelperText,
  Snackbar,
  Skeleton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  EducationalQualification,
  Profession,
  baseUrl,
  states,
  statesWithDistricts,
} from "../config/constants";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const EventsPage = () => {
  const navigate = useNavigate();
  const [skeletonopen, setSkeletonOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [backDrop, setBackDrop] = useState<any>(false);
  const userDetailString = localStorage.getItem("userDetail");
  const parsedUser =
    userDetailString && userDetailString !== "null"
      ? JSON.parse(userDetailString)
      : null;

  const userFromLocalStorage: any = parsedUser || {
    email: "",
    firstName: "",
    middleName: null,
    lastName: null,
    gender: "",
    dateOfBirth: "",
    guardianName: null,
    maritalStatus: "",
    bloodGroup: "",
    addrLine1: "",
    addrLine2: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  };

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [formData, setFormData] = useState<any>({
    eventCode: "",
    arrivalDate: "",
    departureDate: "",
    groupDetails: [{ name: "", relation: "", gender: "", age: "" }],
    pickupPlace: "",
    notes: "",
    ...userFromLocalStorage,
  });
  const [errors, setErrors] = useState<any>({});
  const [registerCheck, setRegisterCheck] = useState<any>(false);
  const [registerId, setRegisterId] = useState<any>();
  const authToken = localStorage.getItem("authToken") || "";
  const handleOpen = (eventCode: any) => {
    setFormData({ ...formData, eventCode });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    console.log("formdata :: ", formData);
    const { name, value } = e.target;
    let formattedValue = value;
    console.log("name :: ", name, "value :: ", value);
    setFormData({ ...formData, [name]: formattedValue });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleGroupDetailsChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const updatedGroupDetails: any = [...formData.groupDetails];
    updatedGroupDetails[index][name] = value;

    const newErrors = { ...errors };
    if (newErrors.groupDetails && newErrors.groupDetails[index]) {
      newErrors.groupDetails[index] = "";
      setErrors(newErrors);
    }
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

  const onRegisterClick = async (eventCode: any) => {
    setBackDrop(true);
    let user: any = localStorage.getItem("userDetail");
    user = JSON.parse(user);
    if (!authToken) {
      navigate("/log-in", {
        state: { eventCode: eventCode },
      });
    } else {
      const checkRegistered = axios
        .get(`${baseUrl}/events/event-registrations`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          if (res.data.data) {
            const registeredEvent = res.data.data.find(
              (o: any) =>
                o.eventCode === eventCode &&
                o.mobileNumber === user.mobileNumber
            );

            if (registeredEvent) {
              setFormData((prevFormData: any) => {
                return {
                  ...prevFormData,
                  arrivalDate: registeredEvent.arrivalDate,
                  departureDate: registeredEvent.departureDate,
                  groupDetails: registeredEvent.groupDetails,
                  notes: registeredEvent.notes,
                  eventCode: eventCode,
                };
              });
              setRegisterId(registeredEvent.eventRegId);
              setRegisterCheck(true);
              setBackDrop(false);
              setOpen(true);
            } else {
              setBackDrop(false);
              handleOpen(eventCode);
            }
          }
        });
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const newErrors: any = {};
      console.log("formData ::", formData);

      if (!formData.firstName) {
        newErrors.firstName = "First Name is required";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }

      if (!formData.district) {
        newErrors.district = "District is required";
      }
      if (!formData.state) {
        newErrors.state = "State is required";
      }
      if (!formData.country) {
        newErrors.country = "Country is required";
      }

      const groupDetailsErrors = formData.groupDetails.map((member: any) => {
        if (!member.name || !member.gender || !member.age) {
          return "Please fill in all fields for all group members";
        }
        return null; // No error
      });
      // Set the errors for groupDetails
      if (groupDetailsErrors.some((error: any) => error !== null)) {
        newErrors.groupDetails = groupDetailsErrors;
      }
      // If there are errors, set them and prevent form submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const {
        mobileNumber,
        firstName,
        gender,
        dateOfBirth,
        eventCode,
        arrivalDate,
        departureDate,
        groupDetails,
        notes,
      } = formData;

      const updateUserObj = {
        mobileNumber,
        countrycode: parsedUser.countrycode,
        email: parsedUser.email,
        firstName,
        middleName: parsedUser.middleName,
        lastName: parsedUser.lastName,
        whatsappNumber: parsedUser.whatsappNumber,
        gender,
        dateOfBirth,
        edQualification: parsedUser.edQualification,
        profession: parsedUser.profession,
        guardianName: parsedUser.guardianName,
        maritalStatus: parsedUser.maritalStatus,
        bloodGroup: parsedUser.bloodGroup,
        addrLine1: formData.addrLine1,
        addrLine2: formData.addrLine2,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      };
      setBackDrop(true);
      const { data } = await axios.post(
        `${baseUrl}/update-user`,
        updateUserObj,
        {
          headers: { Authorization: authToken },
        }
      );

      if (data.status === 200) {
        localStorage.removeItem("userDetail");
        localStorage.setItem("userDetail", JSON.stringify(data.data));

        const res = await axios.post(
          `${baseUrl}/events/register`,
          {
            mobileNumber,
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
            headers: { Authorization: authToken },
          }
        );
        console.log("Register event :: res ::", res);
        setBackDrop(false);
        setOpenAlert(true);
        setOpen(false);
      }
    } catch (error) {
      console.log("error :: ", error);
    }
  };

  const fetchEvents = async () => {
    try {
      setSkeletonOpen(true);
      axios
        .get(`${baseUrl}/events/active`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          // if(res.data)
          console.log("res :: data ::", res.data);
          if (res.data.status === 200) {
            setData(res.data.data);
            setSkeletonOpen(false);
          }
        });
    } catch (error) {
      console.log("error :: ", error);
    }
  };

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      state: selectedState,
      district: "",
    }));
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {registerCheck
            ? "Registration Successfully updated."
            : " Registration Successfully Done."}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="md"
        style={{
          marginTop: "2%",
          marginBottom: "2%",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase",
          }}
        >
          Event List
        </Typography>

        {skeletonopen && (
          <Card
            style={{
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "0.3s",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#fff",
              border: "1px solid #ddd",
            }}
          >
            <CardContent style={{ padding: "20px" }}>
              <Typography
                variant="h5"
                component="div"
                style={{ color: "#333", marginBottom: "10px" }}
              >
                <Skeleton animation="pulse" />
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ marginBottom: "10px" }}
              >
                <Skeleton animation="pulse" />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ marginBottom: "10px" }}
              >
                <Skeleton animation="pulse" />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ marginBottom: "10px" }}
              >
                <Skeleton animation="pulse" />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ marginBottom: "10px" }}
              >
                <Skeleton animation="pulse" />
              </Typography>
            </CardContent>
          </Card>
        )}
        {data.map((event: any) => {
          return (
            <Card
              key={event.eventCode}
              style={{
                marginBottom: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "0.3s",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
                border: "1px solid #ddd",
              }}
            >
              <CardContent style={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: "#333", marginBottom: "10px" }}
                  onClick={() => {
                    console.log("event name :: ", event.eventName);
                    navigate(`/event-detail`, { state: event });
                  }}
                >
                  {event.eventName}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  style={{ marginBottom: "10px" }}
                >
                  <strong>Organiser:</strong> {event.organiserName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  style={{ marginBottom: "10px" }}
                >
                  <strong>Date:</strong> {event.startDateTime} -{" "}
                  {event.endDateTime}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  style={{ marginBottom: "10px" }}
                >
                  <strong>Location:</strong> {event.city}, {event.state},{" "}
                  {event.country}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "10px" }}
                >
                  <strong>Mode:</strong> {event.mode}
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`https://maps.google.com/?q=${event.city}, ${event.state}, ${event.country}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "right",
                      textDecoration: "none",
                      color: "#007bff",
                    }}
                  >
                    View on Map
                  </a>
                  <Button
                    variant="contained"
                    onClick={() => onRegisterClick(event.eventCode)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      marginRight: "10px",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
                <Modal open={open} onClose={handleClose}>
                  <>
                    {" "}
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={backDrop}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "75%", // Adjusted width for responsiveness
                        maxHeight: "90vh", // Adjusted height for responsiveness
                        overflowY: "auto",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Register for {event.eventName}
                        </Typography>

                        {registerCheck && (
                          <Typography variant="h6" gutterBottom color="error">
                            You are already registered for this event with Reg
                            id {registerId}
                          </Typography>
                        )}
                        <IconButton onClick={handleClose}>
                          <CloseOutlined />
                        </IconButton>
                      </Box>
                      <form>
                        <TextField
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                        <FormControl component="fieldset" margin="normal">
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            row
                          >
                            <FormControlLabel
                              value="Male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="Female"
                              control={<Radio />}
                              label="Female"
                            />
                          </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <InputLabel>Country*</InputLabel>
                          <Select
                            aria-label="Country"
                            label="Country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                          >
                            <MenuItem value="india">India</MenuItem>
                            <MenuItem value="afghanistan">Afghanistan</MenuItem>
                          </Select>
                        </FormControl>
                        {errors.country && (
                          <FormHelperText error>
                            {errors.country}
                          </FormHelperText>
                        )}

                        <FormControl fullWidth margin="normal">
                          <InputLabel>State*</InputLabel>
                          <Select
                            aria-label="State"
                            label={"State"}
                            name="state"
                            required
                            value={formData.state}
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
                          {errors.state && (
                            <FormHelperText error>
                              {errors.state}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <InputLabel>District*</InputLabel>
                          <Select
                            aria-label="District"
                            label="District"
                            name="district"
                            required
                            value={formData.district}
                            onChange={handleChange}
                            disabled={!formData.state || formData.state === ""}
                          >
                            {formData.state &&
                              statesWithDistricts[formData.state] &&
                              statesWithDistricts[formData.state].map(
                                (district: any, index: any) => (
                                  <MenuItem key={index} value={district}>
                                    {district}
                                  </MenuItem>
                                )
                              )}
                          </Select>

                          {errors.district && (
                            <FormHelperText error>
                              {errors.district}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <TextField
                          label="City / Village"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />

                        <TextField
                          label="Address 1"
                          name="addrLine1"
                          value={formData.addrLine1}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />

                        <TextField
                          label="Address 2"
                          name="addrLine2"
                          value={formData.addrLine2}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />

                        <TextField
                          label="Pincode"
                          name="pincode"
                          type="number"
                          value={formData.pincode}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          style={{ marginBottom: "2%" }}
                        />

                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={enGB}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <DatePicker
                                  value={
                                    formData.dateOfBirth
                                      ? new Date(
                                          formData.dateOfBirth
                                            .split("-")
                                            .reverse()
                                            .join("-")
                                        )
                                      : null
                                  }
                                  onChange={(e: any) => {
                                    const value = `${new Date(e)
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0")}-${(
                                      new Date(e).getMonth() + 1
                                    )
                                      .toString()
                                      .padStart(2, "0")}-${new Date(
                                      e
                                    ).getFullYear()}`;
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
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <DateTimePicker
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
                                      ("0" + new Date(e).getMinutes()).slice(
                                        -2
                                      );
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
                                      ("0" + new Date(e).getMinutes()).slice(
                                        -2
                                      );
                                    setFormData({
                                      ...formData,
                                      ["departureDate"]: convertedDate,
                                    });
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </LocalizationProvider>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Pickup place</InputLabel>
                          <Select
                            name="pickupPlace"
                            value={formData.pickupPlace}
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
                        <Box mb={2}>
                          <Typography variant="subtitle1">
                            Group Details:
                          </Typography>
                          {formData.groupDetails.map(
                            (member: any, index: any) => (
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
                                {errors.groupDetails &&
                                  errors.groupDetails[index] && (
                                    <FormHelperText error>
                                      {errors.groupDetails[index]}
                                    </FormHelperText>
                                  )}
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => removeGroupMember(index)}
                                  style={{ marginTop: "16px" }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            )
                          )}
                          <Button
                            variant="contained"
                            onClick={addGroupMember}
                            style={{ marginTop: "10px" }}
                          >
                            Add Member
                          </Button>
                        </Box>
                        <TextField
                          label="Anything else you want to inform us"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          multiline
                          rows={3}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={handleSubmit}
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            marginTop: "10px",
                          }}
                        >
                          {registerCheck ? "Update" : "Submit"}
                        </Button>
                      </form>
                    </Box>
                  </>
                </Modal>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default EventsPage;

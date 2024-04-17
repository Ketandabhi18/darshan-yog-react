import React, { useState } from "react";
import {
  Typography,
  Button,
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
  Grid,
  FormHelperText,
  IconButton,
  Stack,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { baseUrl, statesWithDistricts } from "../config/constants";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EventRegistrationModal = ({
  registerCheck,
  registerId,
  handleClose,
  formData,
  setFormData,
  event,
  parsedUser,
  setBackDrop,
  authToken,
  setAlertType,
  setAlertMessage,
  setOpenAlert,
  setOpen,
}: any) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [dateErrorArrival, setDateErrorArrival] = useState<any>("");
  const [dateErrorDeparture, setDateErrorDeparture] = useState<any>("");
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
        if (member.deletedFlag === false) {
          if (!member.name || !member.gender || !member.age) {
            return "Please fill in all fields for all group members";
          }
        }
        return null; // No error
      });
      if (groupDetailsErrors.some((error: any) => error !== null)) {
        newErrors.groupDetails = groupDetailsErrors;
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (dateErrorArrival === "" && dateErrorDeparture === "") {
        const {
          mobileNumber,
          firstName,
          gender,
          dateOfBirth,
          age,
          eventCode,
          arrivalDate,
          departureDate,
          groupDetails,
          notes,
          pickUp,
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
          age,
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
              age,
              eventCode,
              arrivalDate,
              departureDate,
              groupDetails,
              notes,
              pickUp,
            },
            {
              headers: { Authorization: authToken },
            }
          );
          console.log("Register event :: res ::", res);
          if (res.data.status === 200) {
            setBackDrop(false);
            setAlertType("success");
            setAlertMessage(
              registerCheck
                ? "Registration Details Successfully updated."
                : " Registration Successfully Done."
            );
            setOpenAlert(true);
            setOpen(false);
          } else if (res.data.status === 401) {
            setAlertType("error");
            setAlertMessage("Your token Expired Please login again.!!");
            setOpenAlert(true);
            // setOpen(false);
            localStorage.clear();
            setTimeout(() => {
              navigate("/log-in");
            }, 2000);
          } else {
            setBackDrop(false);
            setAlertType("error");
            setAlertMessage(res.data.message);
            setOpenAlert(true);
          }
        } else if (data.status === 401) {
          setAlertType("error");
          setAlertMessage("Your token Expired Please login again.!!");
          setOpenAlert(true);
          setOpen(false);
          setTimeout(() => {
            localStorage.clear();
            navigate("/log-in");
          }, 2000);
        } else {
          setBackDrop(false);
          setAlertType("error");
          setAlertMessage(data.message);
          setOpenAlert(true);
        }
      } else {
        return;
      }
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
    const updatedGroupDetails = formData.groupDetails.map(
      (member: any, index: any) => {
        if (index === indexToRemove && member.deletedFlag === false) {
          return { ...member, deletedFlag: true };
        }
        return member;
      }
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
        { name: "", relation: "", gender: "", age: "", deletedFlag: false },
      ],
    });
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          mb: 2,
        }}
      >
        <Stack spacing={2}>
          {registerCheck && (
            <Typography
              variant="h6"
              gutterBottom
              color="error"
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "13px",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              You are already registered for this event with Reg id {registerId}
            </Typography>
          )}
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" gutterBottom>
              Register for {event.eventName}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          // display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexGrow: 1,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Register for {event.eventName}
        </Typography>
        {registerCheck && (
          <Typography
            variant="h6"
            gutterBottom
            color="error"
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            You are already registered for this event with Reg id {registerId}
          </Typography>
        )}
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
                <FormControlLabel
                  value="Others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country*</InputLabel>
              <Select
                aria-label="Country"
                label="Country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="afghanistan">Afghanistan</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {errors.country && (
            <FormHelperText error>{errors.country}</FormHelperText>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
                {Object.keys(statesWithDistricts).map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && (
                <FormHelperText error>{errors.state}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
                <FormHelperText error>{errors.district}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City / Village"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address 1"
              name="addrLine1"
              value={formData.addrLine1}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address 2"
              name="addrLine2"
              value={formData.addrLine2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              name="pincode"
              type="number"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: "2%" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "2%" }}
              />
            </FormControl>
          </Grid>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Arrival Date"
                  name="arrivalDate"
                  value={
                    formData.arrivalDate
                      ? new Date(formData.arrivalDate)
                      : new Date()
                  }
                  minDate={new Date(event.startDateTime)}
                  onChange={(e: any) => {
                    const arrivalDate = new Date(e);
                    const departureDate = new Date(formData.departureDate);

                    if (arrivalDate > departureDate) {
                      setDateErrorArrival(
                        "Arrival date cannot be after departure date"
                      );
                    } else {
                      setDateErrorArrival("");
                      const convertedDate =
                        arrivalDate
                          .toLocaleDateString("en-US", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, "-") +
                        " " +
                        ("0" + arrivalDate.getHours()).slice(-2) +
                        ":" +
                        ("0" + arrivalDate.getMinutes()).slice(-2);
                      setFormData({
                        ...formData,
                        arrivalDate: convertedDate,
                      });
                    }
                  }}
                />
                {dateErrorArrival && (
                  <FormHelperText error>{dateErrorArrival}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Departure Date"
                  name="departureDate"
                  minDate={new Date(event.endDateTime)}
                  value={
                    formData.departureDate
                      ? new Date(formData.departureDate)
                      : new Date()
                  }
                  onChange={(e: any) => {
                    const departureDate = new Date(e);
                    const arrivalDate = new Date(formData.arrivalDate);

                    if (departureDate < arrivalDate) {
                      setDateErrorDeparture(
                        "Departure date cannot be before Arrival date"
                      );
                    } else {
                      setDateErrorDeparture("");
                      const convertedDate =
                        departureDate
                          .toLocaleDateString("en-US", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, "-") +
                        " " +
                        ("0" + departureDate.getHours()).slice(-2) +
                        ":" +
                        ("0" + departureDate.getMinutes()).slice(-2);
                      setFormData({
                        ...formData,
                        departureDate: convertedDate,
                      });
                    }
                  }}
                />
                {dateErrorDeparture && (
                  <FormHelperText error>{dateErrorDeparture}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </LocalizationProvider>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Pickup place</InputLabel>
              <Select
              label={'pickup place'}
              aria-label={'pickup place'}
                name="pickUp"
                value={formData.pickUp}
                onChange={handleChange}
              >
                <MenuItem value="Kalupur Railway Station">
                  Kalupur Railway Station
                </MenuItem>
                <MenuItem value="Sabarmati Railway Station">
                  Sabarmati Railway Station
                </MenuItem>
                <MenuItem value="Ahmedabad Airport">Ahmedabad Airport</MenuItem>
                <MenuItem value="Prantij bus stop">Prantij bus stop</MenuItem>
                <MenuItem value="Self ">Self </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box mb={2}>
              <Typography variant="subtitle1">Group Details:</Typography>
              {formData.groupDetails.map((member: any, index: any) => {
                return (
                  <>
                    {member.deletedFlag === false && (
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
                          Participant{" "}
                          {formData.groupDetails
                            .slice(0, index + 1)
                            .findLastIndex((obj: any) => !obj.deletedFlag) + 1}
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
                            <FormControl fullWidth>
                              <InputLabel>Gender</InputLabel>
                              <Select
                                label={"Gender"}
                                aria-label={"Gender"}
                                value={member.gender}
                                onChange={(e) =>
                                  handleGroupDetailsChange(index, e)
                                }
                                name="gender"
                                fullWidth
                              >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                              </Select>
                            </FormControl>
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
                        {errors.groupDetails && errors.groupDetails[index] && (
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
                    )}
                  </>
                );
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={addGroupMember}
                  style={{ marginTop: "10px" }}
                >
                  Add Member
                </Button>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12}>
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
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        </div>
      </form>
    </>
  );
};

export default EventRegistrationModal;
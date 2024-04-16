import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import {
  EducationalQualification,
  Profession,
  baseUrl,
  bloodGroupArray,
  states,
  statesWithDistricts,
} from "../config/constants";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [alertType, setAlertType] = useState<any>("success");
  const [backDrop, setBackDrop] = useState<any>(false);
  const authToken = localStorage.getItem("authToken");
  const user: any = localStorage.getItem("userDetail");
  const userDetail: any = JSON.parse(user);
  console.log(new Date(), "userDetail :: in update user ", userDetail);
  const [formData, setFormData] = useState<any>(userDetail);

  const handleChange = (e: any, newValue?: any) => {
    const { name, value } = e.target || {};
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value || newValue,
    }));
    if ((value || newValue)?.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
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

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setBackDrop(true);
      console.log(newErrors, "formData :: ", formData);
      const { data } = await axios.post(`${baseUrl}/update-user`, formData, {
        headers: { Authorization: authToken },
      });
      if (data.status === 200) {
        setBackDrop(false);
        setAlertType("success");
        setAlertMessage("User Updated Successfully.");
        setOpenAlert(true);
        localStorage.removeItem("userDetail");
        localStorage.setItem("userDetail", JSON.stringify(data.data));
      } else if (data.status === 401) {
        setAlertType("error");
        setAlertMessage("Your token Expired Please login again.!!");
        setOpenAlert(true);
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      state: selectedState,
      district: "", // Reset district when state changes
    }));
  };

  return (
    <>
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
        autoHideDuration={3000}
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
          <h1 style={{ paddingTop: "25px" }}>Update profile</h1>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          marginTop: "2%",
          paddingTop: "40px",
        }}
      >
        <div style={{ width: "80%" }}>
          {/*  <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2%",
            }}
          >
            <Typography variant="h5">Update profile</Typography>
          </div> */}
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
                    label="Gender"
                    aria-label="Gender"
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
                          : new Date()
                      }
                      onChange={(e: any) => {
                        const value = `${new Date(e)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}-${(new Date(e).getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}-${new Date(e).getFullYear()}`;
                        setFormData((prevFormData: any) => {
                          return { ...prevFormData, ["dateOfBirth"]: value };
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
              </LocalizationProvider>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Educational Qualification</InputLabel>
                  <Select
                    label={"Educational Qualification"}
                    arial-label={"Educational Qualification"}
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Profession</InputLabel>
                  <Select
                    label={"Profession"}
                    arial-label={"Profession"}
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
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Guardian Name"
                  name="guardianName"
                  value={formData?.guardianName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    label={"Marital Status"}
                    arial-label={"Marital Status"}
                    value={formData?.maritalStatus}
                    onChange={handleChange}
                    name="maritalStatus"
                  >
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Unmarried">Unmarried</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <TextField
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData?.bloodGroup}
                  onChange={handleChange}
                /> */}
                <Autocomplete
                  freeSolo
                  fullWidth
                  value={formData.bloodGroup}
                  options={bloodGroupArray}
                  onChange={(event, newValue) =>
                    handleChange({ target: { name: "bloodGroup" } }, newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Blood Group"
                      InputProps={{
                        ...params.InputProps,
                        type: "Blood Group",
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country*</InputLabel>
                  <Select
                    label={"Country"}
                    arial-label={"Country"}
                    name="country"
                    required
                    value={formData?.country}
                    onChange={handleChange}
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="afghanistan">Afghanistan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>State*</InputLabel>
                  <Select
                    label={"State"}
                    arial-label={"State"}
                    name="state"
                    required
                    value={formData?.state}
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
                {errors.state && (
                  <FormHelperText error>{errors.state}</FormHelperText>
                )}
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
                    label={"District"}
                    arial-label={"District"}
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
                {formData?.state !== null &&
                  formData?.district !== null &&
                  errors.district && (
                    <FormHelperText error>{errors.district}</FormHelperText>
                  )}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address 2"
                  name="addrLine2"
                  value={formData?.addrLine2}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  type="number"
                  value={formData?.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;

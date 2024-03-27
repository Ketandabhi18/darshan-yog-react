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
} from "@mui/material";
import {
  EducationalQualification,
  Profession,
  states,
  statesWithDistricts,
} from "../config/constants";
import axios from "axios";

const UpdateUser = () => {
  const [errors, setErrors] = useState<any>({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [alertType, setAlertType] = useState<any>("success");
  const authToken = localStorage.getItem("authToken");
  const user: any = localStorage.getItem("userDetail");
  const userDetail: any = JSON.parse(user);
  const [formData, setFormData] = useState<any>(userDetail);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    if (value.trim() !== "") {
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
      console.log(newErrors, "formData :: ", formData);
      const { data } = await axios.post(
        "https://darshan-yog-node-apis.onrender.com/update-user",
        // "http://localhost:7001/update-user",
        formData,
        {
          headers: { Authorization: authToken },
        }
      );
      if (data.status === 200) {
        setAlertType("success");
        setAlertMessage("User Updated Successfully.");
        setOpenAlert(true);
        localStorage.removeItem("userDetail");
        localStorage.setItem("userDetail", JSON.stringify(data.data));
      } else {
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
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          marginTop: "2%",
        }}
      >
        <div style={{ width: "80%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2%",
            }}
          >
            <Typography variant="h5">Update profile</Typography>
          </div>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData?.dateOfBirth}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
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
                <FormControl fullWidth margin="normal">
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
                <FormControl fullWidth margin="normal">
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

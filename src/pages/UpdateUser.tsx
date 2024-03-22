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
} from "@mui/material";

const UpdateUser = () => {
  const user: any = localStorage.getItem("userDetail");
  const userDetail: any = JSON.parse(user);
  const [formData, setFormData] = useState<any>(userDetail);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("formData :: ", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
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
                  value={formData.dateOfBirth}
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
                    value={formData.edQualification}
                    onChange={handleChange}
                    name="edQualification"
                  >
                    <MenuItem value="Graduate">Graduate</MenuItem>
                    <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Profession</InputLabel>
                  <Select
                    value={formData.profession}
                    onChange={handleChange}
                    name="profession"
                  >
                    <MenuItem value="Software Engineer">
                      Software Engineer
                    </MenuItem>
                    <MenuItem value="Farmer">Farmer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Guardian Name"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    value={formData.maritalStatus}
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
                  value={formData.bloodGroup}
                  onChange={handleChange}
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
                  label="City / Village"
                  name="city"
                  value={formData.city}
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
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <MenuItem value="gandhinagar">Gandhinagar</MenuItem>
                    <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>State*</InputLabel>
                  <Select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <MenuItem value="Gujarat">Gujarat</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country*</InputLabel>
                  <Select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="afghanistan">Afghanistan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
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

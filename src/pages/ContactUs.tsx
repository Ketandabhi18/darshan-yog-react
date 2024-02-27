import { LocationCityOutlined, Mail, Phone } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Map from "../Components/Map";
const ContactUs = () => {
  const latitude = 23.433923819193076; // Replace with your desired latitude
  const longitude = 73.11904; // Replace with your desired longitude
  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#f7f7f7" }}>
        <Container
          component="main"
          sx={{ mt: 8, mb: 2 }}
          maxWidth="sm"
          style={{
            backgroundImage:
              "https://www.smvs.org/theme/smvs/images/world-map-dark.png",
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <span
            style={{
              display: "flex",
              paddingTop: "10px",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <LocationCityOutlined />
            <p style={{ paddingLeft: "15px", fontSize: "smaller" }}>
              आर्यवन, रोजड़, पत्रा.: सागपुर, तालुका : तलोद, जिला : साबरकांठा,
              गुजरात- 383307
            </p>
          </span>
          <span
            style={{
              display: "flex",
              paddingTop: "10px",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Phone />
            <p style={{ paddingLeft: "15px", fontSize: "smaller" }}>
              9409615011, 9409415011
            </p>
          </span>

          <span
            style={{
              display: "flex",
              paddingTop: "10px",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Mail />
            <p style={{ paddingLeft: "15px", fontSize: "smaller" }}>
              darshanyog@gmail.com
            </p>
          </span>
        </Container>
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h6" component="h1" gutterBottom>
            Message for Us
          </Typography>
          <div style={{ display: "grid", width: "60%" }}>
            <TextField
              label="Name"
              variant="standard"
              style={{ marginBottom: "2%" }}
              placeholder="Enter Name"
            />

            <TextField
              label="Email"
              variant="standard"
              style={{ marginBottom: "2%" }}
              placeholder="Enter Email"
            />

            <TextField
              label="Mobile"
              variant="standard"
              style={{ marginBottom: "2%" }}
              placeholder="Enter Mobile"
            />

            <TextField
              label="Message"
              multiline
              rows={3}
              variant="standard"
              placeholder="Enter Message"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <Button variant="outlined">Outlined</Button>
            </div>
          </div>
        </Container>
      </div>
      {/* <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <h1>View on map</h1>
      </div> */}
      <Map latitude={latitude} longitude={longitude} />
    </>
  );
};

export default ContactUs;

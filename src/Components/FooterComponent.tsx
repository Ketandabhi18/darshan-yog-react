import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FacebookOutlined,
  Instagram,
  LocationCityOutlined,
  Mail,
  Phone,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      2024 Darshanyog Mahavidyalaya
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const FooterComponent = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container spacing={2} sx={{ backgroundColor: "#f7f7f7", mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Container maxWidth="sm">
              <div style={{ display: "flex" }}>
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
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
                      आर्यवन, रोजड़, पत्रा.: सागपुर, तालुका : तलोद, जिला :
                      साबरकांठा, गुजरात- 383307
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
                  <span
                    style={{
                      display: "flex",
                      paddingTop: "2%",
                      position: "relative",
                      right: "13px",
                    }}
                  >
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <FacebookOutlined style={{}} />
                    </div>
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <Instagram style={{}} />
                    </div>
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <Twitter style={{}} />
                    </div>
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <YouTube style={{}} />
                    </div>
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <WhatsApp style={{}} />
                    </div>
                    <div
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #11111124",
                        borderRadius: "5px",
                      }}
                    >
                      <Telegram style={{}} />
                    </div>
                  </span>
                </Container>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12} md={6} sx={{ justifyContent: "center" }}>
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
              <div
                style={{
                  width: "80%",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  gutterBottom
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  Message for Us
                </Typography>
                <div style={{ display: "grid", width: "70%", margin: "auto" }}>
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
                    <Button variant="outlined">Submit</Button>
                  </div>
                </div>
              </div>
            </Container>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgb(183 181 179 / 82%)",
          }}
        >
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
            }}
            style={{}}
          >
            <Container maxWidth="sm">
              <Copyright />
            </Container>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default FooterComponent;

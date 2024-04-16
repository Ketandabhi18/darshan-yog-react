import { useState, useEffect } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  Stack,
  Snackbar,
  Skeleton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { baseUrl } from "../config/constants";
import EventRegistrationModal from "../Components/EventRegistrationModal";

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
    pickUp: "",
    notes: "",
    ...userFromLocalStorage,
  });
  const [registerCheck, setRegisterCheck] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<any>("success");
  const [registerId, setRegisterId] = useState<any>();
  const authToken = localStorage.getItem("authToken") || "";

  const handleOpen = (eventCode: any) => {
    setFormData({ ...formData, eventCode });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRegisterClick = async (eventCode: any) => {
    setBackDrop(true);
    let user: any = localStorage.getItem("userDetail");
    user = JSON.parse(user);
    if (!authToken) {
      navigate(`/event/${eventCode}`);
      // navigate("/log-in", {
      //   state: { eventCode: eventCode },
      // });
    } else {
      const checkRegistered = axios
        .get(`${baseUrl}/events/event-registrations`, {
          params: { eventCode: eventCode },
          headers: { Authorization: authToken },
        })
        .then((res) => {
          if (res.data.status === 401) {
            setAlertType("error");
            setAlertMessage("Your token Expired Please login again.!!");
            setOpenAlert(true);
            setTimeout(() => {
              localStorage.clear();
              navigate("/log-in");
            }, 2000);
          }
          if (res.data.data) {
            const registeredEvent = res.data.data.find(
              (o: any) =>
                o.eventCode === eventCode &&
                o.mobileNumber === user.mobileNumber
            );

            if (registeredEvent) {
              setFormData((prevFormData: any) => {
                return {
                  ...user,
                  pickUp: registeredEvent.pickUp,
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
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className="hero-event">
        <div className="hero-content">
          <h1 style={{ paddingTop: "25px" }}>Event List</h1>
        </div>
      </div>

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
                    autoFocus
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
                        width: "75%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <EventRegistrationModal
                        registerId={registerId}
                        handleClose={handleClose}
                        formData={formData}
                        setFormData={setFormData}
                        event={event}
                        registerCheck={registerCheck}
                        parsedUser={parsedUser}
                        setBackDrop={setBackDrop}
                        authToken={authToken}
                        setAlertType={setAlertType}
                        setAlertMessage={setAlertMessage}
                        setOpenAlert={setOpenAlert}
                        setOpen={setOpen}
                      />
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

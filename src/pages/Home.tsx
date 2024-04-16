import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CloseOutlined, ViewCarousel } from "@mui/icons-material";
import "./home.css";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { JSX } from "react/jsx-runtime";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HomeCarouselCard from "../Components/HomeCarouselCard";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  Select,
  Skeleton,
  Stack,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import {
  baseUrl,
  testimonials,
  videoData,
  videoLinks,
} from "../config/constants";
import EventRegistrationModal from "../Components/EventRegistrationModal";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface VideoItem {
  title: string;
  date: string;
  videoUrl: string;
  imageUrl: string;
}

const VideoBox = ({ title, url, thumbnail }: any) => {
  const handleClick = () => {
    window.location.href = url;
  };

  const cardStyle: any = {
    maxWidth: "345px",
    width: "200px", // Fixed width for each box
    height: "200px", // Adjust the height as needed
    margin: "20px",
    cursor: "pointer",
    borderRadius: "10px",
    // transition: "transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const hoverStyle: any = {
    // transform: "scale(1.05)",
  };

  const contentStyle: any = {
    padding: "10px",
    textAlign: "center",
  };

  return (
    <Card
      style={cardStyle}
      onClick={handleClick}
      // onMouseEnter={(e: any) =>
      //   (e.currentTarget.style = { ...cardStyle, ...hoverStyle })
      // }
      // onMouseLeave={(e: any) => (e.currentTarget.style = cardStyle)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={thumbnail}
          title={title}
          style={{
            borderRadius: "10px 10px 0 0",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div style={contentStyle}>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

const Home = () => {
  const [skeletonopen, setSkeletonOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
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

  const iRef = useRef(0);
  let txt =
    "|| हे ऐश्वर्यवान परमात्मन आप हमारे सभी ऐश्वर्यों को सुदृढ़ करें, जिससे हम सम्पूर्ण विश्व को श्रेष्ठ बना सकें तथा समाज में व्याप्त अवैदिकत्व का नाश कर सकें ||";
  const speed = 50;

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const homecardCarouselData: any = [
    { name: "Aaj Ka Suvichar", data: videoData },
    { name: "News", data: videoData },
    { name: "Program Schedule", data: videoData },
    { name: "Latest Video", data: videoData },
  ];
  const styles: any = {
    pageSection: {
      backgroundColor: "#ffffff",
    },
    branchCover: {
      width: "100%",
      "& img": {
        width: "100%",
        height: "auto",
      },
    },
    branchContent: {
      padding: "20px",
      textAlign: "left",
    },
    carouselControl: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };
  // const handleChange: any = (cur: number, prev: number) => {
  //   setIndex(cur);
  //   console.log(cur, prev);
  // };

  const imageStyle: any = {
    width: "100%", // Set the width as per your requirements
    height: "100%", // Set the height as per your requirements
    objectFit: "cover",
  };

  const itemsPerPage = isSmScreen ? 1 : 3; // Adjust the number of items per page based on screen size

  const groupedTestimonials = testimonials.reduce(
    (acc: any, testimonial: any, index: any) => {
      const pageIndex: any = Math.floor(index / itemsPerPage);

      if (!acc[pageIndex]) {
        acc[pageIndex] = [];
      }

      acc[pageIndex].push(testimonial);

      return acc;
    },
    []
  );

  const TestimonialItem = ({
    imageUrl,
    link,
    title,
  }: {
    imageUrl: any;
    link: any;
    title: any;
  }) => {
    const itemId = `testimonial-item-${Math.floor(Math.random() * 100000)}`;

    const handleMouseOver = () => {
      const element = document.getElementById(itemId);
      if (element) {
        element.style.borderColor = "#ccc";
        const titleOverlay = element.querySelector(
          ".title-overlay"
        ) as HTMLElement | null;
        if (titleOverlay) {
          titleOverlay.style.opacity = "1";
        }
      }
    };

    const handleMouseOut = () => {
      const element = document.getElementById(itemId);
      if (element) {
        element.style.borderColor = "#fff";
        const titleOverlay = element.querySelector(
          ".title-overlay"
        ) as HTMLElement | null;
        if (titleOverlay) {
          titleOverlay.style.opacity = "0";
        }
      }
    };

    return (
      <Paper
        id={itemId}
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid #fff", // Add a border around each testimonial item
          borderRadius: "400px", // Add border-radius for a rounded look
          transition: "border-color 0.3s ease", // Add a smooth transition for the border color change
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Link
          // href={link}
          style={{
            position: "relative",
            display: "block",
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{ maxWidth: "100%", height: "250px" }}
          />
          <div
            className="title-overlay"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background to overlay on the image
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              width: "100%",
              opacity: 0, // Initially hide the title with opacity
              transition: "opacity 0.3s ease", // Add a smooth transition for the opacity change
            }}
          >
            {title}
          </div>
        </Link>
      </Paper>
    );
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
    const typeWriter = () => {
      const demoElement = document.getElementById("demo");

      if (demoElement && iRef.current < txt.length) {
        demoElement.innerHTML += txt.charAt(iRef.current);
        iRef.current += 1;
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  }, [txt, speed]);

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
      {/* <div style={{ position: "relative" }}>
        <Carousel
          index={index}
          onChange={() => handleChange()}
          interval={4000}
          animation="slide"
          indicators={false}
          stopAutoPlayOnHover
          swipe
          className="my-carousel"
          // style={{ borderRadius: "8px", overflow: "hidden" }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ width: "100%", height: "100%" }}>
              <img src={item.imageUrl} alt={item.alt} style={imageStyle} />
            </div>
          ))}
        </Carousel>
      </div> */}

      <div className="hero-section">
        <div className="hero-content">
          <h1 id="demo" className="text"></h1>

          <div className="event-container">
            <div className="marquee-container">
              <h1 className="marquee">
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Current
                Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </h1>
            </div>

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
                            width: "75%", // Adjusted width for responsiveness
                            maxHeight: "90vh", // Adjusted height for responsiveness
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
            {/*  </Container> */}
          </div>
        </div>
      </div>

      <section
        style={{ background: "#eeeded", padding: "50px 0" }}
        id="announcement"
      >
        <Container>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              paddingBottom: "2%",
            }}
          >
            {" "}
            <Typography variant="h4">Photo & Video</Typography>
          </div>
          {/* <Grid container spacing={3}>
            {homecardCarouselData.map((item: any, index: any) => (
              <HomeCarouselCard
                key={index}
                videoData={item.data}
                name={item.name}
              />
            ))}
          </Grid> */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {videoLinks.map((video, index) => (
              <VideoBox
                key={index}
                title={video.title}
                url={video.url}
                thumbnail={video.thumbnail}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;

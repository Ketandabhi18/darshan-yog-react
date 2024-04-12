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
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { baseUrl, statesWithDistricts } from "../config/constants";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface VideoItem {
  title: string;
  date: string;
  videoUrl: string;
  imageUrl: string;
}

const videoData: VideoItem[] = [
  // Replace with your actual video data
  {
    title: "Vaisheshik darshan 05/01 sutra 9 to 12",
    date: "08 May 2024",
    videoUrl: "https://www.example.com/video1",
    imageUrl: "https://img.youtube.com/vi/LRI3oAKB2Yw/mqdefault.jpg",
  },
  {
    title: "Video 2",
    date: "January 31, 2024",
    videoUrl: "https://www.example.com/video2",
    imageUrl: "https://img.youtube.com/vi/XptwMtG0ozE/mqdefault.jpg",
  },
  {
    title: "Video 3",
    date: "January 31, 2024",
    videoUrl: "https://www.example.com/video2",
    imageUrl: "https://img.youtube.com/vi/2EeLjyMQt6Y/mqdefault.jpg",
  },
  // Add more video items as needed
];

const videoLinks = [
  {
    title: "Video 1",
    url: "https://youtu.be/ujnC4X8FCTA?si=3laoG1Ae9AzqZJbi7",
    thumbnail: "https://i.ytimg.com/vi/ujnC4X8FCTA/maxresdefault.jpg",
  },
  {
    title: "Video 2",
    url: "https://youtu.be/8GA8HrcXLDo?si=9FhYE8jnFkl0EskY",
    thumbnail: "https://i.ytimg.com/vi/8GA8HrcXLDo/maxresdefault.jpg",
  },
  {
    title: "Video 3",
    url: "https://youtu.be/cTSx9AOvs8o?si=zVCHpznhroZ0IrVA",
    thumbnail: "https://i.ytimg.com/vi/cTSx9AOvs8o/maxresdefault.jpg",
  },
  {
    title: "Video 4",
    url: "https://youtu.be/NvWOMwEVtPg?si=RIglbjTcqNNVGXgo",
    thumbnail: "https://i.ytimg.com/vi/NvWOMwEVtPg/maxresdefault.jpg",
  },
];

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
  const [errors, setErrors] = useState<any>({});
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

  const iRef = useRef(0);
  let txt =
    "|| हे ऐश्वर्यवान परमात्मन आप हमारे सभी ऐश्वर्यों को सुदृढ़ करें, जिससे हम सम्पूर्ण विश्व को श्रेष्ठ बना सकें तथा समाज में व्याप्त अवैदिकत्व का नाश कर सकें ||";
  const speed = 50;

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const items = [
    {
      imageUrl:
        "https://darshanyog.org/assets/img/upload/slider/GU65ou2VfI.jpeg",
      alt: "Image 1",
    },
    // {
    //   imageUrl:
    //     "https://darshanyog.org/assets/img/upload/slider/n8q40QSdQL.jpeg",
    //   alt: "Image 2",
    // },
    {
      imageUrl:
        "https://darshanyog.org/assets/img/upload/slider/PczA7f9t1N.jpeg",
      alt: "Image 3",
    },
    {
      imageUrl:
        "https://darshanyog.org/assets/img/upload/slider/0QA5WfrH7q.jpg",
      alt: "Image 4",
    },
    // Add more items as needed
  ];

  const branchItems = [
    {
      imageUrl:
        "https://darshanyog.org/assets/img/upload/branch/banner/9hLkOGFDJp.png",
      alt: "Image 1",
      title: "दर्शन योग धाम",
      subtitle: "संस्कृति वन, लाकरोड़ा, गांधीनगर, गुजरात",
      description: `(वैदिक धर्म की रक्षा और समृद्धि का आदर्श संस्थान)

      दर्शन योग धर्मार्थ ट्रस्ट अपने पूर्वजों ऋषि-मुनियों के द्वारा अनुपालित परम्पराओं की अनमोल थाती को सुरक्षित रखने के लिए सदैव प्रयासशील है । आर्य समाज में योग-विद्या में आदर्श माने जाने वाले पूज्य स्वामी सत्यपति जी परिव्राजक की यह अभिलाषा रही है कि समाज में ऐसे सत्यवादी परोपकारी दार्शनिक आदर्श योगियों का निर्माण किया जाये, जिनका मुख्य उद्देश्य निष्ठापूर्वक ईश्वर, जीव, प्रकृति व भौतिक पदार्थों का वैदिक ज्ञान-विज्ञान आदान-प्रदान करना हो । यह सब कार्य समान लक्ष्य वाले व्यक्तियों के धार्मिक संगठन द्वारा ही सम्भव है । दर्शन योग धर्मार्थ ट्रस्ट ने अपने ऐसे संगठन-निर्माण का निश्चय किया है ।

      `,
    },

    {
      imageUrl:
        "https://darshanyog.org/assets/img/upload/branch/banner/P5RYDz0i57.jpg",
      alt: "Image 4",
      title: "दर्शन योग साधना आश्रम",
      subtitle: "(वैदिक योग साधना एवं योग प्रशिक्षण का आदर्श संस्थान)",
      description:
        "अभ्युदय (लौकिक उपलब्धियाँ) और निःश्रेयस (मोक्ष) वैदिक भारतीय संस्कृति की विरासत है और इसको आत्मसात् किए बिना मानव जीवन की सफलता असम्भव है। अतः इसकी रक्षा और वृद्धि हम सबका एक अनिवार्य कर्त्तव्य बन जाता है। इसी उद्देश्य से दर्शन योग धर्मार्थ ट्रस्ट की ओर से ‘दर्शन योग साधना आश्रम’ के नाम से एक नई और विशिष्ट योजना का शुभारम्भ दिनांक ३०/१०/२०१६ को गीता प्रादुर्भाव की पुण्यभूमि कुरुक्षेत्र, हरियाणा से किया गया है । वहाँ तीन बीघा भूमि है उसमें 4 साधना कुटिरों का निर्माण किया गया है। वर्तमान में उच्चस्तरीय साधना का अनुष्ठान आरम्भ हो गया है । अब तक इस पुनीत कार्य में लगभग 50 लाख रुपये राशि व्यय हो चुकी है । तथा दर्शन योग महाविद्यालय के  आचार्य विद्वान आदि उच्चस्तरीय योग साधना कर रहें हैं ।",
    },
  ];

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

  const testimonials = [
    {
      imageUrl: "https://darshanyog.org/assets/img/upload/team/5eI68ercXT.jpg",
      link: "https://darshanyog.org/assets/img/upload/team/5eI68ercXT.jpg",
      title: "Aacharya Priyesh",
    },
    {
      imageUrl: " https://darshanyog.org/assets/img/upload/team/cM2KD02aK4.jpg",
      link: " https://darshanyog.org/assets/img/upload/team/cM2KD02aK4.jpg",
      title: "Swami satyapati parivrajak",
    },
    {
      imageUrl: "https://darshanyog.org/assets/img/upload/team/jjurs4lO2V.jpg",
      link: "https://darshanyog.org/assets/img/upload/team/jjurs4lO2V.jpg",
      title: "Swami vivekanand parivrajak",
    },
  ];

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
    // Generate a unique id for each TestimonialItem
    const itemId = `testimonial-item-${Math.floor(Math.random() * 100000)}`;

    const handleMouseOver = () => {
      const element = document.getElementById(itemId);
      if (element) {
        // Change border color on hover
        element.style.borderColor = "#ccc";
        // element.style. = "rgba(0, 0, 0, 0.5)";

        // Show the title overlay on hover
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
        // Change back to the original border color on mouse out
        element.style.borderColor = "#fff";

        // Hide the title overlay on mouse out
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
          // padding: "15px", // Add padding inside each testimonial item
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
      navigate("/event-registration");
      // navigate("/log-in", {
      //   state: { eventCode: eventCode },
      // });
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
            groupDetails: groupDetails.map((E: any) => {
              return { ...E, deletedFlag: false };
            }),
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
              ? "Registration Successfully updated."
              : " Registration Successfully Done."
          );
          setOpenAlert(true);
          setOpen(false);
        } else {
          setBackDrop(false);
          setAlertType("error");
          setAlertMessage(res.data.message);
          setOpenAlert(true);
        }
      } else {
        setBackDrop(false);
        setAlertType("error");
        setAlertMessage(data.message);
        setOpenAlert(true);
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
          {/* {registerCheck
            ? "Registration Successfully updated."
            : " Registration Successfully Done."} */}
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
            {/* <Container
              maxWidth="md"
              style={{
                textAlign: "left",
                backgroundColor: "#f4f4f4",
                borderRadius: "6px",
              }}
            > */}
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
                                  You are already registered for this event with
                                  Reg id {registerId}
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
                                // justifyContent: "space-evenly",
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
                                You are already registered for this event with
                                Reg id {registerId}
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
                                <FormControl
                                  component="fieldset"
                                  margin="normal"
                                >
                                  <FormLabel component="legend">
                                    Gender
                                  </FormLabel>
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
                                    <MenuItem value="india">India</MenuItem>
                                    <MenuItem value="afghanistan">
                                      Afghanistan
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>

                              {errors.country && (
                                <FormHelperText error>
                                  {errors.country}
                                </FormHelperText>
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
                                    disabled={
                                      !formData.state || formData.state === ""
                                    }
                                  >
                                    {formData.state &&
                                      statesWithDistricts[formData.state] &&
                                      statesWithDistricts[formData.state].map(
                                        (district: any, index: any) => (
                                          <MenuItem
                                            key={index}
                                            value={district}
                                          >
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
                                          ("0" + new Date(e).getHours()).slice(
                                            -2
                                          ) +
                                          ":" +
                                          (
                                            "0" + new Date(e).getMinutes()
                                          ).slice(-2);
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
                                          ("0" + new Date(e).getHours()).slice(
                                            -2
                                          ) +
                                          ":" +
                                          (
                                            "0" + new Date(e).getMinutes()
                                          ).slice(-2);
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
                                                handleGroupDetailsChange(
                                                  index,
                                                  e
                                                )
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
                                                handleGroupDetailsChange(
                                                  index,
                                                  e
                                                )
                                              }
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                              <InputLabel>Gender</InputLabel>
                                              <Select
                                                label={"Gender"}
                                                arial-label={"Gender"}
                                                value={member.gender}
                                                onChange={(e) =>
                                                  handleGroupDetailsChange(
                                                    index,
                                                    e
                                                  )
                                                }
                                                name="gender"
                                                fullWidth
                                              >
                                                <MenuItem value="Male">
                                                  Male
                                                </MenuItem>
                                                <MenuItem value="Female">
                                                  Female
                                                </MenuItem>
                                                <MenuItem value="Others">
                                                  Others
                                                </MenuItem>
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
                                                handleGroupDetailsChange(
                                                  index,
                                                  e
                                                )
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
                                          onClick={() =>
                                            removeGroupMember(index)
                                          }
                                          style={{ marginTop: "16px" }}
                                        >
                                          Remove
                                        </Button>
                                      </Box>
                                    )
                                  )}
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
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
                        </Box>
                      </>
                    </Modal>
                  </CardContent>
                </Card>
              );
            })}
            {/*  </Container> */}
          </div>
          {/*   {!localStorage.getItem("authToken") && (
            // <Button
            //   type="submit"
            //   variant="contained"
            //   onClick={() => navigate("/event-registration")}
            //   sx={{
            //     position: "absolute",
            //     bottom: "25px",
            //     right: "45%",
            //   }}
            // >
            //   Register
            // </Button>
            <div className="button-container">
              <button className="cta-button" onClick={() => navigate("/event-registration")}>Register</button>
            </div>
          )} */}
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

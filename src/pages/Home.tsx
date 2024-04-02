import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ViewCarousel } from "@mui/icons-material";

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

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const theme = useTheme();
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
  const handleChange: any = (cur: number, prev: number) => {
    setIndex(cur);
    console.log(cur, prev);
  };

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
          href={link}
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

  return (
    <>
      <div style={{ position: "relative" }}>
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
      </div>

      <section
        style={{ background: "rgb(206,206,206)", padding: "50px 0" }}
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
          <Grid container spacing={3}>
            {/* Video Section */}
            {homecardCarouselData.map((item: any, index: any) => (
              <HomeCarouselCard
                key={index}
                videoData={item.data}
                name={item.name}
              />
            ))}

            {/* Repeat the above structure for "5 Minutes Satsang" and "Global Event" sections */}
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Home;

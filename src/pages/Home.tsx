import { useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import "./home.css";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Grid } from "@mui/material";

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

const DATA = [
  {
    image: require('../assets/प्रियेश.jpg'),
    title: 'आचार्य प्रियेश जी',
    position: 'संयोजक',
  },
  {
    image: require("../assets/सत्यपति.jpg"),
    title: 'पूज्य स्वामी सत्यपति जी परिव्राजक',
    position: 'संस्थापक - दर्शनयोग महाविद्यालय/विश्वकल्याण धर्मार्थ न्यास',
  },
  {
    image: require("../assets/स्वामी विवेकानंद जी परिव्राजक.jpg"),
    title: 'स्वामी विवेकानंद जी परिव्राजक',
    position: 'प्रबन्धक न्यासी - दर्शन योग धर्मार्थ ट्रस्ट, अध्यक्ष - वैदिक परिषद, निदेशक - दर्शन योग महाविद्यालय',
  },
  {
    image: require("../assets/स्वामी ब्रह्मविदानन्द जी सरस्वती.jpg"),
    title: 'स्वामी ब्रह्मविदानन्द जी सरस्वती',
    position: 'आचार्य - दर्शन योग महाविद्यालय रोजड, अध्यक्ष - दर्शन योग साधना आश्रम, कमोदा, न्यासी - दर्शन योग धर्मार्थ ट्रस्ट',
  },
  {
    image: require("../assets/स्वामी ध्रुवदेव जी परिव्राजक.jpg"),
    title: 'स्वामी ध्रुवदेव जी परिव्राजक',
    position: 'कार्यकारी आचार्य - दर्शन योग महाविद्यालय रोजड, न्यासी - दर्शन योग धर्मार्थ ट्रस्ट',
  },
  {
    image: require("../assets/दिनेश.jpg"),
    title: 'आचार्य दिनेश कुमार जी',
    position: 'व्यवस्थापक - दर्शनयोग महाविद्यालय रोजड, न्यासी - दर्शनयोग धर्मार्थ ट्रस्ट',
  },
  {
    image: require("../assets/ईश्वरानन्द.jpg"),
    title: 'आचार्य ईश्वरानन्द जी',
    position: 'कार्यकारी उपाचार्य - दर्शन योग महाविद्यालय, रोजड',
  },
]

const videoLinks = [
  {
    title: "प्रेरक प्रवचन:- असफलता का कारण",
    url: "https://youtu.be/ujnC4X8FCTA?si=3laoG1Ae9AzqZJbi7",
    thumbnail: "https://img.youtube.com/vi/ujnC4X8FCTA/sddefault.jpg",
  },
  {
    title: "वेद प्रवचन :- यजुर्वेद अध्याय 34",
    url: "https://youtu.be/8GA8HrcXLDo?si=9FhYE8jnFkl0EskY",
    thumbnail: "https://i.ytimg.com/vi/8GA8HrcXLDo/maxresdefault.jpg",
  },
  {
    title: "वेद प्रवचन :- यजुर्वेद अध्याय 33 /मंत्र 5",
    url: "https://www.youtube.com/watch?v=j2EPRLQL2_c&t=405s",
    thumbnail: "https://img.youtube.com/vi/j2EPRLQL2_c/sddefault.jpg",
  },
  {
    title: "दर्शन योग महाविद्यालय 37वाँ एवं आर्ष कन्या गुरुकुल 7वाँ वार्षिकोत्सव",
    url: "https://youtu.be/NvWOMwEVtPg?si=RIglbjTcqNNVGXgo",
    thumbnail: "https://i.ytimg.com/vi/NvWOMwEVtPg/maxresdefault.jpg",
  },
];


const VideoBox = ({ title, url, thumbnail }: any) => {
  const handleClick = () => {
    window.location.href = url;
  };

  const cardStyle: any = {
    maxWidth: "500px",
    width: "200px",
    height: "200px",
    // margin: "20px",
    cursor: "pointer",
    borderRadius: "10px",
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
            // borderRadius: "10px 10px 0 0",
            width: "100%",
            objectFit: "cover",
            alignItems: "center"
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
  const theme = useTheme();
  const navigate = useNavigate();

  const iRef = useRef(0);
  let txt = "|| हे ऐश्वर्यवान परमात्मन आप हमारे सभी ऐश्वर्यों को सुदृढ़ करें, जिससे हम सम्पूर्ण विश्व को श्रेष्ठ बना सकें तथा समाज में व्याप्त अवैदिकत्व का नाश कर सकें ||";
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

  const itemsPerPage = isSmScreen ? 1 : 3;

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

  const SETTINGS = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          // infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
        }
      }
    ]

  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 id="demo" className="text"></h1>

          {!localStorage.getItem("authToken") && (
            <div className="button-container">
              <button className="btn" onClick={() => navigate("/event-registration")}>Register Now</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "50px", marginLeft: "20px", marginRight: "20px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" style={{ fontFamily: '"Poppins", sans-serif', color: "#990000", fontWeight: "900", textAlign: "center" }}>दर्शन योग धाम</Typography>
          <div>
            <h4 style={{ color: "#990000", marginBottom: "20px" }}>संस्कृति वन, लाकरोड़ा, गांधीनगर, गुजरात</h4>
          </div>
          <div>
            <Grid style={{ padding: "0 50px" }} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CardMedia component="iframe" src={'https://www.youtube.com/embed/GMnq__u6gvM?si=c94Ipiw6WLbA13ia'} allow="autoPlay" style={{ width: "100%", height: "400px" }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <h3 style={{ color: "#990000", marginBottom: "10px" }}>(वैदिक धर्म की रक्षा और समृद्धि का आदर्श संस्थान)</h3>
                  <p style={{ marginBottom: "20px" }}>
                    दर्शन योग धर्मार्थ ट्रस्ट अपने पूर्वजों ऋषि-मुनियों के द्वारा अनुपालित परम्पराओं की अनमोल थाती को
                    सुरक्षित रखने के लिए सदैव प्रयासशील है । आर्य समाज में योग-विद्या में आदर्श माने जाने वाले पूज्य स्वामी
                    सत्यपति जी परिव्राजक की यह अभिलाषा रही है कि समाज में ऐसे सत्यवादी परोपकारी दार्शनिक आदर्श योगियों का
                    निर्माण किया जाये, जिनका मुख्य उद्देश्य निष्ठापूर्वक ईश्वर, जीव, प्रकृति व भौतिक पदार्थों का वैदिक
                    ज्ञान-विज्ञान आदान-प्रदान करना हो । यह सब कार्य समान लक्ष्य वाले व्यक्तियों के धार्मिक संगठन द्वारा ही
                    सम्भव है । दर्शन योग धर्मार्थ ट्रस्ट ने अपने ऐसे संगठन-निर्माण का निश्चय किया है ।
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      <div className="slider-div">
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingBottom: "2%",
          }}
        >
          {" "}
          <Typography variant="h4" style={{ fontFamily: '"Poppins", sans-serif', color: "#990000", fontWeight: "600", textAlign: "center" }}>Latest Video</Typography>
        </div>
        <style>
          {`
            .slider-div .slick-prev:before,
            .slider-div .slick-next:before {
              color: #990000; 
            }
          `}
        </style>
        <Slider {...SETTINGS}>
          {
            videoLinks.map(({ thumbnail, title, url }, inx) => (
              <div key={inx} style={{ margin: '0 auto', cursor: 'pointer' }}>
                <div style={{ width: '100%', height: '250px' }}>
                  <img src={thumbnail} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ textAlign: 'center', marginTop: '10px', fontFamily: '"Poppins", sans-serif', color: "#990000", fontWeight: "800" }}>{title}</h4>
              </div>
            ))
          }
        </Slider>
      </div>

      <section className="team-sec">
        <div
          style={{
            padding: "30px 0"
          }}
        >
          {" "}
          <Typography variant="h4" style={{ fontFamily: '"Poppins", sans-serif', color: "#990000", fontWeight: "900", textAlign: "center" }}>हमारी टीम</Typography>
        </div>
        <div className="team-div">
          <style>
            {`
              .team-sec .slick-dots li button {
                background-color: #990000;
                width: 15px;
                height: 15px; 
                border-radius: 50%;
              }
            `}
          </style>
          <Slider {...SETTINGS}>
            {
              DATA.map(({ image, title, position }, inx) => (
                <div className="container">
                  <div style={{ width: '100%', height: '100%' }}>
                    <img src={image} alt={title} className="team-img" style={{ width: '100%', height: '300px', objectFit: 'cover', transition: ".5s ease", backfaceVisibility: "hidden", opacity: 1 }} />
                  </div>
                  <div className="overlay">
                    <h3>{title}</h3>
                    <p>{position}</p>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Home;


{/*   <section
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
            <Typography variant="h4" style={{ fontFamily: '"Poppins", sans-serif' }}>LATEST VIDEO</Typography>
          </div>
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
      </section> */}

{/*   <section>
        <div style={{ margin: '50px' }}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              paddingBottom: "2%",
            }}
          >
            {" "}
            <Typography variant="h4" style={{ fontFamily: '"Poppins", sans-serif', color: "#990000", fontWeight: "700" }}>Latest Video</Typography>
          </div>
          <style>
            {`
          .slick-prev:before {
            content: '←';
            color: #990000;
          }
          .slick-next:before {
            content: '→';
            color: #990000;
          }
        `}
          </style>
          <Slider {...SETTINGS}>
            {videoLinks.map((video, index) => (
              <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
              }}>
                <VideoBox
                  key={index}
                  title={video.title}
                  url={video.url}
                  thumbnail={video.thumbnail}
                />
              </div>

            ))}
          </Slider>
        </div>
      </section> */}
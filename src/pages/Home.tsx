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

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { JSX } from "react/jsx-runtime";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
function Item({ item }: { item: { description: string } }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>{item.description}</div>
  );
}

const Home = () => {
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
  const [index, setIndex] = React.useState(0);

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
    {
      imageUrl: "https://darshanyog.org/assets/img/upload/team/J0lDBBYml2.jpg",
      link: "https://darshanyog.org/assets/img/upload/team/J0lDBBYml2.jpg",
      title: "Swami dhruvdev privrajak",
    },
    {
      imageUrl: "https://darshanyog.org/assets/img/upload/team/RmiXyuUJEk.jpg",
      link: "https://darshanyog.org/assets/img/upload/team/RmiXyuUJEk.jpg",
      title: "Aacharya dinesh kumar",
    },
    {
      imageUrl: "https://darshanyog.org/assets/img/upload/team/qe4tLla1Lm.jpg",
      link: "https://darshanyog.org/assets/img/upload/team/qe4tLla1Lm.jpg",
      title: "Acharya ishvaranand",
    },
    // Add other testimonials similarly
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
  // const TestimonialItem = ({
  //   imageUrl,
  //   link,
  //   title,
  // }: {
  //   imageUrl: any;
  //   link: any;
  //   title: any;
  // }) => (
  //   <Paper
  //     style={{
  //       overflow: "hidden",
  //       border: "1px solid #fff", // Add a border around each testimonial item
  //       borderRadius: "100%", // Add border-radius for a rounded look
  //       padding: "15px", // Add padding inside each testimonial item
  //     }}

  //   >
  //     <Link href={link}>
  //       <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
  //     </Link>
  //     {/* <Typography>
  //     <Link href={link}>{title}</Link>
  //   </Typography> */}
  //   </Paper>
  // );

  // const TestimonialItem = ({
  //   imageUrl,
  //   link,
  //   title,
  // }: {
  //   imageUrl: any;
  //   link: any;
  //   title: any;
  // }) => {
  //   // Generate a unique id for each TestimonialItem
  //   const itemId = `testimonial-item-${Math.floor(Math.random() * 100000)}`;

  //   const handleMouseOver = () => {
  //     const element = document.getElementById(itemId);
  //     if (element) {
  //       // Change border color on hover
  //       element.style.borderColor = "#ccc";

  //       // Show the title on hover
  //       const titleOverlay = element.querySelector(
  //         ".title-overlay"
  //       ) as HTMLElement | null;
  //       if (titleOverlay) {
  //         titleOverlay.style.display = "block";
  //       }
  //     }
  //   };

  //   const handleMouseOut = () => {
  //     const element = document.getElementById(itemId);
  //     if (element) {
  //       // Change back to the original border color on mouse out
  //       element.style.borderColor = "#fff";

  //       // Hide the title on mouse out
  //       const titleOverlay = element.querySelector(
  //         ".title-overlay"
  //       ) as HTMLElement | null;
  //       if (titleOverlay) {
  //         titleOverlay.style.display = "none";
  //       }
  //     }
  //   };

  //   return (
  //     <Paper
  //       id={itemId}
  //       style={{
  //         position: "relative",
  //         overflow: "hidden",
  //         border: "1px solid #fff", // Add a border around each testimonial item
  //         borderRadius: "15px", // Add border-radius for a rounded look
  //         padding: "15px", // Add padding inside each testimonial item
  //         transition: "border-color 0.3s ease", // Add a smooth transition for the border color change
  //       }}
  //       onMouseOver={handleMouseOver}
  //       onMouseOut={handleMouseOut}
  //     >
  //       <Link
  //         href={link}
  //         style={{
  //           position: "relative",
  //           display: "block",
  //           overflow: "hidden",
  //         }}
  //       >
  //         <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
  //         <div
  //           className="title-overlay"
  //           style={{
  //             position: "absolute",
  //             top: "50%",
  //             left: "50%",
  //             transform: "translate(-50%, -50%)",
  //             color: "#fff",
  //             display: "none", // Initially hide the title
  //             background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background to overlay on the image
  //             padding: "10px",
  //             borderRadius: "10px",
  //             textAlign: "center",
  //             width: "100%",
  //           }}
  //         >
  //           {title}
  //         </div>
  //       </Link>
  //     </Paper>
  //   );
  // };

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
          borderRadius: "15px", // Add border-radius for a rounded look
          padding: "15px", // Add padding inside each testimonial item
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
          <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
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
        {/* <div style={{ textAlign: "center", marginTop: "10px" }}>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                background: i === index ? "#3498db" : "#2c3e50",
                color: "#fff",
                padding: "8px 12px",
                margin: "0 5px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                outline: "none",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div> */}
      </div>

      {/* <section
        className="background-dark-lt p-t-75 p-b-75"
        id="spiritualsuccession"
      >
        <Container>
          <div>
            <div className="heading heading heading-center">
              <Typography variant="h6" className="text-medium">
                Our Team
              </Typography>
            </div>
          </div>

          <div
            id="testimonials"
            className={`light-pagination owl-carousel owl-theme ${
              isSmScreen ? "horizontal-carousel" : "" // Add a class for horizontal layout
            }`}
          >
            <Carousel
              autoPlay={!isSmScreen}
              animation={isSmScreen ? "slide" : "fade"}
            >
              {groupedTestimonials.map(
                (
                  testimonialGroup: any[],
                  pageIndex: React.Key | null | undefined
                ) => (
                  <div key={pageIndex} className="carousel-page">
                    <div
                      className="horizontal-testimonials-container"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {testimonialGroup.map(
                        (
                          testimonial: JSX.IntrinsicAttributes & {
                            imageUrl: any;
                            link: any;
                            title: any;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <TestimonialItem key={index} {...testimonial} />
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </Carousel>
          </div>
        </Container>
      </section> */}

      <section
        style={{ backgroundColor: "rgb(165 165 165)" }}
        className="background-dark-lt p-t-75 p-b-75"
        id="spiritualsuccession"
      >
        <Container>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div className="heading heading heading-center">
              <Typography
                variant="h4"
                className="text-medium"
                style={{ color: "white" }}
              >
                Our Team
              </Typography>
            </div>
          </div>

          <div
            id="testimonials"
            className={`light-pagination owl-carousel owl-theme ${
              isSmScreen ? "horizontal-carousel" : ""
            }`}
          >
            <Carousel
              autoPlay={!isSmScreen}
              animation={isSmScreen ? "slide" : "fade"}
            >
              {groupedTestimonials.map(
                (
                  testimonialGroup: any[],
                  pageIndex: React.Key | null | undefined
                ) => (
                  <div key={pageIndex} className="carousel-page">
                    <div
                      className="horizontal-testimonials-container"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px", // Add padding around testimonial items
                      }}
                    >
                      {testimonialGroup.map(
                        (
                          testimonial: JSX.IntrinsicAttributes & {
                            imageUrl: any;
                            link: any;
                            title: any;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <TestimonialItem key={index} {...testimonial} />
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </Carousel>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;

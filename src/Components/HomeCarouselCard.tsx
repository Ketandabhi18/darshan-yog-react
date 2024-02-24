import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";
const HomeCarouselCard = ({
  videoData,
  name,
}: {
  videoData: any;
  name: any;
}) => {
  return (
    <>
      <Grid item xs={12} md={3}>
        {/* SMVS Video */}
        <div className="post-content bothsidebar">
          <div
            className="heading-fancy heading-line"
            style={{
              whiteSpace: "nowrap",
              //   justifyContent: "center",
              alignItems: "center", //   position: "absolute",
              display: "flex",
            }}
          >
            <hr
              style={{
                flex: "1 0 0",
                marginRight: "10px",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />{" "}
            {/* Thin grey line before */}
            <Typography variant="h6" style={{ marginRight: "10px" }}>
              <a
                href="https://www.smvs.org/smvs-video/0/r"
                style={{
                  color: "black",
                  textDecoration: "none",
                  transition: "color , border-color ",
                }}
              >
                {name}
              </a>
            </Typography>
            <hr
              style={{
                flex: "1 0 0",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />{" "}
            {/* Thin grey line before */}
          </div>
          {/* SMVS Video Carousel */}
          <div className="post-thumbnail-list post-content post-light-background shadowbox">
            <Carousel autoPlay={false} indicators={false} animation="fade">
              {videoData.map((item: any, index: any) => (
                <Grid item xs={12} key={index}>
                  <div
                    className="post-item"
                    data-animation-delay="0"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="post-image">
                      <a
                        href={item.videoUrl}
                        title={item.title}
                        target="_blank"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="curv"
                          style={{
                            opacity: 1,
                            width: "100%",
                            height: "auto",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        />
                      </a>
                    </div>
                    <div
                      className="post-content-details"
                      style={{ padding: "15px" }}
                    >
                      <div className="post-title">
                        <Typography
                          variant="h3"
                          style={{
                            fontSize: "1.2em",
                            margin: "0",
                            lineHeight: "1.3",
                          }}
                        >
                          <a
                            href={item.videoUrl}
                            title={item.title}
                            target="_blank"
                            style={{
                              color: "#333",
                              textDecoration: "none",
                            }}
                          >
                            {item.title}
                          </a>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: "#666",
                            fontSize: "0.9em",
                            margin: "5px 0",
                          }}
                        >
                          {item.date}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Carousel>
            {/* End of SMVS Video Carousel Items */}
            <div
              className="rmcenter"
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                className="btn-rounded"
                type="button"
                href="https://www.smvs.org/smvs-video/0/r"
                target="_blank"
                style={{
                  borderColor: "#009688",
                  borderRadius: "20px",
                  color: "#009688",
                }}
              >
                View More
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default HomeCarouselCard;

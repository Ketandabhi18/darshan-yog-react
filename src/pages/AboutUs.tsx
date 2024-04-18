import { Card, CardContent, Container, Typography } from "@mui/material";
import { Row } from "antd";

const AboutUs = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "1%",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
        }}>
        <Card
          style={{
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            transition: "0.3s",
            border: "2px solid #EE2E23",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#fff",
          }}>
          <CardContent style={{ padding: "20px" }}>
            <div style={{ backgroundImage: 'linear-gradient(117deg, rgba(237, 28, 36, 1) 0%, rgba(245, 130, 32, 1) 100%)', height: "50px", marginBottom: "20px" }}>
              <Typography
                variant="h5"
                component="div"
                style={{ color: "white", textAlign: "center", paddingTop: "10px", fontFamily: '"Poppins", sans-serif', fontWeight: "600" }}
              >
                About Us
              </Typography>
            </div>

            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              Swami Satyapati ji Parivrajak founded theDarshan Yog MahaVidyalaya on 10 April 1986 (Chaitra Shukla Pratipada, Vikram Samvat 2043), as a unique educational institution solely dedicated for the welfare of the human race, i.e. the physical, moral and spiritual uplift of all. Situated 70 Km north of Ahmedabad, Gujarat, India, the Vidyalaya is surrounded by a lush greenery (forest and nature).
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              Swamiji has dedicated his life to serve humanity. His words and deeds are in perfect harmony, no divergence. True to his name, he has an unbendable faith in truth. Meticulous in his teaching methodology, he adheres strictly to time schedules and goals.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              Under the leadership of Swami Satyapati ji the Darshan Yog MahaVidyalaya emerged as an illustrious training centre for Vaidik scholars, who in turn have dedicated themselves to train a new generation of scholars and disseminate the Sat Sanatan Vaidik Dharma (pristine Vaidik philosophy) in the far corners of India and abroad. The commendable work of Swami Satyapati ji wasduly acknowledged through a public felicitation ceremony held in 1999. Swami Ji  donated the cheque of Rupees 51 Lakhs presented to him as award to establish the Vanprastha Sadhak ashram.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              The preceptors (acharyas) and students (brahmacharis) of the Vidyalaya as well as well-wishers and donors had put up every possible effort to realise the Vanprastha Sadhak ashram project. With the blessings of the Almighty, their hard work paid off as a real project. Based on the family tree concept, the Vanprastha Sadhak ashram is indeed the brain child or product of the Darshan Yog MahaVidyalaya.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              The Darshan Yog MahaVidyalaya has at all times maintained the spirit of dedication of its founder and inspiring figure,Swami Satyapati Ji Parivrajak. We are committed to empower scholars knowledgeable in Veda, Darshan philosophy and Vaidik Yog to fulfil the spiritual needs of the modern era, a knowledge-based society.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              We extend a cordial invitation to you to spend a few days with us, a real break from the daily rush / routine, relax, meditate and benefit from the silence as well as be one with the nature, take advantage of the pavitra aroma (fragrant / divine atmosphere) emanating from Yajna, listen to the tweeting of birds, taste pure cow milk, etc.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              The acharyas and brahmacharis of the Vidyalaya would be pleased to answer your spiritual questions.
            </Row>
            <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              Join us to make faster spiritual progress and help others do the same.
            </Row>
            <Row style={{ marginBottom: '1%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
              Live life the way God meant.
            </Row>
          </CardContent>
        </Card>
      </Container >
    </>
  )
};

export default AboutUs;

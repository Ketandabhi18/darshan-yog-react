import { Card, CardContent, Container, Typography } from "@mui/material";
import { Col, Row } from "antd";

const AimsIdeals = () => {
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
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
                                Aims & Ideals
                            </Typography>
                        </div>

                        <Row style={{ marginBottom: '3%' }}>
                            <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                Our motto is "Krinvanto Vishvamaryam", i.e. make the whole world noble in ‘thoughts, words and actions’.
                            </Typography>
                        </Row>

                        <Row style={{ marginBottom: '3%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>We aim :</Typography>
                            </Col>
                            <Row style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                                <ul>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            to fulfil the spiritual needs of the present knowledge-based society in the true tradition put forward by our Rishis (sages of yore);
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            to uplift the physical, moral / mental and spiritual standards of all through the practice of authentic Vaidik Yog (Yogabhyasa) as per the teachings of Maharishi Patanjali;
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            to spread the universal knowledge of the Vedas and the supplementary knowledge unfolded by these sages(darshans, Upanishads, etc.) with a holistic approach to enhance the welfare of all (body, mind & spirit) and society at large;
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            to transform the world into a better place by sensitising  people to return to the Vaidik way of life including the true varna vyavastha (classes based on character, skills & insightful aptitudes NOT on heredity) and ashram vyavastha (stages of life) in society;
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            to inspire the human race to live in harmony on the concepts of vasudaiva kutumbakam (universal brotherhood & the world as one family) rejecting discrimination based on race, creed, caste, gender, language, country, etc.
                                        </Typography>
                                    </li>
                                </ul>
                            </Row>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                These ideals existed in the Vaidik age. The dissemination of the true knowledge about God, soul, nature and the Vedas among the masses would induce them to adopt these ideals in their day-to-day living. At the Darshan Yog Mahavidyalaya we are doing our utmost by providing the appropriate environment for scholars to acquire the Vaidik knowledge. Our public outreach programmes consist of Yog shivirs (practical meditation workshops), Yajna shivirs, Vaidikkathas and lectures. Feedback reports these programmes as highly beneficial to the participants.
                            </Typography>
                            <Row style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                                <ul>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            Disseminating the real knowledge on the fundamentals (theory & practice) of Vaidik Yog or Maharshi Patanjali's AshtÄnga Yog (eight-fold process culminating with Samadhi (self & God-realisation).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            Inspiring talented intellectuals and other enthusiastic persons to explore and explain the supreme, scientific, everlasting and irrefutable principles of the Vedas during congregations, seminars, workshops and conferences as well as inspire others to follow Vaidik dharma (way of life).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            Encouraging individuals to be, at all times, ethical in all actions (thoughts, speech, actions, in all spheres of life) in order to establish long-lasting happiness, peace, contentment, etc. in society.
                                        </Typography>
                                    </li>
                                </ul>
                            </Row>
                        </Row>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default AimsIdeals;
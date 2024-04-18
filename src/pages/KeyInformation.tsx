import { Card, CardContent, Container, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const KeyInformation = () => {
    const navigate = useNavigate();

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
                        background: "#fff"
                    }}>
                    <CardContent style={{ padding: "20px" }}>
                        <div style={{ backgroundImage: 'linear-gradient(117deg, rgba(237, 28, 36, 1) 0%, rgba(245, 130, 32, 1) 100%)', height: "50px", marginBottom: "20px" }}>
                            <Typography
                                variant="h5"
                                component="div"
                                style={{ color: "white", textAlign: "center", paddingTop: "10px", fontFamily: '"Poppins", sans-serif', fontWeight: "600" }}
                            >
                                Key information
                            </Typography>
                        </div>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Founder :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                {/* <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Swami Vivekanand ji Parivrajak</Typography> */}
                                <Typography
                                    style={{
                                        color: "#990000",
                                        fontFamily: '"Poppins", sans-serif',
                                        fontSize: "14px",
                                        // marginBottom: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        transition: "color 0.3s"
                                    }}
                                    onClick={() => {
                                        navigate("/founder", { state: "Swami Vivekanand ji Parivrajak" });
                                    }}
                                >
                                    Swami Vivekanand ji Parivrajak
                                </Typography>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Date founded :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Chaitra Shukla Pratipada, Vikram Samvat 2043 (10 April 1986)</Typography>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Location :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Rojad 70 Kms north of Ahmedabad, Gujarat</Typography>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Relevant details :</Typography>
                            </Col>
                            <Row style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                                <ul>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>One and Only institution empowering scholars with the knowledge of Darshan philosophy and Veda to fulfil the spiritual needs of the present knowledge-based society</Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Special focus on Yogabhyas, the practice of authentic Vaidik Yog as per the teachings of Maharishi Patanjali</Typography>
                                    </li>
                                </ul>
                            </Row>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Director & Managing Trustee :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                {/*  <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                    Swami Vivekanand ji Parivrajak (formerly Acharya Vivek Bhushan Ji)
                                </Typography> */}

                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                    <span style={{
                                        color: "#990000",
                                        fontFamily: '"Poppins", sans-serif',
                                        fontSize: "14px",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        transition: "color 0.3s"
                                    }}
                                        onClick={() => {
                                            navigate("/founder", { state: "Swami Vivekanand ji Parivrajak" });
                                        }}
                                    >
                                        Swami Vivekanand ji Parivrajak
                                    </span>
                                    (formerly Acharya Vivek Bhushan Ji)
                                </Typography>

                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Acharya :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                {/* <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                    Swami Brahmavidanand ji Saraswati (formerly Acharya Sumeru Prasad Ji)
                                </Typography> */}

                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                    <span style={{
                                        color: "#990000",
                                        fontFamily: '"Poppins", sans-serif',
                                        fontSize: "14px",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        transition: "color 0.3s"
                                    }}
                                        onClick={() => {
                                            navigate("/founder", { state: "Swami Brahmavidanand ji Saraswati" });
                                        }}
                                    >
                                        Swami Brahmavidanand ji Saraswati
                                    </span>
                                    (formerly Acharya Sumeru Prasad Ji)
                                </Typography>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Upacharya :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Swami Dhruvdev ji Parivrajak</Typography>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '5%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Vyavasthapak :</Typography>
                            </Col>
                            <Col xs={24} sm={16}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>Brahmachari Dinesh Kumar Ji</Typography>
                            </Col>
                        </Row>

                        <Typography style={{ marginTop: '20px', fontFamily: '"Poppins", sans-serif', fontSize: "15px", fontWeight: "700", textAlign: "center" }} className="responsive-text">
                            Darshan Yog DharmarthTrust & Darshan Yog Mahavidyalaya
                        </Typography>

                        <Row style={{ marginBottom: '1%' }}>
                            <Col xs={24} sm={8}>
                                <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px", fontWeight: "600" }}>Legal status :</Typography>
                            </Col>
                            <Row style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                                <ul>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            The <strong style={{ fontWeight: "bold" }}>Darshan Yog Mahavidyalaya</strong> operated as an unregistered body since 10th April 1986.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            It was subsequently incorporated as a Trust named <strong style={{ fontWeight: "bold" }}>Darshan Yog Dharmarth Trust</strong> on 25 November 2011 (Trust Reg. no. E/3617 / Sabarkantha.)
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            It is an approved institution to receive donations under Section 80G of the Income Tax Act [Reg. No. DIT (E)/AHD/80G (5)/DYDT/124/2013-14]
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                            It holds permission to receive funds from foreign well-wishers.
                                        </Typography>
                                    </li>
                                </ul>
                            </Row>
                        </Row>
                        <Row style={{ marginBottom: '2%' }}>
                            <Typography style={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                                The Darshan Yog MahaVidyalaya, Darshan Yog Sadhana Ashram, Vaidic Parisad, Safalata Vigyan is now run by the <strong style={{ fontWeight: "bold" }}> Darshan Yog Dharmarth Trust</strong>.
                            </Typography>
                        </Row>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default KeyInformation;
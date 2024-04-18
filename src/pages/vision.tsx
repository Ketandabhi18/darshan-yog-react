import { Card, CardContent, Container, Typography } from "@mui/material";
import { Row } from "antd";

const Vision = () => {
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
                                Vision
                            </Typography>
                        </div>

                        <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                            The Darshan Yog Mahavidyalaya is engaged in providing the invaluable resources required for the training of trainers / teachers and committed preachers who willing to dedicate their lives to benefit the whole of humanity to develop proficiency in Vaidik knowledge (Veda, Darshan shāstras, ārsha granthas and more importantly the real Vaidik Yoga.)
                        </Row>
                        <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                            The one and only revelation that God gave to the human race in the beginning is the Vedas and the language is Vaidik Sanskrit. That knowledge empowered people to pursue and track their spiritual progress as well as fulfil their duties in society. The Vedas constitute a manual for human beings to succeed in life in the same way. An equivalence in today’s world would be the operating manual of a commodity which sensitises the user on how to derive maximum benefit from it.
                        </Row>
                        <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                            In time, both Vaidik Sanskrit and the knowledge of the Vedas were corrupted through various misinterpretations. This led to chaos and ever-increasing unhappiness in society. The so-called ‘modern world’ is plagued with social evils due to erosion of the universal values enunciated in the Vedas thus which reveal a dire need to bring this knowledge to light.
                        </Row>
                        <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                            Maharshi Dayanand Saraswati (1824-1883) initiated this process with a clear appeal "Back to Vedas" and dedicated his life to this cause. The Arya Samaj and its affiliated institutions, as torch bearer, have continued to promote this work.
                        </Row>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Vision;
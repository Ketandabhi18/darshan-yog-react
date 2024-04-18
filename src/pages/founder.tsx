import { Card, CardContent, Container, Typography } from "@mui/material";
import { Row } from "antd";
import { useLocation } from "react-router-dom";

const Founder = () => {
    const location: any = useLocation();
    
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
                                Founder : {location.state}
                            </Typography>
                        </div>

                        <Row style={{ marginBottom: '2%', fontFamily: '"Poppins", sans-serif', fontSize: "14px" }}>
                            Will be update soon!
                        </Row>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Founder;
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import "./header.css";
import { useEffect, useState } from "react";
import { pages } from "../config/constants";
import { Button } from "@mui/material";

const Header = () => {
    const isloggedIn = localStorage.getItem("authToken");
    const [navOptions, setNavOptions] = useState<any>(pages);
    const [anchorEl, setAnchorEl] = useState<any>({});
    const navigate = useNavigate();

    const handleClick = (event: any, pageName: any, route: any) => {
        const page: any = navOptions.find((p: any) => p.name === pageName);
        if (!Object.keys(page).includes("options")) {
            navigate(route);
        }
        setAnchorEl({
            ...anchorEl,
            [pageName]: event.currentTarget,
        });
    };

    useEffect(() => {
        if (isloggedIn) {
            setNavOptions([...pages.filter((item: any) => item.name !== "LOG IN")]);
        }
    }, [isloggedIn]);

    return (
        <>
            <header>
                <a href="#"
                ><img
                        src={logo}
                        alt="logo"
                        className="logo"
                    /></a>

                <input type="checkbox" id="check" />
                <label htmlFor="check" className="icons">
                    <i className="bx bx-menu" id="menu-icon"></i>
                    <i className="bx bx-x" id="close-icon"></i>
                </label>

                <nav className="navbar">
                    <a href="/" className="nav-item" >Home</a>
                    <a href="/events" className="nav-item" >Events</a>
                    <a href="/log-in" className="nav-item" >Log In</a>
                    {/* <a href="#" className="nav-item" >Contact</a> */}
                </nav>
            </header>


            {/*      <header>
                <div className="container">
                    <div className="logo">
                        <a href="">
                            <img src={logo} alt="Logo" />
                        </a>

                        <nav className="navbar">
                            <a href="#" className="nav-item">Home</a>
                            <a href="#" className="nav-item" >Plan Your Visit</a>
                            <a href="#" className="nav-item" >Magical Places</a>
                            <a href="#" className="nav-item">Contact</a>
                        </nav>

                        <div style={{ position: "relative", left: "85%" }}>
                            {navOptions.map((page: any) => (
                                <Button
                                    onClick={(event: any) =>
                                        handleClick(event, page.name, page.route ? page.route : "/")
                                    }
                                    sx={{
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: 0,
                                            height: "80%",
                                            borderBottom: "2px solid orange",
                                            transition: "width 0.4s linear",
                                        },
                                        "&:hover::before": {
                                            width: "80%",
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>


            </header> */}

        </>
    )
}

export default Header;
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import "./header.css";
import { useEffect, useState } from "react";
import { pages } from "../config/constants";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

const Header = () => {
    const isloggedIn = localStorage.getItem("authToken");
    const user: any = localStorage.getItem("userDetail");
    const userDetail: any = JSON.parse(user);
    const [navOptions, setNavOptions] = useState<any>(pages);
    const [anchorEl, setAnchorEl] = useState<any>({});
    const [profileDropMenu, setProfileDropMenu] = useState<any>(null);
    const open = Boolean(profileDropMenu);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleProfileClick = (event: any) => {
        setProfileDropMenu(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setProfileDropMenu(null);
    };

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
                <a onClick={() => navigate("/")}
                ><img
                        src={logo}
                        alt="logo"
                        className="logo"
                    /></a>

                <input type="checkbox" id="check" checked={isOpen} onChange={handleToggle} />
                <label htmlFor="check" className="icons">
                    <i className="bx bx-menu" id="menu-icon"></i>
                    <i className="bx bx-x" id="close-icon"></i>
                </label>

                <nav className={`navbar ${isOpen ? "open" : ""}`}>
                    <a onClick={() => { navigate("/"); handleClose(); }} className="nav-item">Home</a>
                    <a onClick={() => { navigate("/events"); handleClose(); }} className="nav-item">Events</a>
                    {/* <a onClick={() => navigate("/")} className="nav-item" >Home</a>
                    <a onClick={() => navigate("/events")} className="nav-item" >Events</a> */}
                    {localStorage.getItem("authToken") ? (
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleProfileClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#990000" }}>
                                        {userDetail?.firstName?.charAt(0) || "User"}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={profileDropMenu}
                                id="account-menu"
                                open={open}
                                onClose={handleCloseProfile}
                                onClick={handleCloseProfile}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&::before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleCloseProfile();
                                        navigate("update-user");
                                        handleClose();
                                    }}
                                >
                                    <Avatar /> Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        handleCloseProfile();
                                        navigate("/update-password");
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Set/Change Password
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseProfile();
                                        localStorage.clear();
                                        setNavOptions(pages);
                                        navigate("/");
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <a onClick={() => { navigate("/log-in"); handleClose(); }} className="nav-item">Log In</a>
                        // <a onClick={() => navigate("/log-in")} className="nav-item">Log In</a>
                    )}
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
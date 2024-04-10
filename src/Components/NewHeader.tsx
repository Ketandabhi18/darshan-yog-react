import React, { useEffect, useRef, useState } from "react";
import "./newHeader.css";
import { pages } from "../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
// import logo from "./assets/Dharshanyog Dham Logo.jpg";
import logo from "./assets/logoNew.png";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout, Settings } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Typography } from "@mui/material";

const NewHeader = () => {
  const location = useLocation();
  const isloggedIn = localStorage.getItem("authToken");
  console.log("isloggedIn :: ", isloggedIn);

  const user: any = localStorage.getItem("userDetail");
  const userDetail: any = JSON.parse(user);
  const [navOptions, setNavOptions] = useState<any>(pages);
  const [anchorEl, setAnchorEl] = React.useState<any>({});
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [profileDropMenu, setProfileDropMenu] = useState<any>(null);
  const open = Boolean(profileDropMenu);
  const navigate = useNavigate();
  const iRef = useRef(0);
  let txt =
    "|| हे ऐश्वर्यवान परमात्मन आप हमारे सभी ऐश्वर्यों को सुदृढ़ करें, जिससे हम सम्पूर्ण विश्व को श्रेष्ठ बना सकें तथा समाज में व्याप्त अवैदिकत्व का नाश कर सकें ||";
  const speed = 50;

  const handleProfileClick = (event: any) => {
    setProfileDropMenu(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfileDropMenu(null);
  };

  const handleClick = (event: any, pageName: any, route: any) => {
    const page: any = navOptions.find((p: any) => p.name === pageName);
    switch (page.name) {
      case "EVENTS":
        txt = "Event List";
        break;
      case "LOG IN":
        txt = " Log In";
        break;
      default:
        txt =
          "|| हे ऐश्वर्यवान परमात्मन आप हमारे सभी ऐश्वर्यों को सुदृढ़ करें, जिससे हम सम्पूर्ण विश्व को श्रेष्ठ बना सकें तथा समाज में व्याप्त अवैदिकत्व का नाश कर सकें ||";
    }
    console.log("txt :: ", txt);
    const demoElement: any = document.getElementById("demo");
    if (demoElement) {
      demoElement.innerHTML = txt;
      demoElement.style.textAlign = "center";
    }

    const demoImage = document.getElementById("myDiv");
    console.log("page.name  :: ", page.name);
    if (demoImage && page.name == "HOME") {
      demoElement.style.paddingTop = "0px";
      demoImage.className = "container";
    }
    if (demoImage && page.name !== "HOME") {
      demoElement.style.paddingTop = "0px";
      demoImage.className = "newContainer";
    }
    if (!Object.keys(page).includes("options")) {
      navigate(route);
    }
    setAnchorEl({
      ...anchorEl,
      [pageName]: event.currentTarget,
    });
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = (pageName: any) => {
    setAnchorEl((prevAnchorEl: any) => ({
      ...prevAnchorEl,
      [pageName]: null,
    }));
  };

  useEffect(() => {
    // console.log("Updated anchorEl:", anchorEl);
  }, [anchorEl]);

  useEffect(() => {
    if (isloggedIn) {
      const demoElement: any = document.getElementById("demo");
      if (demoElement && localStorage.getItem("authToken")) {
        demoElement.innerHTML = "Event List";
      }
      const demoImage = document.getElementById("myDiv");
      if (demoImage) {
        demoElement.style.paddingTop = "0px";
        demoImage.className = "newContainer";
      }
      setNavOptions([...pages.filter((item: any) => item.name !== "LOG IN")]);
    }
  }, [isloggedIn]);

  useEffect(() => {
    console.log("location :: ", location);
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

  return (
    <>
      {/* <div className="container"> */}
      <div className="container">
        <nav>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navOptions.map((page: any) => [
                <MenuItem
                  key={page.name}
                  onClick={(event: any) => {
                    handleClick(
                      event,
                      page.name,
                      page.route ? page.route : "/"
                    );
                    if (!Object.keys(page).includes("options")) {
                      handleCloseNavMenu();
                    } else {
                      console.log(
                        "anchorEl,anchorElNav :: ",
                        anchorEl,
                        anchorElNav
                      );
                    }
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>,
                page.options && (
                  <Menu
                    anchorEl={anchorEl[page.name]}
                    open={Boolean(anchorEl[page.name])}
                    onClose={() => handleClose(page.name)}
                  >
                    {page.options.map((subItem: any) => (
                      <MenuItem
                        key={subItem.pageName}
                        onClick={() => {
                          handleClose(page.name);
                          navigate(subItem.route, {
                            state: {
                              content: subItem?.content ? subItem?.content : "",
                            },
                          });
                        }}
                      >
                        {subItem.pageName}
                      </MenuItem>
                    ))}
                  </Menu>
                ),
              ])}
            </Menu>
          </Box>

          <img
            src={logo}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "auto",
            }}
            className="logo"
            alt="Darshanyog Dham Logo"
          />
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",

                // justifyContent: "space-evenly",
              },
              // mr: 2,
            }}
          >
            {navOptions.map((page: any) => (
              <div
                key={page.name}
                style={{ position: "relative", left: "85%" }}
              >
                <Button
                  onClick={(event: any) =>
                    handleClick(event, page.name, page.route ? page.route : "/")
                  }
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 0,
                      height: "100%",
                      borderBottom: "2px solid orange",
                      transition: "width 0.4s linear",
                    },
                    "&:hover::before": {
                      width: "100%",
                    },
                  }}
                >
                  {page.name}
                </Button>
                {page.options && (
                  <Menu
                    anchorEl={anchorEl[page.name]}
                    open={Boolean(anchorEl[page.name])}
                    onClose={() => handleClose(page.name)}
                  >
                    {page.options.map((subItem: any) => (
                      <MenuItem
                        key={subItem.pageName}
                        onClick={() => {
                          handleClose(page.name);
                          navigate(subItem.route, {
                            state: {
                              content: subItem?.content ? subItem?.content : "",
                            },
                          });
                        }}
                      >
                        {subItem.pageName}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>
            ))}
          </Box>

          {localStorage.getItem("authToken") && (
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
                  <Avatar sx={{ width: 32, height: 32 }}>
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
                  }}
                >
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleCloseProfile();
                    navigate("/update-password");
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
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </nav>

        <section className="box">
          <div>
            <h1 id="demo" className="text"></h1>
          </div>
        </section>

        {!localStorage.getItem("authToken") && (
          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate("/event-registration")}
            sx={{
              position: "absolute",
              bottom: "25px",
              right: "45%",
            }}
          >
            Register
          </Button>
        )}
      </div>
    </>
  );
};

export default NewHeader;

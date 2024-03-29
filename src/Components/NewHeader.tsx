import React, { useEffect, useRef, useState } from "react";
import "./newHeader.css";
import { pages } from "../config/constants";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import logo from "./assets/Dharshanyog Dham Logo.jpg";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout, Settings } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const isloggedIn = localStorage.getItem("authToken");
const user: any = localStorage.getItem("userDetail");
const userDetail: any = JSON.parse(user);
const NewHeader = () => {
  const [navOptions, setNavOptions] = useState<any>(pages);
  const [anchorEl, setAnchorEl] = React.useState<any>({});
  const [profileDropMenu, setProfileDropMenu] = useState<any>(null);
  const open = Boolean(profileDropMenu);
  const navigate = useNavigate();
  const iRef = useRef(0);
  const txt =
    "|| कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भुर्मा ते संगोऽस्त्वकर्मणि ||";
  const speed = 50;

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

  const handleClose = (pageName: any) => {
    setAnchorEl({
      ...anchorEl,
      [pageName]: null,
    });
  };

  useEffect(() => {
    if (isloggedIn) {
      setNavOptions([...pages.filter((item: any) => item.name !== "LOG IN")]);
    }
    const typeWriter = () => {
      const demoElement = document.getElementById("demo");

      if (demoElement && iRef.current < txt.length) {
        demoElement.innerHTML += txt.charAt(iRef.current);
        iRef.current += 1;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }, [userDetail]);
  return (
    <>
      <div className="container">
        <nav>
          <img src={logo} className="logo" alt="Darshanyog Dham Logo" />

          {navOptions.map((page: any) => (
            <div key={page.name} style={{ position: "relative" }}>
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
                    {userDetail?.firstName?.split("")[0] || "User"}
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
                  set/change password
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
            <h1 id="demo" style={{ fontSize: "4em", color: "white" }}></h1>
          </div>
        </section>
      </div>

      <div className="card-container">{/* Your card components go here */}</div>
    </>
  );
};

export default NewHeader;

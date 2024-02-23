import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import "./header.css";
const pages = [
  { name: "home", route: "/" },
  { name: "About Us", route: "/about-us" },
  { name: "Program Schedule", route: "/program-schedule" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const HeaderComponent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      {/* <nav id="navbar">
        <div id="logo">
          <img src="/assets/Dharshanyog Dham Logo.png.jpg" alt="" />
        </div>
        <ul>
          <li className="item">
            <a href="#">HOME</a>
          </li>
          <li className="item">
            <a href="#">ABOUT US</a>
          </li>
          <li className="item">
            <a href="#">PROGRAM SCHEDUAL</a>
          </li>
        </ul>
      </nav> */}

      <AppBar
        position="static"
        // style={{ backgroundColor: "transparent", position: "fixed" }}
        style={{ backgroundColor: "#e48732" }}
        // style={{ backgroundColor: "#e18c48", position: "fixed" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  onClick={() => navigate("/")}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <img src="src/assets/images/Dharshanyog_Dham_Logo.png" />
                </Typography>
              </div>
              <div>
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
                    {pages.map((page) => (
                      <MenuItem
                        key={page.name}
                        onClick={() => {
                          handleCloseNavMenu();
                          navigate(page.route);
                        }}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(page.route);
                      }}
                      sx={{ my: 2, color: "#510000", display: "block" }}
                      // sx={{ my: 2, color: "#510000", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </div>
              <div>
                <Button
                  color="inherit"
                  style={{ color: "#510000" }}
                  onClick={() => navigate("log-in")}
                >
                  Login
                </Button>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default HeaderComponent;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "./headerComponent.css";
import { pages } from "../config/constants";

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

  const [anchorEl, setAnchorEl] = React.useState<any>({});

  const handleClick = (event: any, pageName: any, route: any) => {
    const page: any = pages.find((p: any) => p.name === pageName);
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

  return (
    <>
      <AppBar
        position="static"
        // style={{ backgroundColor: "transparent", position: "fixed" }}
        style={{ backgroundColor: "rgb(206,206,206)" }}
      // style={{ backgroundColor: "#e48732" }}
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
                  <img
                    src="https://darshanyog.org/assets/img/upload/branch/banner/9hLkOGFDJp.png"
                    style={{ height: "70px", width: "160px" }}
                  />
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
                    {pages.map((page: any) => (
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
                  {pages.map((page: any) => (
                    <div key={page.name}>
                      <Button
                        onClick={(event) =>
                          handleClick(
                            event,
                            page.name,
                            page.route ? page.route : "/"
                          )
                        }
                        sx={{ my: 2, color: "black", display: "block" }}
                        style={{ fontWeight: "bold" }}
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
                                    content: subItem?.content
                                      ? subItem?.content
                                      : "",
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
              </div>
              <div>
                <Button
                  color="inherit"
                  style={{ fontWeight: "bold", color: "black" }}
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

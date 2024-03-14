import React, { useEffect, useRef, useState } from "react";
import "./newHeader.css";
import { pages } from "../config/constants";
import { Link, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "./assets/Dharshanyog Dham Logo.jpg";

const NewHeader = () => {
  const iRef = useRef(0);
  const txt =
    "|| कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भुर्मा ते संगोऽस्त्वकर्मणि ||";
  const speed = 50;
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
  useEffect(() => {
    const typeWriter = () => {
      const demoElement = document.getElementById("demo");

      if (demoElement && iRef.current < txt.length) {
        demoElement.innerHTML += txt.charAt(iRef.current);
        iRef.current += 1;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }, []);
  return (
    <>
      <div className="container">
        <nav>
          <img src={logo} className="logo" alt="Darshanyog Dham Logo" />

          {pages.map((page: any) => (
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

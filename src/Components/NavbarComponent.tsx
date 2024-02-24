import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";

export default function NavbarComponent() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "orange",
      }}
    >
      <div style={{ margin: "10px", marginLeft: "50px" }}>
        <img
          style={{ height: "70px", width: "160px" }}
          src="https://darshanyog.org/assets/img/upload/branch/banner/9hLkOGFDJp.png"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <List
          component={Stack}
          direction="row"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ListItem disablePadding sx={{ flex: "1", maxWidth: "30%" }}>
            <ListItemButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <ListItemText primary="Donation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ flex: "1", maxWidth: "30%" }}>
            <ListItemButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <ListItemText primary="Support Us" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ flex: "1", maxWidth: "30%" }}>
            <ListItemButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
    // <Box sx={{ flexGrow: 1 }}>
    //   <FormGroup>
    //     <FormControlLabel
    //       control={
    //         <Switch
    //           checked={auth}
    //           onChange={handleChange}
    //           aria-label="login switch"
    //         />
    //       }
    //       label={auth ? "Logout" : "Login"}
    //     />
    //   </FormGroup>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <img
    //         src="src/assests/images/Download Light Orange vector background with colorful stars_ for free.jpg"
    //         alt="abcd"
    //       />
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         Photos
    //       </Typography>
    //       {auth && (
    //         <div>
    //           <IconButton
    //             size="large"
    //             aria-label="account of current user"
    //             aria-controls="menu-appbar"
    //             aria-haspopup="true"
    //             onClick={handleMenu}
    //             color="inherit"
    //           >
    //             <AccountCircle />
    //           </IconButton>
    //           <Menu
    //             id="menu-appbar"
    //             anchorEl={anchorEl}
    //             anchorOrigin={{
    //               vertical: "top",
    //               horizontal: "right",
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //               vertical: "top",
    //               horizontal: "right",
    //             }}
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem onClick={handleClose}>Profile</MenuItem>
    //             <MenuItem onClick={handleClose}>My account</MenuItem>
    //           </Menu>
    //         </div>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}

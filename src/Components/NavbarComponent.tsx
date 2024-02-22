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
          style={{ height: "100px", width: "100px" }}
          src="data:image/jpeg;base64,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"
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

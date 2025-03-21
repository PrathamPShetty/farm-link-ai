import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Button, ListItemText } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import FeedbackIcon from "@mui/icons-material/FeedbackOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    activeNavOption,
    setActiveNavOption,
    admin,
    host,
    handleLogoutAdmin,
  } = useContext(AdminContext);
  const handleClose = (condition) => {
    if (condition == "Logout") {
      handleLogoutAdmin();
    }
    setAnchorEl(null);
  };
  let navOptions = [
    {
      title: "Dashboard",
      path: "/admin/Dashboard",
      icon: <HomeIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Farmers",
      path: "/admin/Farmers",
      icon: <Person3Icon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Customers",
      path: "/admin/Customers",
      icon: <GroupsIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Feedbacks",
      path: "/admin/Feedbacks",
      icon: <FeedbackIcon sx={{ fontSize: "20px" }} />,
    },
  ];
  // console.log(admin);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#fff",
          // backgroundColor: "rgb(93, 95, 239)",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            pt: 1,
            pb: 1,
          }}
        >
          <Box
            sx={{
              minWidth: "15%",
              justifyContent: "space-between",
              display: "flex",
              backgroundColor: "#fff",
              p: 1,
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="square"
              src={`${host}/uploads/admin/${admin?.profile}`}
            />
            <Box>
              <Typography
                sx={{ color: "black", fontWeight: "bolder" }}
                variant="subtitle2"
              >
                {admin?.name}
              </Typography>
              <Typography
                sx={{ color: "black" }}
                variant="caption"
                color="text.secondary"
              >
                Admin
              </Typography>
            </Box>
            <ArrowDropDownIcon
              onClick={handleClick}
              sx={{ color: "black", fontWeight: "bolder", cursor: "pointer" }}
            />
          </Box>
          <Menu
            placement="bottom-start"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("Logout")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        elevation={1}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            // p: 2,
            backgroundColor: "#fff",
            // borderRight: "1px solid black",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              // fontFamily: "Poppins",
              fontWeight: "1000",
              fontSize: "30px",
              color: "#eddd5e",
              // textShadow: "2px 2px 5px #404a3d",
            }}
          >
            Farm<span style={{ color: "#404a3d" }}>Link</span>
          </Typography>
        </Toolbar>
        <List sx={{}}>
          {navOptions.map((text, index) => (
            <ListItem
              key={index}
              component={Link}
              to={text.path}
              sx={{
                color: "black",
                opacity: activeNavOption == text.path ? "100%" : "50%",
                // ml: activeNavOption == text.path ? 2 : 0,
              }}
            >
              <Box
                sx={{
                  width: "5px",
                  height: "7vh",
                  borderRadius: "50px",
                }}
              ></Box>
              <ListItemButton
                sx={{
                  borderLeft:
                    activeNavOption == text.path && "5px solid #eddd5e",
                  borderRadius: activeNavOption == text.path ? "0px" : "0px",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: activeNavOption == text.path && "#404a3d1a",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeNavOption == text.path ? "#404a3d" : "#000",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  color="text.secondary"
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        color:
                          activeNavOption == text.path ? "#404a3d" : "#000",
                        fontSize: "13px",
                      }}
                    >
                      {text.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List
          sx={{
            position: "fixed",
            bottom: 0,
            width: "15.5%",
          }}
        >
          <ListItem
            onClick={() => handleClose("Logout")}
            sx={{
              color: "black",
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#404a3d",
                transition: "0.5s ease-in-out",
                ":hover": {
                  backgroundColor: "#404a3d",
                  boxShadow: "5px 5px 5px #404a3dc2",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#eddd5e",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                color="text.secondary"
                primary={
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  >
                    Logout
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

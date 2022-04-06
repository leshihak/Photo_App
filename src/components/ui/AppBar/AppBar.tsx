import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar as AppBarComponent,
  alpha,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../../../hooks/useAuth";
import InstagramLogo from "../Icons/InstagramLogo";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const pages = [
  { icon: <HomeOutlinedIcon />, id: "HomeOutlinedIcon" },
  {
    icon: <ChatBubbleOutlineOutlinedIcon />,
    id: "ChatBubbleOutlineOutlinedIcon",
  },
  { icon: <AddCircleOutlineIcon />, id: "AddCircleOutlineIcon" },
  { icon: <FavoriteBorderIcon />, id: "FavoriteBorderIcon" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    backgroundColor: "#efefef",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AppBar: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  if (!user) {
    return <Loader />;
  }

  const settings = [
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      href: `/${user.uid}`,
    },
    { text: "Saved", icon: <BookmarkIcon />, href: `/${user.uid}` },
    { text: "Settings", icon: <SettingsIcon />, href: `/${user.uid}` },
    {
      text: "Switch Accounts",
      icon: <SwitchAccountIcon />,
      href: `/${user.uid}`,
    },
  ];

  return (
    <AppBarComponent
      position="fixed"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container sx={{ "&.MuiContainer-root": { maxWidth: 975, p: 0 } }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <Box width="103px" height="29px">
            <InstagramLogo />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  {page.icon}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#a6a6a6", zIndex: 1 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO mob
          </Typography>
          <Box sx={{ flexGrow: 0 }} display="flex">
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "flex" }}
                >
                  {page.icon}
                </Button>
              ))}
            </Box>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => setAnchorElUser(event.currentTarget)}
                sx={{ p: 0 }}
              >
                {user.displayName && user.photoURL && (
                  <Avatar
                    alt={user.displayName}
                    src={user.photoURL}
                    sx={{ width: 24, height: 24 }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.text}
                  onClick={() => navigate(setting.href)}
                >
                  <ListItemIcon sx={{ svg: { width: 16, height: 16 } }}>
                    {setting.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ span: { fontSize: 14 } }}>
                    {setting.text}
                  </ListItemText>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem>
                <ListItemText sx={{ span: { fontSize: 14 } }}>
                  Log Out
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarComponent>
  );
};

export default AppBar;

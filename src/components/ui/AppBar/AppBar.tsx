import { FC, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar as AppBarComponent,
  alpha,
  Avatar,
  Box,
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
  Typography,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";
import InstagramLogo from "../Icons/InstagramLogo";
import Loader from "../Loader/Loader";
import { ModalRootContext } from "components/ui/modal/ModalRoot/ModalRootContext";

const pages = [
  {
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    id: "HomeOutlinedIcon",
    href: "/",
  },
  {
    icon: <ChatBubbleOutlineOutlinedIcon />,
    activeIcon: <ChatBubbleIcon />,
    id: "ChatBubbleOutlineOutlinedIcon",
    href: "/inbox",
  },
  {
    icon: <AddCircleOutlineIcon />,
    activeIcon: <AddCircleIcon />,
    id: "AddCircleOutlineIcon",
  },
  {
    icon: <ExploreOutlinedIcon />,
    activeIcon: <ExploreIcon />,
    id: "ExploreOutlinedIcon",
    href: "/explore",
  },
  {
    icon: <FavoriteBorderIcon />,
    activeIcon: <FavoriteIcon />,
    id: "FavoriteBorderIcon",
    href: "/favorite",
  },
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
  minWidth: 268,
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
    minWidth: 268,
  },
}));

const AppBar: FC = () => {
  const auth = getAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalType } = useContext(ModalRootContext);

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
      href: `user/${user.uid}`,
    },
    { text: "Saved", icon: <BookmarkIcon />, href: `user/${user.uid}` },
    { text: "Settings", icon: <SettingsIcon />, href: "/accounts/edit" },
    {
      text: "Switch Accounts",
      icon: <SwitchAccountIcon />,
      href: `user/${user.uid}`,
    },
  ];

  const handleSignOut = () =>
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => toast.error(error.message));

  const handleAddPhotoPost = () => setModalType(0);

  return (
    <AppBarComponent
      position="fixed"
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #dbdbdb",
        boxShadow: "none",
      }}
    >
      <Container sx={{ "&.MuiContainer-root": { maxWidth: 975, p: 0 } }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <Box
            width="103px"
            height="29px"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
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
                <MenuItem
                  key={page.id}
                  onClick={() => {
                    if (page.href) {
                      navigate(page.href);
                    } else {
                      handleAddPhotoPost();
                    }
                    handleCloseNavMenu();
                  }}
                >
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
              {pages.map((page) => {
                const isActiveIcon = location.pathname === page.href;
                return (
                  <Link
                    key={page.id}
                    onClick={() => {
                      if (page.href) {
                        navigate(page.href);
                      } else {
                        handleAddPhotoPost();
                      }
                      handleCloseNavMenu();
                    }}
                    sx={{
                      "&:last-child": { mr: 2.5 },
                      color: "black",
                      display: "flex",
                      cursor: "pointer",
                      ml: 2.5,
                    }}
                  >
                    {isActiveIcon ? page.activeIcon : page.icon}
                  </Link>
                );
              })}
            </Box>
            <IconButton
              onClick={(event) => setAnchorElUser(event.currentTarget)}
              sx={{ p: 0 }}
            >
              {user.displayName && user.photoURL && (
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  sx={{ width: 24, height: 24, border: "1px solid #262626" }}
                />
              )}
            </IconButton>
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
                  onClick={() => {
                    navigate(setting.href);
                    handleCloseUserMenu();
                  }}
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
              <MenuItem onClick={handleSignOut}>
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

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
import { Link } from "react-router-dom";

const pages = [
  { name: "home", path: "/" },
  { name: "stadiums", path: "/fields" }, // تأكد أن الـ path هو نفسه اللي كتبته في App.jsx
  { name: "contact us", path: "/contact" },
  { name: "about us", path: "/about" },
  { name: "login", path: "/login" },
  { name: "register", path: "/register" },
];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" }, // اللوج آوت لقدام بنعملها دالة مش مسار
];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#006722" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/015/720/560/small/abstract-creative-football-illustration-isolated-on-transparent-background-free-png.png"
            }
            alt="Booking System Logo"
            sx={{
              display: { xs: "none", md: "flex" }, // يظهر فقط عالكمبيوتر
              height: "80px", // تحكم بطول اللوجو من هنا
              mr: 1, // مسافة من اليمين
              cursor: "pointer", // عشان يصير الماوس شكل إصبع لما يمر عليه
              width: "80px", // يحافظ على نسبة العرض إلى الارتفاع
            }}
          />

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link} // 👈 تحويله لرابط
                  to={page.path} // 👈 توجيهه للمسار
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              color: "Black",
              textDecoration: "none",
            }}
          >
            BOOKING SYSTEM
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              mx: 20,
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 1,
                  mx: 1,

                  display: "block",
                  color: "white", // اللون الأساسي للزر
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase", // عشان الحروف تصير كابيتال
                  transition: "all 0.3s ease", // حركة ناعمة
                  borderBottom: "2px solid transparent", // خط شفاف جاهز للتلوين

                  // تأثير الماوس
                  "&:hover": {
                    color: "#FFD700", // يتغير النص للذهبي
                    borderBottom: "2px solid #FFD700", // يظهر خط ذهبي تحت الكلمة
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
                  key={setting.name}
                  onClick={handleCloseUserMenu}
                  component={Link} // 👈 عشان يصير رابط
                  to={setting.path} // 👈 عشان يروح ع الداشبورد
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

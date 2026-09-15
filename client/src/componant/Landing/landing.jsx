import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: "78vh", md: "82vh" },
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://i.pinimg.com/1200x/f9/ae/7b/f9ae7b7d06b08c85aff75c24db06d767.jpg")',
        backgroundSize: "cover", // قمنا بتغيير هذه الكلمة
        backgroundRepeat: "no-repeat", // أضفنا هذا السطر لمنع تكرار الصورة
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
        textAlign: { xs: "right", md: "center" },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "white",
            textShadow: "0 3px 20px rgba(0,0,0,.35)",
            fontSize: { xs: "2.4rem", md: "4rem" },
          }}
        >
          احجز ملعبك المفضل في ثوانٍ
        </Typography>

        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 680, mx: { xs: 0, md: "auto" }, lineHeight: 1.7 }}>
          نظام حجز الملاعب الأسرع في إربد.. اختر وقتك، ادفع، وانطلق للعب!
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            component={Link}
            to={"/fields"}
            color="secondary"
            size="large"
            startIcon={<SportsSoccerIcon />}
            sx={{ px: 4, py: 1.5, fontSize: "1.05rem" }}
          >
            استعرض الملاعب
          </Button>
          <Button
            component={Link}
            to={"/register"}
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.05rem", border: "2px solid" }}
          >
            سجّل الآن
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;

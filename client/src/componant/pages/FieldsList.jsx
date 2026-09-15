import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFields } from "../Hooks/useField"; // تأكد من مسار مجلد الهوك
import LocationOnIcon from "@mui/icons-material/LocationOn";


const FieldsList = () => {
  const { fields, loading } = useFields(); // هون استدعينا العقل المدبر

  // عرض دائرة تحميل لبين ما الداتا توصل من السيرفر
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 5 }, py: { xs: 4, md: 7 }, backgroundColor: "#f5f7f6", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ mb: 1, fontWeight: "bold", color: "#123c36" }}
      >
        الملاعب المتاحة
      </Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 5 }}>
        اختر الملعب المناسب واحجز وقتك بسهولة
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* اللوب اللي بيلف على الداتا وبيرسم الكروت */}
        {fields.map((field) => (
          <Card
            key={field._id}
            sx={{ width: { xs: "100%", sm: 345 }, borderRadius: 3, boxShadow: "0 12px 30px rgba(18,60,54,.08)", overflow: "hidden", transition: "transform .2s", "&:hover": { transform: "translateY(-5px)" } }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold", color: "#18312d" }}>
                {field.name}
              </Typography>
              <img
                src={field.image}
                alt={field.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: "flex", alignItems: "center", gap: .5 }}>
                <LocationOnIcon fontSize="small" color="primary" /> {field.location}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {field.pricePerHour} دينار / ساعة
              </Typography>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ borderRadius: "20px" }}
              >
                احجز الآن
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FieldsList;

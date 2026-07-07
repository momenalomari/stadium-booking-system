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
import { Link } from "react-router-dom";


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
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ mb: 6, fontWeight: "bold", color: "#006722" }}
      >
        الملاعب المتاحة
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
            sx={{ width: 345, borderRadius: "15px", boxShadow: 3 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
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

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                الموقع: {field.location}
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

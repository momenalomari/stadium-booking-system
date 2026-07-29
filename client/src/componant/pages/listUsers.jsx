import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";

// 1. استدعاء الهوك الصحيح الخاص بالمستخدمين
import { useUser } from "../Hooks/useUser.js"; // تأكد إن اسم الملف والمسار صحيح 100%

export default function ListUsers() {
  // 2. استخدام الهوك الصحيح
  const { users, loading } = useUser();
  console.log("Users data:", users); // إضافة هذا السطر لتصحيح الأخطاء
  // إذا البيانات لسا بتحمل، اعرض دائرة التحميل
  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    // استخدام Box من MUI بدل div العادي لترتيب أفضل
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#7285a2" }}>
        List Users
      </Typography>
      <h4
        style={{ textAlign: "center", m: "20px", color: "#7285a2" }}
      >
        {users.length} عدد المستخدمين
      </h4>

      {users?.length > 0 ? (
        users.map((user) => (
          // 3. استخدام _id بدل id عشان يطابق داتابيز MongoDB
          
         <Grid container spacing={2} key={user._id} sx={{ marginBottom: "15px" }}>
            <Grid size={3}>{user.name}</Grid>
            <Grid size={3}>{user.email}</Grid>
            <Grid size={3}>{user.role}</Grid>
            <button>Delete</button>
            <button>Edit</button>

              
            
          
          </Grid>
        ))
      ) : (
        <Typography variant="body1">لا يوجد مستخدمين لعرضهم.</Typography>
      )}
    </Box>
  );
}

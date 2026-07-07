import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // 1. تجهيز الـ States لتخزين مدخلات المستخدم
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // أداة للتنقل بين الصفحات برمجياً

  // دالة لتحديث البيانات جوا الـ State عند الكتابة
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. دالة إرسال البيانات للباك إند
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من إعادة التحميل الافتراضية

    // 🚨 التعديل الأول: الفحص بيصير قبل الـ Loading وقبل إرسال أي شيء للسيرفر
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      toast.error("الرجاء ملء جميع الحقول");
      return; // return معناها: وقف الكود هون ولا تكمل لتحت
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("كلمة المرور وتأكيدها غير متطابقين!");
      return;
    }

    // إذا وصلنا لهون، معناها البيانات ممتازة واليوزر مش ناسي إشي
    setLoading(true);

    try {
      // إرسال طلب POST للباك إند ومعه بيانات المستخدم
      // غيرنا الكلمة الأخيرة من register إلى create_user
      const response = await axios.post(
        "http://localhost:5000/api/users/create_user",
        formData,
      );

      toast.success(response.data.message || "تم إنشاء الحساب بنجاح! 🎉", {
        toastId: "register_success",
      });

      // توجيه المستخدم لصفحة تسجيل الدخول بعد ثانيتين من النجاح
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // عرض رسالة الخطأ القادمة من السيرفر (مثل: الإيميل مستخدم مسبقاً)
      const errorMsg = error.response?.data?.message || "حدث خطأ أثناء التسجيل";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: "15px" }}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", mb: 3, color: "#006722" }}
          >
            إنشاء حساب جديد
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="الاسم الكامل"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="البريد الإلكتروني"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="تأكيد كلمة المرور"
              type="password"
              autoComplete="current-password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "20px",
                p: 1,
                fontWeight: "bold",
              }}
            >
              {loading ? "جاري التسجيل..." : "تسجيل الحساب"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                style={{
                  color: "#006722",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                تسجيل الدخول
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;

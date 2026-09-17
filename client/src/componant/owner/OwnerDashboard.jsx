import React, { useEffect, useState } from "react";
import {
  Alert, Box, Button, Card, CardContent, Chip, CircularProgress,
  Container, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, MenuItem, TextField, Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const emptyField = { name: "", location: "", pricePerHour: "", openingTime: "08:00", closingTime: "23:00", images: [] };

export default function OwnerDashboard() {
  const [field, setField] = useState(emptyField);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const response = await axios.get("http://localhost:5000/api/bookings/owner", { params: { ownerId: user?._id || user?.id } });
      setBookings(response.data.bookings || response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "تعذر تحميل طلبات الحجز");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBookings(); }, []);

  const addField = async () => {
    if (!field.name.trim() || !field.location.trim() || !field.pricePerHour || field.images.length === 0) {
      toast.error("أدخل اسم الملعب وموقعه وسعره وصورة واحدة على الأقل");
      return;
    }
    const price = Number(field.pricePerHour);
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("أدخل سعراً صحيحاً للساعة");
      return;
    }
    const data = new FormData();
    data.append("name", field.name.trim());
    data.append("location", field.location.trim());
    data.append("pricePerHour", price);
    data.append("openingTime", field.openingTime);
    data.append("closingTime", field.closingTime);
    data.append("ownerId", JSON.parse(localStorage.getItem("user") || "null")?._id || "");
    field.images.forEach((image) => data.append("images", image));
    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/fields/create_field", data);
      toast.success("تمت إضافة الملعب بنجاح");
      setField(emptyField);
      setDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "تعذر إضافة الملعب");
    } finally {
      setSaving(false);
    }
  };

  const updateBooking = async (bookingId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/status`, { status });
      setBookings((current) => current.map((booking) => booking._id === bookingId ? { ...booking, status } : booking));
      toast.success(status === "approved" ? "تمت الموافقة على الحجز" : "تم رفض الحجز");
    } catch (error) {
      toast.error(error.response?.data?.message || "تعذر تحديث حالة الحجز");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", mb: 4 }}>
        <Box><Typography variant="h4" sx={{ fontWeight: 800 }}>لوحة صاحب الملعب</Typography><Typography color="text.secondary">أضف ملعبك وتابع طلبات الحجز الواردة.</Typography></Box>
        <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>إضافة ملعب جديد</Button>
      </Box>
      <Card elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>طلبات الحجز</Typography>
          {loading ? <CircularProgress color="success" /> : bookings.length === 0 ? <Alert severity="info">لا توجد طلبات حجز حالياً.</Alert> : (
            <Grid container spacing={2}>
              {bookings.map((booking) => (
                <Grid item xs={12} md={6} key={booking._id}>
                  <Card variant="outlined"><CardContent>
                    <Typography sx={{ fontWeight: 700 }}>{booking.field?.name || booking.fieldName || "ملعب"}</Typography>
                    <Typography color="text.secondary">{booking.user?.name || booking.userName || "مستخدم"} - {booking.date}</Typography>
                    <Typography color="text.secondary">{booking.startTime} - {booking.endTime}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <Chip label={booking.status === "approved" ? "مقبول" : booking.status === "rejected" ? "مرفوض" : "بانتظار الموافقة"} color={booking.status === "approved" ? "success" : booking.status === "rejected" ? "error" : "warning"} size="small" />
                      {(!booking.status || booking.status === "pending") && <><Button size="small" color="success" onClick={() => updateBooking(booking._id, "approved")}>موافقة</Button><Button size="small" color="error" onClick={() => updateBooking(booking._id, "rejected")}>رفض</Button></>}
                    </Box>
                  </CardContent></Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onClose={() => !saving && setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>إضافة ملعب جديد</DialogTitle>
        <DialogContent>
          <TextField fullWidth required label="اسم الملعب" margin="dense" value={field.name} onChange={(e) => setField({ ...field, name: e.target.value })} />
          <TextField fullWidth required label="الموقع / المنطقة" margin="dense" value={field.location} onChange={(e) => setField({ ...field, location: e.target.value })} />
          <TextField fullWidth required type="number" label="السعر لكل ساعة" margin="dense" inputProps={{ min: 1 }} value={field.pricePerHour} onChange={(e) => setField({ ...field, pricePerHour: e.target.value })} />
          <Grid container spacing={1}><Grid item xs={6}><TextField fullWidth type="time" label="يفتح" margin="dense" InputLabelProps={{ shrink: true }} value={field.openingTime} onChange={(e) => setField({ ...field, openingTime: e.target.value })} /></Grid><Grid item xs={6}><TextField fullWidth type="time" label="يغلق" margin="dense" InputLabelProps={{ shrink: true }} value={field.closingTime} onChange={(e) => setField({ ...field, closingTime: e.target.value })} /></Grid></Grid>
          <TextField fullWidth required type="file" label="صور الملعب (حتى 5 صور)" margin="dense" InputLabelProps={{ shrink: true }} inputProps={{ accept: "image/jpeg,image/png,image/webp", multiple: true }} onChange={(e) => setField({ ...field, images: Array.from(e.target.files || []).slice(0, 5) })} />
          {field.images.length > 0 && <Typography variant="caption" color="text.secondary">{field.images.length} صور محددة</Typography>}
        </DialogContent>
        <DialogActions><Button onClick={() => setDialogOpen(false)} disabled={saving}>إلغاء</Button><Button variant="contained" color="success" onClick={addField} disabled={saving}>{saving ? "جاري الحفظ..." : "حفظ الملعب"}</Button></DialogActions>
      </Dialog>
    </Container>
  );
}

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingDialog({ field, onClose }) {
  const [booking, setBooking] = useState({ date: "", startTime: "", endTime: "" });
  const [saving, setSaving] = useState(false);

  const submitBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?._id && !user?.id) {
      toast.error("سجل الدخول أولاً حتى تتمكن من الحجز");
      return;
    }
    if (!booking.date || !booking.startTime || !booking.endTime) {
      toast.error("حدد التاريخ ووقت البداية والنهاية");
      return;
    }
    if (booking.endTime <= booking.startTime) {
      toast.error("يجب أن يكون وقت النهاية بعد وقت البداية");
      return;
    }
    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/bookings/create_booking", {
        fieldId: field._id,
        userId: user._id || user.id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      });
      toast.success("تم إرسال طلب الحجز، بانتظار موافقة صاحب الملعب");
      setBooking({ date: "", startTime: "", endTime: "" });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "تعذر إرسال طلب الحجز");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={Boolean(field)} onClose={saving ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>حجز {field?.name}</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          سيصل الطلب إلى صاحب الملعب للموافقة أو الرفض.
        </Typography>
        <TextField fullWidth type="date" label="تاريخ الحجز" InputLabelProps={{ shrink: true }} margin="dense" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
        <TextField fullWidth type="time" label="وقت البداية" InputLabelProps={{ shrink: true }} margin="dense" value={booking.startTime} onChange={(e) => setBooking({ ...booking, startTime: e.target.value })} />
        <TextField fullWidth type="time" label="وقت النهاية" InputLabelProps={{ shrink: true }} margin="dense" value={booking.endTime} onChange={(e) => setBooking({ ...booking, endTime: e.target.value })} />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving}>إلغاء</Button>
        <Button variant="contained" color="success" onClick={submitBooking} disabled={saving}>{saving ? "جاري الإرسال..." : "إرسال طلب الحجز"}</Button>
      </DialogActions>
    </Dialog>
  );
}

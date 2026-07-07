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

export default function ListUsers() {
  const { users, loading } = useFields(); // استخدم الهوك لجلب بيانات المستخدمين

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1>List Users</h1>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
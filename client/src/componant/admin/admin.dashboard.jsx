import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../layout/Navbar/navbar.jsx';
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import ListUsers from "../pages/listUsers.jsx";

export default function AdminDashboard() {
  return (
    <Container>
      <box>
     <ListUsers />
     <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage your application.</p>

      </box>
     
      
     
    </Container>
  );
}
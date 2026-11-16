import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";

import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";

// Forms
import CreateEvent from "../pages/events/CreateEvent";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Super Admin */}
      <Route
        path="/super-admin/dashboard"
        element={<SuperAdminDashboard />}
      />

      <Route
        path="/super-admin/create-event"
        element={<CreateEvent />}
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/create-event"
        element={<CreateEvent />}
      />

      {/* User */}
      <Route
        path="/user/dashboard"
        element={<UserDashboard />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
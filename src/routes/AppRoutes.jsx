import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import CreateEvent from "../pages/events/CreateEvent";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import UserLayout from "../layouts/UserLayout";
import TablesPage from "../pages/TablesPage";
import Members from "../pages/admin/Members";
import Registrations from "../pages/admin/Registrations";
import Analytics from "../pages/admin/Analytics";
import Profile from "../pages/user/Profile";
import Badges from "../pages/user/Badges";
import Notifications from "../pages/user/Notifications";

function RoleTablesPage({ role, Layout, initialAdding = false }) {
  return (
    <Layout>
      <main className="management-page min-w-0 p-4 sm:p-6 lg:p-8">
        <TablesPage role={role} initialAdding={initialAdding} />
      </main>
    </Layout>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/super-admin/admins" element={<RoleTablesPage role="Super Admin" Layout={SuperAdminLayout} />} />
      <Route path="/super-admin/create-event" element={<CreateEvent />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/events" element={<RoleTablesPage role="Admin" Layout={AdminLayout} />} />
      <Route path="/admin/create-event" element={<RoleTablesPage role="Admin" Layout={AdminLayout} initialAdding />} />
      <Route path="/admin/members" element={<Members />} />
      <Route path="/admin/registrations" element={<Registrations />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/events" element={<RoleTablesPage role="User" Layout={UserLayout} />} />
      <Route path="/user/registrations" element={<RoleTablesPage role="User" Layout={UserLayout} />} />
      <Route path="/user/badges" element={<Badges />} />
      <Route path="/user/notifications" element={<Notifications />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
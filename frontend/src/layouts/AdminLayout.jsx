import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const menu = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Events",
    path: "/admin/events",
  },
  {
    label: "Members",
    path: "/admin/members",
  },
  {
    label: "Registrations",
    path: "/admin/registrations",
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar menu={menu} />

      <div
        style={{
          flex: 1,
        }}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
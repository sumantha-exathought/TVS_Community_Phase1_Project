import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const menu = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
  },
  {
    label: "My Profile",
    path: "/user/profile",
  },
  {
    label: "My Events",
    path: "/user/events",
  },
  {
    label: "My Badges",
    path: "/user/badges",
  },
  {
    label: "Notifications",
    path: "/user/notifications",
  },
];

const UserLayout = ({ children }) => {
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

export default UserLayout;
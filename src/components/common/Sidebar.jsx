import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      <div
        className={`sidebar ${
          collapsed ? "collapsed" : ""
        } ${mobileOpen ? "active" : ""}`}
      >
        <div className="logo-section">
          <h2>
            {collapsed ? "TVS" : "TVS Community"}
          </h2>
        </div>

        <div
          className="menu-item"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡" : "⬅ Collapse"}
        </div>

        {menu.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${
              location.pathname === item.path
                ? "active-menu"
                : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
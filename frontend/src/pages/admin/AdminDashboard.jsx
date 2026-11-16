import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/common/StatCard";

import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="admin-dashboard">

        {/* Hero Section */}
        <div className="admin-hero">

          <div>
            <h1>Community Dashboard</h1>

            <p>
              Apache Owners Group • Bengaluru
            </p>
          </div>

          <button
            className="create-btn"
            onClick={() =>
              navigate("/admin/create-event")
            }
          >
            + Create Event
          </button>

        </div>

        {/* Stats Cards */}

        <div className="admin-grid">

          <StatCard
            title="Members"
            value="1,245"
            color="#0054A6"
          />

          <StatCard
            title="Upcoming Events"
            value="8"
            color="#22C55E"
          />

          <StatCard
            title="Registrations"
            value="585"
            color="#E31E24"
          />

          <StatCard
            title="Attendance"
            value="92%"
            color="#F59E0B"
          />

        </div>

        {/* Registration Analytics */}

        <div className="dashboard-card">

          <h2>📈 Registration Trends</h2>

          <div className="trend-placeholder">

            <div style={{ height: "40%" }}></div>
            <div style={{ height: "60%" }}></div>
            <div style={{ height: "80%" }}></div>
            <div style={{ height: "55%" }}></div>
            <div style={{ height: "90%" }}></div>
            <div style={{ height: "70%" }}></div>

          </div>

        </div>

        {/* Upcoming Events */}

        <div className="dashboard-card">

          <h2>📅 Upcoming Events</h2>

          <table className="event-table">

            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Breakfast Ride</td>
                <td>20 Nov</td>
                <td>80 / 100</td>
                <td>
                  <span className="published">
                    Published
                  </span>
                </td>
              </tr>

              <tr>
                <td>Weekend Ride</td>
                <td>27 Nov</td>
                <td>55 / 75</td>
                <td>
                  <span className="draft">
                    Draft
                  </span>
                </td>
              </tr>

              <tr>
                <td>Track Day</td>
                <td>2 Dec</td>
                <td>95 / 120</td>
                <td>
                  <span className="published">
                    Published
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Recent Registrations */}

        <div className="dashboard-card">

          <h2>👥 Recent Registrations</h2>

          <ul className="registration-list">

            <li>
              Rohit joined Breakfast Ride
            </li>

            <li>
              Govind completed payment
            </li>

            <li>
              Shalini registered for Track Day
            </li>

            <li>
              Sumantha joined Apache Ride
            </li>

          </ul>

        </div>

        {/* Community Health */}

        <div className="dashboard-card">

          <h2>🏆 Community Performance</h2>

          <div className="performance-item">

            <span>Member Growth</span>

            <span>85%</span>

          </div>

          <div className="progress">
            <div
              className="fill blue"
              style={{ width: "85%" }}
            ></div>
          </div>

          <div className="performance-item">

            <span>Event Attendance</span>

            <span>92%</span>

          </div>

          <div className="progress">
            <div
              className="fill green"
              style={{ width: "92%" }}
            ></div>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="dashboard-card">

          <h2>⚡ Quick Actions</h2>

          <div className="action-buttons">

            <button
              onClick={() =>
                navigate("/admin/create-event")
              }
            >
              Create Event
            </button>

            <button
              onClick={() =>
                navigate("/admin/members")
              }
            >
              View Members
            </button>

            <button
              onClick={() =>
                navigate("/admin/registrations")
              }
            >
              Registrations
            </button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
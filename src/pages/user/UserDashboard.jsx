import UserLayout from "../../layouts/UserLayout";
import StatCard from "../../components/common/StatCard";

import "./UserDashboard.css";

import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="dashboard-container">

        {/* Hero Banner */}
        <div className="hero-banner">
          <div>
            <h1>🏍 Welcome Back, User</h1>
            <p>Apache Owners Group • Bengaluru</p>
          </div>

          <button
            className="join-btn"
            onClick={() => navigate("/user/events")}
          >
            Explore Rides
          </button>
        </div>

        {/* KPI Section */}
        <div className="stats-grid">

          <StatCard
            title="Upcoming Rides"
            value="4"
            color="#0054A6"
          />

          <StatCard
            title="Events Joined"
            value="18"
            color="#22C55E"
          />

          <StatCard
            title="Badges"
            value="7"
            color="#E31E24"
          />

          <StatCard
            title="Community Rank"
            value="#23"
            color="#F59E0B"
          />

        </div>

        {/* My Bike */}
        <div className="card">

          <h2>🏍 My Vehicle</h2>

          <div className="bike-details">
            <h3>Apache RTR 200 4V</h3>

            <p>Registration : KA05AB1234</p>

            <p>Last Ride : Bangalore Hills Run</p>
          </div>

        </div>

        {/* Upcoming Events */}

        <div className="card">

          <h2>Upcoming Events</h2>

          <div className="event-grid">

            <div className="event-card">
              <h3>Breakfast Ride</h3>
              <p>20 Nov 2026</p>
              <button
                onClick={() => navigate("/user/events")}
              >
                Register
              </button>
            </div>

            <div className="event-card">
              <h3>Weekend Hills</h3>
              <p>25 Nov 2026</p>
              <button
                onClick={() => navigate("/user/events")}
              >
                Register
              </button>
            </div>

            <div className="event-card">
              <h3>Track Day</h3>
              <p>30 Nov 2026</p>
              <button
                onClick={() => navigate("/user/events")}
              >
                Register
              </button>
            </div>

          </div>
        </div>

        {/* Badges */}

        <div className="card">

          <h2>My Badges</h2>

          <div className="badge-grid">

            <span>🏆 Ride Veteran</span>

            <span>🏆 Event Champion</span>

            <span>🏆 Community Member</span>

            <span>🏆 Explorer</span>

          </div>

        </div>

        {/* Notifications */}

        <div className="card">

          <h2>Notifications</h2>

          <ul className="notification-list">
            <li>✅ Registration Approved</li>
            <li>✅ New Ride Published</li>
            <li>✅ Badge Unlocked</li>
          </ul>

        </div>

      </div>
    </UserLayout>
  );
};

export default UserDashboard;
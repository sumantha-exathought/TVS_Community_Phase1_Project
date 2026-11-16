import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import StatCard from "../../components/common/StatCard";

const SuperAdminDashboard = () => {

 return (
  <SuperAdminLayout>

   <div className="page-container">

    <h1 className="dashboard-title">
       Super Admin Dashboard
    </h1>

    <div className="card-grid">

      <StatCard
       title="Total Users"
       value="15,254"
       color="#0054A6"
      />

      <StatCard
       title="Revenue"
       value="₹14.2L"
       color="#22C55E"
      />

      <StatCard
       title="Communities"
       value="25"
       color="#E31E24"
      />

      <StatCard
       title="Admins"
       value="45"
       color="#F59E0B"
      />

    </div>

   </div>

  </SuperAdminLayout>
 );
};

export default SuperAdminDashboard;
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const menu = [
 "Dashboard",
 "Admins",
 "Communities",
 "Cities",
 "Analytics",
 "Reports",
 "Settings"
];

const SuperAdminLayout = ({children}) => {
 return (
  <div style={{display:"flex"}}>

   <Sidebar menu={menu}/>

   <div
    style={{
      flex:1
    }}
   >
    <Navbar/>
    {children}
   </div>

  </div>
 );
};

export default SuperAdminLayout;
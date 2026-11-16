import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "superadmin")
      navigate("/super-admin/dashboard");

    else if (role === "admin")
      navigate("/admin/dashboard");

    else navigate("/user/dashboard");
  };

  return (
    <div>
      <h1>TVS Community Portal</h1>

      <button
        onClick={() => handleLogin("superadmin")}
      >
        Login as Super Admin
      </button>

      <button
        onClick={() => handleLogin("admin")}
      >
        Login as Admin
      </button>

      <button
        onClick={() => handleLogin("user")}
      >
        Login as User
      </button>
    </div>
  );
};

export default Login;
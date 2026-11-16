const Navbar = () => {
  return (
    <div
      style={{
        background:"#fff",
        padding:"16px 24px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h3>TVS Community Portal</h3>

      <div>

        🔔

        <img
          src="https://i.pravatar.cc/40"
          alt=""
          style={{
            marginLeft:"12px",
            borderRadius:"50%"
          }}
        />

      </div>
    </div>
  );
};

export default Navbar;
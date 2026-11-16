const StatCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,.08)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <h4
        style={{
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          color: "#111827",
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
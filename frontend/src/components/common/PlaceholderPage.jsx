import "./PlaceholderPage.css";

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-card">
        <h1>{title}</h1>

        <p>{description}</p>

        <div className="coming-soon">
          🚧 Coming Soon
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
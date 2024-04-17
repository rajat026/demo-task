import { useNavigate } from "react-router-dom";
import "../App.css";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="home-button" onClick={() => navigate("/data-grid")}>
        Data Grid Component
      </button>
      <button
        className="home-button"
        onClick={() => navigate("/react-hook-form")}
      >
        React Hook Form
      </button>
    </div>
  );
};

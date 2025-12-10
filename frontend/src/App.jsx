// frontend/src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

export default function App() {
  return (
    <div>
      <nav style={styles.nav}>
        <div style={styles.logo}>My Agency</div>
        <div>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/admin" style={styles.link}>
            Admin
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

const styles = {
  nav: {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.2rem",
  },
  link: {
    marginLeft: "1rem",
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
  },
};

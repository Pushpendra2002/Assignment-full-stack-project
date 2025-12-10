// frontend/src/components/LandingPage.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [contactMessage, setContactMessage] = useState("");

  // Fetch projects + clients from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, clientRes] = await Promise.all([
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/clients`),
        ]);

        const projData = await projRes.json();
        const clientData = await clientRes.json();

        setProjects(projData);
        setClients(clientData);
      } catch (err) {
        console.error(err);
        setError("Failed to load data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactMessage("");

    const res = await fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (res.ok) {
      setContactMessage("Contact form submitted successfully!");
      setContact({ fullName: "", email: "", mobile: "", city: "" });
    } else {
      setContactMessage("Failed to submit contact form.");
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={{ maxWidth: "600px" }}>
          <h1 style={styles.heroTitle}>We Build Amazing Digital Experiences</h1>
          <p style={styles.heroSubtitle}>
            This landing page is connected to a real backend for projects,
            clients, contact forms and newsletter subscriptions.
          </p>
        </div>
      </section>

      {/* STATUS MESSAGE */}
      {loading && <p style={styles.info}>Loading data...</p>}
      {error && <p style={{ ...styles.info, color: "red" }}>{error}</p>}

      {/* OUR PROJECTS SECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Projects</h2>

        {projects.length === 0 && !loading && (
          <p style={styles.info}>
            No projects yet. Add some from the Admin Panel.
          </p>
        )}

        <div style={styles.grid}>
          {projects.map((project) => (
            <div key={project._id} style={styles.card}>
              <img
                src={project.imageUrl}
                alt={project.name}
                style={styles.projectImage}
              />
              <h3 style={styles.cardTitle}>{project.name}</h3>
              <p style={styles.cardText}>{project.description}</p>
              <button style={styles.readMoreButton}>Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* HAPPY CLIENTS SECTION */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Happy Clients</h2>

        {clients.length === 0 && !loading && (
          <p style={styles.info}>
            No clients yet. Add client testimonials from the Admin Panel.
          </p>
        )}

        <div style={styles.grid}>
          {clients.map((client) => (
            <div key={client._id} style={styles.card}>
              <img
                src={client.imageUrl}
                alt={client.name}
                style={styles.clientAvatar}
              />
              <p style={styles.cardText}>"{client.description}"</p>
              <h3 style={styles.cardTitle}>{client.name}</h3>
              <span style={styles.designationBadge}>{client.designation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>

        <form style={styles.form} onSubmit={handleContactSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={contact.fullName}
            onChange={(e) =>
              setContact({ ...contact, fullName: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={contact.email}
            onChange={(e) =>
              setContact({ ...contact, email: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Mobile Number"
            value={contact.mobile}
            onChange={(e) =>
              setContact({ ...contact, mobile: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="City"
            value={contact.city}
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
            required
          />

          <button type="submit" style={styles.primaryBtn}>
            Submit
          </button>
        </form>

        {contactMessage && (
          <p style={styles.successMsg}>{contactMessage}</p>
        )}
      </section>
    </div>
  );
}

const styles = {
  hero: {
    padding: "3rem 2rem",
    background: "#f5f7fb",
  },
  heroTitle: {
    fontSize: "2.2rem",
    marginBottom: "0.8rem",
  },
  heroSubtitle: {
    color: "#555",
    lineHeight: 1.5,
  },
  section: {
    padding: "2.5rem 2rem",
  },
  sectionAlt: {
    padding: "2.5rem 2rem",
    background: "#fafafa",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "1.2rem",
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  card: {
    padding: "1.2rem",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fff",
    textAlign: "center",
  },
  projectImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.8rem",
  },
  clientAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "0.8rem",
  },
  cardTitle: {
    fontSize: "1.1rem",
    marginBottom: "0.4rem",
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
  readMoreButton: {
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    border: "1px solid #333",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  designationBadge: {
    display: "inline-block",
    marginTop: "0.3rem",
    padding: "0.2rem 0.7rem",
    borderRadius: "12px",
    background: "#eee",
    fontSize: "0.8rem",
  },
  info: {
    padding: "0 2rem",
    marginTop: "0.5rem",
    color: "#555",
  },
  form: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  input: {
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  primaryBtn: {
    padding: "0.7rem 1rem",
    border: "none",
    borderRadius: "6px",
    background: "#007bff",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
    alignSelf: "flex-start",
  },
  successMsg: {
    marginTop: "0.7rem",
    color: "green",
  },
};

// frontend/src/components/AdminPanel.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function AdminPanel() {
  // Project form state
  const [projectForm, setProjectForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
  });

  // Client form state
  const [clientForm, setClientForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
    designation: "",
  });

  // Data from backend
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [message, setMessage] = useState("");

  // Load contacts + subscribers
  const loadAdminData = async () => {
    try {
      const [contactRes, subsRes] = await Promise.all([
        fetch(`${API_BASE}/contacts`),
        fetch(`${API_BASE}/subscribers`),
      ]);

      setContacts(await contactRes.json());
      setSubscribers(await subsRes.json());
    } catch (err) {
      console.error(err);
      setMessage("Failed to load admin data.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Add project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectForm),
    });

    if (res.ok) {
      setMessage("Project added successfully!");
      setProjectForm({ imageUrl: "", name: "", description: "" });
    } else {
      setMessage("Failed to add project.");
    }
  };

  // Add client
  const handleAddClient = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`${API_BASE}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientForm),
    });

    if (res.ok) {
      setMessage("Client added successfully!");
      setClientForm({
        imageUrl: "",
        name: "",
        description: "",
        designation: "",
      });
    } else {
      setMessage("Failed to add client.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Panel</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* ADD PROJECT */}
      <section style={styles.section}>
        <h2>Add Project</h2>
        <form style={styles.form} onSubmit={handleAddProject}>
          <input
            style={styles.input}
            type="text"
            placeholder="Image URL"
            value={projectForm.imageUrl}
            onChange={(e) =>
              setProjectForm({ ...projectForm, imageUrl: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Project Name"
            value={projectForm.name}
            onChange={(e) =>
              setProjectForm({ ...projectForm, name: e.target.value })
            }
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
            required
          ></textarea>

          <button style={styles.btn}>Add Project</button>
        </form>
      </section>

      {/* ADD CLIENT */}
      <section style={styles.section}>
        <h2>Add Client</h2>
        <form style={styles.form} onSubmit={handleAddClient}>
          <input
            style={styles.input}
            type="text"
            placeholder="Image URL"
            value={clientForm.imageUrl}
            onChange={(e) =>
              setClientForm({ ...clientForm, imageUrl: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Client Name"
            value={clientForm.name}
            onChange={(e) =>
              setClientForm({ ...clientForm, name: e.target.value })
            }
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={clientForm.description}
            onChange={(e) =>
              setClientForm({ ...clientForm, description: e.target.value })
            }
            required
          ></textarea>
          <input
            style={styles.input}
            type="text"
            placeholder="Designation"
            value={clientForm.designation}
            onChange={(e) =>
              setClientForm({ ...clientForm, designation: e.target.value })
            }
            required
          />

          <button style={styles.btn}>Add Client</button>
        </form>
      </section>

      {/* CONTACT SUBMISSIONS */}
      <section style={styles.section}>
        <h2>Contact Submissions</h2>

        {contacts.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.fullName}</td>
                  <td>{c.email}</td>
                  <td>{c.mobile}</td>
                  <td>{c.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* SUBSCRIBERS */}
      <section style={styles.section}>
        <h2>Newsletter Subscribers</h2>

        {subscribers.length === 0 ? (
          <p>No subscribers yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id}>
                  <td>{s.email}</td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

const styles = {
  section: {
    marginTop: "2rem",
    padding: "1.5rem",
    border: "1px solid #eee",
    borderRadius: "8px",
    background: "#fafafa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    maxWidth: "400px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  btn: {
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

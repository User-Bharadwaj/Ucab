import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Alogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await API.post("/admin/login", formData);
      const token = response.data?.token;
      const admin = response.data?.data;

      if (!token || !admin) {
        throw new Error("Invalid admin login response from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(admin));
      setMessage("Admin login successful");
      setMessageType("success");
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Admin login failed. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)" }}
    >
      <div className="card shadow-lg p-5" style={{ width: "100%", maxWidth: "460px", borderRadius: "16px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#0d6efd" }}>Admin Login</h2>
          <p className="text-muted mb-0">Sign in to manage cabs, users, and bookings</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {message ? (
            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mb-4`} role="alert">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Admin Login"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          User login? <Link to="/login" className="fw-semibold text-success">Go here</Link>
        </p>
      </div>
    </div>
  );
}

export default Alogin;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await API.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setMessage("Login successful");
      navigate("/uhome");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="card shadow-lg p-5" 
           style={{
             width: "100%",
             maxWidth: "420px",
             borderRadius: "16px"
           }}>
        
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#0d6efd" }}>User Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              name="email"
              className="form-control form-control-lg" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
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
            <div className="alert alert-info mb-4" role="alert">
              {message}
            </div>
          ) : null}

          <button 
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-4"
            disabled={isSubmitting}
            style={{ backgroundColor: "#0d6efd", border: "none" }}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-success fw-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
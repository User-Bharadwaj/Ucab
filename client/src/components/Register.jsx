import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await API.post("/users/register", formData);

      setMessage(response.data?.message || "Registration successful.");
      setMessageType("success");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";

      setMessage(errorMessage);
      setMessageType("error");
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
          <h2 className="fw-bold" style={{ color: "#0d6efd" }}>User Registration</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              name="name"
              className="form-control form-control-lg" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <div
              className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mb-4`}
              role="alert"
            >
              {message}
            </div>
          ) : null}

          <button 
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-4"
            disabled={isSubmitting}
            style={{ backgroundColor: "#0d6efd", border: "none" }}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-success fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
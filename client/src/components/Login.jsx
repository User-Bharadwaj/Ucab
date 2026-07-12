import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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
      const response = await API.post("/users/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });


      const token = response.data?.token;
      const user = response.data?.data;


      if (!token || !user) {
        throw new Error("Invalid login response");
      }


      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));


      setMessage("Login successful");
      setMessageType("success");


      setTimeout(() => {
        navigate("/uhome");
      }, 700);


    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );

      setMessageType("error");

    } finally {

      setIsSubmitting(false);

    }
  };


  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg,#0d6efd,#198754)",
        padding: "20px",
      }}
    >

      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "430px",
          borderRadius: "20px",
        }}
      >

        <div className="text-center mb-4">

          <h1
            className="fw-bold"
            style={{
              color:"#0d6efd"
            }}
          >
            UCab
          </h1>

          <h3>
            User Login
          </h3>

          <p className="text-muted">
            Login to book your ride
          </p>

        </div>


        <form onSubmit={handleSubmit}>


          <div className="mb-3">

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



          <div className="mb-3 position-relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />


            <button
              type="button"
              className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>


          </div>



          {message && (

            <div
              className={`alert ${
                messageType === "success"
                ? "alert-success"
                : "alert-danger"
              }`}
            >
              {message}
            </div>

          )}



          <button
            className="btn btn-primary btn-lg w-100"
            disabled={isSubmitting}
          >

            {
              isSubmitting
              ? "Logging in..."
              : "Login"
            }

          </button>


        </form>



        <p className="text-center mt-4 mb-0">

          Don't have an account?

          <Link
            to="/register"
            className="text-success fw-bold ms-2"
          >
            Register
          </Link>

        </p>



        <Link
          to="/"
          className="text-center mt-3 text-decoration-none"
        >
          ← Back to Home
        </Link>


      </div>

    </div>
  );
}

export default Login;
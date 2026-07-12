import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const name = formData.name.trim();
      const email = formData.email.trim().toLowerCase();


      if (name.length < 2) {
        throw new Error("Please enter a valid name");
      }


      if (formData.password.length < 6) {
        throw new Error("Password must contain minimum 6 characters");
      }


      const response = await API.post("/users/register", {

        fullName: name,
        name: name,
        email: email,
        password: formData.password,

      });



      setMessage(
        response.data?.message || "Registration successful"
      );

      setMessageType("success");


      setTimeout(() => {
        navigate("/login");
      }, 1000);



    } catch(error) {

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
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
        padding:"20px"
      }}
    >


      <div
        className="card shadow-lg p-5"
        style={{
          width:"100%",
          maxWidth:"450px",
          borderRadius:"20px"
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
            Create Account
          </h3>


          <p className="text-muted">
            Register to start booking cabs
          </p>


        </div>



        <form onSubmit={handleSubmit}>


          <div className="mb-3">

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
            className="btn btn-success btn-lg w-100"
            disabled={isSubmitting}
          >

            {
              isSubmitting
              ? "Creating Account..."
              : "Register"
            }

          </button>



        </form>




        <p className="text-center mt-4 mb-0">

          Already have an account?


          <Link
            to="/login"
            className="text-primary fw-bold ms-2"
          >
            Login
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

export default Register;
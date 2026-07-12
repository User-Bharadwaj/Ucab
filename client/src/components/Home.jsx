import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          background: "rgba(255,255,255,0.95)",
          maxWidth: "550px",
          width: "100%",
        }}
      >

        <h1
          className="fw-bold mb-3"
          style={{
            color: "#0d6efd",
            fontSize: "55px",
          }}
        >
          UCab
        </h1>

        <h3 className="mb-3 text-success">
          Cab Booking Management System
        </h3>

        <p className="text-muted mb-4">
          Book your ride easily with secure and reliable cab services.
        </p>


        <div className="d-grid gap-3">

          <Link to="/login">
            <button className="btn btn-primary btn-lg w-100 rounded-3">
              User Login
            </button>
          </Link>


          <Link to="/register">
            <button className="btn btn-success btn-lg w-100 rounded-3">
              User Register
            </button>
          </Link>


          <Link to="/alogin">
            <button className="btn btn-dark btn-lg w-100 rounded-3">
              Admin Login
            </button>
          </Link>

        </div>


        <hr className="my-4" />


        <div className="row text-center">

          <div className="col-4">
            <h5>🚕</h5>
            <small>Easy Booking</small>
          </div>

          <div className="col-4">
            <h5>🔒</h5>
            <small>Secure Login</small>
          </div>

          <div className="col-4">
            <h5>📍</h5>
            <small>Multiple Cabs</small>
          </div>

        </div>


        <p className="mt-4 mb-0 text-muted">
          © 2026 UCab | MERN Stack Internship Project
        </p>

      </div>
    </div>
  );
}

export default Home;
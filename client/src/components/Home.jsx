import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
           fontFamily: "'Poppins', 'Segoe UI', sans-serif"
         }}>
      
      <div className="text-center p-5 rounded-4 shadow-lg" 
           style={{
             background: "rgba(255, 255, 255, 0.95)",
             color: "#333",
             maxWidth: "480px",
             width: "90%"
           }}>
        
        <h1 className="display-1 fw-bold mb-2" style={{ color: "#0d6efd" }}>
          CAB BOOKING
        </h1>
        
        <h3 className="mb-5 fs-4" style={{ color: "#198754" }}>
          Book Cabs Easily
        </h3>

        <div className="d-flex justify-content-center gap-4">
          <Link to="/login">
            <button className="btn btn-primary btn-lg px-5 py-3 fw-semibold rounded-3">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="btn btn-outline-success btn-lg px-5 py-3 fw-semibold rounded-3">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
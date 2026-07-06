import { Link } from "react-router-dom";
import Unav from "./Unav";   // Make sure the path is correct

function Uhome() {
  return (
    <>
      <Unav />   {/* Navigation Bar */}

      <div className="min-vh-100 d-flex align-items-center justify-content-center"
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
             marginTop: "-56px"   // Adjust for navbar height
           }}>
        
        <div className="card shadow-lg p-5 text-center" 
             style={{
               width: "100%",
               maxWidth: "520px",
               borderRadius: "16px"
             }}>
          
          <h1 className="display-4 fw-bold mb-4" style={{ color: "#0d6efd" }}>
            Welcome User 👋
          </h1>
          
          <p className="lead mb-5 text-muted">
            Manage your cab bookings easily
          </p>

          <div className="d-grid gap-3">
            <Link to="/cabs">
              <button className="btn btn-primary btn-lg py-3 fw-semibold">
                View Available Cabs
              </button>
            </Link>

            <Link to="/mybookings">
              <button className="btn btn-outline-success btn-lg py-3 fw-semibold">
                My Bookings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Uhome;
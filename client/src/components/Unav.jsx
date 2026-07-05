import { Link } from "react-router-dom";

function Unav() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm" 
         style={{
           background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
           padding: "15px 0"
         }}>
      
      <div className="container">
        <Link to="/uhome" className="navbar-brand text-white fw-bold fs-3">
          CAB BOOKING
        </Link>

        <div className="d-flex gap-4">
          <Link to="/uhome" className="nav-link text-white fw-medium fs-5">
            Home
          </Link>
          
          <Link to="/cabs" className="nav-link text-white fw-medium fs-5">
            Available Cabs
          </Link>
          
          <Link to="/mybookings" className="nav-link text-white fw-medium fs-5">
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Unav;
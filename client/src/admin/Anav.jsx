import { Link } from "react-router-dom";

function Anav() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm" 
         style={{
           background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
           padding: "15px 0"
         }}>
      
      <div className="container">
        <Link to="/admin/home" className="navbar-brand text-white fw-bold fs-3">
          ADMIN PANEL
        </Link>

        <div className="d-flex gap-4 flex-wrap">
          <Link to="/ahome" className="nav-link text-white fw-medium">
            Dashboard
          </Link>
          
          <Link to="/users" className="nav-link text-white fw-medium">
            Users
          </Link>
          
          <Link to="/bookings" className="nav-link text-white fw-medium">
            Bookings
          </Link>
          
          <Link to="/cabs" className="nav-link text-white fw-medium">
            Cabs
          </Link>
          
          <Link to="/addcar" className="nav-link text-white fw-medium">
            Add Cab
          </Link>

          <Link to="/login" className="nav-link text-danger fw-medium">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Anav;
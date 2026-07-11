import { Link, useNavigate } from "react-router-dom";

function Anav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/alogin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/admin/dashboard">UCab Admin</Link>
      <div className="navbar-nav ms-auto gap-2">
        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/admin/cabs">Cabs</Link>
        <Link className="nav-link" to="/admin/add-cab">Add Cab</Link>
        <Link className="nav-link" to="/admin/users">Users</Link>
        <Link className="nav-link" to="/admin/bookings">Bookings</Link>
        <button type="button" className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Anav;
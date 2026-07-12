import { Link, useNavigate } from "react-router-dom";

function Unav() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background:
        "linear-gradient(135deg,#0d6efd,#198754)",
        padding:"15px 0"
      }}
    >

      <div className="container">


        <Link
          to="/uhome"
          className="navbar-brand text-white fw-bold fs-3"
        >
          🚕 UCab
        </Link>



        <div className="d-flex align-items-center gap-4">


          <Link
            to="/uhome"
            className="nav-link text-white fw-semibold"
          >
            Home
          </Link>



          <Link
            to="/cabs"
            className="nav-link text-white fw-semibold"
          >
            Available Cabs
          </Link>



          <Link
            to="/mybookings"
            className="nav-link text-white fw-semibold"
          >
            My Bookings
          </Link>



          <Link
            to="/profile"
            className="nav-link text-white fw-semibold"
          >
            Profile
          </Link>



          <span className="text-white fw-semibold">
            {user.name || user.fullName || "User"}
          </span>



          <button
            className="btn btn-light btn-sm fw-bold"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>


      </div>


    </nav>

  );
}


export default Unav;
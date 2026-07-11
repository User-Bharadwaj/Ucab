import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Anav from "./Anav";

function Ahome() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, cars: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await API.get("/admin/dashboard");
        setStats(response.data?.data || { users: 0, bookings: 0, cars: 0 });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold">Admin Dashboard</h1>
          <p className="text-muted mb-0">Overview of current platform activity.</p>
        </div>

        {loading ? (
          <div className="alert alert-info">Loading dashboard...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100"><div className="card-body"><h6 className="text-muted">Users</h6><h2 className="fw-bold">{stats.users}</h2></div></div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100"><div className="card-body"><h6 className="text-muted">Bookings</h6><h2 className="fw-bold">{stats.bookings}</h2></div></div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100"><div className="card-body"><h6 className="text-muted">Cars</h6><h2 className="fw-bold">{stats.cars}</h2></div></div>
            </div>
          </div>
        )}

        <div className="row g-3 mt-4">
          <div className="col-md-3"><Link className="btn btn-primary w-100" to="/admin/cabs">Manage Cabs</Link></div>
          <div className="col-md-3"><Link className="btn btn-outline-primary w-100" to="/admin/add-cab">Add Cab</Link></div>
          <div className="col-md-3"><Link className="btn btn-success w-100" to="/admin/users">View Users</Link></div>
          <div className="col-md-3"><Link className="btn btn-outline-success w-100" to="/admin/bookings">View Bookings</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Ahome;
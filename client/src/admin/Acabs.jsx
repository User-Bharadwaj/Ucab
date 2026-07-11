import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Anav from "./Anav";

function Acabs() {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const loadCabs = async () => {
    try {
      const response = await API.get("/cars");
      setCabs(response.data?.data || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load cabs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCabs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cab?")) {
      return;
    }

    try {
      await API.delete(`/cars/${id}`);
      setActionMessage("Cab deleted successfully.");
      loadCabs();
    } catch (requestError) {
      setActionMessage(requestError.response?.data?.message || "Unable to delete cab.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Manage Cabs</h1>
            <p className="text-muted mb-0">Edit or remove cars currently available in the system.</p>
          </div>
          <Link to="/admin/add-cab" className="btn btn-primary">Add Cab</Link>
        </div>

        {actionMessage ? <div className="alert alert-info">{actionMessage}</div> : null}
        {loading ? (
          <div className="alert alert-info">Loading cabs...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cabs.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-4">No cabs found.</td></tr>
                ) : cabs.map((cab) => (
                  <tr key={cab._id}>
                    <td>{cab.carName}</td>
                    <td>{cab.carModel}</td>
                    <td>{cab.category}</td>
                    <td>₹{cab.pricePerKm}</td>
                    <td>{cab.availability ? "Yes" : "No"}</td>
                    <td className="d-flex gap-2">
                      <Link to={`/admin/edit-cab/${cab._id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cab._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Acabs;
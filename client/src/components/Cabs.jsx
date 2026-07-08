import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Cabs() {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await API.get("/cars");
        setCabs(response.data.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  return (
    <div className="min-vh-100 py-5" 
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white">Available Cabs</h2>
          <p className="text-white-50 fs-5">Choose your ride</p>
        </div>

        {loading ? (
          <div className="text-center text-white fs-4">Loading available cars...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="row g-4">
          {cabs.map((cab) => (
            <div className="col-md-6 col-lg-4" key={cab._id}>
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold text-primary">{cab.carName}</h3>
                  
                  <div className="my-4">
                    <h4 className="text-success fw-bold">₹{cab.pricePerKm}</h4>
                    <small className="text-muted">per km</small>
                  </div>

                  <Link to={`/bookcab/${cab._id}`} className="text-decoration-none">
                    <button className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cabs;
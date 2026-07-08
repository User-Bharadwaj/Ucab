import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

function BookCab() {
  const { id } = useParams();
  const [cab, setCab] = useState(null);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    totalFare: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCab = async () => {
      try {
        const response = await API.get(`/cars/${id}`);
        setCab(response.data.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to load cab details.");
      }
    };

    loadCab();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await API.post("/bookings", {
        carId: id,
        ...formData,
        totalFare: Number(formData.totalFare),
      });

      setMessage(response.data?.message || "Booking created successfully.");
      setFormData({ pickupLocation: "", dropLocation: "", pickupDate: "", totalFare: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="card shadow-lg p-5 text-center" 
           style={{
             width: "100%",
             maxWidth: "500px",
             borderRadius: "16px"
           }}>
        
        <h2 className="fw-bold mb-4" style={{ color: "#0d6efd" }}>Confirm Booking</h2>

        {cab ? (
          <div className="mb-4">
            <h4 className="mb-3">{cab.carName}</h4>
            <h2 className="text-success fw-bold">₹{cab.pricePerKm} / km</h2>
            <p className="text-muted">Cab ID: <strong>{id}</strong></p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="text-start mb-4">
          <div className="mb-3">
            <input type="text" name="pickupLocation" className="form-control" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="dropLocation" className="form-control" placeholder="Drop Location" value={formData.dropLocation} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="date" name="pickupDate" className="form-control" value={formData.pickupDate} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="totalFare" className="form-control" placeholder="Total Fare" value={formData.totalFare} onChange={handleChange} required />
          </div>

          {message ? <div className="alert alert-info">{message}</div> : null}

          <div className="d-grid gap-3">
            <button 
              type="submit"
              className="btn btn-success btn-lg py-3 fw-semibold"
              style={{ fontSize: "1.1rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>

        <div className="d-grid gap-3">
          <Link to="/cabs">
            <button className="btn btn-outline-light btn-lg py-3 fw-semibold">
              Back to Cabs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCab;
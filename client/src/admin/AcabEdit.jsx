import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Anav from "./Anav";

function AcabEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCab = async () => {
      try {
        const response = await API.get(`/cars/${id}`);
        setFormData({
          ...response.data?.data,
          seats: response.data?.data?.seats ?? "",
          pricePerKm: response.data?.data?.pricePerKm ?? "",
        });
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to load cab details.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    loadCab();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      await API.put(`/cars/${id}`, {
        ...formData,
        seats: Number(formData.seats),
        pricePerKm: Number(formData.pricePerKm),
      });

      setMessage("Cab updated successfully.");
      setMessageType("success");
      navigate("/admin/cabs");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update cab.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4">Edit Cab</h1>

        {loading ? (
          <div className="alert alert-info">Loading cab...</div>
        ) : message && messageType === "error" ? (
          <div className="alert alert-danger">{message}</div>
        ) : formData ? (
          <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6"><input className="form-control" name="carName" value={formData.carName || ""} onChange={handleChange} required /></div>
              <div className="col-md-6"><input className="form-control" name="carModel" value={formData.carModel || ""} onChange={handleChange} required /></div>
              <div className="col-md-6"><input className="form-control" name="vehicleNumber" value={formData.vehicleNumber || ""} onChange={handleChange} required /></div>
              <div className="col-md-6">
                <select className="form-select" name="category" value={formData.category || "Mini"} onChange={handleChange} required>
                  <option>Mini</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Luxury</option>
                </select>
              </div>
              <div className="col-md-6"><input type="number" className="form-control" name="seats" value={formData.seats} onChange={handleChange} required /></div>
              <div className="col-md-6"><input type="number" className="form-control" name="pricePerKm" value={formData.pricePerKm} onChange={handleChange} required /></div>
              <div className="col-md-6"><input className="form-control" name="driverName" value={formData.driverName || ""} onChange={handleChange} required /></div>
              <div className="col-md-6"><input className="form-control" name="driverPhone" value={formData.driverPhone || ""} onChange={handleChange} required /></div>
              <div className="col-12"><input className="form-control" name="image" value={formData.image || ""} onChange={handleChange} /></div>
              <div className="col-12 form-check px-3">
                <input className="form-check-input" type="checkbox" name="availability" checked={Boolean(formData.availability)} onChange={handleChange} id="editCabAvailability" />
                <label className="form-check-label" htmlFor="editCabAvailability">Available</label>
              </div>
            </div>

            {message ? <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mt-4 mb-0`}>{message}</div> : null}

            <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Cab"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default AcabEdit;
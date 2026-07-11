import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Anav from "./Anav";

const initialFormState = {
  carName: "",
  carModel: "",
  vehicleNumber: "",
  category: "Mini",
  seats: "",
  pricePerKm: "",
  image: "",
  driverName: "",
  driverPhone: "",
  availability: true,
};

function Addcar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await API.post("/cars", {
        ...formData,
        seats: Number(formData.seats),
        pricePerKm: Number(formData.pricePerKm),
      });

      setMessage("Cab added successfully.");
      setMessageType("success");
      setFormData(initialFormState);
      navigate("/admin/cabs");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to add cab.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4">Add Cab</h1>
        <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6"><input className="form-control" name="carName" placeholder="Car Name" value={formData.carName} onChange={handleChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} required /></div>
            <div className="col-md-6">
              <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                <option>Mini</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Luxury</option>
              </select>
            </div>
            <div className="col-md-6"><input type="number" className="form-control" name="seats" placeholder="Seats" value={formData.seats} onChange={handleChange} required /></div>
            <div className="col-md-6"><input type="number" className="form-control" name="pricePerKm" placeholder="Price Per Km" value={formData.pricePerKm} onChange={handleChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="driverPhone" placeholder="Driver Phone" value={formData.driverPhone} onChange={handleChange} required /></div>
            <div className="col-12"><input className="form-control" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /></div>
            <div className="col-12 form-check px-3">
              <input className="form-check-input" type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} id="cabAvailability" />
              <label className="form-check-label" htmlFor="cabAvailability">Available</label>
            </div>
          </div>

          {message ? <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mt-4 mb-0`}>{message}</div> : null}

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Cab"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addcar;
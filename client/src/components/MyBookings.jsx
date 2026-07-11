import { useEffect, useState } from "react";
import API from "../../services/api";
import Unav from "./Unav";

const bookingBadgeClass = (status) => {
  if (status === "Cancelled") return "bg-danger";
  if (status === "Completed") return "bg-success";
  if (status === "Confirmed" || status === "Started") return "bg-primary";
  return "bg-secondary";
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await API.get("/bookings/my");
        setBookings(response.data.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="min-vh-100 py-5" 
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      <Unav />
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white">My Bookings</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4">
                
                {loading ? (
                  <div className="text-center py-4">Loading bookings...</div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Cab</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">No bookings found.</td>
                      </tr>
                    ) : bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td><strong>{booking.car?.carName || "Cab"}</strong></td>
                        <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${bookingBadgeClass(booking.bookingStatus)} fs-6`}>
                            {booking.bookingStatus}
                          </span>
                        </td>
                        <td>₹{booking.totalFare}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
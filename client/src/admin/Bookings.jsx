import { useEffect, useState } from "react";
import API from "../../services/api";
import Anav from "./Anav";

const bookingStatuses = ["Pending", "Confirmed", "Started", "Completed", "Cancelled"];

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadBookings = async () => {
    try {
      const response = await API.get("/admin/bookings");
      setBookings(response.data?.data || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await API.patch(`/bookings/${bookingId}/status`, { status });
      setMessage("Booking status updated successfully.");
      loadBookings();
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || "Unable to update booking status.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5">
        <h1 className="fw-bold mb-4">Bookings</h1>
        {message ? <div className="alert alert-info">{message}</div> : null}
        {loading ? (
          <div className="alert alert-info">Loading bookings...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Cab</th>
                  <th>Date</th>
                  <th>Fare</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4">No bookings found.</td></tr>
                ) : bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.fullName || booking.user?.email || "User"}</td>
                    <td>{booking.car?.carName || "Cab"}</td>
                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td>₹{booking.totalFare}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={booking.bookingStatus}
                        onChange={(event) => handleStatusChange(booking._id, event.target.value)}
                      >
                        {bookingStatuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
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

export default Bookings;
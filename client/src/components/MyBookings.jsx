function MyBookings() {
  return (
    <div className="min-vh-100 py-5" 
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white">My Bookings</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4">
                
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
                    <tr>
                      <td><strong>Swift Dzire</strong></td>
                      <td>10-07-2026</td>
                      <td>
                        <span className="badge bg-success fs-6">Booked</span>
                      </td>
                      <td>₹500</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
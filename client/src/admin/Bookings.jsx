import Anav from "./Anav";

function Bookings() {
  return (
    <>
      <Anav />

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <h1 className="text-white fw-bold mb-4">All Bookings</h1>

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>User</th>
                    <th>Cab</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Praveen</strong></td>
                    <td>Swift</td>
                    <td>12-07-2026</td>
                    <td>
                      <span className="badge bg-success">Confirmed</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger">
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
import Anav from "./Anav";

function Ahome() {
  return (
    <>
      <Anav />

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-white">Admin Dashboard</h1>
            <p className="text-white-50 fs-4">Overview of your cab booking system</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-lg text-center p-4 border-0">
                <h5 className="text-muted">Total Users</h5>
                <h2 className="fw-bold text-primary">20</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-lg text-center p-4 border-0">
                <h5 className="text-muted">Total Cabs</h5>
                <h2 className="fw-bold text-success">10</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-lg text-center p-4 border-0">
                <h5 className="text-muted">Total Bookings</h5>
                <h2 className="fw-bold text-info">30</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ahome;
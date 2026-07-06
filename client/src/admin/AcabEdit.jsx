import { useParams, Link } from "react-router-dom";

function AcabEdit() {
  const { id } = useParams();

  return (
    <div className="min-vh-100 py-5" 
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg p-5" style={{ borderRadius: "16px" }}>
              
              <div className="text-center mb-4">
                <h1 className="fw-bold" style={{ color: "#0d6efd" }}>Edit Cab</h1>
                <h5 className="text-muted">Cab ID: <strong>{id}</strong></h5>
              </div>

              <form>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Model Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Enter Cab Model" 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Number of Seats</label>
                  <input 
                    type="number" 
                    className="form-control form-control-lg" 
                    placeholder="Seats" 
                  />
                </div>

                <div className="d-grid gap-3">
                  <button 
                    type="submit"
                    className="btn btn-success btn-lg fw-semibold"
                  >
                    Update Cab
                  </button>

                  <Link to="/admin/cabs">
                    <button type="button" className="btn btn-outline-secondary btn-lg">
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcabEdit;
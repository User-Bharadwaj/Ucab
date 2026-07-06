import Anav from "./Anav";

function AddCar() {
  return (
    <>
      <Anav />

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-lg p-5" style={{ borderRadius: "16px" }}>
                
                <div className="text-center mb-5">
                  <h1 className="fw-bold" style={{ color: "#0d6efd" }}>Add New Cab</h1>
                </div>

                <form>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Cab Model</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      placeholder="Enter Cab Model (e.g. Swift Dzire)" 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Plate Number</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      placeholder="e.g. MH01 AB 1234" 
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

                  <div className="mb-5">
                    <label className="form-label fw-semibold">Price per KM (₹)</label>
                    <input 
                      type="number" 
                      className="form-control form-control-lg" 
                      placeholder="Price per KM" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn btn-success btn-lg w-100 fw-semibold py-3"
                  >
                    Add Cab
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCar;
import { useParams, Link } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();

  return (
    <>
      <Anav />   {/* Make sure to import Anav */}

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-lg p-5" style={{ borderRadius: "16px" }}>
                
                <div className="text-center mb-4">
                  <h1 className="fw-bold" style={{ color: "#0d6efd" }}>Edit User</h1>
                  <h5 className="text-muted">User ID: <strong>{id}</strong></h5>
                </div>

                <form>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      placeholder="Enter User Name" 
                    />
                  </div>

                  <div className="mb-5">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="Enter Email" 
                    />
                  </div>

                  <div className="d-grid gap-3">
                    <button 
                      type="submit"
                      className="btn btn-success btn-lg fw-semibold"
                    >
                      Update User
                    </button>

                    <Link to="/admin/users">
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
    </>
  );
}

export default UserEdit;
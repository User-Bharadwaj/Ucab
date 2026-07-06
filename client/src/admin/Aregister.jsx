import { Link } from "react-router-dom";

function Aregister() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="card shadow-lg p-5" 
           style={{
             width: "100%",
             maxWidth: "420px",
             borderRadius: "16px"
           }}>
        
        <div className="text-center mb-4">
          <h1 className="fw-bold" style={{ color: "#0d6efd" }}>Admin Register</h1>
        </div>

        <form>
          <div className="mb-4">
            <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Full Name" 
              required
            />
          </div>

          <div className="mb-4">
            <input 
              type="email" 
              className="form-control form-control-lg" 
              placeholder="Admin Email" 
              required
            />
          </div>

          <div className="mb-4">
            <input 
              type="password" 
              className="form-control form-control-lg" 
              placeholder="Password" 
              required
            />
          </div>

          <button 
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-4 py-3"
          >
            Register as Admin
          </button>
        </form>

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-success fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Aregister;
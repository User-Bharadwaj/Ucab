import { useParams, Link } from "react-router-dom";

function BookCab() {
  const { id } = useParams();

  const cabDetails = {
    1: { name: "Swift Dzire", price: 500 },
    2: { name: "Innova", price: 900 },
    3: { name: "Ertiga", price: 700 }
  };

  const cab = cabDetails[id] || { name: "Unknown Cab", price: 0 };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="card shadow-lg p-5 text-center" 
           style={{
             width: "100%",
             maxWidth: "500px",
             borderRadius: "16px"
           }}>
        
        <h2 className="fw-bold mb-4" style={{ color: "#0d6efd" }}>Confirm Booking</h2>

        <div className="mb-5">
          <h4 className="mb-3">{cab.name}</h4>
          <h2 className="text-success fw-bold">₹{cab.price} / day</h2>
          <p className="text-muted">Cab ID: <strong>{id}</strong></p>
        </div>

        <div className="d-grid gap-3">
          <button 
            className="btn btn-success btn-lg py-3 fw-semibold"
            style={{ fontSize: "1.1rem" }}
          >
            Confirm Booking
          </button>

          <Link to="/cabs">
            <button className="btn btn-outline-light btn-lg py-3 fw-semibold">
              Back to Cabs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCab;
import { Link } from "react-router-dom";

function Cabs() {
  const cabs = [
    { id: 1, name: "Swift Dzire", price: 500 },
    { id: 2, name: "Innova", price: 900 },
    { id: 3, name: "Ertiga", price: 700 }
  ];

  return (
    <div className="min-vh-100 py-5" 
         style={{
           background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
         }}>
      
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white">Available Cabs</h2>
          <p className="text-white-50 fs-5">Choose your ride</p>
        </div>

        <div className="row g-4">
          {cabs.map((cab) => (
            <div className="col-md-6 col-lg-4" key={cab.id}>
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold text-primary">{cab.name}</h3>
                  
                  <div className="my-4">
                    <h4 className="text-success fw-bold">₹{cab.price}</h4>
                    <small className="text-muted">per day</small>
                  </div>

                  <Link to={`/bookcab/${cab.id}`} className="text-decoration-none">
                    <button className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cabs;
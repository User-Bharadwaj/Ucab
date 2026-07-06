import { Link } from "react-router-dom";
import Anav from "./Anav";

function Acabs() {
  return (
    <>
      <Anav />

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-white fw-bold">Cab List</h1>
            <Link to="/admin/addcab" className="btn btn-light btn-lg">
              + Add New Cab
            </Link>
          </div>

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Model</th>
                    <th>Seats</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Swift</strong></td>
                    <td>4</td>
                    <td className="text-center">
                      <Link to="/admin/cabedit/1">
                        <button className="btn btn-warning btn-sm px-4">
                          Edit
                        </button>
                      </Link>
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

export default Acabs;
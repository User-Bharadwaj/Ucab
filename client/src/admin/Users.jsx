import Anav from "./Anav";
import { Link } from "react-router-dom";

function Users() {
  return (
    <>
      <Anav />

      <div className="min-vh-100 py-5" 
           style={{
             background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)"
           }}>
        
        <div className="container">
          <h1 className="text-white fw-bold mb-4">Users Management</h1>

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Praveen</strong></td>
                    <td>abc@gmail.com</td>
                    <td className="text-center">
                      <Link to="/useredit/1">
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

export default Users;
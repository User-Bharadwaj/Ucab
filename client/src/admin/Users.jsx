import { useEffect, useState } from "react";
import API from "../../services/api";
import Anav from "./Anav";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await API.get("/admin/users");
        setUsers(response.data?.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Anav />
      <div className="container py-5">
        <h1 className="fw-bold mb-4">Users</h1>
        {loading ? (
          <div className="alert alert-info">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4">No users found.</td></tr>
                ) : users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
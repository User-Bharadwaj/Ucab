import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  let user = null;

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
    }
  }

  if (!token) {
    const loginPath = allowedRoles?.includes("admin") ? "/alogin" : "/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (allowedRoles && !user?.role) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const loginPath = allowedRoles.includes("admin") ? "/alogin" : "/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/uhome" replace />;
  }

  return children;
}

export default ProtectedRoute;
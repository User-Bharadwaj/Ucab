import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Uhome from "./components/Uhome";
import Cabs from "./components/Cabs";
import BookCab from "./components/BookCab";
import MyBookings from "./components/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";

import Alogin from "./admin/Alogin";
import Ahome from "./admin/Ahome";
import Anav from "./admin/Anav";
import Acabs from "./admin/Acabs";
import Addcar from "./admin/Addcar";
import AcabEdit from "./admin/AcabEdit";
import Users from "./admin/Users";
import Bookings from "./admin/Bookings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/uhome"
          element={
            <ProtectedRoute>
              <Uhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cabs"
          element={
            <ProtectedRoute>
              <Cabs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookcab/:id"
          element={
            <ProtectedRoute>
              <BookCab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route path="/alogin" element={<Alogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Ahome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/nav"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Anav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cabs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Acabs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-cab"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Addcar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-cab/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AcabEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Bookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
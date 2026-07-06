import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Uhome from "./components/Uhome";
import Cabs from "./components/Cabs";
import BookCab from "./components/BookCab";
import MyBookings from "./components/MyBookings";

import Alogin from "./admin/Alogin";
import Aregister from "./admin/Aregister";
import Ahome from "./admin/Ahome";
import Users from "./admin/Users";
import UserEdit from "./admin/UserEdit";
import Bookings from "./admin/Bookings";
import Acabs from "./admin/Acabs";
import AcabEdit from "./admin/AcabEdit";
import AddCar from "./admin/AddCar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uhome" element={<Uhome />} />
        <Route path="/cabs" element={<Cabs />} />
        <Route path="/bookcab/:id" element={<BookCab />} />
        <Route path="/mybookings" element={<MyBookings />} />

        <Route path="/alogin" element={<Alogin />} />
        <Route path="/aregister" element={<Aregister />} />
        <Route path="/ahome" element={<Ahome />} />
        <Route path="/users" element={<Users />} />
        <Route path="/useredit/:id" element={<UserEdit />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/acabs" element={<Acabs />} />
        <Route path="/acabedit/:id" element={<AcabEdit />} />
        <Route path="/addcar" element={<AddCar />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
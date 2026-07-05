import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Uhome from "./components/Uhome";
import Cabs from "./components/Cabs";
import BookCab from "./components/BookCab";
import MyBookings from "./components/MyBookings";

import Alogin from "./admin/Alogin";


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
import CustomerRoutes from "./Layouts/Customer/CustomerRoutes";
import FarmerRoutes from "./Layouts/Farmer/FarmerRoutes";
// import GoogleTranslate from "./GoogleTranslate";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoutes />} />
          <Route exact path="/farmer/*" element={<FarmerRoutes />} />
          <Route exact path="/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
      {/* <GoogleTranslate /> */}
    </div>
  );
}

export default App;

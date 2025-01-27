import { Navigate, Route, Routes, useNavigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import TransactionHistory from "./pages/TransactionHistory";
import UpdateProfile from "./pages/UpdateProfile";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ServiceTopUp from "./pages/ServiceTopUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/auth/login"} />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route
            path="/profile"
            element={<UpdateProfile onLogout={handleLogout} />}
          />
          <Route path="/services/:service_code" element={<ServiceTopUp />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/auth/login"} />}
        />
        <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/auth/register" element={<Register />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/auth/login"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

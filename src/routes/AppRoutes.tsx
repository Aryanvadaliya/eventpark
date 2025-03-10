import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import EventPage from "../pages/EventPage";
import { ErrorComponent } from "../Components.tsx/ErrorBoundry";
import CategoryPage from "../pages/CategoryPage";
import Logout from "../pages/Logout";
import LoginPage from "../pages/LoginPage";
import AuthLayout from "../Components.tsx/AuthLayout";
import SignupPage from "../pages/SignupPage";
import MasterLayout from "../Components.tsx/MasterLayout";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutPage from "../pages/CheckoutPage";
import Dashboard from "../pages/admin/Dashboard";
import { ReduxState } from "../utils/types";
import PaymentPage from "../pages/PaymentPage";
import { useAuth } from "../hooks/useAuth";
import TicketPage from "../pages/TicketPage";
import { RolesAuth } from "../Components.tsx/RolesAuth";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const userId = JSON.parse(localStorage.getItem("userId")) || null
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [userId]);

  if (isLoading) {
    return <div></div>;
  }

  if (!userId) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return element;
};

export default function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route
          index
          element={
            currentUser?.role === "admin" ? <Dashboard /> : <LandingPage />
          }
        />
        <Route path="error/*" element={<ErrorComponent />} />

        <Route path="event/:id" element={<EventPage />} />
        <Route path="categories/:categoryName" element={<CategoryPage />} />
        <Route
          path="event/:id/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />
        <Route
          path="/my-tickets"
          element={<ProtectedRoute element={<TicketPage />} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoute element={<PaymentPage />} />}
        />
        <Route
          path="/dashboard"
          element={
            <RolesAuth roles={["admin"]}>
              <Dashboard />
            </RolesAuth>
          }
        />
      </Route>
      <Route path="/*" element={<ErrorComponent />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<AuthLayout />}>
        <Route path="auth/signup" element={<SignupPage />} />
        <Route path="auth/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

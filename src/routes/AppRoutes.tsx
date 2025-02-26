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
import {  ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaymentPage from "../pages/PaymentPage";
import Dashboard from "../pages/admin/Dashboard";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const user = useSelector((state: {auth: { user: any} }) => state.auth.user);
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return <div></div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return element;
};

type Role = string;

interface RolesAuthProps {
  children: ReactNode;
  roles?: Role[];
}
const RolesAuth: React.FC<RolesAuthProps> = ({ children, roles }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(roles?.some((role) => role.includes(user.role)))
    
    if (!roles?.some((role) => role.includes(user.role))) navigate("/error/404");
  }, []);

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="error/*" element={<ErrorComponent />} />

        <Route path="event/:id" element={<EventPage />} />
        <Route path="categories/:categoryName" element={<CategoryPage />} />
        <Route
          path="event/:id/payment"
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

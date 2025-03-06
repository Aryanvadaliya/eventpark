import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

type Role = string;

interface RolesAuthProps {
  children: ReactNode;
  roles?: Role[];
}
export const RolesAuth: React.FC<RolesAuthProps> = ({ children, roles }) => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!roles?.some((role) => role.includes(currentUser?.role)))
      navigate("/error/404");
  }, [currentUser]);

  return children;
};

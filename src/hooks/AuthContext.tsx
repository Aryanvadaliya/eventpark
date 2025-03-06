import React, {
  createContext,
  Dispatch,
  ReactEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAuth } from "../store/authSlice";
import { UserData } from "../utils/types";
interface AuthContextProps {
  currentUser?: UserData;
  setCurrentUser?: Dispatch<UserData>;
  userId?: string;
  setUserId?: Dispatch<string>;
  logout?: () => void;
}

// localStorage.clear()

const AuthContext = createContext<AuthContextProps>({});
export const useAuth = () => {
  return useContext(AuthContext);
};
export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState<string | null>(() => {
    try {
      const storedId = localStorage.getItem("userId");
      return storedId ? JSON.parse(storedId) : null;
    } catch (e) {
      console.error("Failed to parse userId from localStorage:", e);
      return null;
    }
  });
  const { data, fetchData } = useFetch({
    endpoint: `users/${userId}`,
    method: "GET",
    skip: !userId,
  });
  useEffect(() => {
    if (userId) {
      (async function get() {
        await fetchData();
      })();
    }
  }, [userId]);

  useEffect(() => {
    setCurrentUser(data ?? null);
  }, [data]);

  const logout = () => {
    setCurrentUser(undefined);
    setUserId(undefined);
    dispatch(removeAuth());
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setUserId,
        userId,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

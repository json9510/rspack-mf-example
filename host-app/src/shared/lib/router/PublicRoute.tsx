import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  clearSessionStorage,
  getSessionFromStorage,
} from "../utils/localStorage";
import { refreshToken, updateAccessToken, validateToken } from "../utils/token";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const location = useLocation();
  const session = getSessionFromStorage();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      // 1. No session data
      if (!session) {
        setIsAuth(false);
        setChecking(false);
        return;
      }

      // 2. Session data exists -> redirect to home
      if (validateToken(session.state.session.access_token)) {
        setIsAuth(true);
        setChecking(false);
        return;
      }

      // 3. Invalid token -> try refreshing
      if (session.state.session.access_token !== "") {
        try {
          const newSession = await refreshToken();
          if (newSession) {
            updateAccessToken(newSession);
            setIsAuth(true);
          }
        } catch (error) {
          console.warn("Error refreshing token:", error);
          clearSessionStorage();
          setIsAuth(false);
        } finally {
          setChecking(false);
        }
      } else {
        // 4. No token -> clear session
        clearSessionStorage();
        setIsAuth(false);
        setChecking(false);
      }
    };

    checkSession();
  }, [session]);

  if (checking) return <>Checking session...</>;

  if (isAuth) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
export default PublicRoute;

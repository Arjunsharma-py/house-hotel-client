import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userContext = useContext(UserContext);
  const location = useLocation();
  // console.log("Context: ", userContext.user);

  if (!userContext.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

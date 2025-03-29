import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

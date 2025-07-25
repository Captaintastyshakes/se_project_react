import { Navigate } from "react-router-dom";

function RouteProtector({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RouteProtector;

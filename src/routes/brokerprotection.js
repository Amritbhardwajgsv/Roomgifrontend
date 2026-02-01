import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`${process.env.API_URL}/api/user/me`, {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

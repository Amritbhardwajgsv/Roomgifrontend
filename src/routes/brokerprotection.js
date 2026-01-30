import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/me", {
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

  if (loading) return null; // or loader

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

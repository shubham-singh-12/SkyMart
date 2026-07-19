import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/authSlice";

// blocks pages that need login — bounces to /login if not signed in
export function ProtectedRoute() {
    const isAuth = useSelector(selectIsAuth);
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

// opposite — keeps logged-in users away from login/register pages
export function GuestRoute() {
    const isAuth = useSelector(selectIsAuth);
    return isAuth ? <Navigate to="/home" replace /> : <Outlet />;
}

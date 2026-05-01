import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { PublicLayout } from "./features/public/components/PublicLayout";

const Home = lazy(() => import("@/pages/public/Home"));
const Booking = lazy(() => import("@/pages/public/Booking"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shops/:shopId" element={<Booking />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

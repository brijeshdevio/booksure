import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

const Home = lazy(() => import("@/pages/public/Home"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

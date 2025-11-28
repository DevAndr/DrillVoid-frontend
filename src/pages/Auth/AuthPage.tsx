import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

import AuthLayout from "@/layouts/auth.tsx";

export const AuthPage = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<Spinner size="sm" />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  );
};

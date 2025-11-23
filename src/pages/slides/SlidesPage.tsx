import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";

export const SlidesPage = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <Suspense fallback={<Spinner size="sm" />}>
          <Outlet />
        </Suspense>
      </section>
    </DefaultLayout>
  );
};

import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CenteredLayout } from "@/layouts";

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => {
        setInterval(() => {
          setIsLoading(false);
          navigate("/app");
          resolve(1);
        }, 3000);
      });
    };

    load();
  }, []);

  return (
    <CenteredLayout>
      <div className="flex items-center flex-col gap-10">
        <h1 className="text-4xl text-balance font-bold">Drill Void</h1>
        {isLoading && <Spinner size="sm" />}
      </div>
    </CenteredLayout>
  );
};

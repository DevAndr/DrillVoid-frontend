import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import useGetInitDataTelegramApp from "@/modules/Auth/hooks/useGetInitDataTelegramApp.ts";
import { useAuth } from "@/api/auth/useAuth.ts";

const SignInPage = () => {
  const navigate = useNavigate();
  const initDataRaw = useGetInitDataTelegramApp();
  const { mutate: auth } = useAuth();

  const authHandler = () => {
    auth(
      { initData: initDataRaw },
      {
        onSuccess: () => {
          navigate("/app/slides/mine");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-2xl text-center">
        Добро пожаловать на проект Drill Void
      </h1>
      <Button color="primary" onPress={authHandler}>
        Войти
      </Button>

      <div>
        <NavLink to="/app/auth/signUp">Регистрация</NavLink>
      </div>
    </div>
  );
};

export default SignInPage;

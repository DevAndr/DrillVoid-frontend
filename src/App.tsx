import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SlidesPage } from "@/pages/slides/SlidesPage.tsx";
import PlanetPage from "@/pages/Planet/PlanetPage.tsx";
import { AuthPage } from "@/pages/Auth/AuthPage.tsx";
import SplashScreen from "@/pages/Splash/SplashScreen.tsx";
const MineSlide = lazy(() => import("@/pages/slides/MineSlide/MineSlide.tsx"));
const AlertsSlide = lazy(
  () => import("@/pages/slides/AlertsSlide/AlertsSlide.tsx"),
);
const TasksSlide = lazy(
  () => import("@/pages/slides/TasksSlide/TasksSlide.tsx"),
);
const UpgradeSlide = lazy(
  () => import("@/pages/slides/UpgradeSlide/UpgradeSlide.tsx"),
);
const ProfileSlide = lazy(
  () => import("@/pages/slides/ProfileSlide/ProfileSlide.tsx"),
);
const SignInPageLoadable = lazy(
  () => import("@/pages/Auth/SignIn/SignInPage.tsx"),
);
const SignUpPageLoadable = lazy(
  () => import("@/pages/Auth/SignUp/SignUpPage.tsx"),
);

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} path={"/"} />
      <Route element={<Navigate to="/app/slides/mine" />} path="/app" />

      <Route path={"app"}>
        <Route element={<SlidesPage />} path={"slides"}>
          <Route element={<AlertsSlide />} path={"notifications"} />
          <Route element={<TasksSlide />} path={"tasks"} />
          <Route element={<UpgradeSlide />} path={"upgrade"} />
          <Route element={<ProfileSlide />} path={"profile"} />
          <Route index element={<MineSlide />} path={"mine"} />
        </Route>

        <Route element={<AuthPage />} path={"auth/*"}>
          <Route element={<SignUpPageLoadable />} path={"signUp"} />
          <Route element={<SignInPageLoadable />} path={"signIn"} />
        </Route>

        <Route element={<PlanetPage />} path={"planet/:seed"} />
      </Route>
    </Routes>
  );
}

export default App;

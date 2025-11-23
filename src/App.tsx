import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SplashScreen } from "@/pages/Splash/SplashScreen.tsx";
import { SlidesPage } from "@/pages/slides/SlidesPage.tsx";
import PlanetPage from "@/pages/Planet/PlanetPage.tsx";
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

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} path={"/"} />
      <Route element={<Navigate to="/app/slides" />} path="/app" />
      <Route path={"/app/*"}>
        <Route element={<SlidesPage />} path={"slides"}>
          <Route element={<MineSlide />} path={"mine"} />
          <Route element={<AlertsSlide />} path={"notifications"} />
          <Route element={<TasksSlide />} path={"tasks"} />
          <Route element={<UpgradeSlide />} path={"upgrade"} />
          <Route element={<ProfileSlide />} path={"profile"} />
        </Route>

        <Route element={<PlanetPage />} path={"planet/:seed"} />
      </Route>
    </Routes>
  );
}

export default App;

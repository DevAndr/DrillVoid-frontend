import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SplashScreen } from "@/pages/Splash/SplashScreen.tsx";
import { SlidesPage } from "@/pages/Slides/SlidesPage.tsx";
const MineSlide = lazy(() => import("@/pages/Slides/MineSlide/MineSlide.tsx"));

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} path={"/"} />
      <Route element={<Navigate to="/app/slides" />} path="/app" />
      <Route path={"/app/*"}>
        <Route element={<SlidesPage />} path={"slides"}>
          <Route element={<MineSlide />} path={"mine"} />
          {/*<Route element={<AlertsSlide />} path={"notifications"} />*/}
          {/*<Route element={<TasksSlide />} path={"tasks"} />*/}
          {/*<Route element={<UpgradeSlide />} path={"upgrade"} />*/}
          {/*<Route element={<ProfileSlide />} path={"profile"} />*/}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

import { init, miniApp, retrieveLaunchParams } from "@telegram-apps/sdk";
import eruda from "eruda";

export const initializeTelegramSDK = async (debug: boolean) => {
  try {
    if (debug) eruda.init();

    init();

    const launchParams = retrieveLaunchParams();

    console.log({ launchParams });

    if (miniApp.ready.isAvailable()) {
      await miniApp.mount();
      miniApp.ready();
      miniApp.setHeaderColor("#000000");
      miniApp.setBackgroundColor("#000000");

      console.log("Mini App готово");
    } else console.log("Mini App не доступно");
  } catch (error) {
    console.error("Ошибка инициализации:", error);
  }
};

import { useLocation } from "react-router-dom";

const useGetInitDataTelegramApp = () => {
  // const launchParams = retrieveLaunchParams();
  const { hash } = useLocation();

  hash;

  //TODO: временно для отладки
  return "#tgWebAppData=user%3D%257B%2522id%2522%253A690817905%252C%2522first_name%2522%253A%2522%25D0%259D%25D0%25BE%25D1%2581%25D0%25B5%25D0%25BD%25D0%25BA%25D0%25BE%2520%25D0%2598%25D0%25BB%25D1%258C%25D1%258F%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522iam_now%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252FdL9i6cV-Sqw8TSgbrOHbH-_mpC522y3xUXTIKcUiE0Y.svg%2522%257D%26chat_instance%3D-638537514252351012%26chat_type%3Dprivate%26auth_date%3D1751821416%26signature%3DMJqjeKOBCRMQhcKReCmhPb732VnAmj9WXtxEI3vikV61vnC7G8WAubAW6R7MoCWaJ6Pe8_1-iUlY-R9la202Cw%26hash%3Dc1f9ce2fe5db04a07a1e2017f467561a58303179bb225727c547cd1a26630dab&tgWebAppVersion=9.0&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%23a4c2e9%22%2C%22bg_color%22%3A%22%23191c21%22%2C%22bottom_bar_bg_color%22%3A%22%23191c21%22%2C%22button_color%22%3A%22%23697b97%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%23191c21%22%2C%22hint_color%22%3A%22%23666d77%22%2C%22link_color%22%3A%22%23a4c2ea%22%2C%22secondary_bg_color%22%3A%22%2324272e%22%2C%22section_bg_color%22%3A%22%23191c21%22%2C%22section_header_text_color%22%3A%22%23a4c2ea%22%2C%22section_separator_color%22%3A%22%23131519%22%2C%22subtitle_text_color%22%3A%22%23666d77%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D";
};

export default useGetInitDataTelegramApp;

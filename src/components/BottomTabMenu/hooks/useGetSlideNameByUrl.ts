import { useLocation } from "react-router-dom";

export const useGetSlideNameByUrl = () => {
  const location = useLocation();
  const paths = location.pathname.split("/");

  return paths.at(-1);
};

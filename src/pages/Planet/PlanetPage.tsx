import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";

const PlanetPage = () => {
  const navigate = useNavigate();
  const { seed } = useParams();

  const backHandle = () => {
    navigate(-1);
  };

  return (
    <div className="p-4">
      <Button isIconOnly onPress={backHandle}>
        <ChevronLeft />
      </Button>
      <div>Planet details</div>
      <div>{seed}</div>
    </div>
  );
};

export default PlanetPage;

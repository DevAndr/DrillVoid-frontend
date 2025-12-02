import { FC } from "react";
import { Box } from "lucide-react";

import { ResourceInventory } from "@/api/resources/types.ts";
import { formatNumberShort } from "@/utils";

interface Props {
  resource: ResourceInventory;
}

export const ResourceItem: FC<Props> = ({ resource }) => {
  return (
    <li className="flex justify-between w-full   backdrop-blur-xl rounded-md p-2">
      <div className="flex items-center gap-2">
        <Box className="text-lime-200" size={16} />
        <span className="text-amber-200">{resource.resource}</span>
      </div>
      <div className="text-sky-200">{formatNumberShort(resource.amount)}</div>
    </li>
  );
};

import { FC } from "react";

import { ResourceInventory } from "@/api/resources/types.ts";
import { ResourceItem } from "@/modules/Resources/components/ResourceList/ResourceItem.tsx";

interface Props {
  resources: ResourceInventory[];
}

export const ResourceList: FC<Props> = ({ resources }) => {
  return (
    <ul
      className="w-full p-2 bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden"
      style={{ height: "calc(100vh - 320px)" }}
    >
      {resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </ul>
  );
};

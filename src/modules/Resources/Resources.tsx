import { Spinner } from "@heroui/spinner";

import { ResourceList } from "@/modules/Resources/components/ResourceList/ResourceList.tsx";
import { useGetResourcesInventory } from "@/api/resources/useGetResourcesInventory.ts";
import { CenteredLayout } from "@/layouts";

export const Resources = () => {
  const { data: resources, isLoading } = useGetResourcesInventory();

  if (isLoading) {
    return (
      <CenteredLayout>
        <Spinner />
      </CenteredLayout>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mt-8 mb-4">Resources</h1>
      <ResourceList resources={resources || []} />
      {/*<BottomSheetResourceList />*/}
    </div>
  );
};

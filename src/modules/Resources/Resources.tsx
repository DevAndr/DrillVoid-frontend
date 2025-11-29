import { BottomSheetResourceList } from "@/modules/Resources/components/BottomSheetResourceList/BottomSheetResourceList.tsx";

export const Resources = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mt-8 mb-4">Resources</h1>
      <BottomSheetResourceList />
    </div>
  );
};

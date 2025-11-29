import { Button } from "@heroui/button";
import { Sheet } from "react-modal-sheet";
import { useState } from "react";
import { Box } from "lucide-react";

export const BottomSheetResourceList = () => {
  const [isOpenBottomSheet, setOpenBottomSheet] = useState(false);

  return (
    <>
      <Button
        color="primary"
        endContent={<Box />}
        onPress={() => setOpenBottomSheet((prevState) => !prevState)}
      >
        More resources
      </Button>
      <Sheet
        detent={"content"}
        isOpen={isOpenBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
      >
        <Sheet.Container className="bg-zinc-900">
          <Sheet.Header className="bg-zinc-900" />
          <Sheet.Content className="bg-zinc-900">
            <div className="flex flex-col gap-2 p-4">
              <div className="text-xl font-bold w-full text-center">
                All resources
              </div>
              <ul />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

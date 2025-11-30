import { MiningResponse } from "@/api/ship/types.ts";
import { useGameDataState } from "@/store/store.ts";
import { isDefined } from "@/utils";

export const useHideNavButtons = (session?: MiningResponse) => {
  const { setUsableButtons } = useGameDataState();

  if (isDefined(session)) {
    if (session.status === "IN_PROGRESS" || session.status === "FINISHED")
      setUsableButtons(false);
  }
};

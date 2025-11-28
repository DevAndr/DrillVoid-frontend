import { FC } from "react";

import { User } from "@/api/user/types.ts";
import { isDefined } from "@/utils";

interface Props {
  owner?: User;
}

export const OwnerPlanet: FC<Props> = ({ owner }) => {
  if (!isDefined(owner)) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-2">
        <img
          alt="photo"
          className="w-5 h-5 rounded-full object-cover "
          src={owner.urlPhoto}
        />
        <div>{owner.username}</div>
      </div>
      <div className="text-white/50">opened by</div>
    </div>
  );
};

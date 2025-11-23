import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CircleCheckBig,
  CircleFadingArrowUp,
  Pickaxe,
  User,
} from "lucide-react";

import {
  BottomTabsMenuStyled,
  BottomTabsMenuTabStyled,
  BottomTabsMenuTitleTabStyled,
} from "@/components/BottomTabMenu/styles/BottomTabsMenu.styled.ts";
import { useGetSlideNameByUrl } from "@/components/BottomTabMenu/hooks/useGetSlideNameByUrl.ts";

export type KeysTab =
  | "mine"
  | "upgrade"
  | "notifications"
  | "tasks"
  | "profile";

export const BottomTabMenu = () => {
  const navigate = useNavigate();
  const pathName = useGetSlideNameByUrl();
  const [selectedKey, setSelectedKey] = useState<KeysTab>(
    (pathName as KeysTab) || "mine",
  );

  // useEffect(() => {
  //   setSelectedKey(pathName as KeysTab);
  // }, [pathName]);

  return (
    <BottomTabsMenuStyled
      fullWidth
      aria-label="Tabs variants"
      color="primary"
      selectedKey={selectedKey}
      variant="solid"
      onSelectionChange={(key) => {
        setSelectedKey(key as KeysTab);
        navigate(`/app/slides/${key}`);
      }}
    >
      <BottomTabsMenuTabStyled
        key="mine"
        className="h-fit"
        title={
          <BottomTabsMenuTitleTabStyled selected={selectedKey === "mine"}>
            <Pickaxe className="icon" size={16} />
            <div className="title">Mine</div>
          </BottomTabsMenuTitleTabStyled>
        }
      />
      <BottomTabsMenuTabStyled
        key="upgrade"
        className="h-fit"
        title={
          <BottomTabsMenuTitleTabStyled selected={selectedKey === "upgrade"}>
            <CircleFadingArrowUp className="icon" size={16} />
            <div className="title">Upgrade</div>
          </BottomTabsMenuTitleTabStyled>
        }
      />
      <BottomTabsMenuTabStyled
        key="notifications"
        className="h-fit"
        title={
          <BottomTabsMenuTitleTabStyled
            selected={selectedKey === "notifications"}
          >
            <Bell className="icon" size={16} />
            <div className="title">Alerts</div>
          </BottomTabsMenuTitleTabStyled>
        }
      />
      <BottomTabsMenuTabStyled
        key="tasks"
        className="h-fit"
        title={
          <BottomTabsMenuTitleTabStyled selected={selectedKey === "tasks"}>
            <CircleCheckBig className="icon" size={16} />
            <div className="title">Tasks</div>
          </BottomTabsMenuTitleTabStyled>
        }
      />
      <BottomTabsMenuTabStyled
        key="profile"
        className="h-fit"
        title={
          <BottomTabsMenuTitleTabStyled selected={selectedKey === "profile"}>
            <User className="icon" size={16} />
            <div className="title">Profile</div>
          </BottomTabsMenuTitleTabStyled>
        }
      />
    </BottomTabsMenuStyled>
  );
};

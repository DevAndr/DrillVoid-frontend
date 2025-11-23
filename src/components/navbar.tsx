import { Navbar as HeroUINavbar } from "@heroui/navbar";

import { PanelBalances } from "@/components/PanelBalances/PanelBalances.tsx";

export const Navbar = () => {
  return (
    <HeroUINavbar className="z-auto" maxWidth="sm" position="sticky">
      <PanelBalances />
    </HeroUINavbar>
  );
};

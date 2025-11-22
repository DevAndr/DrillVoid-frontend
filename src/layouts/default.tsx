import { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";
import { BottomTabMenu } from "@/components/BottomTabMenu/BottomTabMenu.tsx";
import { NotificationsRender } from "@/modules/Notifications/NotificationsRender.tsx";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
        <NotificationsRender />
      </main>
      <footer className="w-full flex items-center justify-center p-2">
        <BottomTabMenu />
      </footer>
    </div>
  );
}

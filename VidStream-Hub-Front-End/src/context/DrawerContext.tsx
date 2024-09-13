"use client";
import { createContext, useMemo, useState } from "react";

export const SidebarContext: any = createContext({});

const DrawerContext = ({ children }: any) => {
  const [mobileDrawer, setMobileDrawer] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  const value = useMemo(
    () => ({
      mobileDrawer,
      setMobileDrawer,
      toggleDrawer,
      progress,
      setProgress,
    }),
    [mobileDrawer, setMobileDrawer, toggleDrawer, progress, setProgress]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default DrawerContext;

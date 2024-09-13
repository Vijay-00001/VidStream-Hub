import Drawer from "rc-drawer";
import React from "react";

const MainDrawer = ({ children, drawerOpen, closeDrawer }: any) => {
  return (
    <Drawer open={drawerOpen} onClose={closeDrawer} placement="top">
      {children}
    </Drawer>
  );
};

export default MainDrawer;

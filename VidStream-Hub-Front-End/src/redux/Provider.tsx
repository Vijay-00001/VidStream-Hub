"use client";
import { Provider } from "react-redux";
import { store } from "./Store";
import NextNProgress from "nextjs-progressbar";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextNProgress
        color="#F20000"
        startPosition={0.3}
        stopDelayMs={101}
        height={100}
      />
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default AppProvider;

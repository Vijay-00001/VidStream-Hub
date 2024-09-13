"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ScrollOnTop = (props: Readonly<{ children: React.ReactNode }>) => {
  const location = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{props.children}</>;
};

export default ScrollOnTop;

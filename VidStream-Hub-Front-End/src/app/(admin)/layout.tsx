"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { TypeOfState } from "@/Types";

const WithLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      redirect("/auth/login");
    }
    if (!userInfo.isAdmin) {
      redirect("/dashboard/profile");
    }
  }, [userInfo]);
  return (
    <>
      <NextNProgress
        color="#F20000"
        startPosition={0.3}
        stopDelayMs={101}
        height={3}
      />
      <div className="bg-main text-white">{children}</div>
    </>
  );
};

export default WithLoginLayout;

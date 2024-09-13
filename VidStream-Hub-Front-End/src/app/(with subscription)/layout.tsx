"use client";
import { redirect } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NextNProgress from "nextjs-progressbar";

const WithLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userInfo } = useSelector((state: any) => state.userLogin);
  const { subscription } = useSelector((state: any) => state.userSubsription);

  useEffect(() => {
    if (!userInfo) {
      redirect("/auth/login");
    }
    if (
      (!subscription || subscription.planStatus === "unpaid") &&
      !userInfo.isAdmin
    ) {
      redirect("/dashboard/subscriptions");
    }
  }, [userInfo, subscription]);
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={101}
        height={3}
      />
      <div className="bg-main text-white">{children}</div>
    </>
  );
};

export default WithLoginLayout;

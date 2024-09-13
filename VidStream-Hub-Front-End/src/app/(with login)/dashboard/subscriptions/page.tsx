"use client";
import Sidebar from "@/components/Sidebar";
import { startSessionCreatForPayment } from "@/redux/apis/ImageUploadServices";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/notifications/Loader";
import { UserGetSubscriptionAction } from "@/redux/actions/UserActions";
import toast from "react-hot-toast";
import Countdown from "@/components/TimeCount";
import { TypeOfDispatch, TypeOfState } from "@/Types";

const PricingCard = [
  {
    id: 1,
    title: "Basic",
    price: 1,
    list: [
      "Watch the Movies",
      "Unlimited visitors",
      "You can not store ",
      "No analytics",
      "No ads",
      "No credit card required",
    ],
  },
  {
    id: 2,
    title: "Standard",
    price: 3,
    list: [
      "All limited links",
      "Unlimited visitors",
      "No tracking",
      "No analytics",
      "No ads",
      "No credit card required",
    ],
  },
  {
    id: 3,
    title: "Premium",
    price: 9,
    list: [
      "All limited links",
      "Unlimited visitors",
      "No tracking",
      "No analytics",
      "No ads",
      "No credit card required",
      "24/7 support",
    ],
  },
];

const UserSubscription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<TypeOfDispatch>();
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  const { isError, isLoading, subscription } = useSelector(
    (state: TypeOfState) => state.userSubsription
  );

  const onSubmit = useCallback(
    async (price: number) => {
      const paymentPageUrl: string | any = await startSessionCreatForPayment(
        price,
        setLoading,
        userInfo.token
      );
      router.push(paymentPageUrl);
    },
    [router, userInfo.token]
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(UserGetSubscriptionAction());
    }
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError, userInfo]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Get Subscription</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isLoading ? (
            <Loader />
          ) : subscription ? (
            subscription.planStatus === "paid" && (
              <div className="relative flex flex-col items-center w-full mt-3">
                <div className="bg-dry rounded-3xl relative flex flex-col gap-9 w-full justify-center align-middle">
                  <h2 className="w-full text-3xl font-bold text-center">
                    Your Subscription Plan Remaining
                  </h2>
                  {subscription?.planEndDate && (
                    <Countdown endDate={subscription?.planEndDate} />
                  )}
                </div>
                <h2 className="mt-24 sm:text-3xl text-xl font-bold text-white mb-1">
                  Your Current Plan Information
                </h2>
                <div className="  animate-pulse">
                  <div className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-main border-gray-700 shadow-custom m-2 mt-11 flex-1 max-w-md">
                    <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
                      {subscription.planType}
                    </h2>
                    <p className="text-lg sm:text-xl text-center mb-8 mt-4 text-gray-400">
                      <span className="text-3xl sm:text-4xl font-bold text-white">
                        $
                        {subscription.planAmount === 1
                          ? `${subscription.planAmount} for month`
                          : subscription.planAmount === 3
                          ? `${subscription.planAmount} for 3 months`
                          : `${subscription.planAmount} for 1 year`}
                      </span>{" "}
                    </p>
                    <ul className="list-none list-inside mb-6 text-center text-gray-300">
                      <li className="font-bold text-orange-600">1 Website</li>
                      {PricingCard.map(
                        (listItems: any) =>
                          subscription.planType.toString() ===
                            listItems.title &&
                          listItems.list.map((listItem: string) => (
                            <li key={listItem} className="text-gray-400">
                              {listItem}
                            </li>
                          ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ) : (
            PricingCard.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-main border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md"
              >
                <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-lg sm:text-xl text-center mb-8 mt-4 text-gray-400">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    ${item.price}
                  </span>{" "}
                  / Month
                </p>
                <ul className="list-none list-inside mb-6 text-center text-gray-300">
                  <li className="font-bold text-orange-600">1 Website</li>
                  {item.list.map((listItem) => {
                    return (
                      <li key={listItem} className="text-gray-400">
                        {listItem}
                      </li>
                    );
                  })}
                </ul>
                <button
                  disabled={loading}
                  rel="noopener noreferrer"
                  onClick={() => onSubmit(Number(item.price))}
                  className="lemonsqueezy-button relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-md before:border before:border-subMain hover:before:bg-subMain before:transitions before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white">
                    Get Started
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default UserSubscription;

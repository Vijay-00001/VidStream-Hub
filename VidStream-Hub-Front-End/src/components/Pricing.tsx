import { startSessionCreatForPayment } from "@/redux/apis/ImageUploadServices";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { TypeOfState } from "@/Types";

const PricingCard = [
  {
    id: 1,
    title: "Starter",
    price: 1,
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
    id: 2,
    title: "Business",
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
    title: "Pro",
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

const Pricing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

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

  return (
    <div className="flex flex-col gap-6 ">
      <h2 className="text-xl font-bold">Get Subscription</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {PricingCard.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default Pricing;

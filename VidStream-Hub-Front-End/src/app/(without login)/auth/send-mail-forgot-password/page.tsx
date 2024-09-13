"use client";
import { Inputs } from "@/components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { sendEmailValidation } from "@/components/validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "@/components/notifications/Error";
import { sendEmailAction } from "@/redux/actions/UserActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { TypeOfDispatch } from "@/Types";
import Link from "next/link";
// import ForgottePassword from "@/screens/ForgottePassword";

const SendEmail = () => {
  const dispatch = useDispatch<TypeOfDispatch>();

  const { isLoading, isError, isSuccess } = useSelector(
    (state: TypeOfDispatch) => state.useSendEmail
  );

  // Validate User
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendEmailValidation),
  });

  // onSubmit
  const onSubmit = (data: { email: string }) => {
    dispatch(sendEmailAction(data.email));
  };

  // UseEffect Hook
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Email sent successfully`);
      redirect("/auth/login");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_SEND_EMAIL_RESET" });
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <div className="w-full">
          <Inputs
            label="Enter your email address"
            placeholder="vidStream.hub@.com"
            type="email"
            bg={true}
            name="email"
            register={register("email")}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="">
          <p className="text-center text-border">
            Given email, we will send you a link to reset your password.
          </p>
        </div>
        <div className="flex justify-between items-center my-4">
          <Link
            href="/auth/login"
            className="bg-main font-medium tansitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            Go Back to Login
          </Link>
          <button
            // disabled={isLoading}
            type="submit"
            className="bg-main font-medium tansitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Sending Email..." : "Send Email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;

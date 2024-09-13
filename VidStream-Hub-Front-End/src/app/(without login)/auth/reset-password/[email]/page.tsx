"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import { Inputs } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { ForgotPasswordValidation } from "@/components/validation/UserValidation";
import { ForgotPasswordAction } from "@/redux/actions/UserActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Forgot = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const email = useParams().email.toString().replace("%40", "@");

  const { isLoading, isError, isSuccess } = useSelector(
    (state: TypeOfState) => state.userForgotPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation),
  });

  const onSubmit = (data: { newPassword: string }) => {
    dispatch(ForgotPasswordAction(data.newPassword, email));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_FORGOT_PASSWORD_RESET" });
      redirect("/auth/login");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_FORGOT_PASSWORD_RESET" });
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <div className="w-full">
          <Inputs
            label="New Password"
            placeholder="**********"
            type="password"
            bg={true}
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Inputs
            label="Confirm Password"
            placeholder="**********"
            type="password"
            bg={true}
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium tansitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;

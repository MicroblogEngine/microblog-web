import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignupFormSchema } from "@ararog/microblog-validation";
import { SignupForm } from "@ararog/microblog-types";

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle";

const Signup = () => {
  const navigate = useNavigate();

  const signup = useUserStore.use.signup();
  const loading = useUserStore.use.loading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupForm) => {
    signup(data, onSignupSuccess);
  };

  const onSignupSuccess = () => {
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <PageTitle text="Signup" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="p-2 border-2 border-gray-300 rounded-lg w-96"
          />
          {errors.email?.message && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}

          <label htmlFor="email">Username:</label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="p-2 border-2 border-gray-300 rounded-lg w-96"
          />
          {errors.username?.message && (
            <span className="text-red-500">{errors.username?.message}</span>
          )}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register("email")}
            className="p-2 border-2 border-gray-300 rounded-lg w-96"
          />
          {errors.password?.message && (
            <span className="text-red-500">{errors.password?.message}</span>
          )}

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="p-2 border-2 border-gray-300 rounded-lg w-96"
          />
          {errors.confirmPassword?.message && (
            <span className="text-red-500">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <RoundedSubmitButton disabled={loading} label="Signup" />
      </form>
    </div>
  );
};

export default Signup;

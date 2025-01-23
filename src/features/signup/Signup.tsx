import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { SignupFormSchema } from "@ararog/microblog-validation";
import { SignupForm } from "@ararog/microblog-types";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle";
import FormField from "@/components/FormField";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signup = useUserStore.use.signup();
  const loading = useUserStore.use.loading();

  const methods = useForm<SignupForm>({
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
      <PageTitle text={t("Signup")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start">
            <FormField 
              label={t("Email")} 
              name="email" 
              type="email" 
            />
            <FormField 
              label={t("Username")} 
              name="username" 
              type="text" 
            />
            <FormField 
              label={t("Password")} 
              name="password" 
              type="password" 
            />
            <FormField 
              label={t("Confirm Password")} 
              name="confirmPassword" 
              type="password" 
            />
          </div>
          <RoundedSubmitButton disabled={loading} label={t("Signup")} />
        </form>
      </FormProvider>
    </div>
  );
};

export default Signup;

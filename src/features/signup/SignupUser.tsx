import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { SignupUserFormSchema } from "@ararog/microblog-validation";
import { SignupUserForm } from "@ararog/microblog-types";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton/RoundedSubmitButton";
import FormField from "@/components/FormField/FormField";
import StepTitle from './components/StepTitle';

const SignupUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const completeSignup = useUserStore.use.completeSignup();
  const loading = useUserStore.use.loading();

  const methods = useForm<SignupUserForm>({
    resolver: zodResolver(SignupUserFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupUserForm) => {
    completeSignup(data, onSignupSuccess);
  };

  const onSignupSuccess = () => {
    navigate({ to: "/verify-email" });
  };
  
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-2">
            <StepTitle title={t("Your Account Details")} />
            <FormField 
              label={t("Email")} 
              name="email" 
              type="email" 
              tabIndex={1}
            />
            <FormField 
              label={t("Username")} 
              name="username" 
              type="text" 
              tabIndex={2}
            />
            <FormField 
              label={t("Password")} 
              name="password" 
              type="password" 
              tabIndex={3}
            />
            <FormField 
              label={t("Confirm Password")} 
              name="confirmPassword" 
              type="password" 
              tabIndex={4}
            />
          </div>
          <RoundedSubmitButton disabled={loading} label={t("Signup")} />
        </form>
      </FormProvider>
    </div>
  );
  };

export default SignupUser;
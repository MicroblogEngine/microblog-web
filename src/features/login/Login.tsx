import { useContext } from "react";
import { useStore } from "zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { LoginFormSchema } from "@ararog/microblog-validation";
import { LoginForm } from "@ararog/microblog-types";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import RoundedSubmitButton from "@/components/RoundedSubmitButton/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle/PageTitle";
import { AuthContext } from "@/security/auth";
import FormField from "@/components/FormField/FormField";
import { ErrorMessages } from "@ararog/microblog-server";
import { SystemErrors } from "@/components/SystemErrors/SystemErrors";
import PublicPage from "@/components/PublicPage";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const store = useContext(AuthContext);
  if (!store) throw new Error('Missing AuthContext.Provider in the tree')
  const login = useStore(store, (s) => s.login)
  const loading = useStore(store, (s) => s.loading);
  const errors = useStore(store, (s) => s.errors);
  
  const methods = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data.username, data.password, onLoginSuccess, onLoginFailed);
  };

  const onLoginSuccess = () => {
    navigate({ to: "/" });
  };

  const onLoginFailed = (message: string) => {
    if(message === ErrorMessages.user.emailNotVerified) {
      navigate({ to: "/verify-email" });
    }
  };

  return (
    <PublicPage>
      <PageTitle text={t("Login")} />
      {errors && <SystemErrors errors={errors["user"]} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-2">
            <FormField 
              tabIndex={1}
              label={t("Username")} 
              name="username" 
              type="text" 
            />
            <FormField 
              tabIndex={2}
              label={t("Password")} 
              name="password" 
              type="password" 
            />

            <span className="mt-2 h-15">
              {t("Forgot your password?")} {" "}
              <Link className="font-bold text-gray-800" to="/forgot-password">
                {t("Reset")}
              </Link>{" "}
              {t("here")}.
            </span>
          </div>
          <RoundedSubmitButton disabled={loading} label={loading ? t("Logging in...") : t("Login")} />
        </form>
      </FormProvider>
      <div>
        <span className="mt-2 h-15">
          {t("Don't have an account?")} {" "}
          <Link className="font-bold text-gray-800" to="/signup">
            {t("Register")}
          </Link>{" "}
          {t("here")}.
        </span>
      </div>
    </PublicPage>
  );
};

export default Login;

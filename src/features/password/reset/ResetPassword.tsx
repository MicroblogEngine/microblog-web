import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {ResetPasswordForm} from '@ararog/microblog-types';
import {ResetPasswordFormSchema} from '@ararog/microblog-validation'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/PageTitle/PageTitle';
import FormField from '@/components/FormField/FormField';
import RoundedSubmitButton from '@/components/RoundedSubmitButton/RoundedSubmitButton';
import { useAuthContext } from '@/security/auth';
import PublicPage from '@/components/PublicPage';

const ResetPassword = () => {
  const search = useSearch({ from: '/password/reset' });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetPassword = useAuthContext((state) => state.resetPassword);
  const resettingPassword = useAuthContext((state) => state.resettingPassword);

  const methods = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      token: search.token,
      userId: search.userId,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    methods.setFocus('password');
  }, [methods]);
  
  const onSubmit = (data: ResetPasswordForm) => {
    resetPassword(data, onResetPasswordSuccess);
  };

  const onResetPasswordSuccess = () => {
    navigate({to: '/login'});
  };

  return (
    <PublicPage>
      <PageTitle text={t("Password Reset")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start gap-2'>
            <FormField 
              label={t("Email")} 
              name="email" 
              type="email" 
              tabIndex={1}
            />
            <FormField 
              label={t("Password")} 
              name="password" 
              type="password" 
              tabIndex={2}
            />
            <FormField 
              label={t("Confirm Password")} 
              name="confirmPassword" 
              type="password" 
              tabIndex={3}
            />
          </div>     
          <RoundedSubmitButton disabled={resettingPassword} label={resettingPassword ? t("Resetting Password...") : t("Reset Password")} />
        </form>
      </FormProvider>
    </PublicPage>
  );
};

export default ResetPassword;
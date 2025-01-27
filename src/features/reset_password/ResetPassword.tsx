import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import {ResetPasswordForm} from '@ararog/microblog-types';
import {ResetPasswordFormSchema} from '@ararog/microblog-validation'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/PageTitle/PageTitle';
import FormField from '@/components/FormField/FormField';
import RoundedSubmitButton from '@/components/RoundedSubmitButton/RoundedSubmitButton';
import { useUserStore } from "@/reducers/user";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetPassword = useUserStore.use.resetPassword();
  const resettingPassword = useUserStore.use.resettingPassword();

  const methods = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSubmit = (data: ResetPasswordForm) => {
    resetPassword(data, onResetPasswordSuccess);
  };

  const onResetPasswordSuccess = () => {
    navigate({to: '/login'});
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <PageTitle text={t("Password Reset")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
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
          <RoundedSubmitButton disabled={resettingPassword} label={resettingPassword ? t("Resetting Password...") : t("Send")} />
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPassword;
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import {ForgotPasswordForm} from '@ararog/microblog-types';
import {ForgotPasswordFormSchema} from '@ararog/microblog-validation'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/PageTitle/PageTitle';
import FormField from '@/components/FormField/FormField';
import RoundedSubmitButton from '@/components/RoundedSubmitButton/RoundedSubmitButton';
import PublicPage from '@/components/PublicPage';
import { useAuthContext } from '@/security/auth';
import { useEffect } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = useAuthContext((state) => state.forgotPassword);
  const sendingMail = useAuthContext((state) => state.sendingMail);
  const { t } = useTranslation();

  const methods = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    methods.setFocus('email');
  }, [methods]);
  
  const onSubmit = (data: ForgotPasswordForm) => {
    forgotPassword(data, onForgotPasswordSuccess);
  };

  const onForgotPasswordSuccess = () => {
    navigate({to: '/login'});
  };

  return (
    <PublicPage>
      <PageTitle text={t("Forgot Password")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
            <FormField label={t("Email")} name="email" type="email" />
          </div>     
          <RoundedSubmitButton disabled={sendingMail} label={sendingMail ? t("Sending Email...") : t("Send Email")} />
          <div className="flex flex-row items-center justify-center mt-2">
            <span>
              {t('Remember your password?')}{' '}
              <Link className="font-bold text-gray-800" to="/login">{t('Login')}</Link>
            </span>
          </div>          
        </form>
      </FormProvider>
    </PublicPage>
  );
};

export default ForgotPassword;
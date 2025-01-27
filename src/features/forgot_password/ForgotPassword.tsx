import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import {ForgotPasswordForm} from '@ararog/microblog-types';
import {ForgotPasswordFormSchema} from '@ararog/microblog-validation'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/PageTitle/PageTitle';
import FormField from '@/components/FormField/FormField';
import RoundedSubmitButton from '@/components/RoundedSubmitButton/RoundedSubmitButton';
import { useUserStore } from "@/reducers/user";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = useUserStore.use.forgotPassword();
  const sendingMail = useUserStore.use.sendingMail();
  const { t } = useTranslation();

  const methods = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = (data: ForgotPasswordForm) => {
    forgotPassword(data, onForgotPasswordSuccess);
  };

  const onForgotPasswordSuccess = () => {
    navigate({to: '/login'});
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <PageTitle text={t("Forgot Password")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
            <FormField label={t("Email")} name="email" type="email" />
          </div>     
          <RoundedSubmitButton disabled={sendingMail} label={sendingMail ? t("Sending...") : t("Send")} />
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
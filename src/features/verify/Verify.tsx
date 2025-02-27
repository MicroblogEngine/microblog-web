import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import {VerificationForm} from '@ararog/microblog-types';
import {VerifyPasswordFormSchema} from '@ararog/microblog-validation';
import RoundedSubmitButton from "@/components/RoundedSubmitButton/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle/PageTitle";
import FormField from "@/components/FormField/FormField";
import { SystemErrors } from "@/components/SystemErrors/SystemErrors";
import { useEffect, useState } from "react";
import PublicPage from "@/components/PublicPage";

const Verify = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resendSuccess, setResendSuccess] = useState(false);

  const verifyCode = useUserStore.use.verifyCode();
  const resendCode = useUserStore.use.resendCode();
  const verifyingCode = useUserStore.use.verifyingCode();
  const resendingCode = useUserStore.use.resendingCode();
  const errors = useUserStore(store => store.errors);
  const user = useUserStore(store => store.user);

  const methods = useForm<VerificationForm>({
    resolver: zodResolver(VerifyPasswordFormSchema),
    defaultValues: {
      userId: user?.id,
      token: '',
    },
  });

  useEffect(() => {
    methods.setFocus('token');
  }, [methods]);

  const onSubmit = (data: VerificationForm) => {
    verifyCode(data, onVerifySuccess);
  };

  const onVerifySuccess = () => {
    navigate({to: '/login'});
  };

  const onResendCode = () => {
    if (! user || resendingCode) {
      return;
    }
    
    resendCode(user.id, onResendSuccess);
  };

  const onResendSuccess = () => {
    setResendSuccess(true);
  }
    
  return (
    <PublicPage>
      <PageTitle text={t("E-mail Verification")} />
      {errors && <SystemErrors errors={errors["token"]} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center">
            {resendSuccess && 
              <div className="flex flex-col items-center justify-center mt-5 mb-5">
                <span className="text-sm font-bold text-center">
                  {t("A new token has been sent to your mail address,")}
                  <br />
                  {t(" please check your mail inbox.")}
                </span>
              </div>}
            <div className='flex flex-col'>
              <FormField label={t("Code")} name="token" type="text" />
            </div>
            <RoundedSubmitButton disabled={verifyingCode} label={verifyingCode ? t("Verifying...") : t("Verify")} />
            <div className="flex flex-row items-center justify-center mt-2">
              <span>
                {t('Haven\'t received any token yet?')}{' '}
                <span className="font-bold text-gray-800 cursor-pointer" onClick={onResendCode}>{resendingCode ? t('Resending...') : t('Resend')}</span>
              </span>
            </div>
          </div>
        </form>
      </FormProvider>
    </PublicPage>
  );
};

export default Verify;
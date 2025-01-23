import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import {VerificationForm} from '@ararog/microblog-types';
import {VerifyPasswordFormSchema} from '@ararog/microblog-validation';
import RoundedSubmitButton from "@/components/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle";
import FormField from "@/components/FormField";

const Verify = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const verifyCode = useUserStore.use.verifyCode();
  const verifyingCode = useUserStore.use.verifyingCode();

  const methods = useForm<VerificationForm>({
    resolver: zodResolver(VerifyPasswordFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (data: VerificationForm) => {
    verifyCode(data, onVerifySuccess);
  };

  const onVerifySuccess = () => {
    navigate({to: '/profile'});
  };
    
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <PageTitle text={t("E-mail Verification")} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
            <FormField label={t("Code")} name="token" type="text" />
          </div>     
          <RoundedSubmitButton disabled={verifyingCode} label={verifyingCode ? t("Verifying...") : t("Verify")} />
        </form>
      </FormProvider>
    </div>
  );
};

export default Verify;
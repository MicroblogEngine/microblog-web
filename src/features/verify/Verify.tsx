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

const Verify = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const verifyCode = useUserStore.use.verifyCode();
  const verifyingCode = useUserStore.use.verifyingCode();
  const errors = useUserStore(store => store.errors);
  const user = useUserStore(store => store.user);

  const methods = useForm<VerificationForm>({
    resolver: zodResolver(VerifyPasswordFormSchema),
    defaultValues: {
      userId: user?.id,
      token: '',
    },
  });

  const onSubmit = (data: VerificationForm) => {
    verifyCode(data, onVerifySuccess);
  };

  const onVerifySuccess = () => {
    navigate({to: '/login'});
  };
    
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <PageTitle text={t("E-mail Verification")} />
      {errors && <SystemErrors errors={errors["token"]} />}
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
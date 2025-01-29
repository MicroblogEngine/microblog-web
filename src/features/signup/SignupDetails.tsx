import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDetailsFormSchema } from "@ararog/microblog-validation";
import { SignupDetailsForm } from "@ararog/microblog-types";
import { useTranslation } from "react-i18next";
import { Link } from '@tanstack/react-router';
import { useWizard } from 'react-use-wizard';

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton/RoundedSubmitButton";
import FormField from "@/components/FormField/FormField";
import StepTitle from './components/StepTitle';

const SignupDetails = () => {
  const { nextStep } = useWizard();
  const { t } = useTranslation();
  
  const updateSignupDetails = useUserStore.use.updateSignupDetails();
  const loading = useUserStore.use.loading();

  const methods = useForm<SignupDetailsForm>({
    resolver: zodResolver(SignupDetailsFormSchema),
    defaultValues: {
      name: "",
      birthDate: undefined,
    },
  });  

  useEffect(() => {
    methods.setFocus("name");
  }, [methods]);

  const onSubmit = (data: SignupDetailsForm) => {
    updateSignupDetails(data, onSignupSuccess);
  };

  const onSignupSuccess = () => {
    nextStep();
  };
  
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-2">
            <StepTitle title={t("Your Personal Information")} />
            <FormField 
              label={t("Name")} 
              name="name" 
              type="text" 
            />
            <FormField 
              label={t("Birth Date")} 
              name="birthDate"
              type="date" 
            />
          </div>
          <RoundedSubmitButton disabled={loading} label={t("Continue")} />
          <div className="flex flex-row items-center justify-center mt-2">
            <span>
              {t('Already have an account?')}{' '}
              <Link className="font-bold text-gray-800" to="/login">{t('Login')}</Link>
            </span>
          </div>          
        </form>
      </FormProvider>      
    </div>
  );
};

export default SignupDetails;
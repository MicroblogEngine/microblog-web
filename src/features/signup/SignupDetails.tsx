import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDetailsFormSchema } from "@ararog/microblog-validation";
import { SignupDetailsForm } from "@ararog/microblog-types";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton";
import FormField from "@/components/FormField";
import { useWizard } from 'react-use-wizard';

const SignupDetails = () => {
  const { nextStep } = useWizard();
  const { t } = useTranslation();

  const updateSignupDetails = useUserStore.use.updateSignupDetails();
  const loading = useUserStore.use.loading();

  const methods = useForm<SignupDetailsForm>({
    resolver: zodResolver(SignupDetailsFormSchema),
    defaultValues: {
      name: "",
      birthDate: "",
    },
  });  

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
          <div className="flex flex-col items-start">
            <FormField 
              label={t("Name")} 
              name="name" 
              type="text" 
            />
            <FormField 
              label={t("Birth Date")} 
              name="username" 
              type="text" 
            />
          </div>
          <RoundedSubmitButton disabled={loading} label={t("Continue")} />
        </form>
      </FormProvider>      
    </div>
  );
};

export default SignupDetails;
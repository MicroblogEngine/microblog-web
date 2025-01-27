import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDetailsFormSchema } from "@ararog/microblog-validation";
import { SignupDetailsForm } from "@ararog/microblog-types";
import { useTranslation } from "react-i18next";
import { parse } from 'date-fns';

import { useUserStore } from "@/reducers/user";
import RoundedSubmitButton from "@/components/RoundedSubmitButton/RoundedSubmitButton";
import FormField from "@/components/FormField/FormField";
import { useWizard } from 'react-use-wizard';
import StepTitle from './components/StepTitle';


const SignupDetails = () => {
  const { nextStep } = useWizard();
  const { t } = useTranslation();

  const updateSignupDetails = useUserStore.use.updateSignupDetails();
  const loading = useUserStore.use.loading();

  const methods = useForm<SignupDetailsForm>({
    resolver: async (data, context, options) => {
      if (data.birthDate) {
        data.birthDate = parse(`${data.birthDate}`, "yyyy-MM-dd", new Date());
      }
      const result = await zodResolver(SignupDetailsFormSchema)(data, context, options);
      return result;
    },
    defaultValues: {
      name: "",
      birthDate: undefined,
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
        </form>
      </FormProvider>      
    </div>
  );
};

export default SignupDetails;
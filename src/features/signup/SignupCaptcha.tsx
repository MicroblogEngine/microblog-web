//import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { useWizard } from 'react-use-wizard';

import RoundedButton from '@/components/RoundedButton';
import StepTitle from './components/StepTitle';

const SignupCaptcha = () => {
  //const [ canContinue, setCanContinue ] = useState(false);
  const { nextStep } = useWizard();
  const { t } = useTranslation();

  const onChange = () => {
    //setCanContinue(value !== null);
  };

  return (
    <div className="flex flex-col items-center">
      <StepTitle title={t("Verification")} />
      <div className="mt-5 mb-5">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
          onChange={onChange}
        />
      </div>
      <RoundedButton 
        className="p-2 mt-2 rounded-lg h-19 w-96" 
        disabled={false} 
        title={t("Continue")} 
        labelClassName="text-lg font-normal"
        onClick={nextStep} />
    </div>
  );
};

export default SignupCaptcha;
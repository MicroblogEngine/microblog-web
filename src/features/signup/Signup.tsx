import { useTranslation } from "react-i18next";
import { Wizard } from 'react-use-wizard';

import PageTitle from "@/components/PageTitle";
import SignupUser from "./SignupUser";
import SignupDetails from "./SignupDetails";

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <PageTitle text={t("Signup")} />
      <Wizard>
        <SignupUser />
        <SignupDetails />
      </Wizard>
    </div>
  );
};

export default Signup;

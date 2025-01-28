import { useTranslation } from "react-i18next";
import { Wizard } from 'react-use-wizard';

import PageTitle from "@/components/PageTitle/PageTitle";
import SignupUser from "./SignupUser";
import SignupDetails from "./SignupDetails";
import SignupCaptcha from "./SignupCaptcha";
import PublicPage from "@/components/PublicPage";
const Signup = () => {
  const { t } = useTranslation();

  return (
    <PublicPage>
      <PageTitle text={t("Signup")} />
      <Wizard>
        <SignupDetails />
        <SignupCaptcha />
        <SignupUser />
      </Wizard>
    </PublicPage>
  );
};

export default Signup;

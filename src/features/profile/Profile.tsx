import { useTranslation } from "react-i18next"; 

import PageTitle from "@/components/PageTitle/PageTitle";

const Profile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center">
      <PageTitle text={t("Profile")} />
    </div>
  );
};

export default Profile;
import { memo } from "react";
import { faHome, faSearch, faBell, faEnvelope, faUsers, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "@tanstack/react-router";

import "@/components/LeftBar/LeftBar.css"
import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Logo from "@/assets/logo-black.svg";
import RoundedButton from "@/components/RoundedButton";
import { t } from "i18next";

const LeftBar = () => {
  const navigate = useNavigate();

  const onNewPostClick = () => {
    console.log("New Post");
  }

  const onHomeClick = () => {
    navigate({ to: "/" });
  }

  const onExploreClick = () => {
    console.log("Explore");
  }

  const onNotificationsClick = () => {
    console.log("Notifications");
  }

  const onMessagesClick = () => {
    console.log("Messages");
  }

  const onCommunitiesClick = () => {
    console.log("Communities");
  }

  const onProfileClick = () => {
    console.log("Profile");
  }

  return (
    <div className="flex flex-col items-center w-2/6 p-2 pl-5 pr-5 prose border-r-2 md:flex border-r-slate-400 max-lg:w-20">
      <div className="flex flex-row items-center h-10">
        <span className="hidden text-4xl font-extrabold xl:flex">Microblog</span>
        <img src={Logo} width={64} height={64} alt="Microblog" className="hidden max-xl:flex" />
      </div>
      <Menu>
        <MenuItem title={t("Home")} icon={faHome} onClick={onHomeClick} />
        <MenuItem title={t("Explore")} icon={faSearch} onClick={onExploreClick} />
        <MenuItem title={t("Notifications")} icon={faBell} onClick={onNotificationsClick} />
        <MenuItem title={t("Messages")} icon={faEnvelope} onClick={onMessagesClick} />
        <MenuItem title={t("Communities")} icon={faUsers} onClick={onCommunitiesClick} />
        <MenuItem title={t("Profile")} icon={faUser} onClick={onProfileClick} />
      </Menu>

      <RoundedButton 
        className="bg-black rounded-full max-xl:w-14 max-xl:h-14 h-14" 
        title={t("New Post")} 
        icon={faPlus} 
        onClick={onNewPostClick}
      />
    </div>
  );
};

export default memo(LeftBar);
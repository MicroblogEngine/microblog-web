import { memo } from "react";
import {
  faHome,
  faSearch,
  faBell,
  faEnvelope,
  faUsers,
  faUser,
  faPlus,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@tanstack/react-router";

import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Logo from "@/assets/logo-black.svg";
import RoundedButton from "@/components/RoundedButton";
import { t } from "i18next";
import { Profile } from "@/models/profile";
import { User } from "@/models/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "@/security/auth";
import { UserState } from "@/reducers/user";

type LeftBarProps = {
  user?: User;
  profile?: Profile;
};

const LeftBar = ({ user, profile }: LeftBarProps) => {
  const logout = useAuthContext((state: UserState) => state.logout);
  const navigate = useNavigate();

  const onNewPostClick = () => {
    console.log("New Post");
  };

  const onHomeClick = () => {
    navigate({ to: "/" });
  };

  const onExploreClick = () => {
    console.log("Explore");
  };

  const onNotificationsClick = () => {
    console.log("Notifications");
  };

  const onMessagesClick = () => {
    console.log("Messages");
  };

  const onCommunitiesClick = () => {
    console.log("Communities");
  };

  const onProfileClick = () => {
    console.log("Profile");
  };

  const onLogoutClick = () => {
    console.log("Logout");
    logout(() => {
      navigate({ to: "/" });
    });
  };

  return (
    <div className="flex flex-col items-center w-2/6 p-2 pl-5 pr-5 prose border-r-2 md:flex border-r-slate-400 max-lg:w-24">
      <div className="flex flex-row items-center h-10">
        <span className="hidden text-4xl font-extrabold xl:flex">
          Microblog
        </span>
        <img
          src={Logo}
          alt="Microblog"
          className="hidden w-14 h-14 max-xl:flex"
        />
      </div>
      <Menu>
        <MenuItem title={t("Home")} icon={faHome} onClick={onHomeClick} />
        <MenuItem
          title={t("Explore")}
          icon={faSearch}
          onClick={onExploreClick}
        />
        <MenuItem
          title={t("Notifications")}
          icon={faBell}
          onClick={onNotificationsClick}
        />
        <MenuItem
          title={t("Messages")}
          icon={faEnvelope}
          onClick={onMessagesClick}
        />
        <MenuItem
          title={t("Communities")}
          icon={faUsers}
          onClick={onCommunitiesClick}
        />
        <MenuItem title={t("Profile")} icon={faUser} onClick={onProfileClick} />
      </Menu>

      <RoundedButton
        className="w-48 bg-black rounded-full h-14 max-xl:w-14 max-xl:h-14"
        labelClassName="text-lg"
        title={t("New Post")}
        icon={faPlus}
        onClick={onNewPostClick}
      />

      <div className="flex flex-col justify-end pt-10">
        {user && profile && (
          <div
            className="flex flex-row items-center justify-center p-2 rounded-full cursor-pointer w-52 max-xl:p-0 h-14 hover:bg-slate-200 max-xl:w-14 max-xl:h-14"
            onClick={onLogoutClick}
          >
            <img
              src="https://placehold.co/100x100"
              alt="user"
              className="w-12 h-12 rounded-full max-xl:flex"
            />
            <div className="flex flex-col justify-start hidden w-full ml-2 xl:flex">
              <span className="font-bold text-black text-md">
                {profile.name.substring(0, 8)}
              </span>
              <span className="text-sm text-black">@{user.username}</span>
            </div>
            <FontAwesomeIcon
              icon={faEllipsisH}
              className="hidden mr-5 text-black xl:flex"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(LeftBar);

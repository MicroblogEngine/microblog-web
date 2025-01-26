import { memo } from "react";

import "@/components/RightBar/RightBar.css"
import Feature from "@/components/Feature";
import { t } from "i18next";

const RightBar = () => {
  return (
    <div className="flex-col hidden w-2/6 max-h-full gap-5 p-2 prose border-l-2 lg:flex border-l-slate-400">
      <div className="flex flex-row w-full">
        <input type="text" placeholder={t("Search")} className="w-full h-10 p-2 border-2 rounded-full border-slate-400" />
      </div>
      <Feature title={t("Trending")}>
        <span>Something</span>
      </Feature>
      <Feature title={t("Who to follow")}>
        <span>Something</span>
      </Feature>
    </div>
  );
};

export default memo(RightBar);
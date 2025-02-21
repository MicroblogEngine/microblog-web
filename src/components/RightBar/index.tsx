import { memo } from "react";

import FeedFeature from "@/components/FeedFeature";
import { t } from "i18next";

const RightBar = () => {
  return (
    <div className="flex-col hidden w-2/6 max-h-full gap-5 p-2 prose border-l-2 lg:flex border-l-slate-400">
      <div className="flex flex-row w-full">
        <input
          type="text"
          placeholder={t("Search")}
          className="w-full h-10 p-2 border-2 rounded-full border-slate-400"
        />
      </div>
      <FeedFeature title={t("Trending")}>
        <span>Something</span>
      </FeedFeature>
      <FeedFeature title={t("Who to follow")}>
        <span>Something</span>
      </FeedFeature>
    </div>
  );
};

export default memo(RightBar);

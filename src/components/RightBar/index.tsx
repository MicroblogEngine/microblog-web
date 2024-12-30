import { memo } from "react";
import "@/components/RightBar/RightBar.css"

const RightBar = () => {
  return (
    <div className="hidden w-1/5 prose sm:flex">
      <h1>More About</h1>
    </div>
  );
};

export default memo(RightBar);
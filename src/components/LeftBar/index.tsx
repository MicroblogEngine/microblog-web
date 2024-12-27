import { memo } from "react";
import "@/components/LeftBar/LeftBar.css"

const LeftBar = () => {
  return (
    <div className="prose w-1/5">
      <h1>Microblog</h1>
    </div>
  );
};

export default memo(LeftBar);
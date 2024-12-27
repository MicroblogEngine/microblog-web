import { memo } from "react";
import FeedList from "@/components/FeedList";
import { FeedState, useStore } from "@/states/feed";
import "@/components/Feed/Feed.css"

const Feed = () => {
  const isLoading = useStore((state: FeedState) => state.isLoading)

  return (
    <div className="w-3/5">
      {isLoading ? <p>Loading...</p> : <FeedList />}   
    </div>
  );
};

export default memo(Feed);
import { memo } from "react";
import FeedList from "@/components/FeedList";
import { FeedState, useStore } from "@/states/feed";
import "@/components/Feed/Feed.css"

const Feed = () => {
  const isLoading = useStore((state: FeedState) => state.isLoading)

  return (
    <div className="grow">
      {isLoading ? <p>Loading...</p> : <FeedList />}   
    </div>
  );
};

export default memo(Feed);
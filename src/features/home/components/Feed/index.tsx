import { memo } from "react";

import { FeedState, useFeedStore } from "@/reducers/feed";
import FeedList from "@/features/home/components/FeedList";
import "@/features/home/components/Feed/Feed.css"

const Feed = () => {
  const {feed, loading} = useFeedStore((state: FeedState) => state)

  if(loading) {
    return <p data-testid="loading">Loading...</p>
  }
  
  return (
    <div className="flex items-center justify-center w-3/5">
      <FeedList feed={feed} />
    </div>
  );
};

export default memo(Feed);
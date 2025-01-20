import { memo } from "react";

import { FeedState, useFeedStore } from "@/reducers/feed";
import FeedList from "@/features/home/components/FeedList";
import "@/features/home/components/Feed/Feed.css"

const Feed = () => {
  const {feed, loading} = useFeedStore((state: FeedState) => state)

  return (
    <div className="flex items-center justify-center w-3/5">
      {loading ? <p data-testid="loading">Loading...</p> : <FeedList feed={feed} />}   
    </div>
  );
};

export default memo(Feed);
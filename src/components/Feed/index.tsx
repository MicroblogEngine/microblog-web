import { memo } from "react";
import FeedList from "@/components/FeedList";
import { FeedState, useFeedStore } from "@/reducers/feed";
import "@/components/Feed/Feed.css"

const Feed = () => {
  const {feed, isLoading} = useFeedStore((state: FeedState) => state)

  return (
    <div className="w-3/5">
      {isLoading ? <p data-testid="loading">Loading...</p> : <FeedList feed={feed} />}   
    </div>
  );
};

export default memo(Feed);
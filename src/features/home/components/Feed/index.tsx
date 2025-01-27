import { memo } from "react";

import "@/features/home/components/Feed/Feed.css"
import { FeedState, useFeedStore } from "@/reducers/feed";
import FeedList from "@/features/home/components/FeedList";
import Composer from "@/features/home/components/Composer";

const Feed = () => {
  const {feed, loading} = useFeedStore((state: FeedState) => state)

  if(loading) {
    return <p data-testid="loading">Loading...</p>
  }
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Composer />
      <FeedList feed={feed} />
    </div>
  );
};

export default memo(Feed);
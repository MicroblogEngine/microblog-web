import { Post } from '@/models/feed';
import { FeedState, useStore } from '@/states/feed';
import FeedItem from '@/components/FeedItem';
import "@/components/FeedList/FeedList.css";

const FeedList = () => {
  const feed = useStore((state: FeedState) => state.feed)

  return (
    <div>
      {feed?.map((post: Post) => {
        return <FeedItem post={post} />
      })}
    </div>
  );
};

export default FeedList;
import { Post } from '@/models/feed';
import FeedItem from '@/components/FeedItem';
import "@/components/FeedList/FeedList.css";

type FeedListProps = {
  feed?: Post[]
}

const FeedList = (props:FeedListProps) => {
  return (
    <div className='flex flex-col'>
      {
        props.feed?.length == 0 ? 
          <p data-testid="message">No posts to show</p> : 
          props.feed?.map((post: Post) => {
            return <FeedItem post={post} />
          })
      }
    </div>
  );
};

export default FeedList;
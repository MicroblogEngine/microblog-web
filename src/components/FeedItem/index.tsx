import { memo } from 'react';
import { Post } from '@/models/feed';
import "@/components/FeedItem/FeedItem.css";

interface FeedItemProps {
  post: Post,
}

const FeedItem = ({post}: FeedItemProps) => {

  return (
    <div className='card'>
      <div className='card-body'>
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export default memo(FeedItem);
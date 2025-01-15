import { memo } from 'react';
import { Post } from '@/models/feed';
import "@/features/home/components/FeedItem/FeedItem.css";

interface FeedItemProps {
  post: Post,
}

const FeedItem = ({post}: FeedItemProps) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <p data-testid="post_text">{post.text}</p>
      </div>
    </div>
  );
};

export default memo(FeedItem);
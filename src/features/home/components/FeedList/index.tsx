import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { Post } from '@/models/feed';
import FeedItem from '../FeedItem';
import "@/features/home/components/FeedList/FeedList.css";
import { memo } from 'react';

type FeedListProps = {
  feed?: Post[]
}

const FeedList = ({feed}:FeedListProps) => {

  const _rowRenderer =({index, key}: {index: number, key: string}) => {
    return <FeedItem key={key} post={feed![index]} />
  }

  const _noRowsRenderer = () => {
    return <p data-testid="message">No posts to show</p>
  }

  return (
    <div className='flex flex-col mt-20'>
      <AutoSizer disableHeight>
        {({width}: {width: number}) => (
          <List
            className="flex flex-grow-0"
            height={100}
            noRowsRenderer={_noRowsRenderer}
            rowCount={feed!.length}
            rowHeight={100}
            rowRenderer={_rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default memo(FeedList);
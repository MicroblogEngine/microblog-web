import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { memo } from 'react';

import "@/features/home/components/FeedList/FeedList.css";
import { Post } from '@/models/feed';
import FeedItem from '@/features/home/components/FeedItem';
import { t } from 'i18next';

type FeedListProps = {
  feed?: Post[]
}

const FeedList = ({feed}:FeedListProps) => {

  const _rowRenderer =({index, key}: {index: number, key: string}) => {
    return <FeedItem key={key} post={feed![index]} />
  }

  const _noRowsRenderer = () => {
    return (
      <div className="flex justify-center w-full m-10" data-testid="message">
        <span className="text-lg font-bold">{t("No posts to show")}</span>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full h-screen mt-2'>
      <AutoSizer>
        {({width, height}: {width: number, height: number}) => (
          <List
            className="flex flex-grow-0 w-full m-1 ml-2 mr-2"
            noRowsRenderer={_noRowsRenderer}
            rowCount={feed ? feed.length : 0}
            rowHeight={20}
            rowRenderer={_rowRenderer}
            overscanRowCount={3}
            height={height}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default memo(FeedList);
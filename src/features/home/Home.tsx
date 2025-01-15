import { useEffect } from 'react'
import '../../App.css'

import { FeedState, useFeedStore } from '@/reducers/feed'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import Feed from '@/features/home/components/Feed'

function Home() {
  const loadFeed = useFeedStore((state: FeedState) => state.loadFeed)

  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <div className='flex flex-col w-full App sm:flex-row columns-3'>
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  )
}

export default Home

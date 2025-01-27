import { useEffect } from 'react'
import '../../App.css'

import { FeedState, useFeedStore } from '@/reducers/feed'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import Feed from '@/features/home/components/Feed'
import { UserState, useUserStore } from '@/reducers/user'

function Home() {
  const loadFeed = useFeedStore((state: FeedState) => state.loadFeed)
  const user = useUserStore((state: UserState) => state.user)
  const profile = useUserStore((state: UserState) => state.profile)
  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <div className='flex flex-row w-full App columns-3'>
      <LeftBar user={user} profile={profile} />
      <Feed />
      <RightBar />
    </div>
  )
}

export default Home

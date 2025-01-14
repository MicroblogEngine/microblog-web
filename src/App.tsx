import { useEffect } from 'react'
import './App.css'

import { FeedState, useStore } from './reducers/feed'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import Feed from '@/components/Feed'

function App() {
  const loadFeed = useStore((state: FeedState) => state.loadFeed)

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

export default App

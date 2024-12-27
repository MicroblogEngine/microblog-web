import { useEffect } from 'react'
import './App.css'

import { FeedState, useStore } from '@/states/feed'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import Feed from '@/components/Feed'

function App() {
  const loadFeed = useStore((state: FeedState) => state.loadFeed)

  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <div className='App flex flex-row w-full columns-3'>
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  )
}

export default App

import { useEffect } from 'react'
import './App.css'

import { FeedState, useStore } from '@/states/feed'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import FeedList from '@/components/FeedList'

function App() {
  const isLoading = useStore((state: FeedState) => state.isLoading)
  const loadFeed = useStore((state: FeedState) => state.loadFeed)

  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <>
      <div className='App prose'>
        <h1>Microblog</h1>
        <LeftBar />
        <RightBar />
        {isLoading ? <p>Loading...</p> : <FeedList />}    
      </div>
    </>
  )
}

export default App

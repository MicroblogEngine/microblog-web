import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Post } from '@/models/feed';
import { FeedState, useStore } from '@/states/feed'

function App() {
  //const isLoading = useStore((state: FeedState) => state.isLoading)
  const feed = useStore((state: FeedState) => state.feed)
  const loadFeed = useStore((state: FeedState) => state.loadFeed)

  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Microblog</h1>
      <div className="card">
        {feed?.map((post: Post) => {
          return <p>{post.text}</p>
        })}
      </div>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { feedApi } from './helpers/api'
import { Post } from './models/feed'

function App() {
  const [feed, setFeed] = useState<Post[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const feed = (await feedApi.get<Post[]>('/feed')).data || [];
      setFeed(feed);
    }
    fetchData();
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
        {feed.map(person => {
          return <p>{person.text}</p>
        })}
      </div>
    </>
  )
}

export default App

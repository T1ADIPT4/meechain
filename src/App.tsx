import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {config.features.quests && quests.length > 0 ? (
  <QuestList quests={quests} />
) : (
  <div style={{ marginTop: 24 }}>
    <em>No quests available for this workspace/network.</em>
  </div>
)}
    </>
  )
}

export default App

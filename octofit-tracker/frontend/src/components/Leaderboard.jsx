import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection(endpoint).then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><div className="section-heading"><div><span className="eyebrow">Friendly competition</span><h1>Leaderboard</h1></div><span className="count-badge">This week</span></div><div className="leaderboard">{entries.map((entry) => <article className={`data-card rank-${entry.rank}`} key={entry._id}><span className="rank">0{entry.rank}</span><div className="avatar">{entry.user?.avatar ?? '?'}</div><div className="flex-grow-1"><h2>{entry.user?.name ?? 'OctoFit member'}</h2><p>{entry.streakDays} day streak</p></div><strong className="points">{entry.points.toLocaleString()} <small>pts</small></strong></article>)}</div></section>
}

export default Leaderboard

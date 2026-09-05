import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection(endpoint).then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><div className="section-heading"><div><span className="eyebrow">Collective energy</span><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div><div className="row g-3">{teams.map((team) => <article className="col-md-6" key={team._id}><div className="data-card team-card"><div><h2>{team.name}</h2><p>{team.motto}</p><span className="meta">{team.members?.length ?? 0} members</span></div><strong>{team.totalPoints.toLocaleString()}<small> pts</small></strong></div></article>)}</div></section>
}

export default Teams

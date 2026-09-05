import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const endpoint = '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection(endpoint).then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><div className="section-heading"><div><span className="eyebrow">Latest signals</span><h1>Activity feed</h1></div><span className="count-badge">{activities.length} sessions</span></div><div className="activity-list">{activities.map((activity) => <article className="data-card activity-card" key={activity._id}><div className="activity-icon">{activity.type.slice(0, 1)}</div><div className="flex-grow-1"><h2>{activity.type}</h2><p>{activity.user?.name ?? 'OctoFit member'}</p></div><div className="activity-stat"><strong>{activity.durationMinutes}</strong><span>minutes</span></div><div className="activity-stat"><strong>{activity.calories}</strong><span>calories</span></div></article>)}</div></section>
}

export default Activities

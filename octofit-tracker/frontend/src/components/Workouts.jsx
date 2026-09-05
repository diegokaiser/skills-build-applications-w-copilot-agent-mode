import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><div className="section-heading"><div><span className="eyebrow">Your next session</span><h1>Workout library</h1></div><span className="count-badge">{workouts.length} plans</span></div><div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id}><div className="data-card workout-card"><div className="workout-top"><span className="category">{workout.category}</span><span className="duration">{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.exercises?.join(' · ')}</p><span className="meta">{workout.difficulty}</span></div></article>)}</div></section>
}

export default Workouts

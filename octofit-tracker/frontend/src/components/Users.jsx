import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><div className="section-heading"><div><span className="eyebrow">Community</span><h1>People in motion</h1></div><span className="count-badge">{users.length} members</span></div><div className="row g-3">{users.map((user) => <article className="col-md-6 col-xl-4" key={user._id}><div className="data-card"><div className="avatar">{user.avatar}</div><div><h2>{user.name}</h2><p>{user.email}</p><span className="meta">Level {user.level}</span></div></div></article>)}</div></section>
}

export default Users

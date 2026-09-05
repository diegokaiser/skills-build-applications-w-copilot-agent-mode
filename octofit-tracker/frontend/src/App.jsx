import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activity</NavLink><NavLink to="/workouts">Workouts</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">People</NavLink>
        </nav>
        <span className="status-dot">Live data</span>
      </header>
      <main className="content"><Routes><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></main>
      <footer>OCTOFIT TRACKER <span>•</span> BUILD YOUR BEST ROUTINE</footer>
    </div>
  )
}

export default App

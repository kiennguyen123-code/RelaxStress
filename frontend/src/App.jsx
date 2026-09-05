import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Home, Compass, Bell, User, Plus } from 'lucide-react'
import HomePage from './pages/HomePage'
import MoodPage from './pages/MoodPage'
import MeditationPage from './pages/MeditationPage'
import MoodTrackerPage from './pages/MoodTrackerPage'
import ExercisesPage from './pages/ExercisesPage'
import './index.css'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="bottom-nav">
      <button className={`nav-item ${path === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <div className="nav-icon"><Home size={20} /></div>
        <span className="nav-label">Home</span>
      </button>

      <button className={`nav-item ${path === '/exercises' ? 'active' : ''}`} onClick={() => navigate('/exercises')}>
        <div className="nav-icon"><Compass size={20} /></div>
        <span className="nav-label">Explore</span>
      </button>

      <button className="nav-add-btn" onClick={() => navigate('/mood')}>
        <Plus size={24} />
      </button>

      <button className={`nav-item ${path === '/tracker' ? 'active' : ''}`} onClick={() => navigate('/tracker')}>
        <div className="nav-icon"><Bell size={20} /></div>
        <span className="nav-label">Tracker</span>
      </button>

      <button className={`nav-item ${path === '/profile' ? 'active' : ''}`}>
        <div className="nav-icon"><User size={20} /></div>
        <span className="nav-label">Profile</span>
      </button>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="time">9:41</span>
      <div className="status-icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="4" width="3" height="7" rx="1" fill="#4A5568"/>
          <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill="#4A5568"/>
          <rect x="9" y="1" width="3" height="10" rx="1" fill="#4A5568"/>
          <rect x="13.5" y="0" width="2.5" height="11" rx="1" fill="#4A5568"/>
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 4C13.6 1.9 11 0.5 8 0.5C5 0.5 2.4 1.9 0.5 4L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5Z" fill="#4A5568"/>
          <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.2 5.8C11.8 4.5 10 3.5 8 3.5C6 3.5 4.2 4.5 2.8 5.8L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="#4A5568"/>
          <circle cx="8" cy="9.5" r="1.5" fill="#4A5568"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#4A5568" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="#4A5568"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="#4A5568" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <StatusBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/tracker" element={<MoodTrackerPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

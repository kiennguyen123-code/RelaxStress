import { useNavigate } from 'react-router-dom'
import { Bell, Wind, Leaf, Droplets, Brain, Waves, ArrowRight } from 'lucide-react'

const exercises = [
  { id: 1, icon: '💨', iconBg: '#e8f4f0', title: 'Breathe & Unwind', desc: 'Calming visualization and breathe inwind', tag: '5 min', path: '/meditation' },
  { id: 2, icon: '🍃', iconBg: '#e8f0e8', title: 'Forest Walk', desc: 'Nature sounds & mindful walking', tag: '10 min', path: '/exercises' },
  { id: 3, icon: '💧', iconBg: '#e8eef8', title: 'Water Flow', desc: 'Ocean breathing & body scan', tag: '8 min', path: '/exercises' },
  { id: 4, icon: '🧠', iconBg: '#f4e8f4', title: 'Mind Clear', desc: 'Guided focus & clarity session', tag: '12 min', path: '/exercises' },
]

const naturalIcons = [
  { emoji: '🌿', label: 'Nature' },
  { emoji: '💨', label: 'Breaths' },
  { emoji: '💧', label: 'Water' },
  { emoji: '🧠', label: 'Neurons' },
  { emoji: '☀️', label: 'Energy' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="app-title">RelaxStress</span>
        <button className="icon-btn">
          <Bell size={18} color="#6b9e8f" />
        </button>
      </div>

      {/* Greeting */}
      <div style={{ padding: '0 24px 20px' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#2d3748', marginBottom: 4 }}>
          Good evening 🌙
        </div>
        <div style={{ fontSize: 14, color: '#8a9bb0', fontWeight: 500 }}>
          Help your cell stress threshold lifts.
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats" style={{ marginBottom: 20 }}>
        <div className="stat-card" onClick={() => navigate('/tracker')}>
          <div className="stat-card-icon">😌</div>
          <div className="stat-card-value">7.2</div>
          <div className="stat-card-label">Mood Score</div>
        </div>
        <div className="stat-card" onClick={() => navigate('/exercises')}>
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">5</div>
          <div className="stat-card-label">Sessions Done</div>
        </div>
      </div>

      {/* Natural Icons Row */}
      <div style={{ padding: '0 24px 8px', fontSize: 13, fontWeight: 700, color: '#8a9bb0', letterSpacing: '0.5px' }}>
        NATURAL ICONS
      </div>
      <div className="nature-icons-row" style={{ paddingBottom: 20 }}>
        {naturalIcons.map((icon) => (
          <div key={icon.label} className="nature-chip">
            <div className="nature-chip-icon">{icon.emoji}</div>
            <span className="nature-chip-label">{icon.label}</span>
          </div>
        ))}
      </div>

      {/* Hero Feature Card */}
      <div className="hero-card fade-in-up" onClick={() => navigate('/meditation')} style={{ cursor: 'pointer' }}>
        <div className="hero-card-label">FEATURED</div>
        <div className="hero-card-title">Breathe &<br />Unwind</div>
        <div className="hero-card-desc">Calming · visualization and<br />breathe inwind.</div>
        <button className="calm-btn" onClick={(e) => { e.stopPropagation(); navigate('/meditation') }}>
          <Wind size={16} />
          Calm Mode
        </button>
        <div className="hero-icon breathe-anim">
          <Wind size={32} color="white" />
        </div>
      </div>

      {/* Exercises Section */}
      <div className="section-title">Exercises</div>
      <div className="exercises-scroll" style={{ paddingBottom: 8 }}>
        {exercises.map((ex) => (
          <div key={ex.id} className="exercise-card" onClick={() => navigate(ex.path)}>
            <div className="exercise-card-icon" style={{ background: ex.iconBg }}>
              {ex.icon}
            </div>
            <div className="exercise-card-title">{ex.title}</div>
            <div className="exercise-card-desc">{ex.desc}</div>
            <span className="exercise-card-tag">{ex.tag}</span>
          </div>
        ))}
      </div>

      {/* Mood Section */}
      <div className="section-title">Today's Mood</div>
      <div style={{ margin: '0 20px 8px' }}>
        <div
          className="info-card"
          onClick={() => navigate('/mood')}
          style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f4f0 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: '#8a9bb0', fontWeight: 600, marginBottom: 4 }}>How are you feeling?</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2d3748' }}>Track your Mood 💧</div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #a8d5c2, #9ba8d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22
            }}>🍃</div>
          </div>
          <div className="mood-emojis" style={{ padding: '16px 0 0' }}>
            {['😢', '😞', '😐', '😊', '😄'].map((emoji, i) => (
              <div key={i} className="mood-emoji-btn" style={{ width: 42, height: 42, fontSize: 20 }}>{emoji}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

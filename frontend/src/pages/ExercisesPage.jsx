import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

const allExercises = [
  {
    id: 1, emoji: '💨', bg: 'linear-gradient(135deg, #8bbcaa, #6b9e8f)',
    title: 'Breathe & Unwind', desc: 'Deep breathing with calming visualization',
    duration: '5 min', category: 'Breathing', stress: '1-5'
  },
  {
    id: 2, emoji: '🌊', bg: 'linear-gradient(135deg, #9ba8d4, #7585c0)',
    title: 'Ocean Flow', desc: 'Rhythmic breathing like ocean waves',
    duration: '8 min', category: 'Breathing', stress: '3-7'
  },
  {
    id: 3, emoji: '🧘', bg: 'linear-gradient(135deg, #c8d5a4, #9ab870)',
    title: 'Body Scan', desc: 'Progressive muscle relaxation technique',
    duration: '12 min', category: 'Meditation', stress: '5-9'
  },
  {
    id: 4, emoji: '🍃', bg: 'linear-gradient(135deg, #a8d5a0, #68a860)',
    title: 'Forest Walk', desc: 'Mindful walk in a serene forest',
    duration: '10 min', category: 'Mindfulness', stress: '2-6'
  },
  {
    id: 5, emoji: '🔮', bg: 'linear-gradient(135deg, #d4a8d4, #a870a8)',
    title: 'Mind Clear', desc: 'Clarity & focus visualization',
    duration: '15 min', category: 'Meditation', stress: '6-10'
  },
  {
    id: 6, emoji: '☀️', bg: 'linear-gradient(135deg, #f0c878, #d4a050)',
    title: 'Morning Energy', desc: 'Sunrise energy boost breathing',
    duration: '6 min', category: 'Breathing', stress: '1-4'
  },
]

const categories = ['All', 'Breathing', 'Meditation', 'Mindfulness']

export default function ExercisesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allExercises.filter(ex =>
    (activeCategory === 'All' || ex.category === activeCategory) &&
    ex.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="app-title">Exercises</span>
        <button className="icon-btn"><Bell size={18} color="#6b9e8f" /></button>
      </div>

      {/* Search */}
      <div style={{ margin: '0 20px 16px', position: 'relative' }}>
        <Search size={16} color="#8a9bb0" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search exercises..."
          style={{
            width: '100%', padding: '12px 16px 12px 40px',
            borderRadius: 14, border: '1px solid #e8f0ee',
            background: '#fff', fontFamily: 'var(--font)',
            fontSize: 14, color: '#2d3748', outline: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0, padding: '8px 18px',
              borderRadius: 99, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font)', fontWeight: 700, fontSize: 13,
              background: activeCategory === cat
                ? 'linear-gradient(135deg, #8bbcaa, #6b9e8f)'
                : '#fff',
              color: activeCategory === cat ? '#fff' : '#4a5568',
              boxShadow: activeCategory === cat
                ? '0 4px 12px rgba(107,158,143,0.3)'
                : '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.25s'
            }}
          >{cat}</button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div style={{ padding: '0 20px', display: 'grid', gap: 14 }}>
        {filtered.map(ex => (
          <div
            key={ex.id}
            onClick={() => navigate('/meditation')}
            style={{
              borderRadius: 20,
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s',
              display: 'flex',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Colored sidebar */}
            <div style={{
              width: 80, minHeight: 100,
              background: ex.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 34, flexShrink: 0
            }}>
              {ex.emoji}
            </div>
            {/* Content */}
            <div style={{ padding: '16px 16px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#2d3748', marginBottom: 4 }}>{ex.title}</div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: '#6b9e8f', background: '#e8f4f0',
                  borderRadius: 99, padding: '2px 8px'
                }}>{ex.duration}</span>
              </div>
              <div style={{ fontSize: 13, color: '#8a9bb0', lineHeight: 1.4, marginBottom: 8 }}>{ex.desc}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: '#9ba8d4', background: '#eceffe',
                  borderRadius: 99, padding: '2px 8px'
                }}>{ex.category}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: '#8a9bb0', background: '#f4f6f8',
                  borderRadius: 99, padding: '2px 8px'
                }}>Stress {ex.stress}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#b0bec5', fontWeight: 600 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          No exercises found
        </div>
      )}
    </div>
  )
}

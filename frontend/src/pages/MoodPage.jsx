import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell } from 'lucide-react'

const moods = [
  { emoji: '😢', label: 'Sad', value: 1, color: '#b8c4e8' },
  { emoji: '😞', label: 'Down', value: 2, color: '#c8d8f0' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#b5d9cc' },
  { emoji: '😊', label: 'Good', value: 4, color: '#9ecdbf' },
  { emoji: '😄', label: 'Great', value: 5, color: '#7ab8a8' },
]

const causes = ['Work', 'Family', 'Health', 'Finance', 'Social', 'Sleep', 'Other']

export default function MoodPage() {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedCause, setSelectedCause] = useState(null)
  const [stressLevel, setStressLevel] = useState(5)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { navigate('/tracker') }, 1200)
  }

  return (
    <div className="page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          Home
        </button>
        <button className="icon-btn">
          <Bell size={18} color="#6b9e8f" />
        </button>
      </div>

      {/* Title */}
      <div className="page-header-title">
        Mood <span style={{ fontSize: 26 }}>💧</span>
      </div>

      {/* Mood Selection */}
      <div className="section-title" style={{ paddingTop: 12 }}>How are you feeling?</div>
      <div style={{ display: 'flex', gap: 10, padding: '0 24px 20px', justifyContent: 'space-around' }}>
        {moods.map((mood) => (
          <div
            key={mood.value}
            onClick={() => setSelectedMood(mood)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              cursor: 'pointer', transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: selectedMood?.value === mood.value ? mood.color : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
              boxShadow: selectedMood?.value === mood.value
                ? `0 4px 16px ${mood.color}88`
                : '0 2px 12px rgba(0,0,0,0.08)',
              transform: selectedMood?.value === mood.value ? 'scale(1.18)' : 'scale(1)',
              border: selectedMood?.value === mood.value ? `2px solid ${mood.color}` : '2px solid transparent',
              transition: 'all 0.25s ease'
            }}>
              {mood.emoji}
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: selectedMood?.value === mood.value ? '#4a7c6f' : '#b0bec5'
            }}>{mood.label}</span>
          </div>
        ))}
      </div>

      {/* Stress Level Slider */}
      <div style={{ margin: '0 20px 20px' }} className="info-card">
        <div className="info-card-title">Stress Level</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: '#8a9bb0', fontWeight: 600 }}>Low</span>
          <input
            type="range" min={1} max={10} value={stressLevel}
            onChange={(e) => setStressLevel(Number(e.target.value))}
            style={{
              flex: 1, height: 6, borderRadius: 99, cursor: 'pointer',
              accentColor: '#6b9e8f',
            }}
          />
          <span style={{ fontSize: 13, color: '#8a9bb0', fontWeight: 600 }}>High</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontSize: 36, fontWeight: 800,
            color: stressLevel <= 3 ? '#68a898' : stressLevel <= 6 ? '#9ba8d4' : '#d48b8b',
            transition: 'color 0.3s'
          }}>{stressLevel}</span>
          <span style={{ fontSize: 14, color: '#8a9bb0', marginLeft: 6 }}>/10</span>
        </div>
      </div>

      {/* Cause */}
      <div className="section-title" style={{ paddingTop: 0 }}>What's the cause?</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 24px 20px' }}>
        {causes.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCause(c)}
            style={{
              padding: '8px 16px',
              borderRadius: 99, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font)', fontWeight: 600, fontSize: 13,
              background: selectedCause === c
                ? 'linear-gradient(135deg, #6b9e8f, #4a7c6f)'
                : '#fff',
              color: selectedCause === c ? '#fff' : '#4a5568',
              boxShadow: selectedCause === c
                ? '0 4px 12px rgba(107,158,143,0.3)'
                : '0 2px 8px rgba(0,0,0,0.06)',
              transform: selectedCause === c ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.25s ease'
            }}
          >{c}</button>
        ))}
      </div>

      {/* Illustration */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c8e8de, #b8c4e8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52,
          boxShadow: '0 8px 32px rgba(107,158,143,0.2)'
        }} className="float-anim">
          {selectedMood ? selectedMood.emoji : '🍃'}
        </div>
      </div>

      {/* Save Button */}
      {saved ? (
        <div style={{
          margin: '0 20px 20px', padding: '16px', borderRadius: 20,
          background: 'linear-gradient(135deg, #68a898, #4a7c6f)',
          color: 'white', textAlign: 'center', fontWeight: 800, fontSize: 16,
          boxShadow: '0 6px 24px rgba(107,158,143,0.4)'
        }}>✅ Mood saved!</div>
      ) : (
        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={handleSave}
            disabled={!selectedMood}
            style={{
              width: '100%', padding: '16px',
              borderRadius: 20, border: 'none', cursor: selectedMood ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font)', fontWeight: 800, fontSize: 16,
              background: selectedMood
                ? 'linear-gradient(135deg, #8bbcaa, #6b9e8f)'
                : '#e0e8e4',
              color: selectedMood ? 'white' : '#b0bec5',
              boxShadow: selectedMood ? '0 6px 24px rgba(107,158,143,0.35)' : 'none',
              transition: 'all 0.25s ease',
              transform: selectedMood ? 'translateY(0)' : 'none',
            }}
          >
            Save Mood Check-in
          </button>
        </div>
      )}
    </div>
  )
}

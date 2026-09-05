import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

// Sample mood data: day → mood level 1-4
const moodData = {
  3: 2, 5: 1, 6: 3, 7: 4, 9: 2, 10: 3, 11: 4, 12: 4,
  13: 4, 14: 3, 15: 4, 16: 2, 18: 3, 19: 4, 20: 2, 21: 1,
  22: 4, 24: 3, 25: 2
}

export default function MoodTrackerPage() {
  const navigate = useNavigate()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selectedDay, setSelectedDay] = useState(now.getDate())
  const [activeMood, setActiveMood] = useState(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const moods = ['😢', '😞', '😐', '😊', '😄']

  return (
    <div className="page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} /> Home
        </button>
        <button className="icon-btn"><Bell size={18} color="#6b9e8f" /></button>
      </div>

      {/* Title */}
      <div className="page-header-title">
        Mood Tracker <span style={{ fontSize: 24 }}>📅</span>
      </div>

      {/* Mood Title Row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 24px 20px', fontSize: 22, fontWeight: 800, color: '#2d3748'
      }}>
        Mood <span style={{ fontSize: 26 }}>💧</span>
      </div>

      {/* Month Navigation */}
      <div className="calendar-nav">
        <button className="icon-btn" onClick={prevMonth} style={{ width: 36, height: 36 }}>
          <ChevronLeft size={16} color="#6b9e8f" />
        </button>
        <span className="calendar-month">{MONTHS[month]} {year}</span>
        <button className="icon-btn" onClick={nextMonth} style={{ width: 36, height: 36 }}>
          <ChevronRight size={16} color="#6b9e8f" />
        </button>
      </div>

      {/* Calendar */}
      <div className="calendar-grid" style={{ marginBottom: 20 }}>
        <div className="calendar-header">
          {DAYS.map((d, i) => <div key={i} className="cal-head">{d}</div>)}
        </div>
        <div className="calendar-body">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e${i}`} className="cal-day empty" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const moodLevel = moodData[day]
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
            const isSelected = day === selectedDay
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={[
                  'cal-day',
                  moodLevel ? `mood-${moodLevel}` : '',
                  isToday ? 'today' : '',
                  isSelected ? 'selected' : ''
                ].join(' ')}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Languages / Mood Section */}
      <div style={{ margin: '0 20px 16px' }} className="info-card">
        <div className="info-card-title">Languages (Mood Scale)</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-around' }}>
          {moods.map((m, i) => (
            <button
              key={i}
              className={`mood-emoji-btn ${activeMood === i ? 'active' : ''}`}
              onClick={() => setActiveMood(activeMood === i ? null : i)}
              style={{ width: 48, height: 48, fontSize: 22 }}
            >{m}</button>
          ))}
        </div>
      </div>

      {/* Mood Legend */}
      <div style={{ margin: '0 20px 16px' }} className="info-card">
        <div className="info-card-title">Mood Scale</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { color: '#c8e8de', label: 'Level 1 - Struggling', emoji: '😢' },
            { color: '#b5d9cc', label: 'Level 2 - Low', emoji: '😞' },
            { color: '#9ecdbf', label: 'Level 3 - Okay', emoji: '😐' },
            { color: '#6b9e8f', label: 'Level 4 - Great', emoji: '😄' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color }} />
              <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 600, flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unwind Suggestion */}
      <div style={{ margin: '0 20px 8px' }}>
        <div
          className="info-card"
          onClick={() => navigate('/meditation')}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #eceffe 0%, #e0f0ea 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#8a9bb0', fontWeight: 600, marginBottom: 4 }}>Recommended</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#2d3748' }}>Unwind & Relax</div>
            <div style={{ fontSize: 12, color: '#8a9bb0', marginTop: 2 }}>Start a guided session</div>
          </div>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #9ba8d4, #6b9e8f)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, boxShadow: '0 4px 14px rgba(107,158,143,0.3)'
          }}>🧘</div>
        </div>
      </div>

      {/* Add button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 20px 4px' }}>
        <button
          onClick={() => navigate('/mood')}
          style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8bbcaa, #6b9e8f)',
            border: 'none', cursor: 'pointer', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(107,158,143,0.4)',
            transition: 'all 0.25s'
          }}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  )
}

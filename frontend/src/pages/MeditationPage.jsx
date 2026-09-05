import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-react'

const tracks = [
  { title: 'Guided Meditation', artist: 'Daivin', duration: 95 },
  { title: 'Ocean Breathing', artist: 'Sera', duration: 180 },
  { title: 'Forest Calm', artist: 'Nara', duration: 240 },
]

export default function MeditationPage() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [trackIdx, setTrackIdx] = useState(0)

  const track = tracks[trackIdx]
  const elapsed = Math.floor((progress / 100) * track.duration)
  const remaining = track.duration - elapsed

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setIsPlaying(false); return 0 }
        return p + (100 / track.duration / 10)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying, track.duration])

  return (
    <div className="page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} /> Home
        </button>
        <button className="icon-btn"><Bell size={18} color="#6b9e8f" /></button>
      </div>

      {/* Landscape Scene */}
      <div className="landscape-card" style={{ margin: '0 20px 0' }}>
        <div className="landscape-scene">
          <div className="landscape-mountains" />
          <div className="landscape-water" />
          {/* Sun glow */}
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: 60, height: 60, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,230,220,0.4) 60%, transparent 100%)',
            boxShadow: '0 0 40px rgba(255,255,255,0.5)'
          }} className="breathe-anim" />
        </div>
      </div>

      {/* Player Card */}
      <div className="player-card">
        <div className="player-title">{track.title}</div>
        <div className="player-subtitle">{track.artist}</div>

        {/* Progress Bar */}
        <div className="player-progress">
          <div className="progress-bar" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress(((e.clientX - rect.left) / rect.width) * 100)
          }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-times">
            <span>{fmt(elapsed)}</span>
            <span>-{fmt(remaining)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <button className="ctrl-btn"><Shuffle size={18} /></button>
          <button className="ctrl-btn" onClick={() => { setTrackIdx(i => (i - 1 + tracks.length) % tracks.length); setProgress(0) }}>
            <SkipBack size={20} />
          </button>
          <button className="play-btn" onClick={() => setIsPlaying(p => !p)}>
            {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 3 }} />}
          </button>
          <button className="ctrl-btn" onClick={() => { setTrackIdx(i => (i + 1) % tracks.length); setProgress(0) }}>
            <SkipForward size={20} />
          </button>
          <button className="ctrl-btn"><Repeat size={18} /></button>
        </div>
      </div>

      {/* Track List */}
      <div className="section-title">More Sessions</div>
      <div style={{ padding: '0 20px' }}>
        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => { setTrackIdx(i); setProgress(0); setIsPlaying(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              background: i === trackIdx ? 'linear-gradient(135deg, #e8f4f0, #eef0fb)' : '#fff',
              borderRadius: 14, marginBottom: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              cursor: 'pointer', transition: 'all 0.25s',
              border: i === trackIdx ? '1px solid rgba(107,158,143,0.25)' : '1px solid transparent'
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: i === trackIdx
                ? 'linear-gradient(135deg, #8bbcaa, #6b9e8f)'
                : '#f0f4f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i === trackIdx ? 'white' : '#6b9e8f'
            }}>
              {i === trackIdx && isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2d3748' }}>{t.title}</div>
              <div style={{ fontSize: 12, color: '#8a9bb0', fontWeight: 500 }}>{t.artist}</div>
            </div>
            <div style={{ fontSize: 12, color: '#8a9bb0', fontWeight: 600 }}>{fmt(t.duration)}</div>
          </div>
        ))}
      </div>

      {/* Breathing Circle */}
      <div className="section-title">Breathing Guide</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 8 }}>
        <div className="breathing-circle" style={{ animation: isPlaying ? 'breathe 4s ease-in-out infinite' : 'none' }}>
          <div className="breathing-circle-inner">
            {isPlaying ? 'Breathe' : 'Start'}
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#8a9bb0', fontWeight: 600 }}>
          {isPlaying ? 'Inhale slowly... exhale...' : 'Press play to begin'}
        </div>
      </div>
    </div>
  )
}

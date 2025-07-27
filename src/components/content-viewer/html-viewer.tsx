import { useEffect, useRef, useState } from 'react';
// import { useChatPanelStore } from '../../stores/chatPanelStore';
import { useLocation } from 'react-router-dom';
import { apiProxyRequest } from '../../lib/api-client-proxy';
import type { AudioFFMPEGResponse } from '../../types/media';

export default function HtmlViewer({ url }: { url: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [highlightedElements, setHighlightedElements] = useState<HTMLElement[]>([]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // const { open, setQueryInput } = useChatPanelStore();
  const location = useLocation();

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(setHtmlContent)
      .catch(err => console.error('Failed to fetch HTML:', err));
  }, [url]);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !contentRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      const scale = containerWidth / contentWidth;
      setZoom(scale > 1 ? 1 : scale);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [htmlContent]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setIsPaused(false);
      }
    };
  }, [location]);

  useEffect(() => {
    const styleId = 'selection-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        ::selection { background: #f5f3c8; color: inherit; }
        .highlighted-line { background-color: #fcf8c2; transition: background-color 0.3s; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };



  const handleExplainClick = () => {
    const text = window.getSelection()?.toString().trim() || '';
    if (text) {
      setQueryInput(text);
      open();
    }
  };


  const base64ToArrayBuffer = (base64: string) => {
    base64 = base64.replace(/_/g, "/").replace(/-/g, "+");
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  };


  const clearHighlights = () => {
    highlightedElements.forEach(el => el.classList.remove('highlighted-line'));
    setHighlightedElements([]);
  };

  const startSpeech = async (text: string, language: string = 'hi-IN') => {
    if (!text.trim()) {
      alert('Please enter text to generate audio.');
      return;
    }

    setLoadingAudio(true);

    try {

      const payload = {
        text, language
      };
      const response = await apiProxyRequest<AudioFFMPEGResponse, typeof payload>(
        "POST",
        "Audio/synthesizeaudio",
        payload
      );


      const blob = new Blob([new Uint8Array(base64ToArrayBuffer(response.audio))], {
        type: 'audio/mpeg',
      });

      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(blob);
        setIsPlaying(true);
        setIsPaused(false);
        audioRef.current.play();
      }
    } catch (err) {
      alert('Error generating speech.');
    } finally {
      setLoadingAudio(false);
    }
  };

  const toggleSpeech = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isPaused) {
      audio.pause();
      setIsPaused(true);
    } else if (isPlaying && isPaused) {
      audio.play();
      setIsPaused(false);
    } else {
      const text = contentRef.current?.innerText || '';
      startSpeech(text);
    }
  };

  const stopSpeech = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
      clearHighlights();
    }
  };

  const seekAudio = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime += seconds;
    }
  };

  const setPlaybackSpeed = (rate: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        hidden
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={onTimeUpdate}
      />



      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2 pt-2 px-2 gap-2" style={{position:'sticky',top:0,zIndex:1,background:'white'}}>
        <div className="d-flex flex-wrap align-items-center gap-2 border p-2 rounded shadow-sm" style={{ backgroundColor: 'rgba(248,248,255,0.8)', backdropFilter: 'blur(8px)', borderColor: '#e0e0f0' }}>
          <button className="btn btn-outline-secondary btn-sm text-white bg-primary-subtle" onClick={() => seekAudio(-10)}><small>⏪ 10s</small></button>
          <button className="btn btn-outline-secondary btn-sm text-white bg-primary-subtle" onClick={() => seekAudio(10)}><small>10s ⏩</small></button>
          <button className="btn btn-primary btn-sm" style={{ padding: '4px 6px',width:'60px' }} onClick={() => setPlaybackSpeed(0.75)}><small>0.75x</small> </button>
          <button className="btn btn-primary btn-sm" style={{ padding: '4px 6px',width:'60px' }} onClick={() => setPlaybackSpeed(1)}><small>1x</small></button>
          <button className="btn btn-primary btn-sm" style={{ padding: '4px 6px',width:'60px' }} onClick={() => setPlaybackSpeed(1.5)}><small>1.5x</small></button>
          <input type="range" min="0" max="1" step="0.01" onChange={changeVolume} defaultValue="1" style={{ width: '80px' }} title="Volume" />
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={toggleSpeech}>
              {isPlaying ? (isPaused ? '▶️ Resume' : '⏸ Pause') : '🔊 Generate Audio'}
            </button>
            {isPlaying && <button className="btn btn-secondary" onClick={stopSpeech}>⏹ Stop</button>}
          </div>
          <div className="d-flex align-items-center gap-1">
            <span style={{ minWidth: '40px', fontSize: '0.8rem' }}>{formatTime(currentTime)}</span>
            <input type="range" min="0" max={duration} step="0.01" value={currentTime} onChange={onProgressChange} style={{ width: '120px' }} title="Progress" />
            <span style={{ minWidth: '40px', fontSize: '0.8rem' }}>{formatTime(duration)}</span>
          </div>
        </div>



        <div className="ms-auto d-flex gap-2">
          <button className="btn btn-info text-white" onClick={handleExplainClick}>📘 Explain Selected Text</button>

        </div>
      </div>

      <div className="prose" ref={containerRef} style={{ overflow: 'auto' }}>
        <div
          ref={contentRef}
          className="html-div origin-top-left user-select"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {loadingAudio && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255,255,255,0.95)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif" alt="Loading..." style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
          <h5 style={{ color: '#444' }}>Preparing audio...</h5>
        </div>
      )}
    </>
  );
}

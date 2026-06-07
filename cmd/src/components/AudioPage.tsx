import React, { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Pause, Trash2, Download, Volume2 } from "lucide-react";
import SiriWave from "./siriwave/siriwave.esm";

interface AudioPageProps {
  className?: string;
}

export function AudioPage({ className = "" }: AudioPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siriWaveRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [amplitude, setAmplitude] = useState(1);
  const [waveStyle, setWaveStyle] = useState<"classic" | "ios9">("classic");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize siriwave
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up existing instance
    if (siriWaveRef.current) {
      try {
        siriWaveRef.current.dispose();
      } catch (e) {}
    }

    siriWaveRef.current = new SiriWave({
      container: containerRef.current,
      style: waveStyle,
      width: containerRef.current.clientWidth || 600,
      height: containerRef.current.clientHeight || 300,
      autostart: true,
      amplitude: amplitude,
      speed: 0.2,
      color: "#3b6fff",
    });

    return () => {
      if (siriWaveRef.current) {
        try {
          siriWaveRef.current.dispose();
        } catch (e) {}
        siriWaveRef.current = null;
      }
    };
  }, [waveStyle]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Animate amplitude while recording
  useEffect(() => {
    if (isRecording) {
      const animate = () => {
        const newAmp = 0.5 + Math.random() * 1.5;
        setAmplitude(newAmp);
        if (siriWaveRef.current) {
          siriWaveRef.current.setAmplitude(newAmp);
        }
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setAmplitude(1);
      if (siriWaveRef.current) {
        siriWaveRef.current.setAmplitude(1);
        siriWaveRef.current.setSpeed(0.2);
      }
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setHasRecording(true);
    if (siriWaveRef.current) {
      siriWaveRef.current.setSpeed(0.5);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (siriWaveRef.current) {
      siriWaveRef.current.setSpeed(0.2);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const clearRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`audio-page ${className}`}>
      {/* Waveform display */}
      <div className="audio-waveform-container">
        <div
          ref={containerRef}
          className="siriwave-container"
          style={{
            width: "100%",
            height: "280px",
            borderRadius: "var(--orch-r-lg)",
            overflow: "hidden",
          }}
        />
      </div>

      {/* Recording time display */}
      <div className="audio-time-display">
        {isRecording && (
          <div className="recording-indicator">
            <span className="recording-dot" />
            <span>Recording</span>
          </div>
        )}
        <span className="time-text">{formatTime(recordingTime)}</span>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        {!isRecording ? (
          <button
            className="audio-btn audio-btn-record"
            onClick={startRecording}
            title="Start Recording"
          >
            <Mic size={20} />
          </button>
        ) : (
          <button
            className="audio-btn audio-btn-stop"
            onClick={stopRecording}
            title="Stop Recording"
          >
            <Square size={20} />
          </button>
        )}

        <button
          className="audio-btn audio-btn-play"
          onClick={togglePlayback}
          disabled={!hasRecording}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          className="audio-btn audio-btn-delete"
          onClick={clearRecording}
          disabled={!hasRecording}
          title="Clear Recording"
        >
          <Trash2 size={20} />
        </button>

        <button
          className="audio-btn audio-btn-download"
          disabled={!hasRecording}
          title="Download"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Wave style selector */}
      <div className="audio-style-selector">
        <span className="style-label">Wave Style:</span>
        <button
          className={`style-btn ${waveStyle === "classic" ? "active" : ""}`}
          onClick={() => setWaveStyle("classic")}
        >
          Classic
        </button>
        <button
          className={`style-btn ${waveStyle === "ios9" ? "active" : ""}`}
          onClick={() => setWaveStyle("ios9")}
        >
          iOS 9+
        </button>
      </div>

      {/* Volume indicator */}
      <div className="audio-volume">
        <Volume2 size={14} />
        <div className="volume-bar">
          <div
            className="volume-fill"
            style={{ width: `${Math.min(amplitude * 33, 100)}%` }}
          />
        </div>
      </div>

      <style>{`
        .audio-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 32px;
          height: 100%;
          background: var(--orch-bg-0);
        }

        .audio-waveform-container {
          width: 100%;
          max-width: 700px;
          background: var(--orch-bg-2);
          border-radius: var(--orch-r-lg);
          overflow: hidden;
          border: 1px solid var(--orch-line-2);
        }

        .siriwave-container {
          background: linear-gradient(180deg, var(--orch-bg-1) 0%, var(--orch-bg-2) 100%);
        }

        .audio-time-display {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 14px;
          color: var(--orch-fg-2);
        }

        .recording-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ef4444;
        }

        .recording-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .time-text {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 600;
          color: var(--orch-fg-1);
        }

        .audio-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .audio-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 150ms;
        }

        .audio-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .audio-btn-record {
          background: var(--orch-acc);
          color: white;
        }

        .audio-btn-record:hover:not(:disabled) {
          background: var(--orch-acc-hi);
          transform: scale(1.05);
        }

        .audio-btn-stop {
          background: #ef4444;
          color: white;
        }

        .audio-btn-stop:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .audio-btn-play {
          background: var(--orch-bg-4);
          color: var(--orch-fg-1);
        }

        .audio-btn-play:hover:not(:disabled) {
          background: var(--orch-bg-3);
          transform: scale(1.05);
        }

        .audio-btn-delete {
          background: var(--orch-bg-3);
          color: var(--orch-fg-2);
        }

        .audio-btn-delete:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .audio-btn-download {
          background: var(--orch-bg-3);
          color: var(--orch-fg-2);
        }

        .audio-btn-download:hover:not(:disabled) {
          background: rgba(101, 184, 138, 0.2);
          color: var(--orch-ok);
        }

        .audio-style-selector {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .style-label {
          font-size: 12px;
          color: var(--orch-fg-3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .style-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--orch-line-2);
          background: var(--orch-bg-2);
          color: var(--orch-fg-2);
          font-size: 12px;
          cursor: pointer;
          transition: all 150ms;
        }

        .style-btn:hover {
          background: var(--orch-bg-3);
        }

        .style-btn.active {
          background: var(--orch-acc);
          color: white;
          border-color: var(--orch-acc);
        }

        .audio-volume {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--orch-fg-3);
        }

        .volume-bar {
          width: 80px;
          height: 4px;
          background: var(--orch-bg-4);
          border-radius: 2px;
          overflow: hidden;
        }

        .volume-fill {
          height: 100%;
          background: var(--orch-acc-hi);
          transition: width 100ms;
        }
      `}</style>
    </div>
  );
}
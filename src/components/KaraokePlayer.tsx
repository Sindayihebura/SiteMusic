import { useState, useEffect, useRef } from 'react';
import { Song } from '../data/songDatabase';
import { webSpeechGenerator, generateAudio, getAudioStatus } from '../data/audioGenerator';

interface KaraokePlayerProps {
  song: Song;
  type: 'full' | 'instrumental' | 'short';
}

export default function KaraokePlayer({ song, type }: KaraokePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioData = getAudioStatus(song, type);
  const progressInterval = useRef<number | null>(null);

  // Prepare lyrics based on type
  useEffect(() => {
    if (!song.paroles) return;

    let lyricsList: string[] = [];
    if (type === 'short') {
      lyricsList = song.paroles.refrain_1.split('\n').filter(l => l.trim());
    } else {
      lyricsList = [
        ...song.paroles.introduction.split('\n').filter(l => l.trim()),
        ...song.paroles.couplet_1.split('\n').filter(l => l.trim()),
        ...song.paroles.pre_refrain_1.split('\n').filter(l => l.trim()),
        ...song.paroles.refrain_1.split('\n').filter(l => l.trim()),
        ...song.paroles.couplet_2.split('\n').filter(l => l.trim()),
        ...song.paroles.pre_refrain_2.split('\n').filter(l => l.trim()),
        ...song.paroles.refrain_2.split('\n').filter(l => l.trim()),
        ...song.paroles.pont.split('\n').filter(l => l.trim()),
        ...song.paroles.dernier_refrain.split('\n').filter(l => l.trim()),
        ...song.paroles.outro.split('\n').filter(l => l.trim())
      ];
    }
    setLyrics(lyricsList);
    setDuration(lyricsList.length * 3); // ~3 seconds per line
  }, [song, type]);

  // Handle line changes
  const handleLineChange = (lineIndex: number, line: string) => {
    setCurrentLineIndex(lineIndex);
    setCurrentLine(line);
    setProgress((lineIndex / lyrics.length) * 100);
  };

  // Handle completion
  const handleComplete = () => {
    setIsPlaying(false);
    setCurrentLine('');
    setCurrentLineIndex(0);
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Play/Pause
  const togglePlay = async () => {
    if (isPlaying) {
      webSpeechGenerator.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    } else {
      if (!audioData || audioData.audio_statut !== 'termine') {
        // Generate audio first
        await generateAudio(song, type, handleLineChange, handleComplete);
      } else {
        // Resume or restart
        if (currentLineIndex === 0) {
          await generateAudio(song, type, handleLineChange, handleComplete);
        } else {
          webSpeechGenerator.resume();
        }
      }
      setIsPlaying(true);
      
      // Update progress
      progressInterval.current = window.setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / duration);
          if (next >= 100) {
            handleComplete();
            return 0;
          }
          return next;
        });
      }, 1000);
    }
  };

  // Stop
  const stop = () => {
    webSpeechGenerator.stop();
    setIsPlaying(false);
    setCurrentLine('');
    setCurrentLineIndex(0);
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      webSpeechGenerator.stop();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (progress / 100) * duration;

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/30">
      {/* Song Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl">
          🎵
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{song.titre}</h3>
          <p className="text-sm text-gray-400">
            {song.casting_vocal?.prenom_fictif} • {type === 'full' ? 'Version complète' : type === 'instrumental' ? 'Instrumental' : '30 secondes'}
          </p>
        </div>
      </div>

      {/* Karaoke Display */}
      <div className="bg-black/40 rounded-lg p-6 mb-4 min-h-[120px] flex items-center justify-center">
        {isPlaying && currentLine ? (
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse">
              {currentLine}
            </p>
            <p className="text-sm text-gray-400">
              Ligne {currentLineIndex + 1} / {lyrics.length}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <i className="fas fa-microphone text-4xl mb-2"></i>
            <p>Cliquez sur Play pour écouter la chanson</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-gray-700 rounded-lg overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white hover:opacity-90 transition"
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg`}></i>
        </button>

        <button
          onClick={stop}
          className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600 transition"
        >
          <i className="fas fa-stop"></i>
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <i className="fas fa-volume-up text-gray-400"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Lyrics Preview */}
      {lyrics.length > 0 && (
        <div className="mt-4 max-h-40 overflow-y-auto bg-black/20 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-2">Paroles :</p>
          <div className="space-y-1">
            {lyrics.map((line, index) => (
              <p
                key={index}
                className={`text-sm transition-all ${
                  index === currentLineIndex
                    ? 'text-white font-bold text-base'
                    : index < currentLineIndex
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
        <p className="text-xs text-indigo-300">
          <i className="fas fa-info-circle mr-1"></i>
          Audio généré avec Web Speech API • Voix : {song.casting_vocal?.prenom_fictif} ({song.casting_vocal?.age_fictif} ans)
        </p>
      </div>
    </div>
  );
}

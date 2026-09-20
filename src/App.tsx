import { useState, useEffect, useRef, useCallback } from 'react';
import { songs, Song } from './data/songs';

// ============ STATIC DATA ============
const videos = [
  { id: 1, title: "Je pars de zéro - Clip Officiel", type: "Clip Vidéo", duration: "3:45", views: "125K vues", thumb: songs[0]?.image || "" },
  { id: 2, title: "Minuit sur mon téléphone - Session Live", type: "Live Session", duration: "4:30", views: "89K vues", thumb: songs[1]?.image || "" },
  { id: 3, title: "Danse sans souci - Visualizer", type: "Visualizer", duration: "3:30", views: "234K vues", thumb: songs[2]?.image || "" },
  { id: 4, title: "Making of - Album Origines", type: "Behind the Scenes", duration: "8:15", views: "67K vues", thumb: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png" }
];

const platforms = [
  { name: "Spotify", color: "#1DB954", icon: "fab fa-spotify", url: "#" },
  { name: "Apple Music", color: "#FC3C44", icon: "fab fa-apple", url: "#" },
  { name: "YouTube Music", color: "#FF0000", icon: "fab fa-youtube", url: "#" },
  { name: "Deezer", color: "#A238FF", icon: "fas fa-headphones", url: "#" },
  { name: "Amazon Music", color: "#FF9900", icon: "fab fa-amazon", url: "#" },
  { name: "Tidal", color: "#00FFFF", icon: "fas fa-water", url: "#" },
  { name: "SoundCloud", color: "#FF5500", icon: "fab fa-soundcloud", url: "#" },
  { name: "Bandcamp", color: "#1DA0C3", icon: "fab fa-bandcamp", url: "#" }
];

const socials = [
  { name: "Instagram", followers: "12.5K", icon: "fab fa-instagram", gradient: "from-purple-500 to-pink-500", url: "#" },
  { name: "TikTok", followers: "45.2K", icon: "fab fa-tiktok", gradient: "from-gray-800 to-gray-600", url: "#" },
  { name: "YouTube", followers: "8.3K", icon: "fab fa-youtube", gradient: "from-red-600 to-red-400", url: "#" },
  { name: "Twitter/X", followers: "5.1K", icon: "fab fa-x-twitter", gradient: "from-gray-900 to-gray-700", url: "#" },
  { name: "Facebook", followers: "15.8K", icon: "fab fa-facebook", gradient: "from-blue-600 to-blue-400", url: "#" }
];

// ============ AUDIO SYNTHESIZER WITH VOICE ============
class AudioSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private noteIndex = 0;
  private voice: SpeechSynthesisUtterance | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.15;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(freqs: number[]) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.playNote(freqs);
    this.intervalId = window.setInterval(() => {
      this.noteIndex = (this.noteIndex + 1) % freqs.length;
      this.playNote(freqs);
    }, 800);
  }

  private playNote(freqs: number[]) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freqs[this.noteIndex % freqs.length];
    noteGain.gain.value = 0;
    noteGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    noteGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.7);
    osc.connect(noteGain);
    noteGain.connect(this.gainNode);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
    this.oscillators.push(osc);
    osc.onended = () => {
      this.oscillators = this.oscillators.filter(o => o !== osc);
    };
  }

  singLyrics(lyrics: { time: number; text: string }[], onLyricChange: (index: number) => void) {
    if (!('speechSynthesis' in window)) return;
    let currentLyricIndex = 0;
    const speakNext = () => {
      if (!this.isPlaying || currentLyricIndex >= lyrics.length) return;
      const lyric = lyrics[currentLyricIndex];
      if (lyric.text) {
        onLyricChange(currentLyricIndex);
        this.voice = new SpeechSynthesisUtterance(lyric.text);
        this.voice.lang = 'fr-FR';
        this.voice.rate = 0.9;
        this.voice.pitch = 1.2;
        this.voice.volume = 0.8;
        const voices = speechSynthesis.getVoices();
        const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
        if (frenchVoice) this.voice.voice = frenchVoice;
        this.voice.onend = () => {
          currentLyricIndex++;
          setTimeout(speakNext, 1000);
        };
        speechSynthesis.speak(this.voice);
      } else {
        currentLyricIndex++;
        setTimeout(speakNext, 1000);
      }
    };
    speakNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
    this.oscillators.forEach(o => { try { o.stop(); } catch(e) {} });
    this.oscillators = [];
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  getIsPlaying() { return this.isPlaying; }
}

const audioSynth = new AudioSynth();

// ============ COMPONENTS ============
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 10,
    duration: 8 + Math.random() * 12, size: 2 + Math.random() * 4,
    color: ['#6366f1', '#a855f7', '#f59e0b'][Math.floor(Math.random() * 3)]
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`,
          backgroundColor: p.color, animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`, opacity: 0.6
        }} />
      ))}
    </div>
  );
}

function Visualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {Array.from({ length: 28 }, (_, i) => (
        <div key={i} className="visualizer-bar w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
          style={{ animationDuration: `${0.3 + Math.random() * 0.5}s`, animationDelay: `${i * 0.05}s`,
            animationPlayState: isPlaying ? 'running' : 'paused', height: isPlaying ? undefined : '4px' }} />
      ))}
    </div>
  );
}

function Navbar({ onFollowClick, onSupportClick, activeSection, mobileMenuOpen, setMobileMenuOpen }: {
  onFollowClick: () => void; onSupportClick: () => void; activeSection: string;
  mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void;
}) {
  const navItems = [
    { id: 'accueil', label: 'Accueil' }, { id: 'chansons', label: '🎵 Chansons' },
    { id: 'videos', label: '🎬 Vidéos' }, { id: 'artiste', label: '🎤 Artistes' },
    { id: 'ecouter', label: '🎧 Écouter' }, { id: 'supporter', label: '💎 Supporter' }
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-2 text-xl font-bold">
          <i className="fas fa-music text-indigo-400"></i>
          <span className="gradient-text font-[Playfair_Display]">MesChansons</span>
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <a key={item.id} href={`#${item.id}`}
              className={`text-sm transition-colors hover:text-indigo-400 ${activeSection === item.id ? 'text-indigo-400' : 'text-gray-300'}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={onSupportClick} className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition">💎 Me Soutenir</button>
          <button onClick={onFollowClick} className="px-4 py-2 rounded-full border border-indigo-500 text-indigo-400 text-sm font-semibold hover:bg-indigo-500 hover:text-white transition">Me Suivre</button>
        </div>
        <button className="lg:hidden text-2xl text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-indigo-400 py-2">{item.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://image.qwenlm.ai/generated-images/bc77e557-84c2-434e-8664-11bc03cfc511/_result.png" alt="Hero" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/60 via-[#0a0a14]/80 to-[#0a0a14]"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-slide-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text font-[Playfair_Display]">Mes Chansons</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">50 chansons originales avec paroles et voix</p>
        <p className="text-sm md:text-base text-gray-400 mb-8">Afrobeat • R&B • Rap • Amapiano • Pop urbaine • Gospel</p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#chansons" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition animate-pulse-glow">🎵 Écouter maintenant</a>
          <a href="#artiste" className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition">🎤 Voir les artistes</a>
          <a href="#supporter" className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:opacity-90 transition">💎 Me soutenir</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[{ value: "50", label: "Chansons" }, { value: "25K+", label: "Followers" }, { value: "20K+", label: "Likes" }, { value: "50+", label: "Pays" }].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SongCard({ song, isPlaying, isCurrentSong, onPlay, onLike, liked, onShare, onShowLyrics, onShowDetails }: {
  song: Song; isPlaying: boolean; isCurrentSong: boolean; onPlay: () => void; onLike: () => void;
  liked: boolean; onShare: () => void; onShowLyrics: () => void; onShowDetails: () => void;
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden card-hover group">
      <div className="relative aspect-square overflow-hidden">
        <img src={song.image} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button onClick={onPlay} className="w-16 h-16 rounded-full bg-indigo-500/90 flex items-center justify-center text-white text-2xl hover:scale-110 transition">
            <i className={`fas ${isCurrentSong && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
        </div>
        {isCurrentSong && isPlaying && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            <span className="playing-bar" style={{ animationDuration: '0.4s', height: '12px' }}></span>
            <span className="playing-bar" style={{ animationDuration: '0.5s', height: '16px' }}></span>
            <span className="playing-bar" style={{ animationDuration: '0.3s', height: '10px' }}></span>
            <span className="text-xs text-indigo-300 ml-1">En lecture</span>
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full glass text-xs text-gray-300">{song.genre}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{song.title}</h3>
        <p className="text-sm text-gray-400 mb-1">{song.album} • {song.duration}</p>
        <p className="text-xs text-indigo-400 mb-1"><i className="fas fa-microphone-alt mr-1"></i>{song.artist.name} ({song.artist.age} ans)</p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{song.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span><i className="fas fa-play-circle mr-1"></i>{song.streams}</span>
            <span><i className="fas fa-heart mr-1 text-red-400"></i>{liked ? song.likes + 1 : song.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onShowDetails} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 transition" title="Détails production">
              <i className="fas fa-info-circle text-xs"></i>
            </button>
            <button onClick={onShowLyrics} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-400 transition" title="Paroles">
              <i className="fas fa-align-left text-xs"></i>
            </button>
            <button onClick={onLike} className={`w-7 h-7 rounded-full flex items-center justify-center transition ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
              <i className="fas fa-heart text-xs"></i>
            </button>
            <button onClick={onShare} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-400 transition">
              <i className="fas fa-share-alt text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongsSection({ currentSong, isPlaying, onPlay, likedSongs, onLike, onShare, onShowLyrics, onShowDetails }: {
  currentSong: number | null; isPlaying: boolean; onPlay: (id: number) => void;
  likedSongs: Set<number>; onLike: (id: number) => void; onShare: (song: Song) => void;
  onShowLyrics: (song: Song) => void; onShowDetails: (song: Song) => void;
}) {
  return (
    <section id="chansons" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">🎵 Mes Chansons</h2>
        <p className="text-center text-gray-400 mb-4">50 chansons originales avec paroles, voix et production</p>
        <p className="text-center text-indigo-400 mb-12 text-sm">Afrobeat • R&B • Rap • Amapiano • Pop urbaine • Gospel • Reggaeton</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map(song => (
            <SongCard key={song.id} song={song} isPlaying={isPlaying} isCurrentSong={currentSong === song.id}
              onPlay={() => onPlay(song.id)} onLike={() => onLike(song.id)} liked={likedSongs.has(song.id)}
              onShare={() => onShare(song)} onShowLyrics={() => onShowLyrics(song)} onShowDetails={() => onShowDetails(song)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtistSection({ isPlaying, currentSong }: { isPlaying: boolean; currentSong: Song | null }) {
  const uniqueArtists = Array.from(new Set(songs.map(s => s.artist.name))).slice(0, 8);
  return (
    <section id="artiste" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">🎤 Les Artistes</h2>
        <p className="text-center text-gray-400 mb-12">Voix fictives uniques pour chaque chanson</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {songs.slice(0, 8).map((song, i) => (
            <div key={i} className="glass rounded-xl p-5 card-hover">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg mb-3">
                <i className="fas fa-microphone-alt"></i>
              </div>
              <h4 className="font-bold text-white">{song.artist.name}</h4>
              <p className="text-xs text-indigo-400 mb-1">{song.artist.age} ans • {song.artist.category}</p>
              <p className="text-xs text-gray-400 mb-2">{song.artist.texture}</p>
              <p className="text-xs text-gray-500 italic">"{song.title}"</p>
            </div>
          ))}
        </div>
        {isPlaying && currentSong && (
          <div className="glass-strong rounded-2xl p-6 text-center">
            <div className="voice-wave justify-center mb-3">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <p className="text-indigo-300 font-semibold">🎤 {currentSong.artist.name} chante</p>
            <p className="text-white text-lg font-bold mt-1">"{currentSong.title}"</p>
            <p className="text-gray-400 text-sm mt-1">{currentSong.artist.texture}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SongDetailsModal({ song, isOpen, onClose }: { song: Song | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !song) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90"></div>
      <div className="relative w-full max-w-3xl glass-strong rounded-2xl p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 sticky top-0">
          <i className="fas fa-times text-sm"></i>
        </button>
        <h3 className="text-2xl font-bold mb-1 gradient-text font-[Playfair_Display]">{song.title}</h3>
        <p className="text-gray-400 text-sm mb-6">{song.genre} • {song.album}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-3"><i className="fas fa-microphone-alt mr-2"></i>Casting Vocal</h4>
            <div className="glass rounded-xl p-4 space-y-2 text-sm">
              <p><span className="text-gray-400">Artiste :</span> <span className="text-white font-semibold">{song.artist.name}</span></p>
              <p><span className="text-gray-400">Âge :</span> <span className="text-white">{song.artist.age} ans</span></p>
              <p><span className="text-gray-400">Catégorie :</span> <span className="text-white">{song.artist.category}</span></p>
              <p><span className="text-gray-400">Type de voix :</span> <span className="text-white">{song.artist.voiceType}</span></p>
              <p><span className="text-gray-400">Texture :</span> <span className="text-white">{song.artist.texture}</span></p>
              <p className="text-indigo-300 italic text-xs mt-2">{song.artist.reason}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-3"><i className="fas fa-headphones mr-2"></i>Direction Audio</h4>
            <div className="glass rounded-xl p-4 space-y-2 text-sm">
              <p><span className="text-gray-400">Tempo :</span> <span className="text-white">{song.audio.tempo}</span></p>
              <p><span className="text-gray-400">Instruments :</span> <span className="text-white">{song.audio.instruments}</span></p>
              <p><span className="text-gray-400">Ambiance :</span> <span className="text-white">{song.audio.mood}</span></p>
              <p><span className="text-gray-400">Chant :</span> <span className="text-white">{song.audio.singing}</span></p>
              <p><span className="text-gray-400">Harmonies :</span> <span className="text-white">{song.audio.harmonies}</span></p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-indigo-400 mb-3"><i className="fas fa-video mr-2"></i>Direction Vidéo</h4>
          <div className="glass rounded-xl p-4 space-y-2 text-sm">
            <p><span className="text-gray-400">Concept :</span> <span className="text-white">{song.video.concept}</span></p>
            <p><span className="text-gray-400">Lieu :</span> <span className="text-white">{song.video.location}</span></p>
            <p><span className="text-gray-400">Moment :</span> <span className="text-white">{song.video.time}</span></p>
            <p><span className="text-gray-400">Ambiance :</span> <span className="text-white">{song.video.mood}</span></p>
            <p><span className="text-gray-400">Personnages :</span> <span className="text-white">{song.video.characters}</span></p>
            <p><span className="text-gray-400">Couleurs :</span> <span className="text-white">{song.video.colors}</span></p>
            <p><span className="text-gray-400">Lumière :</span> <span className="text-white">{song.video.lighting}</span></p>
            <p><span className="text-gray-400">Caméra :</span> <span className="text-white">{song.video.camera}</span></p>
            <p><span className="text-gray-400">Dernière scène :</span> <span className="text-white">{song.video.lastScene}</span></p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-green-400 mb-3"><i className="fas fa-magic mr-2"></i>Prompt Audio IA</h4>
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-gray-300 italic">"{song.audio.prompt}"</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-bold text-red-400 mb-3"><i className="fas fa-film mr-2"></i>Prompt Vidéo IA</h4>
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-gray-300 italic">"{song.video.prompt}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LyricsModal({ song, isOpen, onClose, currentTime }: { song: Song | null; isOpen: boolean; onClose: () => void; currentTime: number }) {
  if (!isOpen || !song) return null;
  const currentLyricIndex = song.lyrics.findIndex((lyric, index) => {
    const nextLyric = song.lyrics[index + 1];
    return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
  });
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90"></div>
      <div className="relative w-full max-w-2xl glass-strong rounded-2xl p-8 max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
          <i className="fas fa-times text-sm"></i>
        </button>
        <h3 className="text-2xl font-bold mb-1 gradient-text font-[Playfair_Display] text-center">{song.title}</h3>
        <p className="text-center text-indigo-400 text-sm mb-1">🎤 Interprété par {song.artist.name}</p>
        <p className="text-center text-gray-400 text-xs mb-6">{song.genre}</p>
        <div className="overflow-y-auto max-h-[60vh] px-4">
          <div className="space-y-4">
            {song.lyrics.map((lyric, index) => (
              <div key={index} className={`text-center transition-all duration-500 ${
                index === currentLyricIndex ? 'text-2xl font-bold text-white scale-110 lyrics-active' :
                index < currentLyricIndex ? 'text-gray-500 text-sm' : 'text-gray-400 text-base'
              }`}>
                {lyric.text || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideosSection() {
  const [videoModal, setVideoModal] = useState<typeof videos[0] | null>(null);
  return (
    <section id="videos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">🎬 Vidéos</h2>
        <p className="text-center text-gray-400 mb-12">Clips, sessions live et coulisses</p>
        <div className="mb-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group card-hover" onClick={() => setVideoModal(videos[0])}>
            <img src={videos[0].thumb} alt={videos[0].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
              <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition">
                <i className="fas fa-play ml-1"></i>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white">{videos[0].title}</h3>
              <p className="text-sm text-gray-300">{videos[0].type} • {videos[0].duration} • {videos[0].views}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {videos.slice(1).map(video => (
            <div key={video.id} className="glass rounded-xl overflow-hidden cursor-pointer card-hover group" onClick={() => setVideoModal(video)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center text-white text-xl">
                    <i className="fas fa-play ml-0.5"></i>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm text-white">{video.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{video.type} • {video.duration} • {video.views}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition">
            <i className="fab fa-youtube text-xl"></i> S'abonner sur YouTube
          </a>
        </div>
      </div>
      {videoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={() => setVideoModal(null)}>
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="relative w-full max-w-4xl glass-strong rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setVideoModal(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70">
              <i className="fas fa-times"></i>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img src={videoModal.thumb} alt={videoModal.title} className="w-full h-full object-cover absolute inset-0 opacity-50" />
              <div className="relative z-10 text-center">
                <i className="fas fa-play-circle text-6xl text-white/80 mb-4"></i>
                <p className="text-white text-lg font-bold">{videoModal.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ListenSection() {
  return (
    <section id="ecouter" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">🎧 Écouter Partout</h2>
        <p className="text-center text-gray-400 mb-12">Disponible sur toutes les plateformes de streaming</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {platforms.map((platform, i) => (
            <a key={i} href={platform.url} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-6 flex flex-col items-center gap-3 card-hover group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition group-hover:scale-110" style={{ backgroundColor: platform.color + '20', color: platform.color }}>
                <i className={platform.icon}></i>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">{platform.name}</span>
            </a>
          ))}
        </div>
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6 text-white">🛒 Acheter & Télécharger</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium hover:opacity-90 transition flex items-center gap-2"><i className="fab fa-apple"></i> iTunes Store</a>
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium hover:opacity-90 transition flex items-center gap-2"><i className="fab fa-amazon"></i> Amazon MP3</a>
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium hover:opacity-90 transition flex items-center gap-2"><i className="fab fa-bandcamp"></i> Bandcamp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  const supportOptions = [
    { name: "Tipeee", desc: "Soutien mensuel", icon: "fas fa-coffee", color: "from-green-500 to-emerald-400", url: "#" },
    { name: "Patreon", desc: "⭐ Populaire - Contenus exclusifs", icon: "fas fa-star", color: "from-orange-500 to-red-500", url: "#", popular: true },
    { name: "Buy Me a Coffee", desc: "Don ponctuel", icon: "fas fa-mug-hot", color: "from-yellow-500 to-amber-400", url: "#" }
  ];
  return (
    <section id="supporter" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">💎 Me Supporter</h2>
        <p className="text-center text-gray-400 mb-12">Votre soutien me permet de continuer à créer</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportOptions.map((option, i) => (
            <a key={i} href={option.url} target="_blank" rel="noopener noreferrer" className={`glass rounded-2xl p-8 text-center card-hover group relative ${option.popular ? 'ring-2 ring-amber-500' : ''}`}>
              {option.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">⭐ POPULAIRE</div>}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-2xl text-white mx-auto mb-4 group-hover:scale-110 transition`}>
                <i className={option.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{option.name}</h3>
              <p className="text-gray-400 text-sm">{option.desc}</p>
              <div className="mt-4 px-6 py-2 rounded-full bg-white/10 text-sm text-white inline-block group-hover:bg-white/20 transition">Soutenir →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudioPlayer({ currentSong, isPlaying, onPlayPause, onNext, onPrev, onShowLyrics }: {
  currentSong: Song | null; isPlaying: boolean; onPlayPause: () => void;
  onNext: () => void; onPrev: () => void; onShowLyrics: () => void;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (currentSong && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => { const next = prev + 1; return next >= currentSong.durationSec ? 0 : next; });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentSong, isPlaying]);
  useEffect(() => { setCurrentTime(0); }, [currentSong?.id]);
  if (!currentSong) return null;
  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none md:w-64">
            <img src={currentSong.image} alt={currentSong.title} className={`w-12 h-12 rounded-lg object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '4s' }} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
              <p className="text-xs text-gray-400 truncate">🎤 {currentSong.artist.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-4 mb-1">
              <button onClick={onPrev} className="text-gray-400 hover:text-white transition"><i className="fas fa-step-backward"></i></button>
              <button onClick={onPlayPause} className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 transition">
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button onClick={onNext} className="text-gray-400 hover:text-white transition"><i className="fas fa-step-forward"></i></button>
            </div>
            <div className="hidden md:flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 rounded-full bg-white/20 relative">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${(currentTime / currentSong.durationSec) * 100}%` }}></div>
              </div>
              <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
            </div>
          </div>
          <button onClick={onShowLyrics} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 hover:text-white transition">
            <i className="fas fa-align-left"></i><span>Paroles</span>
          </button>
          <div className="hidden lg:block"><Visualizer isPlaying={isPlaying} /></div>
        </div>
      </div>
    </div>
  );
}

function FollowModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative w-full max-w-md glass-strong rounded-2xl p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><i className="fas fa-times text-sm"></i></button>
        <h3 className="text-2xl font-bold mb-6 gradient-text font-[Playfair_Display] text-center">Me Suivre</h3>
        <div className="flex flex-col gap-3">
          {socials.map((social, i) => (
            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${social.gradient} flex items-center justify-center text-white`}><i className={social.icon}></i></div>
              <div className="flex-1"><p className="font-semibold text-white text-sm">{social.name}</p><p className="text-xs text-gray-400">{social.followers} followers</p></div>
              <i className="fas fa-external-link-alt text-gray-500 group-hover:text-indigo-400 transition"></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShareModal({ song, isOpen, onClose }: { song: Song | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !song) return null;
  const text = `🎵 Écoutez "${song.title}" par ${song.artist.name} - Musique originale !`;
  const url = window.location.href;
  const shareLinks = [
    { name: "Twitter", icon: "fab fa-x-twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { name: "Facebook", icon: "fab fa-facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "WhatsApp", icon: "fab fa-whatsapp", url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
    { name: "Telegram", icon: "fab fa-telegram", url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` }
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative w-full max-w-sm glass-strong rounded-2xl p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><i className="fas fa-times text-sm"></i></button>
        <h3 className="text-xl font-bold mb-2 text-center text-white">Partager</h3>
        <p className="text-center text-gray-400 text-sm mb-6">"{song.title}" - {song.artist.name}</p>
        <div className="grid grid-cols-2 gap-3">
          {shareLinks.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <i className={`${link.icon} text-xl text-indigo-400`}></i><span className="text-sm text-white">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [shareSong, setShareSong] = useState<Song | null>(null);
  const [lyricsSong, setLyricsSong] = useState<Song | null>(null);
  const [detailsSong, setDetailsSong] = useState<Song | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [currentTime, setCurrentTime] = useState(0);

  const currentSong = songs.find(s => s.id === currentSongId) || null;

  const handlePlay = useCallback((id: number) => {
    if (currentSongId === id) {
      if (isPlaying) { audioSynth.stop(); setIsPlaying(false); }
      else {
        const song = songs.find(s => s.id === id);
        if (song) { audioSynth.play(song.freq); audioSynth.singLyrics(song.lyrics, (index) => setCurrentTime(song.lyrics[index].time)); }
        setIsPlaying(true);
      }
    } else {
      const song = songs.find(s => s.id === id);
      if (song) { audioSynth.play(song.freq); audioSynth.singLyrics(song.lyrics, (index) => setCurrentTime(song.lyrics[index].time)); }
      setCurrentSongId(id); setIsPlaying(true);
    }
  }, [currentSongId, isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) { audioSynth.stop(); setIsPlaying(false); }
    else if (currentSong) {
      audioSynth.play(currentSong.freq);
      audioSynth.singLyrics(currentSong.lyrics, (index) => setCurrentTime(currentSong.lyrics[index].time));
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  const handleNext = useCallback(() => {
    if (!currentSongId) return;
    const idx = songs.findIndex(s => s.id === currentSongId);
    const nextSong = songs[(idx + 1) % songs.length];
    audioSynth.play(nextSong.freq);
    audioSynth.singLyrics(nextSong.lyrics, (index) => setCurrentTime(nextSong.lyrics[index].time));
    setCurrentSongId(nextSong.id); setIsPlaying(true);
  }, [currentSongId]);

  const handlePrev = useCallback(() => {
    if (!currentSongId) return;
    const idx = songs.findIndex(s => s.id === currentSongId);
    const prevSong = songs[(idx - 1 + songs.length) % songs.length];
    audioSynth.play(prevSong.freq);
    audioSynth.singLyrics(prevSong.lyrics, (index) => setCurrentTime(prevSong.lyrics[index].time));
    setCurrentSongId(prevSong.id); setIsPlaying(true);
  }, [currentSongId]);

  const handleLike = useCallback((id: number) => {
    setLikedSongs(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'chansons', 'videos', 'artiste', 'ecouter', 'supporter'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= 200 && rect.bottom >= 200) { setActiveSection(id); break; } }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white font-[Inter]">
      <Particles />
      <Navbar onFollowClick={() => setFollowModalOpen(true)} onSupportClick={() => {}} activeSection={activeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <HeroSection />
        <SongsSection currentSong={currentSongId} isPlaying={isPlaying} onPlay={handlePlay} likedSongs={likedSongs} onLike={handleLike} onShare={setShareSong} onShowLyrics={setLyricsSong} onShowDetails={setDetailsSong} />
        <ArtistSection isPlaying={isPlaying} currentSong={currentSong} />
        <VideosSection />
        <ListenSection />
        <SupportSection />
      </main>
      <footer className="border-t border-white/10 py-12 px-4 pb-28">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">© 2024 MesChansons. 50 chansons originales. Fait avec ❤️ et 🎵</div>
      </footer>
      <AudioPlayer currentSong={currentSong} isPlaying={isPlaying} onPlayPause={handlePlayPause} onNext={handleNext} onPrev={handlePrev} onShowLyrics={() => currentSong && setLyricsSong(currentSong)} />
      <FollowModal isOpen={followModalOpen} onClose={() => setFollowModalOpen(false)} />
      <ShareModal song={shareSong} isOpen={!!shareSong} onClose={() => setShareSong(null)} />
      <LyricsModal song={lyricsSong} isOpen={!!lyricsSong} onClose={() => setLyricsSong(null)} currentTime={currentTime} />
      <SongDetailsModal song={detailsSong} isOpen={!!detailsSong} onClose={() => setDetailsSong(null)} />
    </div>
  );
}

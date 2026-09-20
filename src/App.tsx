import { useState, useEffect, useRef, useCallback } from 'react';

// ============ DATA WITH LYRICS ============
const songs = [
  {
    id: 1,
    title: "Étoiles du Soir",
    album: "Lumières",
    duration: "3:45",
    durationSec: 225,
    genre: "Pop",
    description: "Une mélodie douce qui évoque les nuits étoilées et les rêves d'enfance",
    likes: 2847,
    streams: "125K",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330],
    lyrics: [
      { time: 0, text: "🎵 Étoiles du Soir 🎵" },
      { time: 5, text: "Dans le ciel immense et noir" },
      { time: 10, text: "Je cherche encore ton regard" },
      { time: 15, text: "Perdu dans mes souvenirs" },
      { time: 20, text: "" },
      { time: 22, text: "Les étoiles brillent ce soir" },
      { time: 27, text: "Comme des promesses d'espoir" },
      { time: 32, text: "Je danse sous leur lumière" },
      { time: 37, text: "Guidé par ton souvenir" },
      { time: 42, text: "" },
      { time: 44, text: "🎶 Étoiles du soir, éclairez mon chemin" },
      { time: 49, text: "Guidez-moi vers demain" },
      { time: 54, text: "Dans vos reflets argentés" },
      { time: 59, text: "Je vois ton visage aimé" },
      { time: 64, text: "" },
      { time: 66, text: "Les nuits sont longues sans toi" },
      { time: 71, text: "Mais les étoiles veillent sur moi" },
      { time: 76, text: "Elles chantent ta mélodie" },
      { time: 81, text: "Dans mon cœur à l'infini" },
      { time: 86, text: "" },
      { time: 88, text: "🎵 Étoiles du Soir 🎵" }
    ]
  },
  {
    id: 2,
    title: "Danse sous la Pluie",
    album: "Lumières",
    duration: "4:12",
    durationSec: 252,
    genre: "Pop",
    description: "Un rythme entraînant qui invite à la joie et à la liberté",
    likes: 3291,
    streams: "189K",
    image: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png",
    freq: [294, 370, 440, 587, 440, 370, 294, 370],
    lyrics: [
      { time: 0, text: "🎵 Danse sous la Pluie 🎵" },
      { time: 5, text: "Les gouttes tombent sur la ville" },
      { time: 10, text: "Je me sens libre et agile" },
      { time: 15, text: "Plus besoin de réfléchir" },
      { time: 20, text: "" },
      { time: 22, text: "Je danse sous la pluie" },
      { time: 27, text: "Oubliant tous mes soucis" },
      { time: 32, text: "Chaque goutte est un instant" },
      { time: 37, text: "De bonheur et de vivant" },
      { time: 42, text: "" },
      { time: 44, text: "🎶 Tourne, tourne, ne t'arrête pas" },
      { time: 49, text: "La pluie lave tes peines" },
      { time: 54, text: "Laisse-toi emporter" },
      { time: 59, text: "Par cette douce mélodie" },
      { time: 64, text: "" },
      { time: 66, text: "Les flaques reflètent le ciel" },
      { time: 71, text: "Je suis libre comme l'hirondelle" },
      { time: 76, text: "Rien ne peut m'arrêter" },
      { time: 81, text: "Je danse, je vis, j'aime" },
      { time: 86, text: "" },
      { time: 88, text: "🎵 Danse sous la Pluie 🎵" }
    ]
  },
  {
    id: 3,
    title: "Cœur de Verre",
    album: "Fragile",
    duration: "3:58",
    durationSec: 238,
    genre: "Ballade",
    description: "Une ballade émouvante sur la fragilité des sentiments",
    likes: 4512,
    streams: "234K",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277],
    lyrics: [
      { time: 0, text: "🎵 Cœur de Verre 🎵" },
      { time: 5, text: "Mon cœur est fragile comme du verre" },
      { time: 10, text: "Transparent mais plein de mystère" },
      { time: 15, text: "Je le protège avec soin" },
      { time: 20, text: "De peur qu'il ne se brise" },
      { time: 25, text: "" },
      { time: 27, text: "Chaque battement est précieux" },
      { time: 32, text: "Chaque amour est un adieu" },
      { time: 37, text: "Mais je continue d'aimer" },
      { time: 42, text: "Même si ça fait mal" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Cœur de verre, cœur fragile" },
      { time: 54, text: "Tu brilles mais tu trembles" },
      { time: 59, text: "Dans ce monde trop cruel" },
      { time: 64, text: "Tu cherches la tendresse" },
      { time: 69, text: "" },
      { time: 71, text: "Un jour quelqu'un comprendra" },
      { time: 76, text: "Que ton cœur vaut de l'or" },
      { time: 81, text: "Et te protégera" },
      { time: 86, text: "De toutes ses forces" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Cœur de Verre 🎵" }
    ]
  },
  {
    id: 4,
    title: "Voyage Intérieur",
    album: "Fragile",
    duration: "5:03",
    durationSec: 303,
    genre: "Acoustique",
    description: "Un voyage musical introspectif accompagné d'une guitare acoustique",
    likes: 1987,
    streams: "98K",
    image: "https://image.qwenlm.ai/generated-images/aeb30523-956c-41d6-861d-1b310f3f9a5c/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247],
    lyrics: [
      { time: 0, text: "🎵 Voyage Intérieur 🎵" },
      { time: 5, text: "Je ferme les yeux et je pars" },
      { time: 10, text: "Dans les profondeurs de mon âme" },
      { time: 15, text: "Un voyage sans carte ni plan" },
      { time: 20, text: "Vers les territoires inconnus" },
      { time: 25, text: "" },
      { time: 27, text: "Je découvre des paysages" },
      { time: 32, text: "Que je croyais oubliés" },
      { time: 37, text: "Des souvenirs enfouis" },
      { time: 42, text: "Qui refont surface doucement" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Voyage intérieur, voyage sans fin" },
      { time: 54, text: "Je me perds pour me retrouver" },
      { time: 59, text: "Dans les méandres de mon être" },
      { time: 64, text: "Je cherche ma vérité" },
      { time: 69, text: "" },
      { time: 71, text: "Chaque pas est une découverte" },
      { time: 76, text: "Chaque silence une réponse" },
      { time: 81, text: "Je suis le voyageur" },
      { time: 86, text: "De ma propre existence" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Voyage Intérieur 🎵" }
    ]
  },
  {
    id: 5,
    title: "Nuit Électrique",
    album: "Voltage",
    duration: "3:30",
    durationSec: 210,
    genre: "Électro",
    description: "Des beats puissants qui illuminent la nuit de leurs éclats",
    likes: 5623,
    streams: "312K",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [330, 415, 494, 659, 494, 415, 330, 415],
    lyrics: [
      { time: 0, text: "🎵 Nuit Électrique 🎵" },
      { time: 5, text: "Les néons s'allument dans la nuit" },
      { time: 10, text: "L'énergie circule sans répit" },
      { time: 15, text: "Les basses vibrent dans mon corps" },
      { time: 20, text: "Je suis connecté, je suis fort" },
      { time: 25, text: "" },
      { time: 27, text: "La ville pulse à l'unisson" },
      { time: 32, text: "Avec mon cœur en fusion" },
      { time: 37, text: "Chaque beat est une étincelle" },
      { time: 42, text: "Qui illumine la nuit éternelle" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Nuit électrique, nuit magique" },
      { time: 54, text: "On danse jusqu'à l'aube" },
      { time: 59, text: "L'énergie nous porte" },
      { time: 64, text: "Vers l'infini et au-delà" },
      { time: 69, text: "" },
      { time: 71, text: "Les lumières dansent autour" },
      { time: 76, text: "Dans un ballet sans retour" },
      { time: 81, text: "Cette nuit est à nous" },
      { time: 86, text: "Électrique et fou" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Nuit Électrique 🎵" }
    ]
  },
  {
    id: 6,
    title: "Jardin Secret",
    album: "Voltage",
    duration: "4:22",
    durationSec: 262,
    genre: "Indie",
    description: "Un morceau délicat qui révèle les trésors cachés de l'âme",
    likes: 2156,
    streams: "145K",
    image: "https://image.qwenlm.ai/generated-images/f47dc457-125c-4524-ab14-bcc1e7caf18d/_result.png",
    freq: [247, 311, 370, 494, 370, 311, 247, 311],
    lyrics: [
      { time: 0, text: "🎵 Jardin Secret 🎵" },
      { time: 5, text: "Dans un coin de mon cœur" },
      { time: 10, text: "Fleurit un jardin secret" },
      { time: 15, text: "Où poussent des fleurs rares" },
      { time: 20, text: "Que personne ne connaît" },
      { time: 25, text: "" },
      { time: 27, text: "Des pensées délicates" },
      { time: 32, text: "Des rêves fragiles" },
      { time: 37, text: "Qui n'éclosent qu'au calme" },
      { time: 42, text: "Des moments tranquilles" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Jardin secret, jardin magique" },
      { time: 54, text: "Tu es mon refuge" },
      { time: 59, text: "Quand le monde est trop bruyant" },
      { time: 64, text: "Je me perds dans tes allées" },
      { time: 69, text: "" },
      { time: 71, text: "Chaque fleur raconte une histoire" },
      { time: 76, text: "Chaque parfum un souvenir" },
      { time: 81, text: "Dans ce jardin intérieur" },
      { time: 86, text: "Je me laisse fleurir" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Jardin Secret 🎵" }
    ]
  }
];

const videos = [
  { id: 1, title: "Étoiles du Soir - Clip Officiel", type: "Clip Vidéo", duration: "4:02", views: "89K vues", thumb: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png" },
  { id: 2, title: "Danse sous la Pluie - Live Session", type: "Live Session", duration: "4:30", views: "156K vues", thumb: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png" },
  { id: 3, title: "Nuit Électrique - Visualizer", type: "Visualizer", duration: "3:30", views: "234K vues", thumb: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png" },
  { id: 4, title: "Making of - Album Fragile", type: "Behind the Scenes", duration: "8:15", views: "67K vues", thumb: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png" }
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
        
        // Try to find a French voice
        const voices = speechSynthesis.getVoices();
        const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
        if (frenchVoice) {
          this.voice.voice = frenchVoice;
        }
        
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
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.oscillators.forEach(o => { try { o.stop(); } catch(e) {} });
    this.oscillators = [];
    
    // Stop voice
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  getIsPlaying() { return this.isPlaying; }
}

const audioSynth = new AudioSynth();

// ============ COMPONENTS ============

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    size: 2 + Math.random() * 4,
    color: ['#6366f1', '#a855f7', '#f59e0b'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.6
          }}
        />
      ))}
    </div>
  );
}

function Visualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = 28;
  return (
    <div className="flex items-end gap-[2px] h-8">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="visualizer-bar w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
          style={{
            animationDuration: `${0.3 + Math.random() * 0.5}s`,
            animationDelay: `${i * 0.05}s`,
            animationPlayState: isPlaying ? 'running' : 'paused',
            height: isPlaying ? undefined : '4px'
          }}
        />
      ))}
    </div>
  );
}

function Navbar({ onFollowClick, onSupportClick, activeSection, mobileMenuOpen, setMobileMenuOpen }: {
  onFollowClick: () => void;
  onSupportClick: () => void;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'chansons', label: '🎵 Chansons' },
    { id: 'videos', label: '🎬 Vidéos' },
    { id: 'artiste', label: '🎤 Artiste' },
    { id: 'ecouter', label: '🎧 Écouter' },
    { id: 'supporter', label: '💎 Supporter' },
    { id: 'apropos', label: 'À propos' }
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
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-colors hover:text-indigo-400 ${activeSection === item.id ? 'text-indigo-400' : 'text-gray-300'}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button onClick={onSupportClick} className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition">
            💎 Me Soutenir
          </button>
          <button onClick={onFollowClick} className="px-4 py-2 rounded-full border border-indigo-500 text-indigo-400 text-sm font-semibold hover:bg-indigo-500 hover:text-white transition">
            Me Suivre
          </button>
        </div>

        <button className="lg:hidden text-2xl text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-indigo-400 py-2">
                {item.label}
              </a>
            ))}
            <button onClick={() => { onFollowClick(); setMobileMenuOpen(false); }} className="mt-2 px-4 py-2 rounded-full border border-indigo-500 text-indigo-400 text-sm font-semibold">
              Me Suivre
            </button>
            <button onClick={() => { onSupportClick(); setMobileMenuOpen(false); }} className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold">
              💎 Me Soutenir
            </button>
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
        <img
          src="https://image.qwenlm.ai/generated-images/bc77e557-84c2-434e-8664-11bc03cfc511/_result.png"
          alt="Hero"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/60 via-[#0a0a14]/80 to-[#0a0a14]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-slide-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text font-[Playfair_Display]">
          Mes Chansons
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Musique originale avec paroles disponibles sur toutes les plateformes
        </p>
        <p className="text-sm md:text-base text-gray-400 mb-8">
          Spotify • Apple Music • YouTube • Deezer • Amazon • Tidal
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#chansons" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition animate-pulse-glow">
            🎵 Écouter maintenant
          </a>
          <a href="#artiste" className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition">
            🎤 Voir l'artiste
          </a>
          <a href="#supporter" className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:opacity-90 transition">
            💎 Me soutenir
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: "1.1M", label: "Streams" },
            { value: "25K+", label: "Followers" },
            { value: "20K+", label: "Likes" },
            { value: "50+", label: "Pays" }
          ].map((stat, i) => (
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

function SongCard({ song, isPlaying, isCurrentSong, onPlay, onLike, liked, onShare, onShowLyrics }: {
  song: typeof songs[0];
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: () => void;
  onLike: () => void;
  liked: boolean;
  onShare: () => void;
  onShowLyrics: () => void;
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
            <span className="playing-bar" style={{ animationDuration: '0.6s', height: '14px' }}></span>
            <span className="text-xs text-indigo-300 ml-1">En lecture</span>
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full glass text-xs text-gray-300">
          {song.genre}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{song.title}</h3>
        <p className="text-sm text-gray-400 mb-1">{song.album} • {song.duration}</p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{song.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span><i className="fas fa-play-circle mr-1"></i>{song.streams}</span>
            <span><i className="fas fa-heart mr-1 text-red-400"></i>{liked ? song.likes + 1 : song.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onShowLyrics} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-400 transition" title="Voir les paroles">
              <i className="fas fa-align-left"></i>
            </button>
            <button onClick={onLike} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${liked ? 'text-red-500 animate-heartbeat' : 'text-gray-400 hover:text-red-400'}`}>
              <i className={`fas fa-heart`}></i>
            </button>
            <button onClick={onShare} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-400 transition">
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongsSection({ currentSong, isPlaying, onPlay, likedSongs, onLike, onShare, onShowLyrics }: {
  currentSong: number | null;
  isPlaying: boolean;
  onPlay: (id: number) => void;
  likedSongs: Set<number>;
  onLike: (id: number) => void;
  onShare: (song: typeof songs[0]) => void;
  onShowLyrics: (song: typeof songs[0]) => void;
}) {
  return (
    <section id="chansons" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          🎵 Mes Chansons
        </h2>
        <p className="text-center text-gray-400 mb-12">Découvrez mes créations musicales avec paroles</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              isCurrentSong={currentSong === song.id}
              onPlay={() => onPlay(song.id)}
              onLike={() => onLike(song.id)}
              liked={likedSongs.has(song.id)}
              onShare={() => onShare(song)}
              onShowLyrics={() => onShowLyrics(song)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtistSection({ isPlaying, currentSong }: { isPlaying: boolean; currentSong: typeof songs[0] | null }) {
  return (
    <section id="artiste" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          🎤 L'Artiste
        </h2>
        <p className="text-center text-gray-400 mb-12">Découvrez la voix derrière les chansons</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Artist Image/Video */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden glass artist-glow">
              <img
                src="https://image.qwenlm.ai/generated-images/1184f475-3233-4eba-a5f1-4f434fa6d2b8/_result.png"
                alt="Artiste"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {isPlaying && currentSong && (
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="voice-wave">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="text-red-400 text-sm font-semibold">🎤 L'artiste chante</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{currentSong.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    <i className="fas fa-microphone-alt mr-1 text-indigo-400"></i>
                    Interprété en direct
                  </p>
                </div>
              )}
              
              {!isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">🎤 Artiste Interprète</h3>
                  <p className="text-gray-300 text-sm">Cliquez sur une chanson pour entendre la voix</p>
                </div>
              )}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur-xl"></div>
          </div>

          {/* Artist Info */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-4 font-[Playfair_Display]">
              Une voix, une âme, des émotions
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Passionné de musique depuis toujours, je mets mon cœur et mon âme dans chaque chanson. 
              Ma voix est le véhicule de mes émotions, de mes histoires, de mes rêves.
            </p>
            <p className="text-gray-400 mb-4">
              Chaque note chantée est une invitation à partager un moment unique, une connexion authentique 
              entre l'artiste et son public. 🎵
            </p>
            <div className="glass rounded-xl p-4 mb-8 border-l-4 border-indigo-500">
              <p className="text-indigo-300 text-sm italic">
                🎤 <strong>Mode Karaoké activé !</strong> Cliquez sur une chanson pour entendre la voix de l'artiste chanter les paroles en français. Les paroles s'affichent en temps réel !
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-3xl font-bold gradient-text mb-1">6</div>
                <div className="text-sm text-gray-400">Chansons originales</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-3xl font-bold gradient-text mb-1">100%</div>
                <div className="text-sm text-gray-400">Authentique</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full glass text-sm text-gray-300">🎤 Chanteur</span>
              <span className="px-4 py-2 rounded-full glass text-sm text-gray-300">🎵 Compositeur</span>
              <span className="px-4 py-2 rounded-full glass text-sm text-gray-300">✍️ Parolier</span>
              <span className="px-4 py-2 rounded-full glass text-sm text-gray-300">🎸 Multi-instrumentiste</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideosSection() {
  const [videoModal, setVideoModal] = useState<typeof videos[0] | null>(null);

  return (
    <section id="videos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          🎬 Vidéos
        </h2>
        <p className="text-center text-gray-400 mb-12">Clips, sessions live et coulisses</p>

        {/* Main video */}
        <div className="mb-8">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group card-hover"
            onClick={() => setVideoModal(videos[0])}
          >
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

        {/* Other videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {videos.slice(1).map(video => (
            <div
              key={video.id}
              className="glass rounded-xl overflow-hidden cursor-pointer card-hover group"
              onClick={() => setVideoModal(video)}
            >
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
            <i className="fab fa-youtube text-xl"></i>
            S'abonner sur YouTube
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={() => setVideoModal(null)}>
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="relative w-full max-w-4xl glass-strong rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setVideoModal(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70">
              <i className="fas fa-times"></i>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center">
                <img src={videoModal.thumb} alt={videoModal.title} className="w-full h-full object-cover absolute inset-0 opacity-50" />
                <div className="relative z-10">
                  <i className="fas fa-play-circle text-6xl text-white/80 mb-4"></i>
                  <p className="text-white text-lg font-bold">{videoModal.title}</p>
                  <p className="text-gray-300 text-sm mt-2">Lecture vidéo (démo)</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{videoModal.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{videoModal.type} • {videoModal.duration} • {videoModal.views}</p>
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          🎧 Écouter Partout
        </h2>
        <p className="text-center text-gray-400 mb-12">Disponible sur toutes les plateformes de streaming</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {platforms.map((platform, i) => (
            <a
              key={i}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 card-hover group"
            >
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
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium hover:opacity-90 transition flex items-center gap-2">
              <i className="fab fa-apple"></i> iTunes Store
            </a>
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium hover:opacity-90 transition flex items-center gap-2">
              <i className="fab fa-amazon"></i> Amazon MP3
            </a>
            <a href="#" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium hover:opacity-90 transition flex items-center gap-2">
              <i className="fab fa-bandcamp"></i> Bandcamp
            </a>
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          💎 Me Supporter
        </h2>
        <p className="text-center text-gray-400 mb-12">Votre soutien me permet de continuer à créer</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportOptions.map((option, i) => (
            <a
              key={i}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass rounded-2xl p-8 text-center card-hover group relative ${option.popular ? 'ring-2 ring-amber-500' : ''}`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">
                  ⭐ POPULAIRE
                </div>
              )}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-2xl text-white mx-auto mb-4 group-hover:scale-110 transition`}>
                <i className={option.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{option.name}</h3>
              <p className="text-gray-400 text-sm">{option.desc}</p>
              <div className="mt-4 px-6 py-2 rounded-full bg-white/10 text-sm text-white inline-block group-hover:bg-white/20 transition">
                Soutenir →
              </div>
            </a>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">🛍️ Boutique Officielle</h3>
          <p className="text-gray-400 mb-6">T-shirts, vinyls, posters et plus encore</p>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
            <i className="fas fa-shopping-bag"></i> Voir la boutique
          </a>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-[Playfair_Display]">
          📱 Réseaux Sociaux
        </h2>
        <p className="text-center text-gray-400 mb-12">Suivez-moi pour ne rien manquer</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 text-center card-hover group"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.gradient} flex items-center justify-center text-xl text-white mx-auto mb-3 group-hover:scale-110 transition`}>
                <i className={social.icon}></i>
              </div>
              <h4 className="font-semibold text-white text-sm">{social.name}</h4>
              <p className="text-indigo-400 text-sm font-bold mt-1">{social.followers}</p>
              <div className="mt-3 px-4 py-1.5 rounded-full bg-white/10 text-xs text-white inline-block group-hover:bg-indigo-500 transition">
                Suivre
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ isPlaying }: { isPlaying: boolean }) {
  return (
    <section id="apropos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text font-[Playfair_Display]">
              À Propos
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Passionné de musique depuis toujours, je crée des chansons qui touchent le cœur et font vibrer l'âme. 
              Chaque morceau est une histoire, une émotion partagée avec vous. De la pop douce à l'électro énergique, 
              mon univers musical est diversifié mais toujours authentique.
            </p>
            <p className="text-gray-400 mb-8">
              Merci de me suivre dans cette aventure musicale. Votre soutien est ma plus grande motivation. 🎵
            </p>
            <div className="flex flex-wrap gap-3">
              {['🎵 Multi-genre', '🌍 International', '❤️ Authentique', '🎤 En studio'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass text-sm text-gray-300">{tag}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`relative w-64 h-64 md:w-80 md:h-80 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 opacity-20 blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src="https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png"
                  alt="Vinyle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0a0a14] border-4 border-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-strong rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-[Playfair_Display]">
              📧 Newsletter
            </h2>
            <p className="text-gray-300 mb-2">Restez informé des nouvelles sorties</p>
            <p className="text-amber-400 text-sm mb-6 font-medium">🎁 Recevez un titre inédit gratuitement !</p>

            {subscribed ? (
              <div className="text-green-400 text-lg font-semibold">
                <i className="fas fa-check-circle mr-2"></i>
                Merci ! Vérifiez votre boîte mail 🎉
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
                />
                <button type="submit" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <i className="fas fa-music text-indigo-400"></i>
              <span className="gradient-text font-[Playfair_Display]">MesChansons</span>
            </div>
            <p className="text-gray-400 text-sm">
              Musique originale avec paroles disponible dans le monde entier. Merci pour votre soutien ! 🎵
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Écouter</h4>
            <div className="flex flex-col gap-2">
              {['Spotify', 'Apple Music', 'YouTube Music', 'Deezer'].map((p, i) => (
                <a key={i} href="#" className="text-gray-400 text-sm hover:text-indigo-400 transition">{p}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Suivez-moi</h4>
            <div className="flex gap-3">
              {['fab fa-instagram', 'fab fa-tiktok', 'fab fa-youtube', 'fab fa-x-twitter', 'fab fa-facebook'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/20 transition">
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 text-sm">
          © 2024 MesChansons. Tous droits réservés. Fait avec ❤️ et 🎵
        </div>
      </div>
    </footer>
  );
}

function AudioPlayer({ currentSong, isPlaying, onPlayPause, onNext, onPrev, progress, onSeek, onShowLyrics }: {
  currentSong: typeof songs[0] | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress: number;
  onSeek: (v: number) => void;
  onShowLyrics: () => void;
}) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (currentSong && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next >= currentSong.durationSec) return 0;
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    setCurrentTime(0);
  }, [currentSong?.id]);

  if (!currentSong) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Song info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none md:w-64">
            <img src={currentSong.image} alt={currentSong.title} className={`w-12 h-12 rounded-lg object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '4s' }} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentSong.album}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-4 mb-1">
              <button onClick={onPrev} className="text-gray-400 hover:text-white transition">
                <i className="fas fa-step-backward"></i>
              </button>
              <button onClick={onPlayPause} className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 transition">
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button onClick={onNext} className="text-gray-400 hover:text-white transition">
                <i className="fas fa-step-forward"></i>
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={currentSong.durationSec}
                value={currentTime}
                onChange={e => { onSeek(Number(e.target.value)); setCurrentTime(Number(e.target.value)); }}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
            </div>
          </div>

          {/* Lyrics button */}
          <button onClick={onShowLyrics} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 hover:text-white transition" title="Voir les paroles">
            <i className="fas fa-align-left"></i>
            <span>Paroles</span>
          </button>

          {/* Visualizer */}
          <div className="hidden lg:block">
            <Visualizer isPlaying={isPlaying} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LyricsModal({ song, isOpen, onClose, currentTime }: { 
  song: typeof songs[0] | null; 
  isOpen: boolean; 
  onClose: () => void;
  currentTime: number;
}) {
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
        
        <h3 className="text-2xl font-bold mb-2 gradient-text font-[Playfair_Display] text-center">{song.title}</h3>
        <p className="text-center text-gray-400 text-sm mb-6">Paroles</p>
        
        <div className="overflow-y-auto max-h-[60vh] px-4">
          <div className="space-y-4">
            {song.lyrics.map((lyric, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 ${
                  index === currentLyricIndex
                    ? 'text-2xl font-bold text-white scale-110'
                    : index < currentLyricIndex
                    ? 'text-gray-500 text-sm'
                    : 'text-gray-400 text-base'
                }`}
              >
                {lyric.text || '\u00A0'}
              </div>
            ))}
          </div>
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
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
          <i className="fas fa-times text-sm"></i>
        </button>
        <h3 className="text-2xl font-bold mb-6 gradient-text font-[Playfair_Display] text-center">Me Suivre</h3>
        <div className="flex flex-col gap-3">
          {socials.map((social, i) => (
            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${social.gradient} flex items-center justify-center text-white`}>
                <i className={social.icon}></i>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{social.name}</p>
                <p className="text-xs text-gray-400">{social.followers} followers</p>
              </div>
              <i className="fas fa-external-link-alt text-gray-500 group-hover:text-indigo-400 transition"></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  const options = [
    { name: "Tipeee", desc: "Soutien mensuel récurrent", icon: "fas fa-heart", color: "from-green-500 to-emerald-400" },
    { name: "Patreon", desc: "Contenus exclusifs & behind the scenes", icon: "fas fa-star", color: "from-orange-500 to-red-500" },
    { name: "Buy Me a Coffee", desc: "Don ponctuel pour me soutenir", icon: "fas fa-mug-hot", color: "from-yellow-500 to-amber-400" }
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative w-full max-w-md glass-strong rounded-2xl p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
          <i className="fas fa-times text-sm"></i>
        </button>
        <h3 className="text-2xl font-bold mb-6 gradient-text font-[Playfair_Display] text-center">💎 Me Soutenir</h3>
        <p className="text-center text-gray-400 text-sm mb-6">Votre soutien me permet de continuer à créer de la musique</p>
        <div className="flex flex-col gap-3">
          {options.map((opt, i) => (
            <a key={i} href="#" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${opt.color} flex items-center justify-center text-white`}>
                <i className={opt.icon}></i>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{opt.name}</p>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </div>
              <i className="fas fa-arrow-right text-gray-500 group-hover:text-indigo-400 transition"></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShareModal({ song, isOpen, onClose }: { song: typeof songs[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !song) return null;
  const text = `🎵 Écoutez "${song.title}" - Musique originale avec paroles disponible partout !`;
  const url = window.location.href;
  const shareLinks = [
    { name: "Twitter", icon: "fab fa-x-twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { name: "Facebook", icon: "fab fa-facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}` },
    { name: "WhatsApp", icon: "fab fa-whatsapp", url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
    { name: "Telegram", icon: "fab fa-telegram", url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative w-full max-w-sm glass-strong rounded-2xl p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
          <i className="fas fa-times text-sm"></i>
        </button>
        <h3 className="text-xl font-bold mb-2 text-center text-white">Partager</h3>
        <p className="text-center text-gray-400 text-sm mb-6">"{song.title}"</p>
        <div className="grid grid-cols-2 gap-3">
          {shareLinks.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <i className={`${link.icon} text-xl text-indigo-400`}></i>
              <span className="text-sm text-white">{link.name}</span>
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
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [shareSong, setShareSong] = useState<typeof songs[0] | null>(null);
  const [lyricsSong, setLyricsSong] = useState<typeof songs[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [currentTime, setCurrentTime] = useState(0);
  const progressRef = useRef(0);

  const currentSong = songs.find(s => s.id === currentSongId) || null;

  const handlePlay = useCallback((id: number) => {
    if (currentSongId === id) {
      if (isPlaying) {
        audioSynth.stop();
        setIsPlaying(false);
      } else {
        const song = songs.find(s => s.id === id);
        if (song) {
          audioSynth.play(song.freq);
          audioSynth.singLyrics(song.lyrics, (index) => {
            setCurrentTime(song.lyrics[index].time);
          });
        }
        setIsPlaying(true);
      }
    } else {
      const song = songs.find(s => s.id === id);
      if (song) {
        audioSynth.play(song.freq);
        audioSynth.singLyrics(song.lyrics, (index) => {
          setCurrentTime(song.lyrics[index].time);
        });
      }
      setCurrentSongId(id);
      setIsPlaying(true);
    }
  }, [currentSongId, isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      audioSynth.stop();
      setIsPlaying(false);
    } else if (currentSong) {
      audioSynth.play(currentSong.freq);
      audioSynth.singLyrics(currentSong.lyrics, (index) => {
        setCurrentTime(currentSong.lyrics[index].time);
      });
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  const handleNext = useCallback(() => {
    if (!currentSongId) return;
    const idx = songs.findIndex(s => s.id === currentSongId);
    const nextIdx = (idx + 1) % songs.length;
    const nextSong = songs[nextIdx];
    audioSynth.play(nextSong.freq);
    audioSynth.singLyrics(nextSong.lyrics, (index) => {
      setCurrentTime(nextSong.lyrics[index].time);
    });
    setCurrentSongId(nextSong.id);
    setIsPlaying(true);
  }, [currentSongId]);

  const handlePrev = useCallback(() => {
    if (!currentSongId) return;
    const idx = songs.findIndex(s => s.id === currentSongId);
    const prevIdx = (idx - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIdx];
    audioSynth.play(prevSong.freq);
    audioSynth.singLyrics(prevSong.lyrics, (index) => {
      setCurrentTime(prevSong.lyrics[index].time);
    });
    setCurrentSongId(prevSong.id);
    setIsPlaying(true);
  }, [currentSongId]);

  const handleLike = useCallback((id: number) => {
    setLikedSongs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleShare = useCallback((song: typeof songs[0]) => {
    setShareSong(song);
  }, []);

  const handleShowLyrics = useCallback((song: typeof songs[0]) => {
    setLyricsSong(song);
  }, []);

  // Section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'chansons', 'videos', 'artiste', 'ecouter', 'supporter', 'apropos'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white font-[Inter]">
      <Particles />
      <Navbar
        onFollowClick={() => setFollowModalOpen(true)}
        onSupportClick={() => setSupportModalOpen(true)}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <HeroSection />
        <SongsSection
          currentSong={currentSongId}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          likedSongs={likedSongs}
          onLike={handleLike}
          onShare={handleShare}
          onShowLyrics={handleShowLyrics}
        />
        <ArtistSection isPlaying={isPlaying} currentSong={currentSong} />
        <VideosSection />
        <ListenSection />
        <SupportSection />
        <SocialSection />
        <AboutSection isPlaying={isPlaying} />
        <NewsletterSection />
      </main>

      <Footer />

      <AudioPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={progressRef.current}
        onSeek={() => {}}
        onShowLyrics={() => currentSong && setLyricsSong(currentSong)}
      />

      <FollowModal isOpen={followModalOpen} onClose={() => setFollowModalOpen(false)} />
      <SupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
      <ShareModal song={shareSong} isOpen={!!shareSong} onClose={() => setShareSong(null)} />
      <LyricsModal song={lyricsSong} isOpen={!!lyricsSong} onClose={() => setLyricsSong(null)} currentTime={currentTime} />
    </div>
  );
}

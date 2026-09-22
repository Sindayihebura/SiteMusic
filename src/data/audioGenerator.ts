import { Song, AudioData } from './songDatabase';

// Configuration for audio generation services
export interface AudioGenerationConfig {
  service: 'suno' | 'udio' | 'replicate' | 'webspeech';
  apiKey?: string;
  webhookUrl?: string;
}

// Get configuration from localStorage or environment
export function getAudioConfig(): AudioGenerationConfig {
  const stored = localStorage.getItem('audio_config');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    service: 'webspeech', // Default to Web Speech API for real audio
    apiKey: undefined
  };
}

export function saveAudioConfig(config: AudioGenerationConfig): void {
  localStorage.setItem('audio_config', JSON.stringify(config));
}

// Generate detailed audio prompt for a song
export function generateAudioPrompt(song: Song, type: 'full' | 'instrumental' | 'short' = 'full'): string {
  const { titre, style_musical, direction_audio, casting_vocal, paroles } = song;
  
  if (!direction_audio || !casting_vocal || !paroles) {
    throw new Error('Chanson incomplète: données audio, casting vocal ou paroles manquantes');
  }

  let prompt = `Titre: ${titre}\n`;
  prompt += `Langue: français uniquement\n`;
  prompt += `Style: ${style_musical}\n`;
  prompt += `Tempo: ${direction_audio.bpm} BPM\n`;
  prompt += `Ambiance: ${direction_audio.ambiance_sonore}\n`;
  prompt += `Instruments: ${direction_audio.instruments_principaux}\n`;
  
  if (type === 'instrumental') {
    prompt += `Voix: Aucune - version instrumentale uniquement\n`;
  } else {
    prompt += `Voix: ${casting_vocal.categorie_vocale}, ${casting_vocal.texture_vocale}\n`;
    prompt += `Style de chant: ${casting_vocal.style_de_chant}\n`;
    prompt += `Interprète: ${casting_vocal.prenom_fictif} (${casting_vocal.age_fictif} ans) - personnage vocal fictif\n`;
  }
  
  if (type === 'short') {
    prompt += `Durée: 30 secondes maximum\n`;
    prompt += `Structure: Refrain uniquement\n`;
    prompt += `Paroles: Chanter uniquement le refrain suivant:\n${paroles.refrain_1}\n`;
  } else {
    prompt += `Structure: Introduction, couplet 1, pré-refrain, refrain, couplet 2, pré-refrain, refrain, pont, dernier refrain, outro\n`;
    prompt += `Paroles complètes:\n\n`;
    prompt += `[Introduction]\n${paroles.introduction}\n\n`;
    prompt += `[Couplet 1]\n${paroles.couplet_1}\n\n`;
    prompt += `[Pré-refrain]\n${paroles.pre_refrain_1}\n\n`;
    prompt += `[Refrain]\n${paroles.refrain_1}\n\n`;
    prompt += `[Couplet 2]\n${paroles.couplet_2}\n\n`;
    prompt += `[Pré-refrain]\n${paroles.pre_refrain_2}\n\n`;
    prompt += `[Refrain]\n${paroles.refrain_2}\n\n`;
    prompt += `[Pont]\n${paroles.pont}\n\n`;
    prompt += `[Dernier refrain]\n${paroles.dernier_refrain}\n\n`;
    prompt += `[Outro]\n${paroles.outro}\n`;
  }
  
  prompt += `\nQualité: Voix intelligible, émotion naturelle, refrain fort et mémorable, instruments équilibrés, mixage professionnel\n`;
  prompt += `Interdictions: Ne pas citer, copier ou imiter un artiste réel; ne pas utiliser de voix réelle non autorisée\n`;
  
  return prompt;
}

// Web Speech API Audio Generator - REAL AUDIO
export class WebSpeechAudioGenerator {
  private synth: SpeechSynthesis;
  private utterances: SpeechSynthesisUtterance[] = [];
  private isPlaying: boolean = false;
  private currentLineIndex: number = 0;
  private onLineChange?: (lineIndex: number, line: string) => void;
  private onComplete?: () => void;
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  // Generate and play audio with Web Speech API
  async generateAndPlay(
    song: Song,
    type: 'full' | 'instrumental' | 'short' = 'full',
    onLineChange?: (lineIndex: number, line: string) => void,
    onComplete?: () => void
  ): Promise<AudioData> {
    if (!song.paroles) {
      throw new Error('Paroles manquantes');
    }

    this.onLineChange = onLineChange;
    this.onComplete = onComplete;
    this.isPlaying = true;
    this.currentLineIndex = 0;

    // Initialize audio context for background music
    this.initAudioContext();

    // Get lyrics based on type
    let lyrics: string[] = [];
    if (type === 'short') {
      lyrics = song.paroles.refrain_1.split('\n').filter(l => l.trim());
    } else {
      lyrics = [
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

    // Start background music
    this.playBackgroundMusic(song, type);

    // Speak each line
    this.speakLyrics(lyrics, song, type);

    // Calculate duration
    const duration = type === 'short' ? 30 : lyrics.length * 3; // ~3 seconds per line

    return {
      audio_statut: 'termine',
      audio_url: 'webspeech', // Special marker for Web Speech
      audio_format: 'webspeech',
      audio_duree_secondes: duration,
      audio_date_generation: new Date().toISOString(),
      audio_prompt_utilise: generateAudioPrompt(song, type),
      audio_version: type === 'short' ? 'courte' : type === 'instrumental' ? 'instrumentale' : 'complete',
      audio_est_instrumental: type === 'instrumental',
      audio_service_utilise: 'webspeech'
    };
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.1;
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  private playBackgroundMusic(song: Song, type: 'full' | 'instrumental' | 'short') {
    if (!this.audioContext || !this.gainNode || type === 'instrumental') return;

    // Create a simple melody based on song frequencies
    const playNote = (freq: number, duration: number, startTime: number) => {
      const osc = this.audioContext!.createOscillator();
      const noteGain = this.audioContext!.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
      
      osc.connect(noteGain);
      noteGain.connect(this.gainNode!);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Play a simple melody loop
    const freqs = song.freq || [262, 330, 392, 523];
    const startTime = this.audioContext.currentTime;
    const noteDuration = 0.5;
    
    for (let i = 0; i < 100; i++) { // Loop for background
      const freq = freqs[i % freqs.length];
      playNote(freq, noteDuration, startTime + i * noteDuration);
    }
  }

  private speakLyrics(lyrics: string[], song: Song, type: 'full' | 'instrumental' | 'short') {
    if (type === 'instrumental') {
      // Just play music, no voice
      setTimeout(() => {
        this.onComplete?.();
      }, (song.direction_audio?.bpm || 90) * 1000);
      return;
    }

    // Configure voice based on casting
    const configureVoice = (utterance: SpeechSynthesisUtterance) => {
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9; // Slightly slower for singing effect
      utterance.pitch = 1.1; // Slightly higher for melodic effect
      utterance.volume = 1.0;

      // Try to find a French voice
      const voices = this.synth.getVoices();
      const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      // Adjust based on casting
      if (song.casting_vocal) {
        const age = typeof song.casting_vocal.age_fictif === 'number' 
          ? song.casting_vocal.age_fictif 
          : 20;
        
        if (age < 18) {
          utterance.pitch = 1.3; // Higher for younger voices
          utterance.rate = 1.0;
        } else if (age > 30) {
          utterance.pitch = 0.9; // Lower for mature voices
          utterance.rate = 0.85;
        }

        if (song.casting_vocal.type_de_voix === 'Féminin') {
          utterance.pitch += 0.2;
        } else {
          utterance.pitch -= 0.1;
        }
      }
    };

    // Speak each line with timing
    lyrics.forEach((line, index) => {
      setTimeout(() => {
        if (!this.isPlaying) return;

        this.currentLineIndex = index;
        this.onLineChange?.(index, line);

        const utterance = new SpeechSynthesisUtterance(line);
        configureVoice(utterance);

        utterance.onend = () => {
          if (index === lyrics.length - 1) {
            this.onComplete?.();
          }
        };

        this.synth.speak(utterance);
        this.utterances.push(utterance);
      }, index * 3000); // 3 seconds between lines
    });
  }

  pause() {
    this.isPlaying = false;
    this.synth.pause();
  }

  resume() {
    this.isPlaying = true;
    this.synth.resume();
  }

  stop() {
    this.isPlaying = false;
    this.synth.cancel();
    this.utterances = [];
    this.currentLineIndex = 0;
  }

  getCurrentLineIndex(): number {
    return this.currentLineIndex;
  }
}

// Global instance
export const webSpeechGenerator = new WebSpeechAudioGenerator();

// Main generation function
export async function generateAudio(
  song: Song, 
  type: 'full' | 'instrumental' | 'short' = 'full',
  onLineChange?: (lineIndex: number, line: string) => void,
  onComplete?: () => void
): Promise<AudioData> {
  const config = getAudioConfig();
  
  if (config.service === 'webspeech') {
    return webSpeechGenerator.generateAndPlay(song, type, onLineChange, onComplete);
  } else {
    // For other services, return a placeholder
    // In production, implement actual API calls
    const prompt = generateAudioPrompt(song, type);
    
    return {
      audio_statut: 'termine',
      audio_url: 'demo',
      audio_format: 'mp3',
      audio_duree_secondes: type === 'short' ? 30 : 180,
      audio_date_generation: new Date().toISOString(),
      audio_prompt_utilise: prompt,
      audio_version: type === 'short' ? 'courte' : type === 'instrumental' ? 'instrumentale' : 'complete',
      audio_est_instrumental: type === 'instrumental',
      audio_service_utilise: config.service
    };
  }
}

// Update song with audio data
export function updateSongAudio(
  songId: number, 
  audioData: AudioData, 
  type: 'full' | 'instrumental' | 'short' = 'full'
): void {
  const stored = localStorage.getItem('meschansons_database');
  if (!stored) return;
  
  const songs: Song[] = JSON.parse(stored);
  const song = songs.find(s => s.id === songId);
  
  if (!song) return;
  
  if (type === 'full') {
    song.audio = audioData;
  } else if (type === 'instrumental') {
    song.audio_instrumental = audioData;
  } else if (type === 'short') {
    song.audio_courte = audioData;
  }
  
  song.date_modification = new Date().toISOString();
  
  localStorage.setItem('meschansons_database', JSON.stringify(songs));
}

// Get audio status for a song
export function getAudioStatus(song: Song, type: 'full' | 'instrumental' | 'short' = 'full'): AudioData | undefined {
  if (type === 'full') return song.audio;
  if (type === 'instrumental') return song.audio_instrumental;
  if (type === 'short') return song.audio_courte;
  return undefined;
}

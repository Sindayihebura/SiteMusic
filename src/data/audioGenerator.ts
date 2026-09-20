import { Song, AudioData } from './songDatabase';

// Configuration for audio generation services
export interface AudioGenerationConfig {
  service: 'suno' | 'udio' | 'replicate' | 'demo';
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
    service: 'demo', // Default to demo mode
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

// Simulate audio generation (for demo purposes)
// In production, this would call actual APIs like Suno, Udio, or Replicate
async function simulateAudioGeneration(song: Song, type: 'full' | 'instrumental' | 'short'): Promise<AudioData> {
  const config = getAudioConfig();
  
  // Simulate processing time (3-5 seconds)
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
  
  // In a real implementation, this would:
  // 1. Call the Suno/Udio/Replicate API
  // 2. Wait for the generation to complete
  // 3. Download the audio file
  // 4. Upload to storage (Cloudinary, AWS S3, etc.)
  // 5. Return the URL
  
  const prompt = generateAudioPrompt(song, type);
  
  // For demo, we'll create a placeholder audio URL
  // In production, replace this with actual API call
  const audioUrl = `https://example.com/audio/${song.id}-${type}-${Date.now()}.mp3`;
  
  return {
    audio_statut: 'termine',
    audio_url: audioUrl,
    audio_format: 'mp3',
    audio_duree_secondes: type === 'short' ? 30 : 180 + Math.random() * 60,
    audio_date_generation: new Date().toISOString(),
    audio_prompt_utilise: prompt,
    audio_version: type === 'short' ? 'courte' : type === 'instrumental' ? 'instrumentale' : 'complete',
    audio_est_instrumental: type === 'instrumental',
    audio_service_utilise: config.service
  };
}

// Real API integration for Suno AI
async function generateWithSunoAPI(song: Song, type: 'full' | 'instrumental' | 'short', apiKey: string): Promise<AudioData> {
  const prompt = generateAudioPrompt(song, type);
  
  try {
    // Call Suno API
    const response = await fetch('https://api.suno.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: type === 'short' ? 30 : undefined,
        instrumental: type === 'instrumental'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Suno API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Poll for completion (Suno generates asynchronously)
    let generationId = data.id;
    let status = 'processing';
    let audioUrl = '';
    
    while (status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResponse = await fetch(`https://api.suno.ai/v1/generate/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      const statusData = await statusResponse.json();
      status = statusData.status;
      
      if (status === 'completed') {
        audioUrl = statusData.audio_url;
      } else if (status === 'failed') {
        throw new Error('Audio generation failed');
      }
    }
    
    return {
      audio_statut: 'termine',
      audio_url: audioUrl,
      audio_format: 'mp3',
      audio_duree_secondes: type === 'short' ? 30 : 180,
      audio_date_generation: new Date().toISOString(),
      audio_prompt_utilise: prompt,
      audio_version: type === 'short' ? 'courte' : type === 'instrumental' ? 'instrumentale' : 'complete',
      audio_est_instrumental: type === 'instrumental',
      audio_service_utilise: 'suno'
    };
    
  } catch (error) {
    return {
      audio_statut: 'erreur',
      audio_message_erreur: error instanceof Error ? error.message : 'Erreur inconnue',
      audio_prompt_utilise: prompt,
      audio_service_utilise: 'suno'
    };
  }
}

// Main generation function
export async function generateAudio(
  song: Song, 
  type: 'full' | 'instrumental' | 'short' = 'full'
): Promise<AudioData> {
  const config = getAudioConfig();
  
  if (config.service === 'suno' && config.apiKey) {
    return generateWithSunoAPI(song, type, config.apiKey);
  } else {
    // Demo mode
    return simulateAudioGeneration(song, type);
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

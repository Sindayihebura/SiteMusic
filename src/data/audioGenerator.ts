import { Song, AudioData } from './songDatabase';

// Configuration for audio generation services
export interface AudioGenerationConfig {
  service: 'suno' | 'udio' | 'manual';
  apiKey?: string;
}

// Get configuration from localStorage
export function getAudioConfig(): AudioGenerationConfig {
  const stored = localStorage.getItem('audio_config');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    service: 'manual', // Default to manual upload
    apiKey: undefined
  };
}

export function saveAudioConfig(config: AudioGenerationConfig): void {
  localStorage.setItem('audio_config', JSON.stringify(config));
}

// Generate detailed audio prompt for Suno AI or other services
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

// Generate prompt specifically formatted for Suno AI
export function generateSunoPrompt(song: Song, type: 'full' | 'instrumental' | 'short' = 'full'): string {
  const { titre, style_musical, direction_audio, casting_vocal, paroles } = song;
  
  if (!direction_audio || !casting_vocal || !paroles) {
    throw new Error('Chanson incomplète');
  }

  // Suno AI format
  let prompt = `[Style: ${style_musical}]\n`;
  prompt += `[Tempo: ${direction_audio.bpm} BPM]\n`;
  prompt += `[Mood: ${direction_audio.ambiance_sonore}]\n`;
  
  if (type !== 'instrumental') {
    prompt += `[Vocals: ${casting_vocal.type_de_voix}, ${casting_vocal.texture_vocale}]\n`;
  }
  
  prompt += `\n`;
  
  if (type === 'short') {
    prompt += `[Refrain]\n${paroles.refrain_1}\n`;
  } else {
    prompt += `[Intro]\n(Instrumental)\n\n`;
    prompt += `[Couplet 1]\n${paroles.couplet_1}\n\n`;
    prompt += `[Pré-Refrain]\n${paroles.pre_refrain_1}\n\n`;
    prompt += `[Refrain]\n${paroles.refrain_1}\n\n`;
    prompt += `[Couplet 2]\n${paroles.couplet_2}\n\n`;
    prompt += `[Pré-Refrain]\n${paroles.pre_refrain_2}\n\n`;
    prompt += `[Refrain]\n${paroles.refrain_2}\n\n`;
    prompt += `[Pont]\n${paroles.pont}\n\n`;
    prompt += `[Refrain Final]\n${paroles.dernier_refrain}\n\n`;
    prompt += `[Outro]\n(Fade out)\n`;
  }
  
  return prompt;
}

// Call Suno AI API to generate audio
export async function generateWithSunoAPI(
  song: Song,
  type: 'full' | 'instrumental' | 'short',
  apiKey: string
): Promise<AudioData> {
  const prompt = generateSunoPrompt(song, type);
  
  try {
    // Note: Suno AI API is not officially public yet
    // This is a placeholder for when the API becomes available
    // For now, users need to use the Suno web interface manually
    
    throw new Error(
      'Suno AI API non disponible publiquement. ' +
      'Utilisez le mode manuel : générez l\'audio sur https://suno.ai, ' +
      'téléchargez le MP3, puis uploadez-le dans l\'admin.'
    );
    
    /*
    // When API becomes available:
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
    
    // Poll for completion
    let generationId = data.id;
    let status = 'processing';
    let audioUrl = '';
    
    while (status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResponse = await fetch(`https://api.suno.ai/v1/generate/${generationId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
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
    */
    
  } catch (error) {
    return {
      audio_statut: 'erreur',
      audio_message_erreur: error instanceof Error ? error.message : 'Erreur inconnue',
      audio_prompt_utilise: prompt,
      audio_service_utilise: 'suno'
    };
  }
}

// Manual upload: Convert file to base64 and store
export async function uploadAudioFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsDataURL(file);
  });
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

// Main generation function
export async function generateAudio(
  song: Song, 
  type: 'full' | 'instrumental' | 'short' = 'full'
): Promise<AudioData> {
  const config = getAudioConfig();
  
  if (config.service === 'suno' && config.apiKey) {
    return generateWithSunoAPI(song, type, config.apiKey);
  } else {
    // Manual mode - return placeholder
    const prompt = generateAudioPrompt(song, type);
    
    return {
      audio_statut: 'non_genere',
      audio_prompt_utilise: prompt,
      audio_service_utilise: 'manual'
    };
  }
}

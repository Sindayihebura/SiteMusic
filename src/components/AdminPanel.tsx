import { useState, useEffect } from 'react';
import { Song } from '../data/songDatabase';
import {
  initializeDatabase,
  getSongsByStatus,
  getProgress,
  markAsPublished,
  updateSong
} from '../data/songGenerator';
import {
  generateAudio,
  updateSongAudio,
  getAudioStatus,
  generateAudioPrompt,
  getAudioConfig,
  saveAudioConfig
} from '../data/audioGenerator';
import AudioPlayer from './AudioPlayer';
import KaraokePlayer from './KaraokePlayer';

export default function AdminPanel() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filter, setFilter] = useState<'all' | 'brouillon' | 'en_cours' | 'complete' | 'publiee'>('all');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [generatingAudio, setGeneratingAudio] = useState<{songId: number, type: string} | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [configService, setConfigService] = useState<'suno' | 'udio' | 'replicate' | 'webspeech'>('webspeech');
  const [configApiKey, setConfigApiKey] = useState('');

  useEffect(() => {
    setSongs(initializeDatabase());
    const config = getAudioConfig();
    setConfigService(config.service);
    setConfigApiKey(config.apiKey || '');
  }, []);

  const progress = getProgress();

  const filteredSongs = filter === 'all' 
    ? songs 
    : songs.filter(s => s.statut === filter);

  const generateNextBatch = () => {
    alert(`Prochain lot à générer : chansons ${progress.complete + 1} à ${Math.min(progress.complete + 5, 50)}\n\nNote: La génération automatique nécessite une intégration API (OpenAI, Claude, etc.)`);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleMarkAsPublished = (songId: number) => {
    markAsPublished(songId);
    setSongs(initializeDatabase());
  };

  const handleGenerateAudio = async (song: Song, type: 'full' | 'instrumental' | 'short') => {
    setGeneratingAudio({ songId: song.id, type });
    
    try {
      // Update status to "en_cours"
      const audioData = {
        audio_statut: 'en_cours' as const,
        audio_service_utilise: getAudioConfig().service
      };
      updateSongAudio(song.id, audioData, type);
      setSongs(initializeDatabase());
      
      // Generate audio with callbacks for karaoke
      const result = await generateAudio(
        song, 
        type,
        (lineIndex, line) => {
          // This callback is used by KaraokePlayer
          console.log(`Line ${lineIndex}: ${line}`);
        },
        () => {
          // Completion callback
          console.log('Audio generation complete');
        }
      );
      
      // Save result
      updateSongAudio(song.id, result, type);
      setSongs(initializeDatabase());
      
      // Refresh selected song if it's the one being generated
      if (selectedSong && selectedSong.id === song.id) {
        const updatedSongs = initializeDatabase();
        const updatedSong = updatedSongs.find(s => s.id === song.id);
        if (updatedSong) {
          setSelectedSong(updatedSong);
        }
      }
      
    } catch (error) {
      const errorData = {
        audio_statut: 'erreur' as const,
        audio_message_erreur: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      updateSongAudio(song.id, errorData, type);
      setSongs(initializeDatabase());
    } finally {
      setGeneratingAudio(null);
    }
  };

  const handleSaveConfig = () => {
    saveAudioConfig({
      service: configService,
      apiKey: configApiKey || undefined
    });
    setShowConfig(false);
    alert('Configuration sauvegardée !');
  };

  const getAudioStatusText = (song: Song, type: 'full' | 'instrumental' | 'short') => {
    const audioData = getAudioStatus(song, type);
    if (!audioData) return 'Audio non généré';
    
    switch (audioData.audio_statut) {
      case 'en_cours':
        return '⏳ Génération audio en cours...';
      case 'termine':
        return '✅ Audio généré';
      case 'erreur':
        return `❌ Erreur: ${audioData.audio_message_erreur || 'Erreur inconnue'}`;
      default:
        return 'Audio non généré';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">Administration des Chansons</h1>
            <p className="text-gray-400">Gérez vos 50 chansons originales avec génération audio IA</p>
          </div>
          <button
            onClick={() => setShowConfig(true)}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
          >
            <i className="fas fa-cog"></i>
            Config API Audio
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold">Progression</span>
            <span className="text-2xl font-bold gradient-text">
              {progress.complete} / {progress.total}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">{progress.percentage.toFixed(1)}% terminé</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={generateNextBatch}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:opacity-90 transition"
          >
            ✨ Générer le prochain lot de 5 chansons
          </button>
          <button
            onClick={() => setFilter('brouillon')}
            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Voir les brouillons ({getSongsByStatus('brouillon').length})
          </button>
          <button
            onClick={() => setFilter('complete')}
            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Voir les complètes ({getSongsByStatus('complete').length})
          </button>
          <button
            onClick={() => setFilter('publiee')}
            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Voir les publiées ({getSongsByStatus('publiee').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Voir tout ({songs.length})
          </button>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map(song => {
            const audioStatus = getAudioStatus(song, 'full');
            return (
              <div key={song.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition cursor-pointer" onClick={() => setSelectedSong(song)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-400">#{song.numero}</span>
                    <h3 className="text-lg font-bold">{song.titre}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    song.statut === 'brouillon' ? 'bg-gray-600' :
                    song.statut === 'en_cours' ? 'bg-yellow-600' :
                    song.statut === 'complete' ? 'bg-green-600' :
                    'bg-blue-600'
                  }`}>
                    {song.statut}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{song.style_musical}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{song.resume_histoire}</p>
                {song.casting_vocal && (
                  <p className="text-xs text-indigo-400 mt-2">🎤 {song.casting_vocal.prenom_fictif}</p>
                )}
                {audioStatus && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs ${
                      audioStatus.audio_statut === 'termine' ? 'text-green-400' :
                      audioStatus.audio_statut === 'en_cours' ? 'text-yellow-400' :
                      audioStatus.audio_statut === 'erreur' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {audioStatus.audio_statut === 'termine' ? '🎵 Audio prêt' :
                       audioStatus.audio_statut === 'en_cours' ? '⏳ Génération...' :
                       audioStatus.audio_statut === 'erreur' ? '❌ Erreur' :
                       '○ Pas d\'audio'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Configuration Modal */}
        {showConfig && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowConfig(false)}>
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4">Configuration API Audio</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Service</label>
                  <select
                    value={configService}
                    onChange={e => setConfigService(e.target.value as any)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2"
                  >
                    <option value="webspeech">Web Speech API (Voix réelle du navigateur)</option>
                    <option value="suno">Suno AI</option>
                    <option value="udio">Udio</option>
                    <option value="replicate">Replicate</option>
                  </select>
                </div>
                {configService !== 'webspeech' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Clé API</label>
                    <input
                      type="password"
                      value={configApiKey}
                      onChange={e => setConfigApiKey(e.target.value)}
                      placeholder="Entrez votre clé API"
                      className="w-full bg-gray-700 rounded-lg px-4 py-2"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {configService === 'suno' && 'Obtenez votre clé sur https://suno.ai/api'}
                      {configService === 'udio' && 'Obtenez votre clé sur https://udio.com/api'}
                      {configService === 'replicate' && 'Obtenez votre clé sur https://replicate.com/account/api-tokens'}
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveConfig}
                    className="flex-1 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Song Detail Modal */}
        {selectedSong && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedSong(null)}>
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-sm text-gray-400">Chanson #{selectedSong.numero}</span>
                  <h2 className="text-3xl font-bold gradient-text">{selectedSong.titre}</h2>
                  <p className="text-gray-400 mt-1">{selectedSong.style_musical}</p>
                </div>
                <button onClick={() => setSelectedSong(null)} className="text-gray-400 hover:text-white text-2xl">
                  ×
                </button>
              </div>

              {/* Status Actions */}
              <div className="mb-6 flex gap-3">
                {selectedSong.statut === 'complete' && (
                  <button
                    onClick={() => handleMarkAsPublished(selectedSong.id)}
                    className="px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    📢 Marquer comme publiée
                  </button>
                )}
              </div>

              {/* Audio Generation Section */}
              {selectedSong.statut === 'complete' && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-4">🎵 Génération Audio</h3>
                  
                  {/* Full Version */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Version complète avec voix</h4>
                      <span className={`text-sm ${
                        getAudioStatus(selectedSong, 'full')?.audio_statut === 'termine' ? 'text-green-400' :
                        getAudioStatus(selectedSong, 'full')?.audio_statut === 'en_cours' ? 'text-yellow-400' :
                        getAudioStatus(selectedSong, 'full')?.audio_statut === 'erreur' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {getAudioStatusText(selectedSong, 'full')}
                      </span>
                    </div>
                    
                    {getAudioStatus(selectedSong, 'full')?.audio_statut === 'termine' && (
                      <div className="mb-3">
                        {getAudioStatus(selectedSong, 'full')?.audio_service_utilise === 'webspeech' ? (
                          <KaraokePlayer song={selectedSong} type="full" />
                        ) : (
                          <AudioPlayer
                            audioUrl={getAudioStatus(selectedSong, 'full')!.audio_url!}
                            title={`${selectedSong.titre} - Version complète`}
                            artist={selectedSong.casting_vocal?.prenom_fictif}
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleGenerateAudio(selectedSong, 'full')}
                        disabled={generatingAudio?.songId === selectedSong.id && generatingAudio?.type === 'full'}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                      >
                        {getAudioStatus(selectedSong, 'full')?.audio_statut === 'termine' 
                          ? '🔄 Régénérer une nouvelle version' 
                          : '✨ Générer l\'audio chanté'}
                      </button>
                      <button
                        onClick={() => {
                          const prompt = generateAudioPrompt(selectedSong, 'full');
                          copyToClipboard(prompt, 'audio-full');
                        }}
                        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                      >
                        {copiedField === 'audio-full' ? '✓ Copié!' : '📋 Copier le prompt'}
                      </button>
                    </div>
                  </div>

                  {/* Instrumental Version */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Version instrumentale (sans voix)</h4>
                      <span className={`text-sm ${
                        getAudioStatus(selectedSong, 'instrumental')?.audio_statut === 'termine' ? 'text-green-400' :
                        getAudioStatus(selectedSong, 'instrumental')?.audio_statut === 'en_cours' ? 'text-yellow-400' :
                        getAudioStatus(selectedSong, 'instrumental')?.audio_statut === 'erreur' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {getAudioStatusText(selectedSong, 'instrumental')}
                      </span>
                    </div>
                    
                    {getAudioStatus(selectedSong, 'instrumental')?.audio_statut === 'termine' && (
                      <div className="mb-3">
                        {getAudioStatus(selectedSong, 'instrumental')?.audio_service_utilise === 'webspeech' ? (
                          <KaraokePlayer song={selectedSong} type="instrumental" />
                        ) : (
                          <AudioPlayer
                            audioUrl={getAudioStatus(selectedSong, 'instrumental')!.audio_url!}
                            title={`${selectedSong.titre} - Instrumental`}
                          />
                        )}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleGenerateAudio(selectedSong, 'instrumental')}
                      disabled={generatingAudio?.songId === selectedSong.id && generatingAudio?.type === 'instrumental'}
                      className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                    >
                      {getAudioStatus(selectedSong, 'instrumental')?.audio_statut === 'termine' 
                        ? '🔄 Régénérer l\'instrumental' 
                        : '🎹 Générer version instrumentale'}
                    </button>
                  </div>

                  {/* Short Version */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Version courte (30s pour réseaux sociaux)</h4>
                      <span className={`text-sm ${
                        getAudioStatus(selectedSong, 'short')?.audio_statut === 'termine' ? 'text-green-400' :
                        getAudioStatus(selectedSong, 'short')?.audio_statut === 'en_cours' ? 'text-yellow-400' :
                        getAudioStatus(selectedSong, 'short')?.audio_statut === 'erreur' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {getAudioStatusText(selectedSong, 'short')}
                      </span>
                    </div>
                    
                    {getAudioStatus(selectedSong, 'short')?.audio_statut === 'termine' && (
                      <div className="mb-3">
                        {getAudioStatus(selectedSong, 'short')?.audio_service_utilise === 'webspeech' ? (
                          <KaraokePlayer song={selectedSong} type="short" />
                        ) : (
                          <AudioPlayer
                            audioUrl={getAudioStatus(selectedSong, 'short')!.audio_url!}
                            title={`${selectedSong.titre} - 30s`}
                          />
                        )}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleGenerateAudio(selectedSong, 'short')}
                      disabled={generatingAudio?.songId === selectedSong.id && generatingAudio?.type === 'short'}
                      className="px-4 py-2 bg-orange-600 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
                    >
                      {getAudioStatus(selectedSong, 'short')?.audio_statut === 'termine' 
                        ? '🔄 Régénérer la version courte' 
                        : '📱 Générer version 30 secondes'}
                    </button>
                  </div>

                  {generatingAudio?.songId === selectedSong.id && (
                    <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                        <p className="text-yellow-400">Génération audio en cours... Cela peut prendre 1-3 minutes.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="mb-6 bg-gray-900 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-3">📋 Métadonnées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Ambiance:</span>
                    <p>{selectedSong.ambiance}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Thème principal:</span>
                    <p>{selectedSong.theme_principal}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Émotion dominante:</span>
                    <p>{selectedSong.emotion_dominante}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Phrase réseaux sociaux:</span>
                    <p className="text-indigo-400">"{selectedSong.phrase_reseaux_sociaux}"</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-gray-400">Résumé de l'histoire:</span>
                  <p className="mt-1">{selectedSong.resume_histoire}</p>
                </div>
              </div>

              {/* Vocal Casting */}
              {selectedSong.casting_vocal && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-3">🎤 Casting Vocal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Prénom fictif:</span>
                      <p className="font-semibold">{selectedSong.casting_vocal.prenom_fictif}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Âge fictif:</span>
                      <p>{selectedSong.casting_vocal.age_fictif} ans</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Catégorie vocale:</span>
                      <p>{selectedSong.casting_vocal.categorie_vocale}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Type de voix:</span>
                      <p>{selectedSong.casting_vocal.type_de_voix}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Texture vocale:</span>
                      <p>{selectedSong.casting_vocal.texture_vocale}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Registre vocal:</span>
                      <p>{selectedSong.casting_vocal.registre_vocal}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Style de chant:</span>
                      <p>{selectedSong.casting_vocal.style_de_chant}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-400">Justification du choix:</span>
                    <p className="mt-1 text-indigo-300">{selectedSong.casting_vocal.justification_du_choix}</p>
                  </div>
                </div>
              )}

              {/* Lyrics */}
              {selectedSong.paroles && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-3">📝 Paroles Complètes</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-gray-400 font-semibold">Introduction:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-300">{selectedSong.paroles.introduction}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Couplet 1:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-300">{selectedSong.paroles.couplet_1}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Pré-refrain:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-indigo-300">{selectedSong.paroles.pre_refrain_1}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Refrain:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-purple-300 font-semibold">{selectedSong.paroles.refrain_1}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Couplet 2:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-300">{selectedSong.paroles.couplet_2}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Pont:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-amber-300">{selectedSong.paroles.pont}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Outro:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-300">{selectedSong.paroles.outro}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Direction */}
              {selectedSong.direction_audio && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-3">🎵 Direction Audio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">BPM:</span>
                      <p>{selectedSong.direction_audio.bpm}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Rythme:</span>
                      <p>{selectedSong.direction_audio.rythme}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Ambiance sonore:</span>
                      <p>{selectedSong.direction_audio.ambiance_sonore}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Instruments principaux:</span>
                      <p>{selectedSong.direction_audio.instruments_principaux}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Direction */}
              {selectedSong.direction_video && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold">🎬 Direction Vidéo</h3>
                    <button
                      onClick={() => copyToClipboard(selectedSong.direction_video!.prompt_video, 'video')}
                      className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700 transition"
                    >
                      {copiedField === 'video' ? '✓ Copié!' : '📋 Copier le prompt'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Concept du clip:</span>
                      <p>{selectedSong.direction_video.concept_du_clip}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Lieu:</span>
                      <p>{selectedSong.direction_video.lieu}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Moment de la journée:</span>
                      <p>{selectedSong.direction_video.moment_de_la_journee}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-800 rounded p-3">
                    <span className="text-gray-400 text-xs">Prompt Vidéo:</span>
                    <p className="mt-1 text-purple-400 font-mono text-sm">{selectedSong.direction_video.prompt_video}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

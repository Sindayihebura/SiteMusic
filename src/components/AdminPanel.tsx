import { useState, useEffect } from 'react';
import { Song } from '../data/songDatabase';
import {
  initializeDatabase,
  getSongsByStatus,
  getProgress,
  markAsPublished,
  updateSong
} from '../data/songGenerator';

export default function AdminPanel() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filter, setFilter] = useState<'all' | 'brouillon' | 'en_cours' | 'complete' | 'publiee'>('all');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setSongs(initializeDatabase());
  }, []);

  const progress = getProgress();

  const filteredSongs = filter === 'all' 
    ? songs 
    : songs.filter(s => s.statut === filter);

  const generateNextBatch = () => {
    // In a real app, this would call an AI API to generate the next 5 songs
    // For now, we'll just show a message
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Administration des Chansons</h1>
          <p className="text-gray-400">Gérez vos 50 chansons originales</p>
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
          {filteredSongs.map(song => (
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
            </div>
          ))}
        </div>

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

              {/* Audio Direction */}
              {selectedSong.direction_audio && (
                <div className="mb-6 bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold">🎵 Direction Audio</h3>
                    <button
                      onClick={() => copyToClipboard(selectedSong.direction_audio!.prompt_audio, 'audio')}
                      className="px-3 py-1 bg-indigo-600 rounded text-sm hover:bg-indigo-700 transition"
                    >
                      {copiedField === 'audio' ? '✓ Copié!' : '📋 Copier le prompt'}
                    </button>
                  </div>
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
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Structure du morceau:</span>
                      <p>{selectedSong.direction_audio.structure_du_morceau}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Indications vocales:</span>
                      <p>{selectedSong.direction_audio.indications_vocales}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Chœurs et harmonies:</span>
                      <p>{selectedSong.direction_audio.choeurs_et_harmonies}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Introduction instrumentale:</span>
                      <p>{selectedSong.direction_audio.introduction_instrumentale}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Fin instrumentale:</span>
                      <p>{selectedSong.direction_audio.fin_instrumentale}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-800 rounded p-3">
                    <span className="text-gray-400 text-xs">Prompt Audio (prêt pour générateur):</span>
                    <p className="mt-1 text-green-400 font-mono text-sm">{selectedSong.direction_audio.prompt_audio}</p>
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
                      <span className="text-gray-400">Environnement visuel:</span>
                      <p>{selectedSong.direction_video.environnement_visuel}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Lieu:</span>
                      <p>{selectedSong.direction_video.lieu}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Moment de la journée:</span>
                      <p>{selectedSong.direction_video.moment_de_la_journee}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Ambiance visuelle:</span>
                      <p>{selectedSong.direction_video.ambiance_visuelle}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Personnages fictifs:</span>
                      <p>{selectedSong.direction_video.personnages_fictifs}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Vêtements et style:</span>
                      <p>{selectedSong.direction_video.vetements_et_style}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Couleurs dominantes:</span>
                      <p>{selectedSong.direction_video.couleurs_dominantes}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Lumière:</span>
                      <p>{selectedSong.direction_video.lumiere}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Déroulement du clip:</span>
                      <p>{selectedSong.direction_video.deroulement_du_clip}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Plans et mouvements caméra:</span>
                      <p>{selectedSong.direction_video.plans_et_mouvements_camera}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Dernière scène:</span>
                      <p>{selectedSong.direction_video.derniere_scene}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-800 rounded p-3">
                    <span className="text-gray-400 text-xs">Prompt Vidéo (prêt pour générateur):</span>
                    <p className="mt-1 text-purple-400 font-mono text-sm">{selectedSong.direction_video.prompt_video}</p>
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
                      <span className="text-gray-400 font-semibold">Pré-refrain 2:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-indigo-300">{selectedSong.paroles.pre_refrain_2}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Refrain 2:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-purple-300 font-semibold">{selectedSong.paroles.refrain_2}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Pont:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-amber-300">{selectedSong.paroles.pont}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Dernier refrain:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-purple-300 font-semibold">{selectedSong.paroles.dernier_refrain}</pre>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Outro:</span>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-300">{selectedSong.paroles.outro}</pre>
                    </div>
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

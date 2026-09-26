import { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import { getAllSongs } from './data/songGenerator';
import { Song } from './data/songDatabase';

function PublicSite() {
  const [songs] = useState<Song[]>(getAllSongs().filter(s => s.statut === 'complete' || s.statut === 'publiee'));
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🎵 MesChansons</h1>
            <p className="text-gray-400 text-sm">50 chansons originales en français</p>
          </div>
          <a href="/admin" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-sm">
            🔐 Administration
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Musique Originale
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Découvrez {songs.length} chansons originales avec paroles complètes, casting vocal fictif, et directions de production
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="glass rounded-xl px-6 py-4">
              <div className="text-3xl font-bold gradient-text">{songs.length}</div>
              <div className="text-sm text-gray-400">Chansons</div>
            </div>
            <div className="glass rounded-xl px-6 py-4">
              <div className="text-3xl font-bold gradient-text">50</div>
              <div className="text-sm text-gray-400">Objectif</div>
            </div>
            <div className="glass rounded-xl px-6 py-4">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-gray-400">Français</div>
            </div>
          </div>
        </div>
      </section>

      {/* Songs Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center gradient-text">Chansons Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map(song => (
              <div
                key={song.id}
                onClick={() => setSelectedSong(song)}
                className="glass rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-gray-400">#{song.numero}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    song.statut === 'complete' ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {song.statut === 'complete' ? '✓ Complète' : '📢 Publiée'}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">{song.titre}</h4>
                <p className="text-sm text-indigo-400 mb-2">{song.style_musical}</p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{song.resume_histoire}</p>
                {song.casting_vocal && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <i className="fas fa-microphone"></i>
                    <span>{song.casting_vocal.prenom_fictif}, {song.casting_vocal.age_fictif} ans</span>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 italic">"{song.phrase_reseaux_sociaux}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Song Detail Modal */}
      {selectedSong && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedSong(null)}>
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
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

            {/* Metadata */}
            <div className="mb-6 bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-3">📋 Informations</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Ambiance:</span>
                  <p>{selectedSong.ambiance}</p>
                </div>
                <div>
                  <span className="text-gray-400">Thème:</span>
                  <p>{selectedSong.theme_principal}</p>
                </div>
                <div>
                  <span className="text-gray-400">Émotion:</span>
                  <p>{selectedSong.emotion_dominante}</p>
                </div>
                <div>
                  <span className="text-gray-400">Histoire:</span>
                  <p className="mt-1">{selectedSong.resume_histoire}</p>
                </div>
              </div>
            </div>

            {/* Vocal Casting */}
            {selectedSong.casting_vocal && (
              <div className="mb-6 bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-3">🎤 Interprète</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Nom:</span>
                    <p className="font-semibold">{selectedSong.casting_vocal.prenom_fictif}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Âge:</span>
                    <p>{selectedSong.casting_vocal.age_fictif} ans</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Catégorie:</span>
                    <p>{selectedSong.casting_vocal.categorie_vocale}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type de voix:</span>
                    <p>{selectedSong.casting_vocal.type_de_voix}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-gray-400 text-sm">Texture:</span>
                  <p className="text-sm mt-1">{selectedSong.casting_vocal.texture_vocale}</p>
                </div>
              </div>
            )}

            {/* Lyrics */}
            {selectedSong.paroles && (
              <div className="mb-6 bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-3">📝 Paroles</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-400 font-semibold mb-1">Introduction</p>
                    <pre className="whitespace-pre-wrap text-gray-300">{selectedSong.paroles.introduction}</pre>
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold mb-1">Couplet 1</p>
                    <pre className="whitespace-pre-wrap text-gray-300">{selectedSong.paroles.couplet_1}</pre>
                  </div>
                  <div>
                    <p className="text-indigo-400 font-semibold mb-1">Pré-refrain</p>
                    <pre className="whitespace-pre-wrap text-indigo-300">{selectedSong.paroles.pre_refrain_1}</pre>
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold mb-1">Refrain</p>
                    <pre className="whitespace-pre-wrap text-purple-300 font-semibold">{selectedSong.paroles.refrain_1}</pre>
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold mb-1">Couplet 2</p>
                    <pre className="whitespace-pre-wrap text-gray-300">{selectedSong.paroles.couplet_2}</pre>
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold mb-1">Pont</p>
                    <pre className="whitespace-pre-wrap text-amber-300">{selectedSong.paroles.pont}</pre>
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold mb-1">Outro</p>
                    <pre className="whitespace-pre-wrap text-gray-300">{selectedSong.paroles.outro}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 MesChansons - 50 chansons originales en français
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');

  // Handle routing
  if (isAdmin || window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  return (
    <div>
      <PublicSite />
    </div>
  );
}

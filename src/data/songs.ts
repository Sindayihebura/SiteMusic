// Base de données des 50 chansons
export interface SongLyric {
  time: number;
  text: string;
}

export interface SongArtist {
  name: string;
  age: number | string;
  category: string;
  voiceType: string;
  texture: string;
  reason: string;
}

export interface SongAudio {
  tempo: string;
  instruments: string;
  mood: string;
  structure: string;
  singing: string;
  performance: string;
  harmonies: string;
  intro: string;
  outro: string;
  prompt: string;
}

export interface SongVideo {
  concept: string;
  environment: string;
  location: string;
  time: string;
  mood: string;
  characters: string;
  clothing: string;
  colors: string;
  lighting: string;
  scenes: string;
  camera: string;
  lastScene: string;
  prompt: string;
}

export interface Song {
  id: number;
  title: string;
  album: string;
  duration: string;
  durationSec: number;
  genre: string;
  description: string;
  likes: number;
  streams: string;
  image: string;
  freq: number[];
  artist: SongArtist;
  audio: SongAudio;
  video: SongVideo;
  lyrics: SongLyric[];
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Je pars de zéro",
    album: "Origines",
    duration: "3:30",
    durationSec: 210,
    genre: "Rap mélodique + Afrobeat",
    description: "Un jeune promet à sa famille qu'il réussira même s'il commence sans argent",
    likes: 4523,
    streams: "234K",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247],
    artist: { name: "Kofi", age: 22, category: "Jeune homme fictif", voiceType: "Masculine", texture: "Grave légère, rythmée, énergique", reason: "Voix jeune et déterminée, parfaite pour raconter l'ambition et la persévérance" },
    audio: { tempo: "95 BPM", instruments: "Beat afrobeat, basse profonde, guitare rythmique, percussions", mood: "Motivant, énergique, déterminé", structure: "Intro → Couplet 1 → Pré-refrain → Refrain → Couplet 2 → Refrain → Pont → Refrain final", singing: "Rap mélodique avec refrain chanté", performance: "Couplets avec énergie et conviction, refrain puissant et fédérateur", harmonies: "Chœurs masculins sur le refrain", intro: "Beat afrobeat avec guitare rythmique", outro: "Beat qui s'estompe avec écho", prompt: "Rap mélodique afrobeat 95 BPM, voix masculine jeune et déterminée, beat entraînant avec guitare et percussions, refrain fédérateur" },
    video: { concept: "Un jeune homme dans son quartier modeste montrant sa détermination", environment: "Quartier populaire africain", location: "Quartier résidentiel avec marchés", time: "Journée puis coucher de soleil", mood: "Authentique, déterminé, plein d'espoir", characters: "Kofi (22 ans), sa mère, son petit frère", clothing: "T-shirt simple, jean, baskets", colors: "Tons chauds, ocre, terre de sienne", lighting: "Lumière naturelle, coucher de soleil doré", scenes: "Kofi marche dans son quartier, travaille dur, danse avec ses amis", camera: "Plans larges du quartier, plans rapprochés sur les visages", lastScene: "Kofi debout sur une colline regardant la ville", prompt: "Clip authentique d'un jeune homme africain dans son quartier, lumière naturelle, couleurs chaudes" },
    lyrics: [
      { time: 0, text: "🎵 Je pars de zéro 🎵" },
      { time: 5, text: "J'ai commencé sans rien dans les mains" },
      { time: 10, text: "Mais j'avais la foi et le destin" },
      { time: 15, text: "Maman m'a dit travaille mon fils" },
      { time: 20, text: "Un jour tu verras tes efforts récompensés" },
      { time: 25, text: "" },
      { time: 27, text: "Les gens parlent, ils disent que je rêve trop" },
      { time: 32, text: "Mais je connais la valeur de mes efforts" },
      { time: 37, text: "Chaque jour je me lève avec un objectif" },
      { time: 42, text: "Je ne veux pas juste survivre, je veux vivre" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Je pars de zéro, mais je vais loin" },
      { time: 54, text: "Rien ne peut arrêter mon destin" },
      { time: 59, text: "Je travaille dur, je garde la foi" },
      { time: 64, text: "Un jour ma famille sera fière de moi" },
      { time: 69, text: "" },
      { time: 71, text: "J'ai vu des amis abandonner leurs rêves" },
      { time: 76, text: "Mais moi je continue, je suis dans la même" },
      { time: 81, text: "Direction, chaque pas compte" },
      { time: 86, text: "Je construirai mon empire, c'est certain" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Je pars de zéro 🎵" }
    ]
  },
  {
    id: 2,
    title: "Minuit sur mon téléphone",
    album: "Nuits Blanches",
    duration: "4:12",
    durationSec: 252,
    genre: "R&B moderne",
    description: "Deux personnes discutent chaque nuit mais aucune n'ose avouer ses sentiments",
    likes: 5234,
    streams: "289K",
    image: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277],
    artist: { name: "Aïcha", age: 19, category: "Jeune femme fictive", voiceType: "Féminine", texture: "Douce, chaude, émotionnelle", reason: "Voix jeune et sensible, parfaite pour exprimer les hésitations d'un amour naissant" },
    audio: { tempo: "75 BPM", instruments: "Piano doux, basse ronde, beat R&B léger, nappes synthétiques", mood: "Intime, nostalgique, romantique", structure: "Intro piano → Couplet 1 → Refrain → Couplet 2 → Refrain → Pont → Refrain final", singing: "Chant doux et émotionnel", performance: "Couplets chuchotés, refrain plus puissant", harmonies: "Harmonies douces sur le refrain", intro: "Piano mélodique avec ambiance nocturne", outro: "Piano qui s'estompe doucement", prompt: "R&B moderne 75 BPM, voix féminine douce, piano mélodique, ambiance intime et nocturne" },
    video: { concept: "Une jeune femme dans sa chambre la nuit, échangeant des messages secrets", environment: "Chambre d'adolescente", location: "Appartement en ville", time: "Nuit, minuit à 3h", mood: "Intime, mystérieux, romantique", characters: "Aïcha (19 ans), seule", clothing: "Pyjama confortable, cheveux détachés", colors: "Bleu nuit, violet, lumière bleue du téléphone", lighting: "Lumière du téléphone et lune", scenes: "Aïcha lit les messages, sourit, hésite, regarde par la fenêtre", camera: "Plans rapprochés sur son visage et le téléphone", lastScene: "Aïcha sourit en regardant la lune", prompt: "Clip intime d'une jeune femme dans sa chambre la nuit, lumière bleue du téléphone" },
    lyrics: [
      { time: 0, text: "🎵 Minuit sur mon téléphone 🎵" },
      { time: 5, text: "Encore une nuit à attendre ton message" },
      { time: 10, text: "L'écran s'allume, mon cœur fait un passage" },
      { time: 15, text: "Tu écris, tu effaces, tu recommences" },
      { time: 20, text: "Moi aussi je cherche les bons mots" },
      { time: 25, text: "" },
      { time: 27, text: "On se parle chaque soir depuis des semaines" },
      { time: 32, text: "Mais aucun de nous ne dit ce qu'il ressent" },
      { time: 37, text: "On tourne autour du pot, on a peur" },
      { time: 42, text: "De briser ce fragile bonheur" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Minuit sur mon téléphone, je t'attends" },
      { time: 54, text: "Mais je n'ose pas dire ce que je ressens" },
      { time: 59, text: "On se cache derrière les mots écrits" },
      { time: 64, text: "De peur de perdre ce qu'on a construit" },
      { time: 69, text: "" },
      { time: 71, text: "Parfois je tape je t'aime puis j'efface" },
      { time: 76, text: "Je remplace par un emoji, je garde ma place" },
      { time: 81, text: "Dans cette danse silencieuse" },
      { time: 86, text: "Où nos cœurs se cherchent sans aveu" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Minuit sur mon téléphone 🎵" }
    ]
  },
  {
    id: 3,
    title: "Danse sans souci",
    album: "Liberté",
    duration: "3:45",
    durationSec: 225,
    genre: "Afrobeat dansant",
    description: "Après une semaine difficile, des amis dansent pour retrouver le sourire",
    likes: 6123,
    streams: "345K",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330],
    artist: { name: "Duo Amara & Joël", age: "20 et 21 ans", category: "Duo fictif", voiceType: "Duo", texture: "Amara : lumineuse. Joël : chaude et rythmée", reason: "Duo complémentaire apportant énergie et joie" },
    audio: { tempo: "110 BPM", instruments: "Beat afrobeat, guitare rythmique, cuivres, percussions, basse groovy", mood: "Festif, libérateur, joyeux", structure: "Intro → Couplet 1 → Refrain → Couplet 2 → Refrain → Pont → Refrain final", singing: "Chant énergique et festif", performance: "Avec joie et énergie, sourire dans la voix", harmonies: "Chœurs festifs, duo sur le pont", intro: "Beat afrobeat avec cuivres", outro: "Beat avec rires et ambiances de fête", prompt: "Afrobeat dansant 110 BPM, duo voix féminine et masculine, beat entraînant avec cuivres" },
    video: { concept: "Groupe d'amis se retrouve et danse pour oublier les soucis", environment: "Cour extérieure avec guirlandes", location: "Cour d'immeuble aménagée", time: "Soirée, début de nuit", mood: "Festif, libérateur, chaleureux", characters: "Amara (20), Joël (21), 4-5 amis", clothing: "Vêtements décontractés et colorés", colors: "Jaune, orange, bleu électrique", lighting: "Guirlandes lumineuses, lumière chaude", scenes: "Amis arrivent fatigués, commencent à danser, danse collective", camera: "Plans larges du groupe, caméra dynamique", lastScene: "Tout le groupe danse en cercle", prompt: "Clip festif de jeunes amis dansant dans une cour, guirlandes lumineuses, couleurs vives" },
    lyrics: [
      { time: 0, text: "🎵 Danse sans souci 🎵" },
      { time: 5, text: "La semaine a été difficile" },
      { time: 10, text: "Mais ce soir on oublie tout" },
      { time: 15, text: "Les problèmes, le stress, les tracas" },
      { time: 20, text: "Ce soir on danse jusqu'au bout" },
      { time: 25, text: "" },
      { time: 27, text: "Regarde mes amis, on est tous là" },
      { time: 32, text: "Chacun avec ses peines, ses combats" },
      { time: 37, text: "Mais la musique nous rassemble" },
      { time: 42, text: "Et ensemble on est plus fort" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Danse sans souci, laisse-toi aller" },
      { time: 54, text: "Oublie les problèmes, juste danse" },
      { time: 59, text: "La vie est belle quand on partage" },
      { time: 64, text: "Ces moments de pure liberté" },
      { time: 69, text: "" },
      { time: 71, text: "Bouge ton corps, sens le rythme" },
      { time: 76, text: "Laisse la musique guider tes pas" },
      { time: 81, text: "Aucun souci ne peut tenir" },
      { time: 86, text: "Quand on danse comme ça" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Danse sans souci 🎵" }
    ]
  },
  {
    id: 4,
    title: "Vu, mais pas répondu",
    album: "Connexions",
    duration: "3:58",
    durationSec: 238,
    genre: "Pop urbaine",
    description: "Une personne lit les messages mais ne répond plus, créant doute et tristesse",
    likes: 4876,
    streams: "267K",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [247, 311, 370, 494, 370, 311, 247, 311],
    artist: { name: "Lina", age: 18, category: "Adolescente fictive", voiceType: "Féminine", texture: "Claire, fraîche, émotionnelle", reason: "Voix jeune et sensible pour exprimer la confusion d'une relation moderne" },
    audio: { tempo: "85 BPM", instruments: "Beat pop urbain, piano mélodique, basse douce, effets notification", mood: "Triste, confus, nostalgique", structure: "Intro → Couplet 1 → Refrain → Couplet 2 → Refrain → Pont → Refrain final", singing: "Chant émotionnel et expressif", performance: "Couplets avec tristesse, refrain plus intense", harmonies: "Harmonies légères sur le refrain", intro: "Piano avec son de notification", outro: "Piano avec écho", prompt: "Pop urbaine 85 BPM, voix féminine jeune et émotionnelle, piano mélodique, ambiance triste" },
    video: { concept: "Adolescente envoyant des messages sans réponse", environment: "Chambre, école, bus", location: "Lieux du quotidien d'une lycéenne", time: "Journée, moments de solitude", mood: "Triste, frustrant, réaliste", characters: "Lina (18 ans), seule", clothing: "Uniforme scolaire puis vêtements décontractés", colors: "Tons froids, gris, bleu pâle", lighting: "Lumière naturelle et d'écran", scenes: "Lina vérifie son téléphone partout, voit 'vu' sans réponse", camera: "Plans rapprochés sur le téléphone et son visage", lastScene: "Lina regarde par la fenêtre, résignée mais digne", prompt: "Clip d'une adolescente vérifiant son téléphone avec tristesse, lumière naturelle" },
    lyrics: [
      { time: 0, text: "🎵 Vu, mais pas répondu 🎵" },
      { time: 5, text: "J'ai vu que tu as lu mon message" },
      { time: 10, text: "Mais aucune réponse, juste le silence" },
      { time: 15, text: "Je me demande ce que j'ai fait de mal" },
      { time: 20, text: "Ou si tu as juste changé d'avis" },
      { time: 25, text: "" },
      { time: 27, text: "On se parlait tout le temps avant" },
      { time: 32, text: "Maintenant tu disparais comme le vent" },
      { time: 37, text: "Je relis nos conversations" },
      { time: 42, text: "Je cherche le moment où tout a basculé" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Vu, mais pas répondu" },
      { time: 54, text: "Pourquoi tu me fais ça ?" },
      { time: 59, text: "Dis-moi ce qui se passe" },
      { time: 64, text: "Ou laisse-moi partir" },
      { time: 69, text: "" },
      { time: 71, text: "Je mérite mieux que ce silence" },
      { time: 76, text: "Mieux que cette indifférence" },
      { time: 81, text: "Mais mon cœur espère encore" },
      { time: 86, text: "Que tu reviendras, que tu m'écriras" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Vu, mais pas répondu 🎵" }
    ]
  },
  {
    id: 5,
    title: "Mon cœur n'est pas un jeu",
    album: "Vérité",
    duration: "4:03",
    durationSec: 243,
    genre: "Afro-R&B",
    description: "Une personne demande à son partenaire d'arrêter de jouer avec ses sentiments",
    likes: 5432,
    streams: "298K",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277],
    artist: { name: "Marcus", age: 24, category: "Jeune homme fictif", voiceType: "Masculine", texture: "Chaude, mélodique, émotionnelle", reason: "Voix jeune homme mature pour exprimer la douleur et la demande de respect" },
    audio: { tempo: "80 BPM", instruments: "Beat afro-R&B, guitare acoustique, basse ronde, percussions douces", mood: "Émotionnel, sérieux, déterminé", structure: "Intro → Couplet 1 → Refrain → Couplet 2 → Refrain → Pont → Refrain final", singing: "Chant mélodique avec moments de rap doux", performance: "Couplets avec émotion contenue, refrain puissant", harmonies: "Chœurs sur le refrain", intro: "Guitare acoustique avec beat doux", outro: "Guitare qui s'estompe", prompt: "Afro-R&B 80 BPM, voix masculine chaude, guitare acoustique, ambiance émotionnelle" },
    video: { concept: "Jeune homme confronte sa partenaire sur son comportement manipulateur", environment: "Appartement moderne, parc, café", location: "Lieux urbains", time: "Journée et soirée", mood: "Émotionnel, sérieux, respectueux", characters: "Marcus (24), sa partenaire (23)", clothing: "Style urbain moderne, décontracté mais soigné", colors: "Tons neutres, beige, gris, touches de bleu", lighting: "Lumière naturelle douce", scenes: "Flashbacks de manipulation, confrontation face à face", camera: "Plans rapprochés sur les expressions, plans de confrontation", lastScene: "Marcus marche seul, tête haute", prompt: "Clip émotionnel d'un jeune homme confrontant une relation toxique, lumière naturelle" },
    lyrics: [
      { time: 0, text: "🎵 Mon cœur n'est pas un jeu 🎵" },
      { time: 5, text: "Tu joues avec mes sentiments" },
      { time: 10, text: "Comme si je n'étais qu'un passe-temps" },
      { time: 15, text: "Tu viens et tu pars quand tu veux" },
      { time: 20, text: "Mais moi je donne tout, c'est dangereux" },
      { time: 25, text: "" },
      { time: 27, text: "Tu me dis des mots doux le soir" },
      { time: 32, text: "Puis tu disparais sans un mot" },
      { time: 37, text: "Je ne suis pas ton option" },
      { time: 42, text: "Je mérite mieux que cette situation" },
      { time: 47, text: "" },
      { time: 49, text: "🎶 Mon cœur n'est pas un jeu" },
      { time: 54, text: "Arrête de jouer avec" },
      { time: 59, text: "Si tu ne m'aimes pas vraiment" },
      { time: 64, text: "Alors laisse-moi partir" },
      { time: 69, text: "" },
      { time: 71, text: "Je t'ai donné ma confiance" },
      { time: 76, text: "Tu l'as utilisée contre moi" },
      { time: 81, text: "Mais je me respecte maintenant" },
      { time: 86, text: "Et je ne reviendrai pas en arrière" },
      { time: 91, text: "" },
      { time: 93, text: "🎵 Mon cœur n'est pas un jeu 🎵" }
    ]
  }
];

// Les chansons 6 à 50 seront ajoutées progressivement
// Format : même structure avec paroles, artiste fictif, directions audio et vidéo

// Structure complète pour les 50 chansons
export interface SongLyrics {
  introduction: string;
  couplet_1: string;
  pre_refrain_1: string;
  refrain_1: string;
  couplet_2: string;
  pre_refrain_2: string;
  refrain_2: string;
  pont: string;
  dernier_refrain: string;
  outro: string;
}

export interface VocalCasting {
  prenom_fictif: string;
  age_fictif: number | string;
  categorie_vocale: string;
  type_de_voix: string;
  texture_vocale: string;
  registre_vocal: string;
  style_de_chant: string;
  justification_du_choix: string;
}

export interface AudioDirection {
  bpm: number;
  instruments_principaux: string;
  rythme: string;
  ambiance_sonore: string;
  structure_du_morceau: string;
  indications_vocales: string;
  choeurs_et_harmonies: string;
  introduction_instrumentale: string;
  fin_instrumentale: string;
  prompt_audio: string;
}

export interface VideoDirection {
  concept_du_clip: string;
  environnement_visuel: string;
  lieu: string;
  moment_de_la_journee: string;
  ambiance_visuelle: string;
  personnages_fictifs: string;
  vetements_et_style: string;
  couleurs_dominantes: string;
  lumiere: string;
  deroulement_du_clip: string;
  plans_et_mouvements_camera: string;
  derniere_scene: string;
  prompt_video: string;
}

export type SongStatus = 'brouillon' | 'en_cours' | 'complete' | 'publiee';
export type AudioStatus = 'non_genere' | 'en_cours' | 'termine' | 'erreur';

export interface AudioData {
  audio_statut: AudioStatus;
  audio_url?: string;
  audio_format?: string;
  audio_duree_secondes?: number;
  audio_date_generation?: string;
  audio_prompt_utilise?: string;
  audio_version?: string;
  audio_est_instrumental?: boolean;
  audio_message_erreur?: string;
  audio_service_utilise?: string;
}

export interface Song {
  id: number;
  numero: number;
  titre: string;
  style_musical: string;
  ambiance: string;
  theme_principal: string;
  emotion_dominante: string;
  resume_histoire: string;
  phrase_reseaux_sociaux: string;
  statut: SongStatus;
  date_creation: string;
  date_modification: string;
  
  casting_vocal?: VocalCasting;
  direction_audio?: AudioDirection;
  direction_video?: VideoDirection;
  paroles?: SongLyrics;
  
  audio?: AudioData;
  audio_instrumental?: AudioData;
  audio_courte?: AudioData;
  
  image?: string;
  freq?: number[];
}

// Les 50 chansons de base avec métadonnées
export const songTemplates: Omit<Song, 'statut' | 'date_creation' | 'date_modification' | 'casting_vocal' | 'direction_audio' | 'direction_video' | 'paroles'>[] = [
  {
    id: 1, numero: 1, titre: "Je pars de zéro", style_musical: "Rap mélodique + afrobeat",
    ambiance: "Motivante, puissante et optimiste", theme_principal: "Réussir malgré la pauvreté, les critiques et les obstacles",
    emotion_dominante: "Détermination et espoir", resume_histoire: "Un jeune promet à sa famille qu'il réussira même s'il commence sans argent, sans réseau, sans soutien, mais avec du courage et du travail.",
    phrase_reseaux_sociaux: "Même sans rien, je pars de zéro pour toucher le ciel.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 2, numero: 2, titre: "Minuit sur mon téléphone", style_musical: "R&B moderne",
    ambiance: "Intime, sensuelle, douce et mélancolique", theme_principal: "Amour caché et conversations tardives",
    emotion_dominante: "Envie, frustration, tendresse", resume_histoire: "Deux personnes discutent chaque nuit mais aucune n'ose avouer ses sentiments. Elles se contentent de mots simples, mais le silence entre les lignes parle plus fort.",
    phrase_reseaux_sociaux: "Des nuits entières à se parler sans oser dire je t'aime.",
    image: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 3, numero: 3, titre: "Danse sans souci", style_musical: "Afrobeat dansant",
    ambiance: "Joyeuse, festive, libératrice", theme_principal: "Oublier les problèmes et profiter de la vie",
    emotion_dominante: "Joie, énergie, liberté", resume_histoire: "Après une semaine difficile, des amis dansent ensemble pour retrouver le sourire et oublier les soucis.",
    phrase_reseaux_sociaux: "Laisse tes soucis de côté et danse sans penser à demain.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 4, numero: 4, titre: "Vu, mais pas répondu", style_musical: "Pop urbaine",
    ambiance: "Triste, nostalgique, mélancolique", theme_principal: "Amour à l'époque des réseaux sociaux",
    emotion_dominante: "Confusion, tristesse, solitude", resume_histoire: "Une personne lit les messages mais ne répond plus, créant doute et tristesse dans le cœur de l'autre.",
    phrase_reseaux_sociaux: "Vu, mais pas répondu... parfois le silence dit plus que les mots.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [247, 311, 370, 494, 370, 311, 247, 311]
  },
  {
    id: 5, numero: 5, titre: "Mon cœur n'est pas un jeu", style_musical: "Afro-R&B",
    ambiance: "Sérieuse, émotionnelle, intense", theme_principal: "Manipulation émotionnelle",
    emotion_dominante: "Colère, tristesse, détermination", resume_histoire: "Une personne demande à son partenaire d'arrêter de jouer avec ses sentiments.",
    phrase_reseaux_sociaux: "Mon cœur n'est pas un jouet, arrête de jouer avec mes sentiments.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 6, numero: 6, titre: "La nuit de ma ville", style_musical: "Amapiano + afrobeat",
    ambiance: "Fière, énergétique, inspirante", theme_principal: "Fierté de sa ville et rêves de la jeunesse",
    emotion_dominante: "Espoir, fierté, solidarité", resume_histoire: "Des jeunes se retrouvent la nuit, parlent de leurs ambitions et dansent malgré les difficultés.",
    phrase_reseaux_sociaux: "Ma ville est belle, mes rêves sont grands, et la nuit, on danse pour croire en demain.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 7, numero: 7, titre: "J'ai appris seul", style_musical: "Ballade pop + R&B",
    ambiance: "Mélancolique, introspective, apaisante", theme_principal: "Grandir après une trahison",
    emotion_dominante: "Solitude, force, résilience", resume_histoire: "Après avoir été abandonné par une personne proche, le chanteur apprend à se relever seul.",
    phrase_reseaux_sociaux: "Quand tu tombes, relève-toi seul. C'est là que tu deviens fort.",
    image: "https://image.qwenlm.ai/generated-images/aeb30523-956c-41d6-861d-1b310f3f9a5c/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 8, numero: 8, titre: "Pas besoin de luxe", style_musical: "Afro-pop romantique",
    ambiance: "Tendre, chaleureuse, sincère", theme_principal: "Amour simple et sincère",
    emotion_dominante: "Affection, gratitude, paix", resume_histoire: "Le chanteur n'a pas beaucoup d'argent mais offre respect, fidélité et amour vrai.",
    phrase_reseaux_sociaux: "Je n'ai pas de bijoux, mais je t'aime avec le cœur. C'est ça, l'amour vrai.",
    image: "https://image.qwenlm.ai/generated-images/f47dc457-125c-4524-ab14-bcc1e7caf18d/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 9, numero: 9, titre: "Demain sera meilleur", style_musical: "Gospel moderne + rap conscient",
    ambiance: "Espérance, foi, motivation", theme_principal: "Garder l'espoir pendant les moments difficiles",
    emotion_dominante: "Foi, courage, détermination", resume_histoire: "Une personne traverse des épreuves mais garde la foi et avance.",
    phrase_reseaux_sociaux: "Même quand tout va mal, je garde la foi. Demain sera meilleur.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 10, numero: 10, titre: "Photo supprimée", style_musical: "R&B triste",
    ambiance: "Mélancolique, nostalgique, solitaire", theme_principal: "Souvenirs après une rupture",
    emotion_dominante: "Tristesse, nostalgie, regret", resume_histoire: "Une personne efface des photos mais ne peut pas effacer les souvenirs de son cœur.",
    phrase_reseaux_sociaux: "Effacer une photo, c'est facile. Effacer un souvenir, c'est impossible.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 11, numero: 11, titre: "On va réussir", style_musical: "Rap motivation",
    ambiance: "Énergétique, déterminée, inspirante", theme_principal: "Travail, études et persévérance",
    emotion_dominante: "Espoir, détermination, solidarité", resume_histoire: "Des jeunes se motivent entre eux pour réussir malgré les limites de la vie.",
    phrase_reseaux_sociaux: "On est ensemble, on est forts, on va réussir !",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 12, numero: 12, titre: "Une dernière danse", style_musical: "Afrobeat romantique",
    ambiance: "Mélancolique, douce, émotionnelle", theme_principal: "Dire au revoir à un ancien amour",
    emotion_dominante: "Tristesse, tendresse, nostalgie", resume_histoire: "Deux anciens amoureux se retrouvent une dernière fois avant de se séparer.",
    phrase_reseaux_sociaux: "Une dernière danse, un dernier regard, un adieu silencieux.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 13, numero: 13, titre: "Faux amis", style_musical: "Drill mélodique",
    ambiance: "Sombre, intense, critique", theme_principal: "Trahison et hypocrisie",
    emotion_dominante: "Colère, déception, méfiance", resume_histoire: "Le chanteur découvre que certains amis sourient devant lui et le critiquent derrière son dos.",
    phrase_reseaux_sociaux: "Ils sourient devant, mais critiquent derrière. Méfie-toi des faux amis.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 14, numero: 14, titre: "C'est toi la vibration", style_musical: "Reggaeton + afro-pop",
    ambiance: "Enjouée, sensuelle, dansante", theme_principal: "Une rencontre qui change une soirée",
    emotion_dominante: "Excitation, séduction, joie", resume_histoire: "Pendant une fête, une personne remarque quelqu'un dont l'énergie illumine tout le lieu.",
    phrase_reseaux_sociaux: "Dans la foule, c'est toi qui brilles. Tu donnes vie à tout.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 15, numero: 15, titre: "Le rêve de maman", style_musical: "Rap émotionnel",
    ambiance: "Touchante, inspirante, sincère", theme_principal: "Rendre sa mère fière",
    emotion_dominante: "Amour, gratitude, détermination", resume_histoire: "Un enfant promet à sa mère qu'il travaillera dur pour améliorer la vie de toute la famille.",
    phrase_reseaux_sociaux: "Je travaille pour toi, maman. Ton rêve est mon but.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 16, numero: 16, titre: "Personne ne savait", style_musical: "R&B profond",
    ambiance: "Sombre, introspective, émotionnelle", theme_principal: "Douleur cachée derrière un sourire",
    emotion_dominante: "Tristesse, solitude, vulnérabilité", resume_histoire: "Le chanteur paraît heureux devant les autres mais souffre intérieurement.",
    phrase_reseaux_sociaux: "Je souris, mais personne ne sait ce que je cache. Derrière le sourire, il y a de la douleur.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 17, numero: 17, titre: "Sans réseau", style_musical: "Pop acoustique",
    ambiance: "Apaisante, intime, sincère", theme_principal: "Revenir à une relation vraie",
    emotion_dominante: "Paix, tendresse, authenticité", resume_histoire: "Deux amoureux coupent leurs téléphones pour se retrouver loin des réseaux sociaux.",
    phrase_reseaux_sociaux: "Parfois, il faut éteindre les écrans pour rallumer l'amour.",
    image: "https://image.qwenlm.ai/generated-images/f47dc457-125c-4524-ab14-bcc1e7caf18d/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 18, numero: 18, titre: "Mon quartier, mon école", style_musical: "Rap conscient",
    ambiance: "Sincère, inspirante, éducative", theme_principal: "Rêves des jeunes et éducation",
    emotion_dominante: "Espoir, détermination, fierté", resume_histoire: "Un étudiant raconte son quartier et son désir de réussir grâce à l'école.",
    phrase_reseaux_sociaux: "Mon quartier m'a appris à être fort, mon école m'a appris à rêver.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 19, numero: 19, titre: "Tu m'as changé", style_musical: "Afro-R&B",
    ambiance: "Romantique, émotionnelle, lumineuse", theme_principal: "Amour qui aide à devenir meilleur",
    emotion_dominante: "Gratitude, amour, transformation", resume_histoire: "Une personne apprend à aimer, pardonner et croire en elle grâce à son partenaire.",
    phrase_reseaux_sociaux: "Tu m'as changé en mieux. Merci de m'avoir aimé comme je suis.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 20, numero: 20, titre: "Billet aller", style_musical: "Amapiano mélancolique",
    ambiance: "Nostalgique, émotionnelle, introspective", theme_principal: "Partir chercher une vie meilleure",
    emotion_dominante: "Tristesse, espoir, détermination", resume_histoire: "Le chanteur quitte sa ville et sa famille avec tristesse pour poursuivre un rêve.",
    phrase_reseaux_sociaux: "Billet aller, départ vers l'inconnu. Je pars avec espoir, mais le cœur serré.",
    image: "https://image.qwenlm.ai/generated-images/aeb30523-956c-41d6-861d-1b310f3f9a5c/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 21, numero: 21, titre: "Jalousie", style_musical: "Afrobeat + pop urbaine",
    ambiance: "Critique, intense, sociale", theme_principal: "Les personnes qui détestent une réussite",
    emotion_dominante: "Colère, incompréhension, résilience", resume_histoire: "Certains changent d'attitude lorsque le chanteur commence à progresser.",
    phrase_reseaux_sociaux: "Quand tu réussis, certains changent. La jalousie révèle les vrais cœurs.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 22, numero: 22, titre: "Tu reviens toujours", style_musical: "R&B + amapiano",
    ambiance: "Mélancolique, émotionnelle, confuse", theme_principal: "Relation instable",
    emotion_dominante: "Tristesse, frustration, espoir", resume_histoire: "Une personne part, revient, promet de changer puis recommence à blesser l'autre.",
    phrase_reseaux_sociaux: "Tu reviens toujours, mais tu repars pareil. Quand arrêteras-tu de me blesser ?",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 23, numero: 23, titre: "L'argent ne dort pas", style_musical: "Rap trap",
    ambiance: "Ambitieuse, énergétique, déterminée", theme_principal: "Ambition, travail et opportunités",
    emotion_dominante: "Détermination, ambition, espoir", resume_histoire: "Un jeune cherche chaque jour une manière honnête d'améliorer sa situation.",
    phrase_reseaux_sociaux: "L'argent ne dort pas, et moi non plus. Je travaille, je rêve, je réussis.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 24, numero: 24, titre: "Ma meilleure version", style_musical: "Pop motivation",
    ambiance: "Inspirante, joyeuse, déterminée", theme_principal: "Confiance en soi",
    emotion_dominante: "Espoir, détermination, transformation", resume_histoire: "Après les échecs et les critiques, le chanteur décide de devenir plus fort.",
    phrase_reseaux_sociaux: "Après les échecs, je suis devenu ma meilleure version. Je me relève, je continue.",
    image: "https://image.qwenlm.ai/generated-images/f47dc457-125c-4524-ab14-bcc1e7caf18d/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 25, numero: 25, titre: "Pardon papa", style_musical: "Gospel moderne + ballade",
    ambiance: "Émotionnelle, apaisante, sincère", theme_principal: "Réconciliation familiale",
    emotion_dominante: "Remords, gratitude, espoir", resume_histoire: "Un enfant demande pardon à son père et cherche à réparer leur relation.",
    phrase_reseaux_sociaux: "Pardon papa, je veux réparer notre lien. Tu es important pour moi.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 26, numero: 26, titre: "Les yeux parlent", style_musical: "Afro-pop romantique",
    ambiance: "Tendre, romantique, lumineuse", theme_principal: "Amour sans paroles",
    emotion_dominante: "Tendresse, complicité, espoir", resume_histoire: "Deux personnes se comprennent en se regardant mais n'osent pas parler.",
    phrase_reseaux_sociaux: "Parfois, les yeux parlent plus que les mots. L'amour se lit dans le regard.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 27, numero: 27, titre: "Batterie faible", style_musical: "Pop urbaine légère",
    ambiance: "Légère, mignonne, amusante", theme_principal: "Relation moderne et téléphone",
    emotion_dominante: "Impatience, tendresse, frustration", resume_histoire: "Le chanteur veut appeler la personne qu'il aime, mais son téléphone s'éteint toujours au mauvais moment.",
    phrase_reseaux_sociaux: "Quand le téléphone s'éteint, c'est pile au moment où tu veux appeler la personne que tu aimes.",
    image: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png",
    freq: [247, 311, 370, 494, 370, 311, 247, 311]
  },
  {
    id: 28, numero: 28, titre: "Mon frère, tiens bon", style_musical: "Rap conscient",
    ambiance: "Sincère, motivante, chaleureuse", theme_principal: "Soutenir un ami en difficulté",
    emotion_dominante: "Solidarité, compassion, espoir", resume_histoire: "Le chanteur encourage son ami à ne pas abandonner malgré les problèmes.",
    phrase_reseaux_sociaux: "Mon frère, tiens bon. Je suis là, je crois en toi. Tu n'es pas seul.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 29, numero: 29, titre: "Je ne suis pas parfait", style_musical: "R&B confession",
    ambiance: "Sincère, émotionnelle, apaisante", theme_principal: "Accepter ses erreurs et demander une chance",
    emotion_dominante: "Remords, vulnérabilité, espoir", resume_histoire: "Le chanteur reconnaît ses défauts et veut montrer qu'il peut changer.",
    phrase_reseaux_sociaux: "Je ne suis pas parfait, mais je peux changer. Accorde-moi une chance.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 30, numero: 30, titre: "On oublie tout", style_musical: "Amapiano festif",
    ambiance: "Joyeuse, dansante, libératrice", theme_principal: "Fête et liberté",
    emotion_dominante: "Joie, énergie, liberté", resume_histoire: "Pendant une soirée, des jeunes oublient leurs soucis et célèbrent la vie.",
    phrase_reseaux_sociaux: "Ce soir, on oublie tout. On danse, on rit, on est libres.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 31, numero: 31, titre: "Ma place au soleil", style_musical: "Afrobeat inspirant",
    ambiance: "Motivante, lumineuse, déterminée", theme_principal: "Croire en son destin",
    emotion_dominante: "Espoir, détermination, confiance", resume_histoire: "Une personne lutte chaque jour pour trouver sa place et ne plus vivre dans l'ombre.",
    phrase_reseaux_sociaux: "Je mérite ma place au soleil. Je me bats pour briller.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 32, numero: 32, titre: "Appel inconnu", style_musical: "R&B mystérieux",
    ambiance: "Intriguante, émotionnelle, mystérieuse", theme_principal: "Retour d'un ancien amour",
    emotion_dominante: "Curiosité, nostalgie, émotion", resume_histoire: "Un ancien partenaire appelle sans parler et réveille des sentiments oubliés.",
    phrase_reseaux_sociaux: "Appel inconnu, mais je sais que c'est toi. Tu réveilles ce que j'ai essayé d'oublier.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 33, numero: 33, titre: "Pas ce soir", style_musical: "Afro-pop",
    ambiance: "Fermée, déterminée, résolue", theme_principal: "Poser des limites dans une relation",
    emotion_dominante: "Détermination, colère, dignité", resume_histoire: "Le chanteur refuse de revenir dans une relation qui lui fait du mal.",
    phrase_reseaux_sociaux: "Pas ce soir. Je ne reviens pas dans une relation qui me blesse.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 34, numero: 34, titre: "Loin de toi", style_musical: "Ballade afro-soul",
    ambiance: "Mélancolique, émotionnelle, tendre", theme_principal: "Distance et manque",
    emotion_dominante: "Tristesse, nostalgie, amour", resume_histoire: "Une personne étudie ou travaille loin de son amour et attend le jour des retrouvailles.",
    phrase_reseaux_sociaux: "Loin de toi, mais dans mon cœur, tu es toujours là. J'attends le jour des retrouvailles.",
    image: "https://image.qwenlm.ai/generated-images/aeb30523-956c-41d6-861d-1b310f3f9a5c/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 35, numero: 35, titre: "Mon nom demain", style_musical: "Rap motivation + trap",
    ambiance: "Ambitieuse, énergétique, déterminée", theme_principal: "Construire son identité et son avenir",
    emotion_dominante: "Détermination, ambition, espoir", resume_histoire: "Un jeune veut faire connaître son nom par son travail, son talent et sa discipline.",
    phrase_reseaux_sociaux: "Mon nom demain sera connu. Je travaille, je rêve, je réussis.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 36, numero: 36, titre: "Elle connaît mes secrets", style_musical: "R&B romantique",
    ambiance: "Intime, tendre, émotionnelle", theme_principal: "Confiance totale dans un couple",
    emotion_dominante: "Confiance, amour, sécurité", resume_histoire: "Le chanteur trouve une personne à qui raconter ses blessures, ses peurs et ses rêves.",
    phrase_reseaux_sociaux: "Elle connaît mes secrets, mes peurs, mes rêves. Avec elle, je suis moi-même.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 37, numero: 37, titre: "L'amour coûte cher", style_musical: "Pop urbaine ironique",
    ambiance: "Ironique, critique, légère", theme_principal: "Attentes matérielles dans les relations",
    emotion_dominante: "Frustration, ironie, lucidité", resume_histoire: "Le chanteur aime sincèrement mais se sent écrasé par les demandes matérielles.",
    phrase_reseaux_sociaux: "L'amour coûte cher, mais mon cœur est gratuit. Pourquoi tant de conditions ?",
    image: "https://image.qwenlm.ai/generated-images/4acd8f55-54b9-43ec-b088-76fd086f65de/_result.png",
    freq: [247, 311, 370, 494, 370, 311, 247, 311]
  },
  {
    id: 38, numero: 38, titre: "Cœur en mode avion", style_musical: "Afro-pop + R&B",
    ambiance: "Protectrice, introspective, apaisante", theme_principal: "Se protéger après une rupture",
    emotion_dominante: "Prudence, solitude, résilience", resume_histoire: "Après plusieurs déceptions, une personne décide de fermer son cœur.",
    phrase_reseaux_sociaux: "Cœur en mode avion. Je me protège, je ne veux plus souffrir.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 39, numero: 39, titre: "Petit à petit", style_musical: "Rap afro",
    ambiance: "Motivante, patiente, déterminée", theme_principal: "Patience, progrès et discipline",
    emotion_dominante: "Espoir, persévérance, détermination", resume_histoire: "Le chanteur rappelle que la réussite arrive avec les petits efforts quotidiens.",
    phrase_reseaux_sociaux: "Petit à petit, on avance. Chaque effort compte, chaque pas mène vers le succès.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 40, numero: 40, titre: "Soleil après la pluie", style_musical: "Gospel afrobeat",
    ambiance: "Espérante, lumineuse, réconfortante", theme_principal: "Foi après les épreuves",
    emotion_dominante: "Espoir, foi, gratitude", resume_histoire: "Dans les périodes sombres, le chanteur croit qu'une nouvelle lumière arrivera.",
    phrase_reseaux_sociaux: "Soleil après la pluie. Après les épreuves, la lumière revient.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 41, numero: 41, titre: "Tu danses trop bien", style_musical: "Amapiano + reggaeton",
    ambiance: "Enjouée, sensuelle, dansante", theme_principal: "Séduction sur la piste de danse",
    emotion_dominante: "Excitation, admiration, désir", resume_histoire: "Le chanteur est fasciné par une personne qui danse et essaie de l'approcher.",
    phrase_reseaux_sociaux: "Tu danses trop bien. Tu m'as hypnotisé, je veux t'approcher.",
    image: "https://image.qwenlm.ai/generated-images/a77a9fe2-f78f-4b3b-99e8-07d66697396b/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 42, numero: 42, titre: "J'ai gardé ton message", style_musical: "R&B nostalgique",
    ambiance: "Mélancolique, émotionnelle, tendre", theme_principal: "Impossibilité d'oublier un amour",
    emotion_dominante: "Nostalgie, tristesse, amour", resume_histoire: "Malgré la rupture, le chanteur conserve et relit un ancien message d'amour.",
    phrase_reseaux_sociaux: "J'ai gardé ton message. Il me rappelle ce que nous avons eu.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 43, numero: 43, titre: "Dans ma tête", style_musical: "Rap introspectif",
    ambiance: "Introspective, pensante, apaisante", theme_principal: "Stress, pensées et combats intérieurs",
    emotion_dominante: "Inquiétude, solitude, introspection", resume_histoire: "Le chanteur raconte les pensées qu'il garde pour lui.",
    phrase_reseaux_sociaux: "Dans ma tête, il y a des pensées que je garde pour moi. Des combats intérieurs, des peurs silencieuses.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 44, numero: 44, titre: "Tous les regards", style_musical: "Afro-pop glamour",
    ambiance: "Confidente, charismatique, lumineuse", theme_principal: "Confiance et charisme",
    emotion_dominante: "Confiance, charisme, élégance", resume_histoire: "Une personne entre dans une soirée et attire les regards sans essayer.",
    phrase_reseaux_sociaux: "Je n'essaie pas d'attirer les regards, mais je les attire. Confiance et charisme.",
    image: "https://image.qwenlm.ai/generated-images/f47dc457-125c-4524-ab14-bcc1e7caf18d/_result.png",
    freq: [262, 330, 392, 523, 392, 330, 262, 330]
  },
  {
    id: 45, numero: 45, titre: "Pas à pas", style_musical: "Pop gospel inspirante",
    ambiance: "Espérante, lumineuse, déterminée", theme_principal: "Continuer malgré la lenteur du chemin",
    emotion_dominante: "Espoir, détermination, patience", resume_histoire: "Le chanteur avance chaque jour, même si son rêve prend du temps.",
    phrase_reseaux_sociaux: "Pas à pas, je continue. Même si le chemin est lent, je ne baisse pas les bras.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 46, numero: 46, titre: "Laisse-moi respirer", style_musical: "R&B moderne",
    ambiance: "Sensible, émotionnelle, protectrice", theme_principal: "Relation trop étouffante",
    emotion_dominante: "Frustration, besoin d'espace, amour", resume_histoire: "Une personne aime son partenaire mais demande espace, confiance et liberté.",
    phrase_reseaux_sociaux: "J'aime, mais je dois respirer. Donne-moi de l'espace, de la confiance, de la liberté.",
    image: "https://image.qwenlm.ai/generated-images/3e82b461-f64c-4da8-86d0-a6cb4b256d34/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 47, numero: 47, titre: "Mon petit projet", style_musical: "Rap afro motivation",
    ambiance: "Ambitieuse, énergétique, déterminée", theme_principal: "Entrepreneuriat et indépendance financière",
    emotion_dominante: "Ambition, détermination, espoir", resume_histoire: "Un jeune commence avec peu de moyens, travaille sérieusement et développe son activité.",
    phrase_reseaux_sociaux: "Mon petit projet commence avec peu, mais je travaille pour le grandir. L'entrepreneuriat, c'est ma voie.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 48, numero: 48, titre: "On se comprend", style_musical: "Afro-soul",
    ambiance: "Intime, émotionnelle, complice", theme_principal: "Relation profonde",
    emotion_dominante: "Complicité, compréhension, amour", resume_histoire: "Deux personnes issues de milieux différents se comprennent mieux que personne.",
    phrase_reseaux_sociaux: "On se comprend sans parler. On se connaît sans se connaître. On est connectés.",
    image: "https://image.qwenlm.ai/generated-images/07c47df9-cce4-4215-8917-f30fb4228136/_result.png",
    freq: [220, 277, 330, 440, 330, 277, 220, 277]
  },
  {
    id: 49, numero: 49, titre: "Ne crois pas les apparences", style_musical: "Rap conscient",
    ambiance: "Sincère, critique, réfléchie", theme_principal: "Réalité cachée derrière les réseaux sociaux",
    emotion_dominante: "Lucidité, critique, compassion", resume_histoire: "Le chanteur explique que les photos et sourires publiés ne montrent pas toujours les difficultés.",
    phrase_reseaux_sociaux: "Ne crois pas les apparences. Derrière les sourires, il y a parfois des combats silencieux.",
    image: "https://image.qwenlm.ai/generated-images/f8178be0-14bf-44ad-8cc9-91d99be2dc72/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  },
  {
    id: 50, numero: 50, titre: "Je reviendrai fort", style_musical: "Rap mélodique + gospel",
    ambiance: "Motivante, puissante, inspirante", theme_principal: "Rebondir après un échec",
    emotion_dominante: "Détermination, résilience, espoir", resume_histoire: "Après avoir perdu, échoué ou été rejeté, le chanteur promet de revenir plus fort, plus sage et plus déterminé.",
    phrase_reseaux_sociaux: "Je suis tombé, mais je reviendrai fort. Plus sage, plus déterminé, plus moi-même.",
    image: "https://image.qwenlm.ai/generated-images/9378623c-8d02-4376-b58c-ef556f7abffe/_result.png",
    freq: [196, 247, 294, 392, 294, 247, 196, 247]
  }
];

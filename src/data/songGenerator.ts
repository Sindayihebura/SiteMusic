import { Song, songTemplates } from './songDatabase';

// Complete data for the first 5 songs
export const completeSongsData: Song[] = [
  {
    ...songTemplates[0],
    statut: 'complete',
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
    casting_vocal: {
      prenom_fictif: "Kévin",
      age_fictif: 21,
      categorie_vocale: "Jeune homme fictif",
      type_de_voix: "Masculin",
      texture_vocale: "Voix grave légère, chaude, rythmée, mélodique",
      registre_vocal: "Ténor léger avec nuances rap",
      style_de_chant: "Rap mélodique sur les couplets, chant mélodique sur les refrains",
      justification_du_choix: "Voix jeune et déterminée, parfaite pour raconter l'ambition et la persévérance d'un jeune qui part de zéro."
    },
    direction_audio: {
      bpm: 95,
      instruments_principaux: "Basse profonde, percussions africaines, guitare acoustique, piano doux, synthé léger",
      rythme: "Afrobeat dynamique, battement puissant, ambiance résolument positive",
      ambiance_sonore: "Motivante, énergique, inspirante",
      structure_du_morceau: "Intro (8 mesures) → Couplet 1 (16 mesures) → Pré-refrain (8 mesures) → Refrain (16 mesures) → Couplet 2 (16 mesures) → Pré-refrain (8 mesures) → Refrain (16 mesures) → Pont (8 mesures) → Refrain final (16 mesures) → Outro (8 mesures)",
      indications_vocales: "Couplets avec énergie et conviction, refrain puissant et fédérateur, pont plus intime et émotionnel",
      choeurs_et_harmonies: "Chœurs masculins en fond pour renforcer les refrains, harmonies sur le dernier refrain",
      introduction_instrumentale: "Piano doux accompagné de percussions légères qui montent en intensité",
      fin_instrumentale: "Percussions afrobeat s'estompent lentement avec une mélodie de guitare",
      prompt_audio: "Afrobeat instrumental avec voix grave masculine, tempo 95 BPM, ambiance motivante, guitare acoustique, percussions africaines, basse rythmique, refrain fédérateur avec chœurs masculins"
    },
    direction_video: {
      concept_du_clip: "Un jeune homme dans un quartier modeste, travaille dur et rêve de réussite",
      environnement_visuel: "Quartier populaire, studio musical, rue animée, scène de concert",
      lieu: "Maison modeste, studio, extérieur urbain",
      moment_de_la_journee: "Soirée et nuit",
      ambiance_visuelle: "Lumière dorée, tons chauds, atmosphère de résilience",
      personnages_fictifs: "Kévin (jeune homme 21 ans), sa mère (45 ans), ses amis (18-22 ans)",
      vetements_et_style: "Casual streetwear, tee-shirt simple, pantalon noir, baskets usées mais propres",
      couleurs_dominantes: "Jaune, orange, noir, blanc",
      lumiere: "Douce le soir, dynamique sur scène, dorée au coucher du soleil",
      deroulement_du_clip: "Kévin écrit ses textes chez lui → répète avec passion → danse dans la rue avec ses amis → performe en studio → debout sur scène sous les applaudissements",
      plans_et_mouvements_camera: "Plan rapproché sur le visage, plan large dans la rue, travelling latéral, plan aérien sur la ville",
      derniere_scene: "Kévin debout sur scène sous les applaudissements, lumière dorée",
      prompt_video: "Jeune homme africain de 21 ans dans un quartier modeste, écrit des textes, danse dans la rue, performe en studio, tons chauds, lumière dorée, ambiance motivante, plan rapproché et plan large"
    },
    paroles: {
      introduction: "Maman dit que le monde est dur\nMais j'ai promis, je serai plus fort\nPas de réseau, pas de soutien\nJuste mon rêve, et mon cœur battant",
      couplet_1: "J'ai rien dans les mains, mais j'ai tout dans la tête\nChaque pas que je fais, c'est pour la victoire\nIls disent que je n'y arriverai pas\nMais je trace ma route, je cours vers l'espoir\nLa rue me parle, mais je tends l'oreille\nAux voix qui disent : \"T'es pas fait pour ça\"\nMais moi je sais, je vais leur prouver\nQue l'on peut partir de zéro, et toucher les étoiles",
      pre_refrain_1: "Je me lève chaque jour, je respire l'effort\nChaque critique devient force, je n'ai pas peur du sort\nJe suis le fils du silence, mais je crie mon destin\nAvec du courage, du travail, je vais gagner ce tour",
      refrain_1: "Je pars de zéro, mais je touche le ciel\nChaque mot, chaque pas, c'est mon destin\nJe pars de zéro, mais je brille comme un feu\nFamille, je te ramène la gloire\nJe pars de zéro, mais je monte très haut\nJe pars de zéro, mais je suis prêt",
      couplet_2: "Les lendemains sont rudes, mais je ne baisse pas les bras\nLe manque de sommeil, je le cache sous un masque\nChaque chanson, chaque texte, c'est un combat\nContre les démons du doute, contre le vide\nJe vois les miens qui attendent, qui espèrent\nEt je sais que je dois avancer, sans fléchir\nCar le succès n'aime que ceux qui persistent\nAlors je me bats, pour eux, pour moi, pour nous",
      pre_refrain_2: "Je me lève chaque jour, je respire l'effort\nChaque critique devient force, je n'ai pas peur du sort\nJe suis le fils du silence, mais je crie mon destin\nAvec du courage, du travail, je vais gagner ce tour",
      refrain_2: "Je pars de zéro, mais je touche le ciel\nChaque mot, chaque pas, c'est mon destin\nJe pars de zéro, mais je brille comme un feu\nFamille, je te ramène la gloire\nJe pars de zéro, mais je monte très haut\nJe pars de zéro, mais je suis prêt",
      pont: "Parfois je tombe, mais je me relève\nChaque échec est une leçon, je l'accepte\nMême si la route est longue, je cours\nPour que demain, ce soit nous les rois",
      dernier_refrain: "Je pars de zéro, mais je touche le ciel\nChaque mot, chaque pas, c'est mon destin\nJe pars de zéro, mais je brille comme un feu\nFamille, je te ramène la gloire\nJe pars de zéro, mais je monte très haut\nJe pars de zéro, mais je suis prêt",
      outro: "Je pars de zéro, mais je suis déjà roi\nDans mon cœur, je sais que je serai\nPlus fort, plus grand, plus vrai\nJe pars de zéro, mais je suis né pour ça"
    }
  },
  {
    ...songTemplates[1],
    statut: 'complete',
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
    casting_vocal: {
      prenom_fictif: "Sarah",
      age_fictif: 20,
      categorie_vocale: "Jeune femme fictive",
      type_de_voix: "Féminin",
      texture_vocale: "Voix douce, chaude, émotionnelle, mélodieuse",
      registre_vocal: "Mezzo-soprano avec nuances intimistes",
      style_de_chant: "Chant doux et émotionnel, presque murmuré par moments",
      justification_du_choix: "Sa voix exprime la fragilité et la sensualité de l'histoire, parfaite pour les conversations nocturnes et les hésitations amoureuses."
    },
    direction_audio: {
      bpm: 75,
      instruments_principaux: "Piano doux, batterie subtile, basse souple, cordes légères, nappes synthétiques",
      rythme: "Lent, fluide, atmosphérique, très intime",
      ambiance_sonore: "Intime, nostalgique, romantique",
      structure_du_morceau: "Intro piano (8 mesures) → Couplet 1 (16 mesures) → Refrain (16 mesures) → Couplet 2 (16 mesures) → Refrain (16 mesures) → Pont (8 mesures) → Refrain final (16 mesures) → Outro (8 mesures)",
      indications_vocales: "Couplets chuchotés et intimes, refrain plus puissant et émotionnel, pont avec intensité maximale",
      choeurs_et_harmonies: "Harmonies féminines subtiles en fond sur le refrain",
      introduction_instrumentale: "Piano mélodique avec ambiance nocturne, quelques notes de cordes",
      fin_instrumentale: "Piano s'estompe doucement avec une dernière note de cordes",
      prompt_audio: "R&B moderne avec voix féminine douce, tempo 75 BPM, piano mélodique, batterie subtile, ambiance intime et nocturne, refrain émotionnel avec harmonies"
    },
    direction_video: {
      concept_du_clip: "Deux personnes dans des lieux différents, connectées par la nuit et les messages",
      environnement_visuel: "Chambres, rues nocturnes, fenêtres illuminées, balcons",
      lieu: "Appartements, balcons, chambres",
      moment_de_la_journee: "Nuit profonde, entre minuit et 3h du matin",
      ambiance_visuelle: "Tons bleus, violet foncé, lumière tamisée, atmosphère mystérieuse",
      personnages_fictifs: "Sarah (jeune femme 20 ans), David (jeune homme 22 ans)",
      vetements_et_style: "Pyjama confortable, pull large, cheveux détachés, air naturel et vulnérable",
      couleurs_dominantes: "Bleu, violet, noir",
      lumiere: "Douce, tamisée, reflets de lune et lumière du téléphone sur les visages",
      deroulement_du_clip: "Sarah et David échangent des messages → se regardent à travers l'écran → silences expressifs → hésitations → regards vers la lune → fin ouverte",
      plans_et_mouvements_camera: "Plan rapproché sur les yeux, plan sur les mains écrivant, zoom lent, plans croisés entre les deux personnages",
      derniere_scene: "Les deux regardent la lune simultanément, sans se dire les mots, écran éteint",
      prompt_video: "Deux jeunes dans des chambres distinctes, échange de messages la nuit, tons bleus, lumière tamisée, ambiance intime, plans rapprochés sur les émotions"
    },
    paroles: {
      introduction: "Minuit, encore une fois\nTon nom s'affiche sur mon écran\nJe souris, mais je ne dis rien\nLe silence parle plus que les mots",
      couplet_1: "On se parle depuis des mois\nDes phrases courtes, des silences\nTu me dis bonsoir, je réponds bonjour\nMais dans nos yeux, il y a plus\nChaque nuit, on se retrouve\nDans un monde à part, entre l'ombre et le jour\nOn rit, on parle, mais on n'ose pas\nDire ce que nos cœurs murmurent",
      pre_refrain_1: "Je veux te le dire, mais je retiens\nChaque mot, chaque soupir\nPeur que la magie s'envole\nSi je prononce ton prénom",
      refrain_1: "Minuit sur mon téléphone\nC'est toi, encore une fois\nOn parle, mais on se tait\nNos cœurs battent à l'unisson\nMinuit sur mon téléphone\nC'est nous, dans le silence\nDes mots non dits, des regards absents\nOn s'aime sans le dire",
      couplet_2: "Je t'imagine, dans ta chambre\nRegardant le même ciel que moi\nTu écris, effaces, recommences\nComme si les mots étaient trop lourds\nEt moi je reste là, à attendre\nQu'un simple message me sauve\nMais on sait tous les deux\nQue l'amour, c'est plus que des lettres",
      pre_refrain_2: "Je veux te le dire, mais je retiens\nChaque mot, chaque soupir\nPeur que la magie s'envole\nSi je prononce ton prénom",
      refrain_2: "Minuit sur mon téléphone\nC'est toi, encore une fois\nOn parle, mais on se tait\nNos cœurs battent à l'unisson\nMinuit sur mon téléphone\nC'est nous, dans le silence\nDes mots non dits, des regards absents\nOn s'aime sans le dire",
      pont: "Si tu savais à quel point je pense à toi\nDans chaque nuit, dans chaque silence\nJe voudrais t'appeler, te dire enfin\nQue je t'aime, et que je n'en peux plus",
      dernier_refrain: "Minuit sur mon téléphone\nC'est toi, encore une fois\nOn parle, mais on se tait\nNos cœurs battent à l'unisson\nMinuit sur mon téléphone\nC'est nous, dans le silence\nDes mots non dits, des regards absents\nOn s'aime sans le dire",
      outro: "Minuit, encore une fois\nTon nom s'affiche sur mon écran\nJe souris, mais je ne dis rien\nLe silence parle plus que les mots"
    }
  },
  {
    ...songTemplates[2],
    statut: 'complete',
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
    casting_vocal: {
      prenom_fictif: "Duo Amara & Joël",
      age_fictif: "20 et 21 ans",
      categorie_vocale: "Duo fictif (jeune femme + jeune homme)",
      type_de_voix: "Duo",
      texture_vocale: "Amara : voix lumineuse, énergique, chaude. Joël : voix chaude, rythmée, mélodique",
      registre_vocal: "Soprano léger (Amara) et baryton léger (Joël)",
      style_de_chant: "Chant énergique et festif, alternance entre les deux voix",
      justification_du_choix: "Duo complémentaire qui apporte énergie et joie, parfait pour une chanson festive et libératrice qui célèbre l'amitié."
    },
    direction_audio: {
      bpm: 110,
      instruments_principaux: "Batterie africaine, guitare électrique, cuivres, basse groovy, percussions",
      rythme: "Afrobeat festif, énergétique, dansant",
      ambiance_sonore: "Festif, libérateur, joyeux",
      structure_du_morceau: "Intro (8 mesures) → Couplet 1 Amara (16 mesures) → Refrain (16 mesures) → Couplet 2 Joël (16 mesures) → Refrain (16 mesures) → Pont duo (8 mesures) → Refrain final (16 mesures) → Outro (8 mesures)",
      indications_vocales: "Avec joie et énergie, sourire dans la voix, duo harmonieux sur le pont",
      choeurs_et_harmonies: "Chœurs festifs et entraînants, duo sur le pont avec harmonies",
      introduction_instrumentale: "Batterie africaine et cuivres entraînants",
      fin_instrumentale: "Musique s'estompe avec un solo de guitare et des rires en fond",
      prompt_audio: "Afrobeat dansant avec duo voix féminine lumineuse et masculine chaude, tempo 110 BPM, cuivres, guitare électrique, ambiance festive et joyeuse, refrain fédérateur avec chœurs"
    },
    direction_video: {
      concept_du_clip: "Groupe d'amis se retrouve après une semaine difficile et danse pour oublier les soucis",
      environnement_visuel: "Cour extérieure d'un quartier, espace ouvert avec guirlandes lumineuses",
      lieu: "Cour d'immeuble aménagée avec quelques chaises et une sono",
      moment_de_la_journee: "Soirée, début de nuit",
      ambiance_visuelle: "Festif, libérateur, chaleureux, couleurs vives",
      personnages_fictifs: "Amara (20 ans), Joël (21 ans), 4-5 amis de 18-23 ans",
      vetements_et_style: "Vêtements décontractés et colorés, sneakers, style urbain jeune",
      couleurs_dominantes: "Jaune, orange, bleu électrique",
      lumiere: "Guirlandes lumineuses, lumière chaude de soirée, néons colorés",
      deroulement_du_clip: "Les amis arrivent un par un, fatigués → commencent à danser doucement → danse collective énergique → moments de rire et de complicité → tout le monde danse en cercle",
      plans_et_mouvements_camera: "Plans larges du groupe, plans rapprochés sur les visages joyeux, caméra dynamique qui suit la danse",
      derniere_scene: "Tout le groupe danse ensemble en cercle, rires et joie, guirlandes lumineuses",
      prompt_video: "Groupe de jeunes amis africains dansant dans une cour extérieure, guirlandes lumineuses, ambiance joyeuse et libératrice, couleurs vives, caméra dynamique"
    },
    paroles: {
      introduction: "Laisse le stress de côté\nCe soir, on danse sans penser\nLa musique est là, l'ambiance est bonne\nViens, on oublie tout ensemble",
      couplet_1: "La semaine a été dure\nBeaucoup de pression, de fatigue\nMais ce soir, on met tout de côté\nOn danse, on rit, on respire\nPlus de souci, plus de peur\nJuste le rythme dans nos cœurs\nOn bouge, on danse, on s'éclate\nOn oublie ce qui nous fatigue",
      pre_refrain_1: "C'est notre moment, à nous\nOn lève les mains vers les étoiles\nOn danse sans penser à demain\nOn vit l'instant, on est là",
      refrain_1: "Danse sans souci, sans limite\nCe soir, on est libres\nDanse sans souci, sans peur\nLa musique nous sauve\nDanse sans souci, sans frontière\nOn est ensemble, on est heureux\nDanse sans souci, on est vivants",
      couplet_2: "Chacun sa douleur, chacun sa peine\nMais ici, on est unis\nOn danse, on rit, on oublie\nToutes les peines, tous les cris\nOn est là, ensemble, pour rire\nPour danser, pour être heureux\nCe soir, on oublie tout\nEt on danse, on danse, on danse",
      pre_refrain_2: "C'est notre moment, à nous\nOn lève les mains vers les étoiles\nOn danse sans penser à demain\nOn vit l'instant, on est là",
      refrain_2: "Danse sans souci, sans limite\nCe soir, on est libres\nDanse sans souci, sans peur\nLa musique nous sauve\nDanse sans souci, sans frontière\nOn est ensemble, on est heureux\nDanse sans souci, on est vivants",
      pont: "Quand la vie devient trop lourde\nIl suffit de danser pour renaître\nLibérer nos corps, nos cœurs\nEt laisser la musique nous emporter",
      dernier_refrain: "Danse sans souci, sans limite\nCe soir, on est libres\nDanse sans souci, sans peur\nLa musique nous sauve\nDanse sans souci, sans frontière\nOn est ensemble, on est heureux\nDanse sans souci, on est vivants",
      outro: "Danse sans souci, ce soir\nOn est libres, on est heureux\nDanse sans souci, on est là\nOn est vivants, on est là"
    }
  },
  {
    ...songTemplates[3],
    statut: 'complete',
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
    casting_vocal: {
      prenom_fictif: "Lina",
      age_fictif: 18,
      categorie_vocale: "Adolescente fictive",
      type_de_voix: "Féminin",
      texture_vocale: "Voix claire, fraîche, émotionnelle",
      registre_vocal: "Soprano léger avec nuances adolescentes",
      style_de_chant: "Chant émotionnel et expressif, vulnérable",
      justification_du_choix: "Voix jeune et sensible, parfaite pour exprimer la confusion et la tristesse d'une relation moderne à l'ère des réseaux sociaux."
    },
    direction_audio: {
      bpm: 85,
      instruments_principaux: "Beat pop urbain, piano mélodique, basse douce, effets sonores de notification",
      rythme: "Lent, mélancolique, sensible",
      ambiance_sonore: "Triste, confus, nostalgique",
      structure_du_morceau: "Intro (8 mesures) → Couplet 1 (16 mesures) → Refrain (16 mesures) → Couplet 2 (16 mesures) → Refrain (16 mesures) → Pont (8 mesures) → Refrain final (16 mesures) → Outro (8 mesures)",
      indications_vocales: "Couplets avec tristesse et confusion, refrain plus intense et émotionnel",
      choeurs_et_harmonies: "Harmonies légères sur le refrain",
      introduction_instrumentale: "Piano avec son de notification de message",
      fin_instrumentale: "Piano qui s'estompe avec écho",
      prompt_audio: "Pop urbaine mélancolique avec voix féminine jeune et émotionnelle, tempo 85 BPM, piano mélodique, beat moderne, ambiance triste et confuse, refrain intense avec harmonies"
    },
    direction_video: {
      concept_du_clip: "Une adolescente envoie des messages à quelqu'un qui les lit mais ne répond pas",
      environnement_visuel: "Chambre d'adolescente, école, trajets en bus",
      lieu: "Divers lieux du quotidien d'une lycéenne",
      moment_de_la_journee: "Journée, moments de solitude",
      ambiance_visuelle: "Triste, frustrant, réaliste",
      personnages_fictifs: "Lina (18 ans), seule avec son téléphone",
      vetements_et_style: "Uniforme scolaire, puis vêtements décontractés, style adolescente moderne",
      couleurs_dominantes: "Tons froids, gris, bleu pâle",
      lumiere: "Lumière naturelle, parfois lumière artificielle d'écran",
      deroulement_du_clip: "Lina envoie un message → vérifie son téléphone partout → voit 'vu' mais pas de réponse → montre sa frustration → pose le téléphone → regarde par la fenêtre",
      plans_et_mouvements_camera: "Plans rapprochés sur le téléphone et son visage, plans de suivi dans les couloirs",
      derniere_scene: "Lina regarde par la fenêtre, téléphone posé, expression résignée mais digne",
      prompt_video: "Adolescente de 18 ans vérifiant son téléphone avec tristesse, divers lieux du quotidien, lumière naturelle, ambiance réaliste et émotionnelle, plans rapprochés sur les expressions"
    },
    paroles: {
      introduction: "J'ai vu que tu as lu mon message\nMais aucune réponse, juste le silence\nJe me demande ce que j'ai fait de mal\nOu si tu as juste changé d'avis",
      couplet_1: "On se parlait tout le temps avant\nMaintenant tu disparais comme le vent\nJe relis nos conversations\nJe cherche le moment où tout a basculé\nTu étais là, puis plus rien\nJuste le vide, juste le silence\nJe me demande, je me questionne\nMais tu ne réponds pas",
      pre_refrain_1: "Je t'envoie un message\nJe vois que tu l'as lu\nMais tu ne réponds pas\nEt je ne comprends pas",
      refrain_1: "Vu, mais pas répondu\nPourquoi tu me fais ça ?\nDis-moi ce qui se passe\nOu laisse-moi partir\nVu, mais pas répondu\nJe mérite mieux que ça\nMieux que ce silence\nMieux que ton absence",
      couplet_2: "Je mérite mieux que ce silence\nMieux que cette indifférence\nMais mon cœur espère encore\nQue tu reviendras, que tu m'écriras\nJe continue à vérifier\nMon téléphone, encore et encore\nEspérant voir ton nom\nMais rien ne vient",
      pre_refrain_2: "Je t'envoie un message\nJe vois que tu l'as lu\nMais tu ne réponds pas\nEt je ne comprends pas",
      refrain_2: "Vu, mais pas répondu\nPourquoi tu me fais ça ?\nDis-moi ce qui se passe\nOu laisse-moi partir\nVu, mais pas répondu\nJe mérite mieux que ça\nMieux que ce silence\nMieux que ton absence",
      pont: "Peut-être que tu as changé\nPeut-être que c'est fini\nMais moi je reste là\nÀ attendre un signe de toi",
      dernier_refrain: "Vu, mais pas répondu\nPourquoi tu me fais ça ?\nDis-moi ce qui se passe\nOu laisse-moi partir\nVu, mais pas répondu\nJe mérite mieux que ça\nMieux que ce silence\nMieux que ton absence",
      outro: "Vu, mais pas répondu\nJe t'attends encore\nVu, mais pas répondu\nMais je mérite mieux"
    }
  },
  {
    ...songTemplates[4],
    statut: 'complete',
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
    casting_vocal: {
      prenom_fictif: "Marcus",
      age_fictif: 24,
      categorie_vocale: "Jeune homme fictif",
      type_de_voix: "Masculin",
      texture_vocale: "Voix chaude, mélodique, émotionnelle",
      registre_vocal: "Baryton avec nuances R&B",
      style_de_chant: "Chant mélodique avec moments de rap doux",
      justification_du_choix: "Voix jeune homme mature, parfaite pour exprimer la douleur et la demande de respect dans une relation toxique."
    },
    direction_audio: {
      bpm: 80,
      instruments_principaux: "Beat afro-R&B, guitare acoustique, basse ronde, percussions douces",
      rythme: "Émotionnel, sérieux, déterminé",
      ambiance_sonore: "Émotionnel, sérieux, déterminé",
      structure_du_morceau: "Intro (8 mesures) → Couplet 1 (16 mesures) → Refrain (16 mesures) → Couplet 2 (16 mesures) → Refrain (16 mesures) → Pont (8 mesures) → Refrain final (16 mesures) → Outro (8 mesures)",
      indications_vocales: "Couplets avec émotion contenue, refrain puissant et déterminé",
      choeurs_et_harmonies: "Chœurs sur le refrain",
      introduction_instrumentale: "Guitare acoustique avec beat doux",
      fin_instrumentale: "Guitare qui s'estompe",
      prompt_audio: "Afro-R&B émotionnel avec voix masculine chaude et mélodique, tempo 80 BPM, guitare acoustique, beat doux, ambiance émotionnelle et sérieuse, refrain puissant avec chœurs"
    },
    direction_video: {
      concept_du_clip: "Un jeune homme confronte sa partenaire sur son comportement manipulateur",
      environnement_visuel: "Appartement moderne, parc, café",
      lieu: "Divers lieux urbains",
      moment_de_la_journee: "Journée et soirée",
      ambiance_visuelle: "Émotionnel, sérieux, respectueux",
      personnages_fictifs: "Marcus (24 ans), sa partenaire fictive (23 ans)",
      vetements_et_style: "Style urbain moderne, décontracté mais soigné",
      couleurs_dominantes: "Tons neutres, beige, gris, touches de bleu",
      lumiere: "Lumière naturelle douce",
      deroulement_du_clip: "Marcus regarde des photos avec tristesse → flashbacks de moments de manipulation → il lui parle face à face, exprime sa douleur → moment de décision, il se respecte → il marche seul, confiant et digne",
      plans_et_mouvements_camera: "Plans rapprochés sur les expressions, plans de confrontation, travelling final",
      derniere_scene: "Marcus marche seul dans la rue, tête haute, expression de respect de soi",
      prompt_video: "Jeune homme de 24 ans confrontant une relation toxique, divers lieux urbains, lumière naturelle, ambiance sérieuse et respectueuse, plans sur les expressions et la confrontation"
    },
    paroles: {
      introduction: "Tu joues avec mes sentiments\nComme si je n'étais qu'un passe-temps\nTu viens et tu pars quand tu veux\nMais moi je donne tout, c'est dangereux",
      couplet_1: "Tu me dis des mots doux le soir\nPuis tu disparais sans un mot\nJe ne suis pas ton option\nJe mérite mieux que cette situation\nTu reviens quand tu t'ennuies\nTu pars quand tu trouves mieux\nMais moi je suis là, fidèle\nÀ attendre ton retour",
      pre_refrain_1: "J'en ai assez de tes jeux\nDe tes promesses vides\nJe veux du vrai, du sincère\nOu rien du tout",
      refrain_1: "Mon cœur n'est pas un jeu\nArrête de jouer avec\nSi tu ne m'aimes pas vraiment\nAlors laisse-moi partir\nMon cœur n'est pas un jouet\nRespecte ce que je ressens\nJe mérite mieux que ça\nMieux que tes mensonges",
      couplet_2: "Je t'ai donné ma confiance\nTu l'as utilisée contre moi\nMais je me respecte maintenant\nEt je ne reviendrai pas en arrière\nTu croyais que je serais là\nToujours, sans condition\nMais j'ai mes limites, moi aussi\nEt tu les as dépassées",
      pre_refrain_2: "J'en ai assez de tes jeux\nDe tes promesses vides\nJe veux du vrai, du sincère\nOu rien du tout",
      refrain_2: "Mon cœur n'est pas un jeu\nArrête de jouer avec\nSi tu ne m'aimes pas vraiment\nAlors laisse-moi partir\nMon cœur n'est pas un jouet\nRespecte ce que je ressens\nJe mérite mieux que ça\nMieux que tes mensonges",
      pont: "Je ne suis pas ton plan B\nTon option de secours\nJe suis quelqu'un de vrai\nAvec des vrais sentiments",
      dernier_refrain: "Mon cœur n'est pas un jeu\nArrête de jouer avec\nSi tu ne m'aimes pas vraiment\nAlors laisse-moi partir\nMon cœur n'est pas un jouet\nRespecte ce que je ressens\nJe mérite mieux que ça\nMieux que tes mensonges",
      outro: "Mon cœur n'est pas un jeu\nJe ne jouerai plus\nMon cœur n'est pas un jouet\nJe me respecte maintenant"
    }
  }
];

// Storage key for localStorage
const STORAGE_KEY = 'meschansons_database';

// Initialize database with all 50 songs
export function initializeDatabase(): Song[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Create initial database with all 50 songs as drafts
  const initialSongs: Song[] = songTemplates.map(template => ({
    ...template,
    statut: 'brouillon' as const,
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString()
  }));
  
  // Apply complete data for first 5 songs
  completeSongsData.forEach(completeSong => {
    const index = initialSongs.findIndex(s => s.id === completeSong.id);
    if (index !== -1) {
      initialSongs[index] = completeSong;
    }
  });
  
  saveDatabase(initialSongs);
  return initialSongs;
}

// Save database to localStorage
export function saveDatabase(songs: Song[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

// Get all songs
export function getAllSongs(): Song[] {
  return initializeDatabase();
}

// Get songs by status
export function getSongsByStatus(status: Song['statut']): Song[] {
  return getAllSongs().filter(song => song.statut === status);
}

// Get next batch of 5 draft songs
export function getNextDraftBatch(): Song[] {
  const drafts = getSongsByStatus('brouillon');
  return drafts.slice(0, 5);
}

// Update song
export function updateSong(updatedSong: Song): void {
  const songs = getAllSongs();
  const index = songs.findIndex(s => s.id === updatedSong.id);
  if (index !== -1) {
    songs[index] = {
      ...updatedSong,
      date_modification: new Date().toISOString()
    };
    saveDatabase(songs);
  }
}

// Mark song as published
export function markAsPublished(songId: number): void {
  const songs = getAllSongs();
  const index = songs.findIndex(s => s.id === songId);
  if (index !== -1 && songs[index].statut === 'complete') {
    songs[index].statut = 'publiee';
    songs[index].date_modification = new Date().toISOString();
    saveDatabase(songs);
  }
}

// Get progress
export function getProgress(): { complete: number; total: number; percentage: number } {
  const songs = getAllSongs();
  const complete = songs.filter(s => s.statut === 'complete' || s.statut === 'publiee').length;
  return {
    complete,
    total: 50,
    percentage: (complete / 50) * 100
  };
}

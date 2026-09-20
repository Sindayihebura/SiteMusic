# 🎵 MesChansons - Catalogue de 50 Chansons Originales

Site web professionnel pour gérer et générer progressivement un catalogue de 50 chansons originales en français.

## 🎯 Objectif

Créer un catalogue complet de 50 chansons originales avec pour chaque chanson :
- ✅ Paroles complètes en français
- ✅ Casting vocal fictif adapté
- ✅ Direction de production audio
- ✅ Concept de clip vidéo
- ✅ Prompts prêts pour générateurs IA (audio et vidéo)
- ✅ Système de progression (brouillon → complète → publiée)

## 📊 État Actuel

- **Chansons complètes** : 5 / 50 (10%)
- **Chansons en brouillon** : 45
- **Statut** : Système opérationnel, prêt à générer les lots suivants

## 🚀 Fonctionnalités

### Site Public
- Affichage des chansons complètes et publiées
- Détails complets de chaque chanson (paroles, casting, métadonnées)
- Design moderne et responsive
- Navigation intuitive

### Panel d'Administration (/admin)
- **Barre de progression** : Visualisez l'avancement (X/50 chansons)
- **Génération par lots** : Générez 5 chansons à la fois
- **Filtres** : Voir brouillons, complètes, publiées
- **Détails complets** : Toutes les informations de chaque chanson
- **Boutons d'action** :
  - Copier le prompt audio
  - Copier le prompt vidéo
  - Marquer comme publiée
  - Voir les détails complets

## 🎵 Les 5 Premières Chansons (Complètes)

### 1. Je pars de zéro
- **Style** : Rap mélodique + afrobeat
- **Thème** : Réussir malgré la pauvreté
- **Interprète** : Kévin (21 ans, voix masculine grave légère)
- **BPM** : 95
- **Statut** : ✅ Complète

### 2. Minuit sur mon téléphone
- **Style** : R&B moderne
- **Thème** : Amour caché et conversations tardives
- **Interprète** : Sarah (20 ans, voix féminine douce)
- **BPM** : 75
- **Statut** : ✅ Complète

### 3. Danse sans souci
- **Style** : Afrobeat dansant
- **Thème** : Oublier les problèmes et profiter de la vie
- **Interprète** : Duo Amara & Joël (20 et 21 ans)
- **BPM** : 110
- **Statut** : ✅ Complète

### 4. Vu, mais pas répondu
- **Style** : Pop urbaine
- **Thème** : Amour à l'époque des réseaux sociaux
- **Interprète** : Lina (18 ans, voix adolescente)
- **BPM** : 85
- **Statut** : ✅ Complète

### 5. Mon cœur n'est pas un jeu
- **Style** : Afro-R&B
- **Thème** : Manipulation émotionnelle
- **Interprète** : Marcus (24 ans, voix masculine chaude)
- **BPM** : 80
- **Statut** : ✅ Complète

## 📋 Structure des Données

Chaque chanson contient :

### Métadonnées de base
- `id`, `numero`, `titre`
- `style_musical`, `ambiance`, `theme_principal`
- `emotion_dominante`, `resume_histoire`
- `phrase_reseaux_sociaux`
- `statut` (brouillon | en_cours | complete | publiee)

### Casting Vocal Fictif
- `prenom_fictif`, `age_fictif`
- `categorie_vocale`, `type_de_voix`
- `texture_vocale`, `registre_vocal`
- `style_de_chant`, `justification_du_choix`

### Direction Audio
- `bpm`, `instruments_principaux`, `rythme`
- `ambiance_sonore`, `structure_du_morceau`
- `indications_vocales`, `choeurs_et_harmonies`
- `introduction_instrumentale`, `fin_instrumentale`
- `prompt_audio` (prêt pour générateur IA)

### Direction Vidéo
- `concept_du_clip`, `environnement_visuel`, `lieu`
- `moment_de_la_journee`, `ambiance_visuelle`
- `personnages_fictifs`, `vetements_et_style`
- `couleurs_dominantes`, `lumiere`
- `deroulement_du_clip`, `plans_et_mouvements_camera`
- `derniere_scene`, `prompt_video` (prêt pour générateur IA)

### Paroles Complètes
- `introduction`, `couplet_1`, `pre_refrain_1`, `refrain_1`
- `couplet_2`, `pre_refrain_2`, `refrain_2`
- `pont`, `dernier_refrain`, `outro`

## 🔧 Comment Générer les Chansons Suivantes

### Option 1 : Génération Manuelle (Recommandée pour le contrôle qualité)

1. **Accédez au panel admin** : `/admin`
2. **Cliquez sur "Générer le prochain lot de 5 chansons"**
3. **Utilisez les prompts audio/vidéo** dans un générateur IA :
   - **Audio** : Suno AI, Udio, MusicGen
   - **Vidéo** : Runway, Pika Labs, Stable Video Diffusion
4. **Ajoutez les résultats** dans le fichier `src/data/songGenerator.ts`
5. **Répétez** jusqu'à atteindre 50 chansons

### Option 2 : Intégration API (Automatique)

Pour automatiser la génération, vous devez intégrer une API d'IA :

```typescript
// Exemple d'intégration avec OpenAI/Claude
async function generateSongBatch(startIndex: number, count: number) {
  const prompt = `Génère ${count} chansons originales en français...`;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  // Traiter la réponse et mettre à jour la base de données
}
```

### Option 3 : Génération Semi-Automatique

1. Utilisez ChatGPT/Claude pour générer les paroles et descriptions
2. Copiez les résultats dans le fichier `src/data/songGenerator.ts`
3. Générez l'audio avec Suno AI ou Udio
4. Générez la vidéo avec Runway ou Pika Labs
5. Marquez les chansons comme "complètes" dans l'admin

## 📁 Structure du Projet

```
src/
├── data/
│   ├── songDatabase.ts       # Structure des 50 chansons
│   └── songGenerator.ts      # Logique de génération + 5 premières chansons
├── components/
│   └── AdminPanel.tsx        # Panel d'administration
├── App.tsx                   # Composant principal (routing)
├── main.tsx                  # Point d'entrée
└── index.css                 # Styles globaux
```

## 🎨 Utilisation des Prompts

### Prompt Audio (pour Suno AI, Udio, etc.)

Exemple pour "Je pars de zéro" :
```
Afrobeat instrumental avec voix grave masculine, tempo 95 BPM, ambiance motivante, 
guitare acoustique, percussions africaines, basse rythmique, refrain fédérateur avec chœurs masculins
```

### Prompt Vidéo (pour Runway, Pika Labs, etc.)

Exemple pour "Je pars de zéro" :
```
Jeune homme africain de 21 ans dans un quartier modeste, écrit des textes, danse dans la rue, 
performe en studio, tons chauds, lumière dorée, ambiance motivante, plan rapproché et plan large
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Poussez le code sur GitHub**
2. **Connectez votre repo à Vercel**
3. **Vercel détectera automatiquement Vite** grâce au `vercel.json`
4. **Déploiement automatique** à chaque push

### Netlify

1. **Build le projet** : `npm run build`
2. **Glissez-déposez** le dossier `dist/` sur https://app.netlify.com/drop
3. **Site en ligne immédiatement**

### GitHub Pages

1. **Créez un repo GitHub**
2. **Poussez le code**
3. **Activez GitHub Pages** dans Settings
4. **Site accessible publiquement**

## 📊 Progression

| Lot | Chansons | Statut |
|-----|----------|--------|
| 1 | 1-5 | ✅ Complètes |
| 2 | 6-10 | 📝 À générer |
| 3 | 11-15 | 📝 À générer |
| 4 | 16-20 | 📝 À générer |
| 5 | 21-25 | 📝 À générer |
| 6 | 26-30 | 📝 À générer |
| 7 | 31-35 | 📝 À générer |
| 8 | 36-40 | 📝 À générer |
| 9 | 41-45 | 📝 À générer |
| 10 | 46-50 | 📝 À générer |

## 🎯 Règles de Création

### Paroles
- ✅ Uniquement en français
- ✅ Original et authentique
- ✅ Pas de copie d'artistes existants
- ✅ Contenu approprié (pas de violence, drogues, contenu explicite)
- ✅ Refrains mémorables et faciles à chanter

### Voix Fictives
- ✅ Totalement fictives (pas de vrais artistes)
- ✅ Répartition équilibrée (adolescents, jeunes adultes, adultes, duos)
- ✅ Adaptées au thème et à l'émotion de chaque chanson

### Clips Vidéo
- ✅ Environnements originaux et variés
- ✅ Personnages fictifs uniquement
- ✅ Adaptés au public général
- ✅ Respectueux et réalistes

## 🔐 Accès Admin

Pour accéder au panel d'administration :
- **URL** : `votre-site.com/admin`
- **Note** : Actuellement ouvert, à sécuriser avec authentification en production

## 🛠️ Technologies

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styles
- **Vite** - Build tool
- **LocalStorage** - Persistance des données
- **Font Awesome** - Icônes
- **Google Fonts** - Playfair Display, Inter

## 📝 Prochaines Étapes

1. ✅ Structure de données créée (50 chansons)
2. ✅ 5 premières chansons complètes
3. ✅ Panel d'administration fonctionnel
4. ⏳ Générer les chansons 6-10
5. ⏳ Générer les chansons 11-15
6. ⏳ ... jusqu'à 50
7. ⏳ Intégrer les fichiers audio générés
8. ⏳ Intégrer les vidéos générées
9. ⏳ Ajouter un lecteur audio
10. ⏳ Sécuriser l'accès admin

## 💡 Conseils

- **Qualité avant quantité** : Prenez le temps de bien générer chaque chanson
- **Variez les styles** : Afrobeat, R&B, rap, pop, gospel, etc.
- **Testez les prompts** : Ajustez les prompts audio/vidéo selon les résultats
- **Sauvegardez régulièrement** : La base de données est dans localStorage
- **Documentez vos choix** : Notez pourquoi vous avez choisi tel interprète, tel style

## 🎉 Résultat Final

Un catalogue complet de 50 chansons originales en français, avec :
- Paroles complètes et originales
- Casting vocal fictif détaillé
- Directions de production audio
- Concepts de clips vidéo
- Prompts prêts pour générateurs IA
- Site web professionnel pour les présenter

---

**Fait avec ❤️ et 🎵**

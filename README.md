# 🎵 MesChansons - Plateforme de Création Musicale avec IA

Site web professionnel pour créer, gérer et générer 50 chansons originales en français avec génération audio IA.

## 🎯 Fonctionnalités Principales

### ✅ Gestion Complète des Chansons
- **50 chansons** avec métadonnées complètes
- **Paroles originales** en français
- **Casting vocal fictif** pour chaque chanson
- **Direction audio et vidéo** détaillée
- **Prompts prêts** pour générateurs IA

### 🎵 Génération Audio IA
- **Génération automatique** de fichiers audio chantés
- **3 versions** par chanson :
  - Version complète avec voix
  - Version instrumentale (sans voix)
  - Version courte 30s (pour réseaux sociaux)
- **Lecteur audio intégré** avec contrôles complets
- **Téléchargement** des fichiers audio
- **Régénération** à la demande

### 🎬 Génération Vidéo IA
- **Prompts vidéo** détaillés pour chaque chanson
- **Concepts de clips** originaux
- **Descriptions de scènes** complètes
- **Personnages fictifs** et décors

### 📊 Interface d'Administration
- **Barre de progression** (X/50 chansons)
- **Génération par lots** de 5 chansons
- **Filtres** par statut (brouillon, complète, publiée)
- **Vue détaillée** de chaque chanson
- **Configuration API** pour services audio

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build pour Production

```bash
npm run build
```

### Déploiement

Le site est prêt à être déployé sur :
- **Vercel** (recommandé)
- **Netlify**
- **GitHub Pages**

## 🎵 Configuration de la Génération Audio

### Mode Démo (par défaut)

Par défaut, le site fonctionne en **mode démo** qui simule la génération audio. Les boutons de génération sont fonctionnels mais produisent des URLs factices.

### Configuration avec Suno AI

Pour générer de **vrais fichiers audio**, configurez Suno AI :

1. **Obtenez une clé API** sur [https://suno.ai](https://suno.ai)
2. **Accédez à l'admin** : `http://localhost:5173/admin`
3. **Cliquez sur "Config API Audio"**
4. **Sélectionnez "Suno AI"**
5. **Entrez votre clé API**
6. **Sauvegardez**

### Configuration avec Udio

1. **Obtenez une clé API** sur [https://udio.com](https://udio.com)
2. **Accédez à l'admin**
3. **Sélectionnez "Udio"** dans la configuration
4. **Entrez votre clé API**

### Configuration avec Replicate

1. **Obtenez un token** sur [https://replicate.com](https://replicate.com)
2. **Accédez à l'admin**
3. **Sélectionnez "Replicate"**
4. **Entrez votre token**

## 📋 Structure des Données

### Chanson Complète

Chaque chanson contient :

```typescript
{
  id: number,
  numero: number,
  titre: string,
  style_musical: string,
  ambiance: string,
  theme_principal: string,
  emotion_dominante: string,
  resume_histoire: string,
  phrase_reseaux_sociaux: string,
  statut: 'brouillon' | 'en_cours' | 'complete' | 'publiee',
  
  // Casting vocal fictif
  casting_vocal: {
    prenom_fictif: string,
    age_fictif: number,
    categorie_vocale: string,
    type_de_voix: string,
    texture_vocale: string,
    registre_vocal: string,
    style_de_chant: string,
    justification_du_choix: string
  },
  
  // Direction audio
  direction_audio: {
    bpm: number,
    instruments_principaux: string,
    rythme: string,
    ambiance_sonore: string,
    structure_du_morceau: string,
    indications_vocales: string,
    choeurs_et_harmonies: string,
    introduction_instrumentale: string,
    fin_instrumentale: string,
    prompt_audio: string
  },
  
  // Direction vidéo
  direction_video: {
    concept_du_clip: string,
    environnement_visuel: string,
    lieu: string,
    moment_de_la_journee: string,
    ambiance_visuelle: string,
    personnages_fictifs: string,
    vetements_et_style: string,
    couleurs_dominantes: string,
    lumiere: string,
    deroulement_du_clip: string,
    plans_et_mouvements_camera: string,
    derniere_scene: string,
    prompt_video: string
  },
  
  // Paroles complètes
  paroles: {
    introduction: string,
    couplet_1: string,
    pre_refrain_1: string,
    refrain_1: string,
    couplet_2: string,
    pre_refrain_2: string,
    refrain_2: string,
    pont: string,
    dernier_refrain: string,
    outro: string
  },
  
  // Données audio générées
  audio: {
    audio_statut: 'non_genere' | 'en_cours' | 'termine' | 'erreur',
    audio_url: string,
    audio_format: string,
    audio_duree_secondes: number,
    audio_date_generation: string,
    audio_prompt_utilise: string,
    audio_version: string,
    audio_est_instrumental: boolean,
    audio_message_erreur: string,
    audio_service_utilise: string
  }
}
```

## 🎤 Génération Audio : Comment ça Marche

### Processus de Génération

1. **Cliquez sur "Générer l'audio chanté"**
2. **Le système crée un prompt détaillé** avec :
   - Titre de la chanson
   - Style musical et BPM
   - Instruments et ambiance
   - Profil vocal fictif
   - Paroles complètes
3. **Envoi au service IA** (Suno, Udio, ou Replicate)
4. **Attente de la génération** (1-3 minutes)
5. **Réception du fichier audio** (MP3)
6. **Stockage et lecture** dans le site

### Prompt Audio Généré

Exemple pour "Je pars de zéro" :

```
Titre: Je pars de zéro
Langue: français uniquement
Style: Rap mélodique + afrobeat
Tempo: 95 BPM
Ambiance: Motivante, puissante et optimiste
Instruments: Basse profonde, percussions africaines, guitare acoustique, piano doux, synthé léger
Voix: Jeune homme fictif, voix grave légère, chaude, rythmée, mélodique
Style de chant: Rap mélodique sur les couplets, chant mélodique sur les refrains
Interprète: Kévin (21 ans) - personnage vocal fictif
Structure: Introduction, couplet 1, pré-refrain, refrain, couplet 2, pré-refrain, refrain, pont, dernier refrain, outro
Paroles: [paroles complètes]
Qualité: Voix intelligible, émotion naturelle, refrain fort et mémorable, instruments équilibrés, mixage professionnel
Interdictions: Ne pas citer, copier ou imiter un artiste réel; ne pas utiliser de voix réelle non autorisée
```

## 🎬 Génération Vidéo

### Utilisation des Prompts Vidéo

Les prompts vidéo sont prêts à être utilisés dans :
- **Runway ML** : [https://runwayml.com](https://runwayml.com)
- **Pika Labs** : [https://pika.art](https://pika.art)
- **Stable Video Diffusion** : [https://stability.ai](https://stability.ai)
- **Luma AI** : [https://lumalabs.ai](https://lumalabs.ai)

### Exemple de Prompt Vidéo

```
Jeune homme africain de 21 ans dans un quartier modeste, écrit des textes, danse dans la rue, 
performe en studio, tons chauds, lumière dorée, ambiance motivante, plan rapproché et plan large
```

## 📊 Statut des Chansons

### Progression Actuelle

- ✅ **5 chansons complètes** avec paroles, casting, et directions
- ⏳ **45 chansons en brouillon** prêtes à être générées
- 🎯 **Objectif** : 50 chansons complètes

### Chansons Complètes

1. **Je pars de zéro** - Rap mélodique + afrobeat (Kévin, 21 ans)
2. **Minuit sur mon téléphone** - R&B moderne (Sarah, 20 ans)
3. **Danse sans souci** - Afrobeat dansant (Duo Amara & Joël)
4. **Vu, mais pas répondu** - Pop urbaine (Lina, 18 ans)
5. **Mon cœur n'est pas un jeu** - Afro-R&B (Marcus, 24 ans)

## 🎨 Fonctionnalités de l'Interface

### Site Public (`/`)
- Affichage des chansons complètes et publiées
- Détails complets de chaque chanson
- Design moderne et responsive
- Navigation intuitive

### Panel d'Administration (`/admin`)
- **Barre de progression** : Visualisez l'avancement
- **Génération par lots** : 5 chansons à la fois
- **Filtres** : Brouillons, complètes, publiées
- **Détails complets** : Toutes les informations
- **Génération audio** : Avec lecteur intégré
- **Configuration API** : Suno, Udio, Replicate

### Lecteur Audio
- ▶️ Lecture/Pause
- 🎚️ Barre de progression interactive
- 🔊 Contrôle du volume
- ⏱️ Affichage du temps
- 💾 Bouton de téléchargement

## 🔐 Sécurité et Éthique

### Voix Fictives
- ✅ Tous les interprètes sont **totalement fictifs**
- ✅ Aucune imitation d'artistes réels
- ✅ Voix générées par IA avec autorisation
- ✅ Respect des droits d'auteur

### Contenu Approprié
- ✅ Pas de contenu explicite ou violent
- ✅ Thèmes adaptés au grand public
- ✅ Messages positifs et inspirants
- ✅ Respect des mineurs (16-17 ans)

## 🛠️ Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styles
- **Vite** - Build tool
- **LocalStorage** - Persistance des données
- **Font Awesome** - Icônes
- **Google Fonts** - Playfair Display, Inter

## 📝 Guide d'Utilisation

### 1. Générer une Chanson Complète

1. Accédez à `/admin`
2. Cliquez sur "Générer le prochain lot de 5 chansons"
3. Attendez la génération (nécessite une API configurée)
4. Les chansons apparaissent avec le statut "complète"

### 2. Générer l'Audio d'une Chanson

1. Cliquez sur une chanson complète
2. Dans la section "Génération Audio", cliquez sur "Générer l'audio chanté"
3. Attendez 1-3 minutes
4. Le lecteur audio apparaît avec la chanson générée
5. Vous pouvez télécharger le fichier MP3

### 3. Générer une Version Instrumentale

1. Ouvrez une chanson avec audio généré
2. Cliquez sur "Générer version instrumentale"
3. Attendez la génération
4. Un deuxième lecteur apparaît

### 4. Générer une Version Courte (30s)

1. Ouvrez une chanson avec audio généré
2. Cliquez sur "Générer version 30 secondes"
3. Parfait pour TikTok, Instagram Reels, YouTube Shorts

### 5. Copier les Prompts

1. Ouvrez une chanson
2. Cliquez sur "📋 Copier le prompt" pour audio ou vidéo
3. Collez dans votre générateur IA préféré

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Netlify

```bash
# Build
npm run build

# Glisser-déposer le dossier dist/ sur https://app.netlify.com/drop
```

### GitHub Pages

1. Poussez le code sur GitHub
2. Activez GitHub Pages dans Settings
3. Le site sera accessible publiquement

## 📚 Ressources

### Services de Génération Audio
- **Suno AI** : [https://suno.ai](https://suno.ai) - Génération de chansons complètes
- **Udio** : [https://udio.com](https://udio.com) - Génération musicale avancée
- **Replicate** : [https://replicate.com](https://replicate.com) - Modèles IA open-source

### Services de Génération Vidéo
- **Runway ML** : [https://runwayml.com](https://runwayml.com)
- **Pika Labs** : [https://pika.art](https://pika.art)
- **Luma AI** : [https://lumalabs.ai](https://lumalabs.ai)

### Stockage de Fichiers Audio
- **Cloudinary** : [https://cloudinary.com](https://cloudinary.com)
- **AWS S3** : [https://aws.amazon.com/s3](https://aws.amazon.com/s3)
- **Firebase Storage** : [https://firebase.google.com](https://firebase.google.com)

## 🎯 Prochaines Étapes

1. ✅ Structure de données créée (50 chansons)
2. ✅ 5 premières chansons complètes
3. ✅ Panel d'administration fonctionnel
4. ✅ Système de génération audio intégré
5. ✅ Lecteur audio avec contrôles complets
6. ⏳ Configurer une API audio réelle (Suno/Udio)
7. ⏳ Générer les chansons 6-10
8. ⏳ Continuer jusqu'à 50 chansons
9. ⏳ Ajouter stockage cloud pour les fichiers audio
10. ⏳ Intégrer génération vidéo automatique

## 💡 Conseils

- **Testez en mode démo** avant de configurer une API payante
- **Commencez avec Suno AI** pour des résultats rapides
- **Variez les styles** pour un catalogue diversifié
- **Sauvegardez régulièrement** vos configurations
- **Utilisez les prompts** comme inspiration pour vos propres créations

## 📄 Licence

Ce projet est open source et libre d'utilisation.

Les voix générées doivent respecter les conditions d'utilisation des services IA utilisés.

---

**Fait avec ❤️ et 🎵**

**Version** : 1.0.0  
**Dernière mise à jour** : 2024

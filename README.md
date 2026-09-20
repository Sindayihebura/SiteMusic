# 🎵 MesChansons - Site Musical Professionnel

Site web professionnel pour artiste musical avec paroles, voix synthétisée et mode karaoké.

## ✨ Fonctionnalités

### 🎤 Artiste & Voix
- **Voix synthétisée** : L'artiste chante les paroles en français via la Web Speech API
- **Section Artiste** : Présentation complète avec photo et bio
- **Indicateur de chant en direct** : Animation de vagues vocales quand l'artiste chante

### 📝 Paroles & Karaoké
- **Paroles complètes** pour chaque chanson (6 chansons)
- **Mode karaoké** : Les paroles défilent en temps réel pendant la lecture
- **Surlignage automatique** : La ligne actuelle est mise en évidence
- **Bouton Paroles** dans le lecteur audio pour afficher les paroles à tout moment

### 🎵 Musique
- **6 chansons originales** avec mélodies générées par synthétiseur
- **Lecteur audio** avec contrôles play/pause, suivant, précédent
- **Visualiseur audio** animé (28 barres)
- **Barre de progression** interactive

### 🎨 Design
- Thème sombre moderne avec effets glass morphism
- Animations fluides (particules, vinyle tournant, visualiseur)
- Responsive (mobile, tablette, desktop)
- 10 images générées par IA

### 💰 Monétisation
- Liens vers 8 plateformes de streaming
- Boutons de support (Tipeee, Patreon, Buy Me a Coffee)
- Boutique officielle
- Système de likes et partage social

### 📱 Réseaux Sociaux
- 5 réseaux sociaux avec compteurs de followers
- Partage sur Twitter, Facebook, WhatsApp, Telegram
- Newsletter avec bonus (titre inédit gratuit)

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Via GitHub** :
   - Poussez le code sur GitHub
   - Connectez votre repo à Vercel
   - Vercel détectera automatiquement Vite grâce au `vercel.json`
   - Le site sera déployé automatiquement

2. **Via Vercel CLI** :
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Configuration manuelle** :
   - Framework Preset : `Vite`
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`

### Netlify

1. Build le projet : `npm run build`
2. Glissez-déposez le dossier `dist/` sur https://app.netlify.com/drop
3. ✅ Site en ligne immédiatement

### GitHub Pages

1. Créez un repo GitHub
2. Poussez le code
3. Activez GitHub Pages dans Settings
4. ✅ Site accessible publiquement

## 🎯 Utilisation

### Écouter les chansons avec la voix

1. Cliquez sur une chanson dans la section "🎵 Chansons"
2. La mélodie commence à jouer
3. La voix de l'artiste chante les paroles en français
4. Les paroles défilent en mode karaoké

### Voir les paroles

- **Option 1** : Cliquez sur l'icône 📝 sur chaque carte de chanson
- **Option 2** : Cliquez sur le bouton "Paroles" dans le lecteur audio en bas

### Mode karaoké

Quand une chanson est en lecture :
- Les paroles s'affichent automatiquement
- La ligne actuelle est mise en évidence (plus grande, plus brillante)
- Les lignes passées deviennent grises
- Les lignes à venir restent normales

## 🛠️ Technologies

- React 18
- TypeScript
- Tailwind CSS 4
- Vite
- Web Audio API (synthétiseur)
- Web Speech API (voix)
- Font Awesome 6
- Google Fonts (Playfair Display, Inter)

## 📂 Structure

```
mon-site-musique/
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── vercel.json          # Configuration Vercel
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx          # Composant principal avec tout le code
    └── index.css        # Styles et animations
```

## 🎵 Chansons incluses

1. **Étoiles du Soir** (Pop) - Lumières
2. **Danse sous la Pluie** (Pop) - Lumières
3. **Cœur de Verre** (Ballade) - Fragile
4. **Voyage Intérieur** (Acoustique) - Fragile
5. **Nuit Électrique** (Électro) - Voltage
6. **Jardin Secret** (Indie) - Voltage

Chaque chanson a :
- Une couverture générée par IA
- Des paroles complètes en français
- Une mélodie synthétisée
- Une voix qui chante les paroles

## 🎨 Personnalisation

### Changer les paroles
Modifiez le tableau `lyrics` dans chaque chanson dans `src/App.tsx` :
```typescript
lyrics: [
  { time: 0, text: "Première ligne" },
  { time: 5, text: "Deuxième ligne" },
  // ...
]
```

### Changer la voix
Dans la classe `AudioSynth`, modifiez :
```typescript
this.voice.lang = 'fr-FR';  // Langue
this.voice.rate = 0.9;      // Vitesse (0.1 à 10)
this.voice.pitch = 1.2;     // Hauteur (0 à 2)
this.voice.volume = 0.8;    // Volume (0 à 1)
```

### Changer les couleurs
Modifiez les variables CSS dans `src/index.css` :
```css
--color-indigo: #6366f1;
--color-purple: #a855f7;
--color-amber: #f59e0b;
```

## 📱 Responsive

- **Mobile** : Menu hamburger, grilles 1 colonne
- **Tablette** : Grilles 2 colonnes
- **Desktop** : Grilles 3 colonnes, visualiseur audio visible

## 🎯 Objectifs atteints

✅ Monétiser via streaming (8 plateformes)
✅ Monétiser via vente directe (iTunes, Amazon, Bandcamp)
✅ Monétiser via support fans (Tipeee, Patreon, Buy Me a Coffee)
✅ Monétiser via merch (boutique officielle)
✅ Obtenir des followers (5 réseaux sociaux)
✅ Obtenir des likes (système interactif)
✅ Partage viral (Twitter, Facebook, WhatsApp, Telegram)
✅ Newsletter pour fidéliser
✅ Design professionnel pour crédibilité
✅ Accessible dans le monde entier
✅ **NOUVEAU** : Paroles complètes pour chaque chanson
✅ **NOUVEAU** : Voix synthétisée qui chante
✅ **NOUVEAU** : Mode karaoké avec paroles en temps réel
✅ **NOUVEAU** : Section artiste complète

## 🎤 À propos de la voix

La voix est générée par la **Web Speech API** du navigateur :
- Fonctionne sur tous les navigateurs modernes
- Pas besoin de fichiers audio externes
- Voix française automatique
- Synchronisée avec les paroles

## 📄 Licence

Ce projet est open source et libre d'utilisation.

---

Fait avec ❤️ et 🎵

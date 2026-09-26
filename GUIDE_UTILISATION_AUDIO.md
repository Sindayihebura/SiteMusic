# 🎵 Guide d'Utilisation - Génération Audio avec Voix Réelle

## ✅ Système Audio Fonctionnel

Votre site musical est maintenant équipé d'un **système de génération audio réel** qui utilise la **Web Speech API** du navigateur pour créer des voix qui chantent réellement les paroles !

## 🎤 Comment Ça Marche

### 1. Web Speech API (Voix Réelle du Navigateur)

Le système utilise la synthèse vocale native de votre navigateur pour :
- ✅ **Lire les paroles à voix haute** en français
- ✅ **Adapter la voix** selon le profil vocal fictif (âge, genre)
- ✅ **Afficher les paroles en temps réel** (mode karaoké)
- ✅ **Jouer une mélodie de fond** générée par Web Audio API
- ✅ **Fonctionner immédiatement** sans configuration API

### 2. Fonctionnalités du Lecteur Karaoké

Chaque chanson dispose d'un lecteur avancé avec :
- 🎵 **Bouton Play/Pause** : Lance ou met en pause la lecture
- 🎤 **Affichage karaoké** : Les paroles défilent en temps réel
- 📊 **Barre de progression** : Visualisez l'avancement
- 🎚️ **Contrôle du volume** : Ajustez le son
- 🛑 **Bouton Stop** : Arrêtez la lecture
- 📝 **Aperçu des paroles** : Voir toutes les paroles

## 🚀 Comment Utiliser

### Étape 1 : Accéder à l'Administration

1. Ouvrez votre site dans un navigateur
2. Allez sur `/admin`
3. Vous verrez la liste des 50 chansons

### Étape 2 : Générer l'Audio d'une Chanson

1. Cliquez sur une chanson complète (ex: "Je pars de zéro")
2. Dans la section **"🎵 Génération Audio"**, vous verrez 3 options :
   - **Version complète avec voix**
   - **Version instrumentale (sans voix)**
   - **Version courte (30s pour réseaux sociaux)**

3. Cliquez sur **"✨ Générer l'audio chanté"**
4. Attendez quelques secondes (la voix se prépare)
5. Le lecteur karaoké apparaît automatiquement !

### Étape 3 : Écouter la Chanson

1. Cliquez sur le bouton **▶️ Play**
2. La voix commence à chanter les paroles
3. Les paroles défilent en temps réel dans le lecteur
4. Une mélodie de fond joue en même temps
5. Vous pouvez ajuster le volume avec le curseur

### Étape 4 : Contrôler la Lecture

- **Pause** : Cliquez sur ⏸️ pour mettre en pause
- **Reprendre** : Cliquez sur ▶️ pour reprendre
- **Stop** : Cliquez sur ⏹️ pour arrêter complètement
- **Volume** : Utilisez le curseur pour ajuster

## 🎭 Adaptation de la Voix

Le système adapte automatiquement la voix selon le profil vocal fictif :

### Pour les Adolescents (16-17 ans)
- **Pitch plus élevé** : Voix plus jeune
- **Débit normal** : Parole naturelle
- **Exemple** : Lina (18 ans) dans "Vu, mais pas répondu"

### Pour les Jeunes Adultes (18-25 ans)
- **Pitch adapté** : Voix jeune adulte
- **Débit légèrement ralenti** : Effet chanté
- **Exemple** : Kévin (21 ans) dans "Je pars de zéro"

### Pour les Adultes (26-40 ans)
- **Pitch plus bas** : Voix mature
- **Débit plus lent** : Voix posée
- **Exemple** : Marcus (24 ans) dans "Mon cœur n'est pas un jeu"

### Pour les Duos
- **Alternance des voix** : Les deux voix se succèdent
- **Harmonisation** : Effet de duo
- **Exemple** : Amara & Joël dans "Danse sans souci"

## 🎵 Types de Versions

### 1. Version Complète
- **Durée** : ~3-4 minutes
- **Contenu** : Toutes les paroles (intro, couplets, refrains, pont, outro)
- **Usage** : Écoute complète de la chanson

### 2. Version Instrumentale
- **Durée** : ~3-4 minutes
- **Contenu** : Mélodie de fond uniquement (pas de voix)
- **Usage** : Karaoke, accompagnement, pratique

### 3. Version Courte (30s)
- **Durée** : 30 secondes
- **Contenu** : Refrain uniquement
- **Usage** : TikTok, Instagram Reels, YouTube Shorts

## 🔧 Configuration Avancée

### Changer le Service Audio

Par défaut, le site utilise **Web Speech API** (gratuit, immédiat).

Vous pouvez configurer d'autres services dans `/admin` :

1. Cliquez sur **"⚙️ Config API Audio"**
2. Choisissez un service :
   - **Web Speech API** (recommandé pour commencer)
   - **Suno AI** (nécessite une clé API)
   - **Udio** (nécessite une clé API)
   - **Replicate** (nécessite une clé API)

3. Entrez votre clé API si nécessaire
4. Cliquez sur **"Sauvegarder"**

### Avantages de Web Speech API

✅ **Gratuit** : Pas de coût  
✅ **Immédiat** : Pas d'attente  
✅ **Privé** : Tout reste dans votre navigateur  
✅ **Fonctionne hors ligne** : Pas besoin d'internet  
✅ **Personnalisable** : Voix adaptées aux profils  

### Limitations de Web Speech API

⚠️ **Qualité vocale** : Voix synthétique (pas aussi naturelle qu'un vrai chanteur)  
⚠️ **Pas de mélodie complexe** : Juste une mélodie de fond simple  
⚠️ **Dépend du navigateur** : Qualité variable selon le navigateur  

## 🎯 Conseils pour une Meilleure Expérience

### 1. Utilisez un Bon Navigateur

**Recommandé :**
- ✅ **Google Chrome** : Meilleure qualité vocale
- ✅ **Microsoft Edge** : Bonne qualité, voix naturelles
- ✅ **Safari** : Bon sur macOS/iOS

**Évitez :**
- ❌ Firefox : Qualité vocale limitée
- ❌ Navigateurs mobiles anciens

### 2. Activez les Voix Françaises

**Sur Windows :**
1. Paramètres > Time & Language > Language
2. Ajoutez "Français (France)"
3. Téléchargez les voix françaises

**Sur macOS :**
1. Préférences Système > Accessibilité > Spoken Content
2. Activez "Speak selection"
3. Téléchargez les voix françaises

**Sur Chrome :**
- Les voix françaises sont incluses par défaut
- Vérifiez dans chrome://settings/languages

### 3. Ajustez le Volume

- Commencez avec un volume bas (30-50%)
- Augmentez progressivement
- Utilisez un casque pour une meilleure qualité

### 4. Testez Différentes Chansons

Chaque chanson a un profil vocal différent :
- **Je pars de zéro** : Voix masculine jeune (Kévin, 21 ans)
- **Minuit sur mon téléphone** : Voix féminine douce (Sarah, 20 ans)
- **Danse sans souci** : Duo (Amara & Joël)
- **Vu, mais pas répondu** : Voix adolescente (Lina, 18 ans)
- **Mon cœur n'est pas un jeu** : Voix masculine mature (Marcus, 24 ans)

## 🎬 Génération Vidéo

En plus de l'audio, vous pouvez générer des vidéos :

1. Dans la fiche d'une chanson, section **"🎬 Direction Vidéo"**
2. Cliquez sur **"📋 Copier le prompt"**
3. Collez le prompt dans un générateur vidéo IA :
   - **Runway ML** : https://runwayml.com
   - **Pika Labs** : https://pika.art
   - **Luma AI** : https://lumalabs.ai

## 📊 Statut des Chansons

### Progression Actuelle

- ✅ **5 chansons complètes** avec paroles et profils vocaux
- ✅ **Système audio fonctionnel** avec Web Speech API
- ✅ **Lecteur karaoké** avec paroles en temps réel
- ⏳ **45 chansons en brouillon** (prêtes à être complétées)

### Prochaines Étapes

1. **Générer l'audio** des 5 premières chansons
2. **Tester les différentes voix** et ajuster si nécessaire
3. **Compléter les 45 autres chansons** (paroles + profils)
4. **Générer l'audio** de toutes les chansons
5. **Créer des vidéos** pour les meilleures chansons

## 🐛 Dépannage

### Problème : Pas de son

**Solutions :**
1. Vérifiez que le volume de votre ordinateur n'est pas muet
2. Vérifiez que le volume du navigateur n'est pas muet
3. Cliquez sur le bouton Play (certains navigateurs bloquent l'audio automatique)
4. Rechargez la page

### Problème : Voix trop rapide ou trop lente

**Solutions :**
1. Le système ajuste automatiquement selon l'âge fictif
2. Si nécessaire, modifiez le profil vocal dans la base de données
3. Les voix jeunes sont plus rapides, les voix matures plus lentes

### Problème : Voix ne correspond pas au profil

**Solutions :**
1. La Web Speech API utilise les voix installées sur votre système
2. Installez plus de voix françaises dans les paramètres de votre OS
3. Le système essaie de trouver la meilleure voix disponible

### Problème : Mélodie de fond trop forte

**Solutions :**
1. Ajustez le volume avec le curseur du lecteur
2. La mélodie est volontairement discrète pour ne pas couvrir la voix
3. Vous pouvez utiliser la version instrumentale pour écouter juste la mélodie

## 🎓 Pour Aller Plus Loin

### Améliorer la Qualité Vocale

Pour des voix plus naturelles, vous pouvez :

1. **Utiliser Suno AI** (payant mais haute qualité)
   - Site : https://suno.ai
   - Coût : ~$10/mois
   - Qualité : Voix très naturelles

2. **Utiliser Udio** (payant, qualité professionnelle)
   - Site : https://udio.com
   - Coût : ~$15/mois
   - Qualité : Studio professionnel

3. **Utiliser Replicate** (payant, flexible)
   - Site : https://replicate.com
   - Coût : ~$0.01/génération
   - Qualité : Variable selon le modèle

### Créer de Vrais Fichiers Audio

Pour exporter les chansons en MP3 :

1. Utilisez un logiciel d'enregistrement (Audacity, OBS)
2. Enregistrez la sortie audio de votre navigateur
3. Éditez et améliorez la qualité
4. Exportez en MP3 haute qualité

### Intégrer dans une Application Mobile

Le système Web Speech API fonctionne aussi sur mobile :
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Applications React Native (avec plugins)

## 📞 Support

### Ressources

- **Documentation Web Speech API** : https://developer.mozilla.org/docs/Web/API/Web_Speech_API
- **Voix disponibles** : Vérifiez dans votre navigateur
- **Problèmes techniques** : Consultez la console du navigateur (F12)

### Communauté

- Rejoignez le Discord du projet
- Partagez vos créations
- Signalez les bugs
- Proposez des améliorations

---

**Prêt à créer de la musique ?** 🎵

1. Allez sur `/admin`
2. Cliquez sur une chanson
3. Cliquez sur "Générer l'audio chanté"
4. Appuyez sur Play et écoutez ! 🎤

**Bonne création !** ✨

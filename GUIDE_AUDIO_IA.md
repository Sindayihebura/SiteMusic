# 🎵 Guide de Configuration Audio IA

Ce guide explique comment configurer et utiliser la génération audio avec différents services IA pour produire de vrais fichiers audio chantés.

## 📋 Table des Matières

1. [Mode Démo (par défaut)](#mode-demo)
2. [Configuration Suno AI](#suno-ai)
3. [Configuration Udio](#udio)
4. [Configuration Replicate](#replicate)
5. [Stockage des Fichiers Audio](#stockage)
6. [Dépannage](#depannage)

---

## 🎭 Mode Démo {#mode-demo}

### Description

Le mode démo est activé par défaut et simule la génération audio sans appeler de service externe.

### Caractéristiques

- ✅ Boutons de génération fonctionnels
- ✅ Interface complète avec lecteur audio
- ❌ Pas de vrais fichiers audio générés
- ❌ URLs factices (ne fonctionnent pas)

### Activation

Le mode démo est activé automatiquement. Pour vérifier :

1. Accédez à `/admin`
2. Cliquez sur "Config API Audio"
3. Vérifiez que "Mode Démo (simulation)" est sélectionné

### Utilisation

Le mode démo est parfait pour :
- Tester l'interface
- Vérifier le workflow
- Préparer les prompts
- Comprendre le processus

---

## 🎵 Configuration Suno AI {#suno-ai}

### Qu'est-ce que Suno AI ?

Suno AI est un service de génération musicale par IA qui peut créer des chansons complètes avec voix, instruments et paroles.

### Étapes de Configuration

#### 1. Créer un Compte

1. Allez sur [https://suno.ai](https://suno.ai)
2. Cliquez sur "Sign Up"
3. Créez votre compte (email ou Google)
4. Vérifiez votre email

#### 2. Obtenir une Clé API

**Note** : Suno AI ne propose pas encore d'API publique officielle. Vous avez deux options :

**Option A : Utiliser l'interface web manuellement**
1. Connectez-vous à Suno AI
2. Copiez le prompt généré depuis l'admin
3. Collez-le dans Suno AI
4. Téléchargez le fichier audio
5. Uploadez-le manuellement

**Option B : Utiliser une API non-officielle**
1. Rejoignez le Discord de Suno AI
2. Cherchez des APIs communautaires
3. Utilisez-les à vos risques et périls

#### 3. Configurer dans l'Admin

1. Accédez à `/admin`
2. Cliquez sur "Config API Audio"
3. Sélectionnez "Suno AI"
4. Entrez votre clé API (si disponible)
5. Cliquez sur "Sauvegarder"

#### 4. Générer une Chanson

1. Ouvrez une chanson complète
2. Cliquez sur "Générer l'audio chanté"
3. Attendez 1-3 minutes
4. Le lecteur audio apparaît

### Format du Prompt Suno

Le prompt généré automatiquement suit ce format :

```
[Style: Afrobeat, Tempo: 95 BPM]
[Voix: Masculine, jeune, énergique]

[Intro]
(Instrumental)

[Couplet 1]
J'ai commencé sans rien dans les mains
Mais j'avais la foi et le destin
...

[Refrain]
Je pars de zéro, mais je vais loin
Rien ne peut arrêter mon destin
...
```

### Coûts

- **Plan Gratuit** : 5 générations par jour
- **Plan Pro** : $10/mois - 500 générations
- **Plan Premier** : $30/mois - 2000 générations

---

## 🎶 Configuration Udio {#udio}

### Qu'est-ce que Udio ?

Udio est un service de génération musicale avancé avec une qualité professionnelle.

### Étapes de Configuration

#### 1. Créer un Compte

1. Allez sur [https://udio.com](https://udio.com)
2. Cliquez sur "Get Started"
3. Créez votre compte
4. Vérifiez votre email

#### 2. Obtenir une Clé API

**Note** : Udio propose une API bêta.

1. Connectez-vous à votre compte
2. Allez dans "Settings" > "API"
3. Cliquez sur "Generate API Key"
4. Copiez la clé

#### 3. Configurer dans l'Admin

1. Accédez à `/admin`
2. Cliquez sur "Config API Audio"
3. Sélectionnez "Udio"
4. Entrez votre clé API
5. Cliquez sur "Sauvegarder"

#### 4. Générer une Chanson

1. Ouvrez une chanson complète
2. Cliquez sur "Générer l'audio chanté"
3. Attendez 2-5 minutes
4. Le lecteur audio apparaît

### Avantages d'Udio

- ✅ Qualité audio supérieure
- ✅ Voix plus naturelles
- ✅ Meilleur mixage
- ✅ Support multilingue excellent

### Coûts

- **Plan Gratuit** : 10 générations par mois
- **Plan Standard** : $15/mois - 100 générations
- **Plan Pro** : $50/mois - 500 générations

---

## 🤖 Configuration Replicate {#replicate}

### Qu'est-ce que Replicate ?

Replicate est une plateforme qui héberge des modèles IA open-source, dont des modèles de génération musicale.

### Étapes de Configuration

#### 1. Créer un Compte

1. Allez sur [https://replicate.com](https://replicate.com)
2. Cliquez sur "Sign Up"
3. Créez votre compte
4. Vérifiez votre email

#### 2. Obtenir un Token API

1. Connectez-vous
2. Allez dans "Account" > "API Tokens"
3. Cliquez sur "Create Token"
4. Copiez le token

#### 3. Configurer dans l'Admin

1. Accédez à `/admin`
2. Cliquez sur "Config API Audio"
3. Sélectionnez "Replicate"
4. Entrez votre token API
5. Cliquez sur "Sauvegarder"

#### 4. Choisir un Modèle

Replicate propose plusieurs modèles de génération musicale :

**Modèles recommandés :**
- `meta/musicgen` : Génération musicale par Meta
- `facebookresearch/audiocraft` : AudioCraft par Meta
- `cvssp/audioldm` : AudioLDM pour effets sonores

#### 5. Générer une Chanson

1. Ouvrez une chanson complète
2. Cliquez sur "Générer l'audio chanté"
3. Attendez 3-10 minutes (selon le modèle)
4. Le lecteur audio apparaît

### Avantages de Replicate

- ✅ Modèles open-source
- ✅ Pas d'abonnement mensuel
- ✅ Paiement à l'usage
- ✅ Flexibilité des modèles

### Coûts

- **Paiement à l'usage** : ~$0.0023 par seconde de génération
- **Exemple** : Une chanson de 3 minutes ≈ $0.41

---

## 💾 Stockage des Fichiers Audio {#stockage}

### Problème

Les fichiers audio générés doivent être stockés quelque part pour être accessibles via URL.

### Solutions

#### 1. Cloudinary (Recommandé)

**Avantages :**
- ✅ Plan gratuit généreux (25 GB)
- ✅ CDN mondial rapide
- ✅ Transformation d'images/vidéos
- ✅ API simple

**Configuration :**

1. Créez un compte sur [https://cloudinary.com](https://cloudinary.com)
2. Obtenez vos credentials (Cloud Name, API Key, API Secret)
3. Ajoutez-les dans votre backend
4. Uploadez les fichiers audio après génération

**Code d'exemple :**

```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'votre_cloud_name',
  api_key: 'votre_api_key',
  api_secret: 'votre_api_secret'
});

const uploadAudio = async (audioFile, songId) => {
  const result = await cloudinary.uploader.upload(audioFile, {
    resource_type: 'video', // Cloudinary traite l'audio comme vidéo
    public_id: `song_${songId}`,
    format: 'mp3'
  });
  
  return result.secure_url;
};
```

#### 2. AWS S3

**Avantages :**
- ✅ Scalabilité infinie
- ✅ Intégration avec autres services AWS
- ✅ Contrôle granulaire des accès

**Configuration :**

1. Créez un compte AWS
2. Créez un bucket S3
3. Configurez les permissions
4. Obtenez vos credentials AWS

**Code d'exemple :**

```javascript
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY',
  region: 'us-east-1'
});

const uploadAudio = async (audioFile, songId) => {
  const params = {
    Bucket: 'votre-bucket',
    Key: `audio/song_${songId}.mp3`,
    Body: audioFile,
    ContentType: 'audio/mpeg',
    ACL: 'public-read'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
};
```

#### 3. Firebase Storage

**Avantages :**
- ✅ Intégration facile avec Firebase
- ✅ Authentification intégrée
- ✅ Plan gratuit généreux

**Configuration :**

1. Créez un projet Firebase
2. Activez Storage
3. Téléchargez le SDK
4. Configurez les règles de sécurité

**Code d'exemple :**

```javascript
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const uploadAudio = async (audioFile, songId) => {
  const storageRef = ref(storage, `audio/song_${songId}.mp3`);
  await uploadBytes(storageRef, audioFile);
  const url = await getDownloadURL(storageRef);
  return url;
};
```

---

## 🔧 Dépannage {#depannage}

### Problème : "Audio non généré" après clic

**Causes possibles :**
1. API non configurée
2. Clé API invalide
3. Quota dépassé
4. Erreur réseau

**Solutions :**
1. Vérifiez la configuration dans `/admin` > "Config API Audio"
2. Testez votre clé API sur le site du service
3. Vérifiez votre quota dans le dashboard du service
4. Vérifiez votre connexion internet

### Problème : "Erreur de génération"

**Causes possibles :**
1. Prompt trop long
2. Format de prompt incorrect
3. Service temporairement indisponible
4. Contenu bloqué par le service

**Solutions :**
1. Simplifiez le prompt
2. Vérifiez le format du prompt
3. Réessayez plus tard
4. Modifiez les paroles si nécessaire

### Problème : Lecteur audio ne fonctionne pas

**Causes possibles :**
1. URL audio invalide
2. Fichier audio corrompu
3. Navigateur ne supporte pas le format
4. Problème de CORS

**Solutions :**
1. Vérifiez que l'URL est accessible
2. Téléchargez le fichier et vérifiez-le
3. Essayez un autre navigateur
4. Configurez CORS sur votre stockage

### Problème : Génération très lente

**Causes possibles :**
1. Service surchargé
2. Prompt trop complexe
3. Connexion internet lente
4. Plan gratuit avec file d'attente

**Solutions :**
1. Attendez ou réessayez plus tard
2. Simplifiez le prompt
3. Vérifiez votre connexion
4. Passez à un plan payant

---

## 📊 Comparaison des Services

| Service | Qualité | Vitesse | Prix | Voix FR | Recommandé pour |
|---------|---------|---------|------|---------|-----------------|
| Suno AI | ⭐⭐⭐⭐ | ⭐⭐⭐ | $$ | ⭐⭐⭐⭐ | Débutants |
| Udio | ⭐⭐⭐⭐⭐ | ⭐⭐ | $$$ | ⭐⭐⭐⭐⭐ | Professionnels |
| Replicate | ⭐⭐⭐ | ⭐⭐ | $ | ⭐⭐⭐ | Développeurs |

---

## 🎯 Recommandations

### Pour Débuter

1. **Commencez en mode démo** pour comprendre le workflow
2. **Configurez Suno AI** pour des résultats rapides
3. **Utilisez Cloudinary** pour le stockage
4. **Testez avec 1-2 chansons** avant de générer en masse

### Pour Production

1. **Utilisez Udio** pour la meilleure qualité
2. **Configurez AWS S3** pour le stockage scalable
3. **Automatisez le workflow** avec des webhooks
4. **Surveillez les coûts** et optimisez les prompts

---

## 📞 Support

### Ressources

- **Suno AI** : [Discord](https://discord.gg/suno) | [Documentation](https://suno.ai/docs)
- **Udio** : [Discord](https://discord.gg/udio) | [Documentation](https://udio.com/docs)
- **Replicate** : [Documentation](https://replicate.com/docs) | [GitHub](https://github.com/replicate)

### Communauté

- Rejoignez le Discord de chaque service
- Partagez vos créations
- Apprenez des autres utilisateurs
- Signalez les bugs

---

**Dernière mise à jour** : 2024  
**Version du guide** : 1.0.0

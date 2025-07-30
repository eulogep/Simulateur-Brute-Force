# Guide de Configuration - Simulateur d'Attaque Brute Force

**Créé par : Euloge Mabiala**

## 🚀 Installation et Utilisation

### Mode Local (Développement)

Pour utiliser l'application en mode local, vous avez plusieurs options :

#### Option 1 : Serveur Local Simple (Recommandé)

1. **Avec Python** :
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Avec Node.js** :
   ```bash
   # Installer serve globalement
   npm install -g serve
   
   # Lancer le serveur
   serve -p 8000
   ```

3. **Avec PHP** :
   ```bash
   php -S localhost:8000
   ```

4. **Avec Live Server (VS Code)** :
   - Installer l'extension "Live Server"
   - Clic droit sur `index.html` → "Open with Live Server"

Puis ouvrir : `http://localhost:8000`

#### Option 2 : Mode Local Sans Web Worker

Si vous ne pouvez pas utiliser de serveur local, l'application fonctionnera en mode dégradé :
- Les calculs lourds se feront de manière synchrone
- L'interface peut être légèrement moins réactive
- Toutes les fonctionnalités restent disponibles

### Mode Production

Pour un déploiement en production :

1. **Hébergement statique** (Netlify, Vercel, GitHub Pages)
2. **Serveur web** (Apache, Nginx)
3. **CDN** pour les ressources externes

## ⚠️ Problèmes Courants

### Erreur Web Worker
```
SecurityError: Failed to construct 'Worker': Script at 'file:///...' cannot be accessed from origin 'null'.
```

**Solution** : Utiliser un serveur local (voir Option 1 ci-dessus)

### Erreur HIBPService
```
Uncaught SyntaxError: Identifier 'HIBPService' has already been declared
```

**Solution** : Vérifier qu'il n'y a qu'une seule inclusion de `hibp-service.js` dans `index.html`

### Warning Tailwind CSS
```
cdn.tailwindcss.com should not be used in production
```

**Solution** : Pour la production, installer Tailwind CSS localement :
```bash
npm install tailwindcss
npx tailwindcss init
```

## 🔧 Configuration Avancée

### Variables d'Environnement

L'application peut être configurée via des variables d'environnement :

```javascript
// Dans script.js, vous pouvez modifier :
this.attackSpeeds = {
    basic: 1000,      // Essais/seconde pour attaque basique
    gpu: 10000000,    // Essais/seconde pour attaque GPU
    cluster: 1000000000 // Essais/seconde pour attaque cluster
};
```

### Personnalisation des Couleurs

Modifier les couleurs dans `styles.css` :
```css
:root {
    --primary-color: #3b82f6;
    --danger-color: #ef4444;
    --success-color: #10b981;
    --warning-color: #f59e0b;
}
```

## 📱 Compatibilité

- **Navigateurs** : Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Web Workers** : Supporté par tous les navigateurs modernes
- **API Crypto** : Supporté par tous les navigateurs modernes
- **Fetch API** : Supporté par tous les navigateurs modernes

## 🛠️ Développement

### Structure des Fichiers
```
brute-force/
├── index.html          # Page principale
├── styles.css          # Styles personnalisés
├── script.js           # Logique principale
├── worker.js           # Web Worker pour calculs lourds
├── hibp-service.js     # Service API HIBP
├── README.md           # Documentation principale
├── SETUP.md           # Ce guide
├── .gitignore         # Fichiers à ignorer
└── LICENSE            # Licence MIT
```

### Ajout de Nouvelles Fonctionnalités

1. **Nouveau type d'attaque** : Modifier `attackSpeeds` dans `script.js`
2. **Nouvelle métrique** : Ajouter dans `performAnalysis()` et `worker.js`
3. **Nouveau graphique** : Utiliser Chart.js dans `updateChart()`

## 🔒 Sécurité

- L'application ne stocke aucun mot de passe
- Les vérifications HIBP utilisent le k-anonymity
- Toutes les données sont traitées côté client
- Aucune requête vers des serveurs externes (sauf HIBP)

## 📞 Support

Pour toute question ou problème :
1. Vérifier ce guide de configuration
2. Consulter la console du navigateur pour les erreurs
3. Tester avec un serveur local si en mode file:// 
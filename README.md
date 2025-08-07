# 🔐 Simulateur d'Attaque Brute Force

Un outil éducatif moderne et interactif pour analyser la robustesse des mots de passe en simulant différentes attaques par force brute.

**Créé par : MABIALA EULOGE JUNIOR**

## 🎯 Objectif

Ce projet vise à sensibiliser les utilisateurs aux risques de sécurité liés aux mots de passe faibles en démontrant visuellement le temps nécessaire pour les craquer via différentes méthodes d'attaque.

## ✨ Fonctionnalités

### 🔍 Analyse en Temps Réel
- **Indicateur de force** : Barre de progression colorée avec score numérique
- **Analyse détaillée** : Vérification des caractères utilisés (minuscules, majuscules, chiffres, caractères spéciaux)
- **Détection des mots de passe courants** : Base de données intégrée des mots de passe les plus utilisés

### ⚡ Simulation d'Attaques
- **Attaque basique** : Ordinateur simple (1 000 essais/seconde)
- **Attaque GPU** : Carte graphique performante (10 millions essais/seconde)
- **Attaque Cluster** : Système distribué (1 milliard essais/seconde)

### 📊 Visualisations
- **Graphiques interactifs** : Comparaison des temps d'attaque avec Chart.js
- **Statistiques en temps réel** : Nombre de caractères et combinaisons possibles
- **Animations fluides** : Interface moderne avec transitions CSS

### 💡 Conseils de Sécurité
- **Recommandations personnalisées** : Conseils adaptés au mot de passe analysé
- **Priorisation des améliorations** : Suggestions classées par importance
- **Validation en temps réel** : Feedback immédiat sur les modifications

### 🔒 Simulation de Vulnérabilité des Données Personnelles
- **Recherche de fuites de données** : Simulation éducative de récupération d'informations personnelles
- **Données PlayStation** : Démonstration des informations qui peuvent être exposées (date de naissance, PSN ID, etc.)
- **Avertissements éducatifs** : Sensibilisation aux risques de sécurité des données personnelles
- **Conseils de protection** : Recommandations pour sécuriser ses comptes en ligne

### ⚡ Optimisations Avancées
- **Web Workers** : Calculs lourds déportés en arrière-plan pour éviter le blocage de l'interface
- **Mémoïsation** : Cache intelligent pour éviter les recalculs inutiles
- **API Have I Been Pwned** : Vérification en temps réel des mots de passe compromis
- **Animations visuelles** : Graphiques dynamiques et animations de progression d'attaque
- **Statistiques de performance** : Monitoring en temps réel des optimisations

### 📞 Section Contact
- **Liens professionnels** : Accès direct à GitHub, LinkedIn et Outlook
- **Design responsive** : Interface adaptée pour tous les appareils
- **Animations interactives** : Effets de survol et transitions fluides

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Styles modernes avec Tailwind CSS
- **JavaScript ES6+** : Logique interactive et analyses
- **Chart.js** : Visualisations de données
- **Font Awesome** : Icônes vectorielles

### Fonctionnalités Avancées
- **Debouncing** : Optimisation des performances
- **Cache intelligent** : Mise en cache des analyses
- **Web Workers** : Calculs lourds en arrière-plan
- **API HIBP** : Vérification des mots de passe compromis
- **Animations visuelles** : Graphiques dynamiques et effets visuels
- **Responsive Design** : Compatible mobile et tablette
- **Accessibilité** : Support des lecteurs d'écran et navigation clavier

## 🚀 Installation et Utilisation

### Déploiement avec GitHub Pages

Le projet est automatiquement déployé sur GitHub Pages à chaque push sur la branche main. Vous pouvez accéder à la version en ligne à l'adresse : https://eulogep.github.io/Simulateur-Brute-Force/

Pour déployer votre propre version :
1. Forkez le repository
2. Allez dans les paramètres de votre repository
3. Dans la section "Pages", sélectionnez "GitHub Actions" comme source
4. Le site sera automatiquement déployé à chaque push sur la branche main

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion internet (pour les CDN)

### Installation
1. Clonez le repository :
```bash
git clone https://github.com/votre-username/brute-force-simulator.git
cd brute-force-simulator
```

2. Ouvrez `index.html` dans votre navigateur

### Utilisation
1. **Saisie** : Entrez votre mot de passe dans le champ dédié
2. **Analyse** : L'analyse se fait automatiquement en temps réel
3. **Visualisation** : Consultez les résultats dans les différentes sections
4. **Amélioration** : Suivez les conseils pour renforcer votre mot de passe

### Simulation de Fuite de Données
1. **Email** : Entrez un email dans la section "Simulation de Vulnérabilité"
2. **Recherche** : Cliquez sur "Simuler la récupération de données"
3. **Résultats** : Consultez les informations qui pourraient être exposées
4. **Éducation** : Prenez conscience des risques et suivez les conseils de protection

### Optimisations Avancées
1. **Web Workers** : Les calculs lourds s'exécutent automatiquement en arrière-plan
2. **Mémoïsation** : Les résultats sont mis en cache pour éviter les recalculs
3. **API HIBP** : Vérification automatique des mots de passe compromis
4. **Statistiques** : Monitoring en temps réel des performances

## 📁 Structure du Projet

```
brute-force-simulator/
├── index.html          # Page principale
├── styles.css          # Styles personnalisés
├── script.js           # Logique JavaScript principale
├── worker.js           # Web Worker pour les calculs lourds
├── hibp-service.js     # Service API Have I Been Pwned
├── README.md           # Documentation
├── .gitignore          # Fichiers à ignorer
└── LICENSE             # Licence MIT
```

## 🔧 Configuration

### Personnalisation des Vitesses d'Attaque
Modifiez les valeurs dans `script.js` :

```javascript
this.attackSpeeds = {
    basic: 1000,        // Essais/seconde pour attaque basique
    gpu: 10000000,      // Essais/seconde pour attaque GPU
    cluster: 1000000000 // Essais/seconde pour attaque cluster
};
```

### Ajout de Mots de Passe Courants
Étendez la liste dans `script.js` :

```javascript
this.commonPasswords = [
    'password', '123456', 'qwerty',
    // Ajoutez vos mots de passe courants ici
];
```

## 🎨 Personnalisation

### Thèmes
Le projet utilise Tailwind CSS. Modifiez les classes dans `index.html` pour changer l'apparence.

### Animations
Les animations sont définies dans `styles.css`. Personnalisez les keyframes pour vos besoins.

## 🔒 Sécurité

### Mesures Implémentées
- **Validation côté client** : Prévention des injections
- **Sanitisation des entrées** : Protection contre XSS
- **Aucune transmission** : Les mots de passe restent locaux
- **Cache sécurisé** : Stockage temporaire en mémoire

### Limitations
- **Usage éducatif uniquement** : Ne pas utiliser pour des attaques réelles
- **Calculs approximatifs** : Les temps sont des estimations
- **Pas de stockage** : Les données ne sont pas sauvegardées

## 📱 Responsive Design

Le simulateur s'adapte automatiquement à :
- **Desktop** : Interface complète avec grille à 2 colonnes
- **Tablette** : Adaptation des espacements et tailles
- **Mobile** : Grille à 1 colonne et navigation tactile optimisée

## ♿ Accessibilité

### Fonctionnalités
- **Navigation clavier** : Support complet des raccourcis
- **Lecteurs d'écran** : Labels et descriptions appropriés
- **Contraste élevé** : Support des préférences système
- **Réduction de mouvement** : Respect des préférences utilisateur

### Raccourcis Clavier
- `Ctrl + Enter` : Analyser le mot de passe
- `Tab` : Navigation entre les éléments
- `Espace` : Activer/désactiver les boutons

## 🧪 Tests

### Tests Manuels Recommandés
1. **Mots de passe courts** : Vérifier les alertes
2. **Mots de passe courants** : Tester la détection
3. **Mots de passe complexes** : Valider les scores élevés
4. **Responsive** : Tester sur différents écrans
5. **Accessibilité** : Vérifier avec un lecteur d'écran

## 🤝 Contribution

### Comment Contribuer
1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

### Améliorations Suggérées
- [ ] Intégration API Have I Been Pwned
- [ ] Export des résultats en PDF
- [ ] Mode sombre/clair
- [ ] Support multilingue
- [ ] Tests automatisés

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ⚠️ Avertissement

**Cet outil est conçu à des fins éducatives uniquement.** Il permet de comprendre les risques de sécurité liés aux mots de passe faibles et d'améliorer les pratiques de cybersécurité. L'utilisation de cet outil pour des activités malveillantes est strictement interdite.

## 📞 Support

Pour toute question ou suggestion :
- **GitHub** : [https://github.com/eulogep/Simulateur-Brute-Force](https://github.com/eulogep/Simulateur-Brute-Force)
- **LinkedIn** : [https://www.linkedin.com/in/euloge-junior-mabiala](https://www.linkedin.com/in/euloge-junior-mabiala)
- **Email** : [mabiala@et.esiea.fr](mailto:mabiala@et.esiea.fr)

---

**Développé avec ❤️ pour la sensibilisation à la cybersécurité** 
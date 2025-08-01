// Service pour l'API Have I Been Pwned (HIBP)
// Créé par : MABIALA EULOGE JUNIOR

class HIBPService {
    constructor() {
        this.baseUrl = 'https://api.pwnedpasswords.com/range/';
        this.cache = new Map();
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 heures
    }

    // Vérifier si un mot de passe a été compromis
    async checkPassword(password) {
        try {
            // Vérifier le cache d'abord
            const cacheKey = this.hashPassword(password);
            const cached = this.getFromCache(cacheKey);
            if (cached !== null) {
                return cached;
            }

            // Générer le hash SHA-1 du mot de passe
            const hash = await this.hashPassword(password);
            const prefix = hash.substring(0, 5).toUpperCase();
            const suffix = hash.substring(5).toUpperCase();

            // Appeler l'API HIBP
            const response = await fetch(`${this.baseUrl}${prefix}`);
            
            if (!response.ok) {
                throw new Error(`Erreur API HIBP: ${response.status}`);
            }

            const hashes = await response.text();
            const isCompromised = hashes.includes(suffix);
            
            // Compter le nombre d'occurrences
            let count = 0;
            if (isCompromised) {
                const lines = hashes.split('\n');
                for (const line of lines) {
                    if (line.startsWith(suffix + ':')) {
                        count = parseInt(line.split(':')[1]) || 0;
                        break;
                    }
                }
            }

            const result = {
                isCompromised,
                count,
                hash: hash.substring(0, 10) + '...' // Hash tronqué pour la sécurité
            };

            // Mettre en cache le résultat
            this.setCache(cacheKey, result);

            return result;

        } catch (error) {
            console.error('Erreur lors de la vérification HIBP:', error);
            return {
                isCompromised: false,
                count: 0,
                error: error.message,
                hash: null
            };
        }
    }

    // Générer le hash SHA-1 d'un mot de passe
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    // Gestion du cache
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.data;
        }
        if (cached) {
            this.cache.delete(key);
        }
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });

        // Limiter la taille du cache
        if (this.cache.size > 1000) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    // Vider le cache
    clearCache() {
        this.cache.clear();
    }

    // Obtenir les statistiques du cache
    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.entries()).map(([key, value]) => ({
                key: key.substring(0, 10) + '...',
                age: Date.now() - value.timestamp
            }))
        };
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HIBPService;
} 
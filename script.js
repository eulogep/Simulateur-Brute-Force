// Simulateur d'Attaque Brute Force - Script Principal avec Optimisations
// Créé par : Euloge Mabiala

class BruteForceSimulator {
    constructor() {
        this.passwordInput = document.getElementById('passwordInput');
        this.togglePassword = document.getElementById('togglePassword');
        this.realTimeAnalysis = document.getElementById('realTimeAnalysis');
        this.strengthScore = document.getElementById('strengthScore');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthLabel = document.getElementById('strengthLabel');
        this.securityTips = document.getElementById('securityTips');
        this.basicAttackTime = document.getElementById('basicAttackTime');
        this.gpuAttackTime = document.getElementById('gpuAttackTime');
        this.clusterAttackTime = document.getElementById('clusterAttackTime');
        this.charCount = document.getElementById('charCount');
        this.combinations = document.getElementById('combinations');
        this.passwordAnalysis = document.getElementById('passwordAnalysis');
        this.toastContainer = document.getElementById('toastContainer');
        
        // Data breach simulation elements
        this.playstationEmail = document.getElementById('playstationEmail');
        this.simulateDataBreach = document.getElementById('simulateDataBreach');
        this.dataBreachResults = document.getElementById('dataBreachResults');
        
        // Performance stats elements
        this.cacheSizeElement = document.getElementById('cacheSize');
        this.workerStatusElement = document.getElementById('workerStatus');
        this.hibpStatusElement = document.getElementById('hibpStatus');
        this.hibpCacheSizeElement = document.getElementById('hibpCacheSize');
        
        // Optimisations avancées
        this.attackChart = null;
        this.analysisCache = new Map();
        this.debounceTimer = null;
        this.worker = null;
        this.hibpService = null;
        this.isAnalyzing = false;
        
        // Initialiser le Web Worker
        this.initializeWorker();
        
        // Initialiser le service HIBP
        this.initializeHIBPService();
        
        this.attackSpeeds = {
            basic: 1000,      // 1000 essais/seconde
            gpu: 10000000,    // 10M essais/seconde
            cluster: 1000000000 // 1B essais/seconde
        };
        
        this.commonPasswords = [
            'password', '123456', '123456789', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey',
            'dragon', 'master', 'hello', 'freedom', 'whatever',
            'qwerty123', 'trustno1', 'jordan', 'harley', 'ranger',
            'jennifer', 'joshua', 'maggie', 'hunter', 'buster',
            'thomas', 'michelle', 'charlie', 'andrew', 'matthew'
        ];
        
        // Simulated data breach database (for educational purposes only)
        this.simulatedBreachData = {
            'test@example.com': {
                email: 'test@example.com',
                username: 'GamerPro2024',
                dateOfBirth: '15/03/1995',
                country: 'France',
                psnId: 'GamerPro_2024',
                lastLogin: '2024-01-15',
                games: ['FIFA 24', 'Call of Duty', 'God of War'],
                subscription: 'PlayStation Plus Premium',
                paymentMethod: 'Visa ****1234'
            },
            'demo@playstation.com': {
                email: 'demo@playstation.com',
                username: 'DemoUser_PS5',
                dateOfBirth: '22/08/1990',
                country: 'Canada',
                psnId: 'DemoUser_PS5',
                lastLogin: '2024-01-20',
                games: ['Spider-Man 2', 'Gran Turismo 7', 'Horizon'],
                subscription: 'PlayStation Plus Extra',
                paymentMethod: 'Mastercard ****5678'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeChart();
        this.updatePerformanceStats();
        this.showToast('Bienvenue dans le simulateur brute force optimisé !', 'info');
        
        // Mettre à jour les stats périodiquement
        setInterval(() => {
            this.updatePerformanceStats();
        }, 5000);
    }
    
    // Initialiser le Web Worker pour les calculs lourds
    initializeWorker() {
        try {
            // Vérifier si on est en mode local (file://) ou sur un serveur
            if (window.location.protocol === 'file:') {
                console.warn('Mode local détecté, Web Worker désactivé pour des raisons de sécurité');
                this.worker = null;
                return;
            }
            
            this.worker = new Worker('worker.js');
            this.worker.onmessage = (e) => {
                this.handleWorkerMessage(e.data);
            };
            this.worker.onerror = (error) => {
                console.error('Erreur Web Worker:', error);
                this.showToast('Erreur lors du calcul, utilisation du mode dégradé', 'warning');
                this.worker = null;
            };
        } catch (error) {
            console.warn('Web Worker non supporté, utilisation du mode synchrone:', error);
            this.worker = null;
        }
    }
    
    // Initialiser le service HIBP
    initializeHIBPService() {
        try {
            if (typeof HIBPService !== 'undefined') {
                this.hibpService = new HIBPService();
                console.log('Service HIBP initialisé');
            } else {
                console.warn('Service HIBP non disponible');
                this.hibpService = null;
            }
        } catch (error) {
            console.warn('Impossible d\'initialiser le service HIBP:', error);
            this.hibpService = null;
        }
    }
    
    // Gérer les messages du Web Worker
    handleWorkerMessage(data) {
        switch (data.type) {
            case 'ANALYSIS_COMPLETE':
                this.isAnalyzing = false;
                this.analysisCache.set(data.data.password, data.data);
                this.displayResults(data.data);
                break;
                
            case 'ATTACK_TIME_COMPLETE':
                this.updateAttackTimes(data.data);
                break;
                
            case 'COMMON_CHECK_COMPLETE':
                this.updateCommonPasswordStatus(data.data);
                break;
        }
    }
    
    setupEventListeners() {
        // Password input events
        this.passwordInput.addEventListener('input', (e) => {
            this.handlePasswordInput(e.target.value);
        });
        
        this.passwordInput.addEventListener('focus', () => {
            this.passwordInput.classList.add('typing');
        });
        
        this.passwordInput.addEventListener('blur', () => {
            this.passwordInput.classList.remove('typing');
        });
        
        // Toggle password visibility
        this.togglePassword.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Real-time analysis toggle
        this.realTimeAnalysis.addEventListener('change', () => {
            if (this.realTimeAnalysis.checked) {
                this.analyzePassword(this.passwordInput.value);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzePassword(this.passwordInput.value);
            }
        });
        
        // Data breach simulation events
        this.simulateDataBreach.addEventListener('click', () => {
            this.simulateDataBreachSearch();
        });
        
        this.playstationEmail.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.simulateDataBreachSearch();
            }
        });
    }
    
    handlePasswordInput(password) {
        // Clear previous debounce timer
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        // Update character count immediately
        this.updateCharCount(password);
        
        // Debounce analysis for performance
        this.debounceTimer = setTimeout(() => {
            if (this.realTimeAnalysis.checked) {
                this.analyzePassword(password);
            }
        }, 300);
    }
    
    analyzePassword(password) {
        if (!password) {
            this.resetDisplay();
            return;
        }
        
        // Vérifier le cache d'abord (mémoïsation)
        if (this.analysisCache.has(password)) {
            this.displayResults(this.analysisCache.get(password));
            return;
        }
        
        // Utiliser le Web Worker si disponible
        if (this.worker && !this.isAnalyzing) {
            this.isAnalyzing = true;
            this.showAnalyzingIndicator();
            this.worker.postMessage({
                type: 'ANALYZE_PASSWORD',
                data: { password }
            });
        } else {
            // Mode dégradé (synchrone)
            const analysis = this.performAnalysis(password);
            this.analysisCache.set(password, analysis);
            this.displayResults(analysis);
        }
        
        // Vérifier avec HIBP si le service est disponible
        this.checkPasswordWithHIBP(password);
    }
    
    // Afficher l'indicateur d'analyse en cours
    showAnalyzingIndicator() {
        this.strengthScore.textContent = 'Calcul...';
        this.strengthBar.style.width = '50%';
        this.strengthBar.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
        this.strengthLabel.textContent = 'Analyse en cours';
        this.strengthLabel.className = 'text-center font-semibold text-sm text-blue-400';
    }
    
    // Vérifier le mot de passe avec HIBP
    async checkPasswordWithHIBP(password) {
        if (!this.hibpService || password.length < 3) return;
        
        try {
            const result = await this.hibpService.checkPassword(password);
            if (result.isCompromised) {
                this.showHIBPWarning(result);
            }
        } catch (error) {
            console.warn('Erreur lors de la vérification HIBP:', error);
        }
    }
    
    // Afficher l'avertissement HIBP
    showHIBPWarning(result) {
        const warningTip = {
            icon: 'fas fa-exclamation-triangle',
            text: `⚠️ Ce mot de passe a été compromis ${result.count} fois dans des fuites de données. Changez-le immédiatement !`,
            priority: 'high',
            hibp: true
        };
        
        // Ajouter le conseil HIBP aux conseils existants
        const currentTips = this.securityTips.querySelectorAll('.flex');
        if (currentTips.length > 0) {
            const tipElement = document.createElement('div');
            tipElement.className = 'flex items-start space-x-3 p-3 rounded-lg bg-red-500/20';
            tipElement.innerHTML = `
                <i class="${warningTip.icon} text-red-400 mt-1"></i>
                <span class="text-gray-200 text-sm">${warningTip.text}</span>
            `;
            this.securityTips.insertBefore(tipElement, this.securityTips.firstChild);
        }
        
        this.showToast('Mot de passe compromis détecté !', 'error');
    }
    
    performAnalysis(password) {
        const length = password.length;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const isCommonPassword = this.commonPasswords.includes(password.toLowerCase());
        
        // Calculate character set size
        let charsetSize = 0;
        if (hasLowercase) charsetSize += 26;
        if (hasUppercase) charsetSize += 26;
        if (hasNumbers) charsetSize += 10;
        if (hasSpecialChars) charsetSize += 32; // Common special characters
        
        // Calculate total combinations
        const combinations = Math.pow(charsetSize, length);
        
        // Calculate strength score (0-100)
        let score = 0;
        score += Math.min(length * 4, 40); // Length contribution (max 40 points)
        score += hasLowercase ? 10 : 0;
        score += hasUppercase ? 10 : 0;
        score += hasNumbers ? 10 : 0;
        score += hasSpecialChars ? 15 : 0;
        score -= isCommonPassword ? 30 : 0; // Penalty for common passwords
        
        score = Math.max(0, Math.min(100, score));
        
        // Calculate attack times
        const attackTimes = this.calculateAttackTimes(combinations);
        
        // Generate security tips
        const tips = this.generateSecurityTips({
            length, hasLowercase, hasUppercase, hasNumbers, hasSpecialChars, isCommonPassword
        });
        
        return {
            password,
            length,
            hasLowercase,
            hasUppercase,
            hasNumbers,
            hasSpecialChars,
            isCommonPassword,
            charsetSize,
            combinations,
            score,
            attackTimes,
            tips
        };
    }
    
    calculateAttackTimes(combinations) {
        const times = {};
        
        for (const [attackType, speed] of Object.entries(this.attackSpeeds)) {
            const seconds = combinations / speed;
            times[attackType] = {
                rawSeconds: seconds,
                time: this.formatTime(seconds),
                unit: this.getTimeUnit(seconds)
            };
        }
        
        return times;
    }
    
    formatTime(seconds) {
        if (seconds < 1) {
            return 'Moins d\'une seconde';
        }
        
        if (seconds < 60) {
            return `${Math.ceil(seconds)} secondes`;
        }
        
        const minutes = seconds / 60;
        if (minutes < 60) {
            return `${Math.ceil(minutes)} minutes`;
        }
        
        const hours = minutes / 60;
        if (hours < 24) {
            return `${Math.ceil(hours)} heures`;
        }
        
        const days = hours / 24;
        if (days < 365) {
            return `${Math.ceil(days)} jours`;
        }
        
        const years = days / 365;
        if (years < 1000) {
            return `${Math.ceil(years)} années`;
        }
        
        const millennia = years / 1000;
        return `${millennia.toFixed(1)} millénaires`;
    }
    
    getTimeUnit(seconds) {
        if (seconds < 1) {
            return 'secondes';
        }
        
        if (seconds < 60) {
            return 'secondes';
        }
        
        const minutes = seconds / 60;
        if (minutes < 60) {
            return 'minutes';
        }
        
        const hours = minutes / 60;
        if (hours < 24) {
            return 'heures';
        }
        
        const days = hours / 24;
        if (days < 365) {
            return 'jours';
        }
        
        const years = days / 365;
        if (years < 1000) {
            return 'années';
        }
        
        return 'millénaires';
    }
    
    generateSecurityTips(analysis) {
        const tips = [];
        
        if (analysis.length < 8) {
            tips.push({
                icon: 'fas fa-ruler',
                text: 'Votre mot de passe est trop court. Utilisez au moins 8 caractères.',
                priority: 'high'
            });
        }
        
        if (analysis.isCommonPassword) {
            tips.push({
                icon: 'fas fa-exclamation-triangle',
                text: 'Ce mot de passe est très courant et facilement devinable.',
                priority: 'high'
            });
        }
        
        if (!analysis.hasLowercase) {
            tips.push({
                icon: 'fas fa-font',
                text: 'Ajoutez des lettres minuscules pour plus de sécurité.',
                priority: 'medium'
            });
        }
        
        if (!analysis.hasUppercase) {
            tips.push({
                icon: 'fas fa-font',
                text: 'Ajoutez des lettres majuscules pour plus de sécurité.',
                priority: 'medium'
            });
        }
        
        if (!analysis.hasNumbers) {
            tips.push({
                icon: 'fas fa-hashtag',
                text: 'Ajoutez des chiffres pour plus de sécurité.',
                priority: 'medium'
            });
        }
        
        if (!analysis.hasSpecialChars) {
            tips.push({
                icon: 'fas fa-asterisk',
                text: 'Ajoutez des caractères spéciaux (!@#$%^&*) pour plus de sécurité.',
                priority: 'medium'
            });
        }
        
        if (analysis.length >= 12 && analysis.hasLowercase && analysis.hasUppercase && 
            analysis.hasNumbers && analysis.hasSpecialChars && !analysis.isCommonPassword) {
            tips.push({
                icon: 'fas fa-check-circle',
                text: 'Excellent ! Votre mot de passe est très sécurisé.',
                priority: 'success'
            });
        }
        
        return tips;
    }
    
    displayResults(analysis) {
        // Update strength indicator
        this.strengthBar.style.width = `${analysis.score}%`;
        
        // Update character count and combinations
        this.charCountElement.textContent = analysis.length;
        this.combinationsElement.textContent = this.formatNumber(analysis.totalCombinations);
        
        // Update attack times
        this.basicAttackTime.textContent = analysis.attackTimes.basic.time;
        this.gpuAttackTime.textContent = analysis.attackTimes.gpu.time;
        this.clusterAttackTime.textContent = analysis.attackTimes.cluster.time;
        
        // Update statistics section
        this.updateStatisticsSection(analysis);
        
        // Update strength label
        let label = 'Très faible';
        let labelColor = 'text-red-400';
        
        if (analysis.score >= 80) {
            label = 'Très fort';
            labelColor = 'text-green-400';
        } else if (analysis.score >= 60) {
            label = 'Fort';
            labelColor = 'text-blue-400';
        } else if (analysis.score >= 40) {
            label = 'Moyen';
            labelColor = 'text-yellow-400';
        } else if (analysis.score >= 20) {
            label = 'Faible';
            labelColor = 'text-orange-400';
        }
        
        this.strengthLabel.textContent = label;
        this.strengthLabel.className = `text-center font-semibold text-sm ${labelColor}`;
        
        // Update attack times
        this.basicAttackTime.textContent = analysis.attackTimes.basic.time;
        this.gpuAttackTime.textContent = analysis.attackTimes.gpu.time;
        this.clusterAttackTime.textContent = analysis.attackTimes.cluster.time;
        
        // Update statistics
        this.charCount.textContent = analysis.length;
        this.combinations.textContent = this.formatNumber(analysis.combinations);
        
        // Update security tips
        this.updateSecurityTips(analysis.tips);
        
        // Update detailed analysis
        this.updatePasswordAnalysis(analysis);
        
        // Update chart
        this.updateChart(analysis);
        
        // Show success toast for strong passwords
        if (analysis.score >= 80) {
            this.showToast('Excellent mot de passe !', 'success');
        }
    }
    
    updateSecurityTips(tips) {
        this.securityTips.innerHTML = '';
        
        if (tips.length === 0) {
            this.securityTips.innerHTML = `
                <div class="text-gray-300 text-sm">
                    <i class="fas fa-info-circle mr-2 text-blue-400"></i>
                    Aucun conseil spécifique pour ce mot de passe.
                </div>
            `;
            return;
        }
        
        tips.forEach(tip => {
            const tipElement = document.createElement('div');
            tipElement.className = 'flex items-start space-x-3 p-3 rounded-lg';
            
            let bgColor = 'bg-blue-500/20';
            let iconColor = 'text-blue-400';
            
            if (tip.priority === 'high') {
                bgColor = 'bg-red-500/20';
                iconColor = 'text-red-400';
            } else if (tip.priority === 'success') {
                bgColor = 'bg-green-500/20';
                iconColor = 'text-green-400';
            }
            
            tipElement.className = `flex items-start space-x-3 p-3 rounded-lg ${bgColor}`;
            
            tipElement.innerHTML = `
                <i class="${tip.icon} ${iconColor} mt-1"></i>
                <span class="text-gray-200 text-sm">${tip.text}</span>
            `;
            
            this.securityTips.appendChild(tipElement);
        });
    }
    
    updatePasswordAnalysis(analysis) {
        this.passwordAnalysis.innerHTML = `
            <div class="space-y-3">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center p-3 bg-blue-500/20 rounded-lg">
                        <div class="text-lg font-bold text-blue-300">${analysis.charsetSize}</div>
                        <div class="text-xs text-gray-300">Caractères possibles</div>
                    </div>
                    <div class="text-center p-3 bg-green-500/20 rounded-lg">
                        <div class="text-lg font-bold text-green-300">${analysis.length}</div>
                        <div class="text-xs text-gray-300">Longueur</div>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-sm">Lettres minuscules</span>
                        <i class="fas ${analysis.hasLowercase ? 'fa-check text-green-400' : 'fa-times text-red-400'}"></i>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-sm">Lettres majuscules</span>
                        <i class="fas ${analysis.hasUppercase ? 'fa-check text-green-400' : 'fa-times text-red-400'}"></i>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-sm">Chiffres</span>
                        <i class="fas ${analysis.hasNumbers ? 'fa-check text-green-400' : 'fa-times text-red-400'}"></i>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-sm">Caractères spéciaux</span>
                        <i class="fas ${analysis.hasSpecialChars ? 'fa-check text-green-400' : 'fa-times text-red-400'}"></i>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-sm">Mot de passe courant</span>
                        <i class="fas ${analysis.isCommonPassword ? 'fa-times text-red-400' : 'fa-check text-green-400'}"></i>
                    </div>
                </div>
            </div>
        `;
    }
    
    updateCharCount(password) {
        this.charCount.textContent = password.length;
    }
    
    resetDisplay() {
        this.strengthScore.textContent = '0%';
        this.strengthBar.style.width = '0%';
        this.strengthLabel.textContent = 'Très faible';
        this.strengthLabel.className = 'text-center font-semibold text-sm text-red-400';
        
        this.basicAttackTime.textContent = '-';
        this.gpuAttackTime.textContent = '-';
        this.clusterAttackTime.textContent = '-';
        
        this.charCount.textContent = '0';
        this.combinations.textContent = '0';
        
        this.securityTips.innerHTML = `
            <div class="text-gray-300 text-sm">
                <i class="fas fa-info-circle mr-2 text-blue-400"></i>
                Saisissez un mot de passe pour recevoir des conseils personnalisés
            </div>
        `;
        
        this.passwordAnalysis.innerHTML = `
            <div class="text-gray-300 text-sm">
                <i class="fas fa-info-circle mr-2 text-blue-400"></i>
                Saisissez un mot de passe pour voir l'analyse détaillée
            </div>
        `;
    }
    
    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = this.togglePassword.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
    
    initializeChart() {
        const ctx = document.getElementById('attackChart').getContext('2d');
        
        this.attackChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Basique', 'GPU', 'Cluster'],
                datasets: [{
                    label: 'Temps d\'attaque (log)',
                    data: [1, 1, 1],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(147, 51, 234, 0.8)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(147, 51, 234, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 0.9)',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                if (value < 1) return `Temps: ${value.toFixed(2)}s`;
                                if (value < 60) return `Temps: ${Math.round(value)}s`;
                                if (value < 3600) return `Temps: ${Math.round(value / 60)}m`;
                                if (value < 86400) return `Temps: ${Math.round(value / 3600)}h`;
                                if (value < 31536000) return `Temps: ${Math.round(value / 86400)}j`;
                                return `Temps: ${Math.round(value / 31536000)}a`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'logarithmic',
                        beginAtZero: false,
                        min: 0.1,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 10
                            },
                            callback: function(value, index, values) {
                                if (value < 1) return value.toFixed(1) + 's';
                                if (value < 60) return Math.round(value) + 's';
                                if (value < 3600) return Math.round(value / 60) + 'm';
                                if (value < 86400) return Math.round(value / 3600) + 'h';
                                if (value < 31536000) return Math.round(value / 86400) + 'j';
                                return Math.round(value / 31536000) + 'a';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 11,
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    updateChart(analysis) {
        // Utiliser les temps bruts en secondes pour une meilleure visualisation
        const basicSeconds = analysis.attackTimes.basic.rawSeconds || this.timeToValue(analysis.attackTimes.basic);
        const gpuSeconds = analysis.attackTimes.gpu.rawSeconds || this.timeToValue(analysis.attackTimes.gpu);
        const clusterSeconds = analysis.attackTimes.cluster.rawSeconds || this.timeToValue(analysis.attackTimes.cluster);
        
        // Mettre à jour les données du graphique avec animation
        this.attackChart.data.datasets[0].data = [basicSeconds, gpuSeconds, clusterSeconds];
        
        // Ajouter des couleurs dynamiques basées sur la force
        const colors = this.getChartColors(analysis.score);
        this.attackChart.data.datasets[0].backgroundColor = colors;
        this.attackChart.data.datasets[0].borderColor = colors.map(color => color.replace('0.8', '1'));
        
        // Animation fluide
        this.attackChart.update('active');
        
        // Ajouter une animation de progression si c'est un mot de passe fort
        if (analysis.score >= 60) {
            this.animateAttackProgression(analysis);
        }
    }
    
    // Obtenir les couleurs du graphique basées sur la force
    getChartColors(strength) {
        if (strength >= 80) {
            return [
                'rgba(34, 197, 94, 0.8)',   // Vert pour très fort
                'rgba(34, 197, 94, 0.8)',
                'rgba(34, 197, 94, 0.8)'
            ];
        } else if (strength >= 60) {
            return [
                'rgba(59, 130, 246, 0.8)',  // Bleu pour fort
                'rgba(59, 130, 246, 0.8)',
                'rgba(59, 130, 246, 0.8)'
            ];
        } else if (strength >= 40) {
            return [
                'rgba(245, 158, 11, 0.8)',  // Orange pour moyen
                'rgba(245, 158, 11, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ];
        } else {
            return [
                'rgba(239, 68, 68, 0.8)',   // Rouge pour faible
                'rgba(239, 68, 68, 0.8)',
                'rgba(239, 68, 68, 0.8)'
            ];
        }
    }
    
    // Animer la progression d'une attaque pour les mots de passe forts
    animateAttackProgression(analysis) {
        const canvas = document.getElementById('attackChart');
        const ctx = canvas.getContext('2d');
        
        // Créer une animation de particules pour simuler l'attaque
        const particles = [];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.02;
                
                if (particle.life > 0) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(59, 130, 246, ${particle.life})`;
                    ctx.fill();
                }
            });
            
            if (particles.some(p => p.life > 0)) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    timeToValue(timeString) {
        if (timeString.includes('seconde')) return 1;
        if (timeString.includes('minute')) return 60;
        if (timeString.includes('heure')) return 3600;
        if (timeString.includes('jour')) return 86400;
        if (timeString.includes('année')) return 31536000;
        if (timeString.includes('millén')) return 31536000000;
        return 1;
    }
    
    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type} p-4 rounded-lg text-white shadow-lg max-w-sm`;
        
        let icon = 'fas fa-info-circle';
        if (type === 'success') icon = 'fas fa-check-circle';
        if (type === 'warning') icon = 'fas fa-exclamation-triangle';
        if (type === 'error') icon = 'fas fa-times-circle';
        
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="${icon} mr-3"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
    
    // Data Breach Simulation Methods
    simulateDataBreachSearch() {
        const email = this.playstationEmail.value.trim().toLowerCase();
        
        if (!email) {
            this.showToast('Veuillez entrer un email valide', 'warning');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showToast('Format d\'email invalide', 'error');
            return;
        }
        
        // Show scanning animation
        this.showScanningAnimation();
        
        // Simulate API call delay
        setTimeout(() => {
            this.performDataBreachSearch(email);
        }, 2000);
    }
    
    showScanningAnimation() {
        this.dataBreachResults.innerHTML = `
            <div class="scanning-animation p-4 rounded-lg">
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-search text-red-400"></i>
                    <span class="text-white">Recherche en cours...</span>
                    <div class="loading"></div>
                </div>
                <div class="mt-2 text-sm text-gray-300">
                    <i class="fas fa-database mr-2"></i>
                    Interrogation des bases de données compromises
                </div>
            </div>
        `;
    }
    
    performDataBreachSearch(email) {
        const userData = this.simulatedBreachData[email];
        
        if (userData) {
            this.displayBreachResults(userData);
            this.showToast('Données trouvées dans une fuite de données !', 'warning');
        } else {
            this.displayNoBreachResults(email);
            this.showToast('Aucune donnée compromise trouvée pour cet email', 'success');
        }
    }
    
    displayBreachResults(userData) {
        const breachDate = this.generateRandomBreachDate();
        const breachSource = this.generateRandomBreachSource();
        
        this.dataBreachResults.innerHTML = `
            <div class="breach-animation p-4 rounded-lg border border-red-500/50">
                <div class="flex items-center mb-3">
                    <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                    <span class="text-red-200 font-semibold">DONNÉES COMPROMISES DÉTECTÉES</span>
                </div>
                
                <div class="space-y-2">
                    <div class="data-item sensitive">
                        <i class="fas fa-calendar-alt mr-2 text-red-400"></i>
                        <strong>Date de naissance:</strong> ${userData.dateOfBirth}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-user mr-2 text-blue-400"></i>
                        <strong>Nom d'utilisateur:</strong> ${userData.username}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-gamepad mr-2 text-green-400"></i>
                        <strong>PSN ID:</strong> ${userData.psnId}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-globe mr-2 text-yellow-400"></i>
                        <strong>Pays:</strong> ${userData.country}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-clock mr-2 text-purple-400"></i>
                        <strong>Dernière connexion:</strong> ${userData.lastLogin}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-credit-card mr-2 text-orange-400"></i>
                        <strong>Méthode de paiement:</strong> ${userData.paymentMethod}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-crown mr-2 text-yellow-400"></i>
                        <strong>Abonnement:</strong> ${userData.subscription}
                    </div>
                    
                    <div class="data-item">
                        <i class="fas fa-gamepad mr-2 text-green-400"></i>
                        <strong>Jeux possédés:</strong> ${userData.games.join(', ')}
                    </div>
                </div>
                
                <div class="mt-4 p-3 bg-black/30 rounded-lg border border-red-500/30">
                    <div class="text-sm">
                        <p class="text-red-200 mb-1"><strong>Source de la fuite:</strong> ${breachSource}</p>
                        <p class="text-red-200 mb-1"><strong>Date de la fuite:</strong> ${breachDate}</p>
                        <p class="text-gray-300 text-xs mt-2">
                            <i class="fas fa-shield-alt mr-1"></i>
                            Ces données ont été exposées lors d'une violation de sécurité
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    
    displayNoBreachResults(email) {
        this.dataBreachResults.innerHTML = `
            <div class="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                <div class="flex items-center mb-3">
                    <i class="fas fa-check-circle text-green-400 mr-2"></i>
                    <span class="text-green-200 font-semibold">AUCUNE DONNÉE COMPROMISE</span>
                </div>
                
                <div class="text-sm text-gray-300">
                    <p class="mb-2">L'email <strong>${email}</strong> n'a pas été trouvé dans nos bases de données de fuites connues.</p>
                    <p class="mb-3">Cela ne garantit pas que vos données sont sécurisées. Continuez à :</p>
                    
                    <ul class="space-y-1 text-xs">
                        <li><i class="fas fa-check mr-2 text-green-400"></i>Utiliser des mots de passe forts et uniques</li>
                        <li><i class="fas fa-check mr-2 text-green-400"></i>Activer l'authentification à deux facteurs</li>
                        <li><i class="fas fa-check mr-2 text-green-400"></i>Surveiller régulièrement vos comptes</li>
                        <li><i class="fas fa-check mr-2 text-green-400"></i>Utiliser un gestionnaire de mots de passe</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    generateRandomBreachDate() {
        const dates = [
            '15/12/2023', '03/11/2023', '22/09/2023', '08/07/2023',
            '14/05/2023', '29/03/2023', '11/01/2023', '18/12/2022'
        ];
        return dates[Math.floor(Math.random() * dates.length)];
    }
    
    generateRandomBreachSource() {
        const sources = [
            'Base de données PlayStation Network compromise',
            'Violation de sécurité d\'un partenaire tiers',
            'Attaque par phishing sur les serveurs',
            'Vulnérabilité dans l\'API de connexion',
            'Compromission d\'un fournisseur de services'
        ];
        return sources[Math.floor(Math.random() * sources.length)];
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mettre à jour les temps d'attaque depuis le Web Worker
    updateAttackTimes(data) {
        const { attackTime, attackSpeed } = data;
        
        // Mettre à jour l'affichage correspondant
        if (attackSpeed === this.attackSpeeds.basic) {
            this.basicAttackTime.textContent = `${attackTime.time} ${attackTime.unit}`;
        } else if (attackSpeed === this.attackSpeeds.gpu) {
            this.gpuAttackTime.textContent = `${attackTime.time} ${attackTime.unit}`;
        } else if (attackSpeed === this.attackSpeeds.cluster) {
            this.clusterAttackTime.textContent = `${attackTime.time} ${attackTime.unit}`;
        }
    }
    
    // Mettre à jour le statut des mots de passe courants
    updateCommonPasswordStatus(data) {
        if (data.isCommon) {
            this.showToast('Mot de passe courant détecté !', 'warning');
        }
    }
    
    // Nettoyer les ressources
    cleanup() {
        if (this.worker) {
            this.worker.terminate();
        }
        if (this.hibpService) {
            this.hibpService.clearCache();
        }
        this.analysisCache.clear();
    }
    
    // Obtenir les statistiques de performance
    getPerformanceStats() {
        return {
            cacheSize: this.analysisCache.size,
            workerAvailable: !!this.worker,
            hibpAvailable: !!this.hibpService,
            hibpCacheStats: this.hibpService ? this.hibpService.getCacheStats() : null
        };
    }
    
    // Mettre à jour l'affichage des statistiques de performance
    updatePerformanceStats() {
        const stats = this.getPerformanceStats();
        
        // Mettre à jour la taille du cache
        if (this.cacheSizeElement) {
            this.cacheSizeElement.textContent = stats.cacheSize;
            // Ajouter une animation si la valeur change
            this.cacheSizeElement.classList.add('animate');
            setTimeout(() => this.cacheSizeElement.classList.remove('animate'), 500);
        }
        
        // Mettre à jour le statut du Web Worker
        if (this.workerStatusElement) {
            this.workerStatusElement.textContent = stats.workerAvailable ? '✓' : '✗';
            this.workerStatusElement.className = `text-lg font-bold metric-value ${stats.workerAvailable ? 'text-green-300' : 'text-red-300'}`;
        }
        
        // Mettre à jour le statut HIBP
        if (this.hibpStatusElement) {
            this.hibpStatusElement.textContent = stats.hibpAvailable ? '✓ Disponible' : '✗ Indisponible';
            this.hibpStatusElement.className = `text-sm font-medium ${stats.hibpAvailable ? 'text-green-400' : 'text-red-400'}`;
            
            // Mettre à jour la classe CSS du conteneur parent
            const hibpContainer = this.hibpStatusElement.closest('.api-status');
            if (hibpContainer) {
                hibpContainer.className = `flex items-center justify-between p-2 bg-gray-800/30 rounded-lg api-status ${stats.hibpAvailable ? 'available' : 'unavailable'}`;
            }
        }
        
        // Mettre à jour la taille du cache HIBP
        if (this.hibpCacheSizeElement && stats.hibpCacheStats) {
            this.hibpCacheSizeElement.textContent = `${stats.hibpCacheStats.size} entrées`;
        }
    }
    
    // Mettre à jour la section statistique avec les nouvelles métriques
    updateStatisticsSection(analysis) {
        // Mettre à jour l'indicateur de force dans la section statistique
        const strengthScoreElement = document.getElementById('strengthScore');
        if (strengthScoreElement) {
            const currentScore = parseInt(strengthScoreElement.textContent);
            const newScore = analysis.score;
            
            // Animer le changement de score
            this.animateNumber(strengthScoreElement, currentScore, newScore);
            
            // Changer la couleur selon la force avec animation
            setTimeout(() => {
                if (analysis.score >= 80) {
                    strengthScoreElement.className = 'text-xl font-bold text-green-300 metric-value';
                } else if (analysis.score >= 60) {
                    strengthScoreElement.className = 'text-xl font-bold text-blue-300 metric-value';
                } else if (analysis.score >= 40) {
                    strengthScoreElement.className = 'text-xl font-bold text-yellow-300 metric-value';
                } else {
                    strengthScoreElement.className = 'text-xl font-bold text-red-300 metric-value';
                }
                
                // Ajouter une animation de pulse
                strengthScoreElement.classList.add('animate');
                setTimeout(() => strengthScoreElement.classList.remove('animate'), 500);
            }, 500);
        }
        
        // Mettre à jour le nombre de caractères avec animation
        const charCountElement = document.getElementById('charCount');
        if (charCountElement) {
            const currentValue = parseInt(charCountElement.textContent) || 0;
            this.animateNumber(charCountElement, currentValue, analysis.length);
        }
        
        // Mettre à jour les combinaisons avec animation
        const combinationsElement = document.getElementById('combinations');
        if (combinationsElement) {
            const currentValue = parseInt(combinationsElement.textContent.replace(/,/g, '')) || 0;
            const newValue = analysis.totalCombinations;
            this.animateNumber(combinationsElement, currentValue, newValue, true);
        }
    }
    
    // Animer les changements de nombres
    animateNumber(element, startValue, endValue, format = false) {
        const duration = 500;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Fonction d'easing pour une animation plus naturelle
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
            
            if (format) {
                element.textContent = this.formatNumber(currentValue);
            } else {
                element.textContent = currentValue;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BruteForceSimulator();
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Security: Prevent XSS in input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BruteForceSimulator;
} 
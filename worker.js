// Web Worker pour les calculs lourds d'analyse des mots de passe
// Créé par : Euloge Mabiala

self.onmessage = function(e) {
    const { type, data } = e.data;
    
    switch (type) {
        case 'ANALYZE_PASSWORD':
            const result = analyzePassword(data.password);
            self.postMessage({
                type: 'ANALYSIS_COMPLETE',
                data: result
            });
            break;
            
        case 'CALCULATE_ATTACK_TIME':
            const attackTime = calculateAttackTime(data.password, data.attackSpeed);
            self.postMessage({
                type: 'ATTACK_TIME_COMPLETE',
                data: { attackTime, attackSpeed: data.attackSpeed }
            });
            break;
            
        case 'CHECK_COMMON_PASSWORDS':
            const isCommon = checkCommonPasswords(data.password);
            self.postMessage({
                type: 'COMMON_CHECK_COMPLETE',
                data: { isCommon }
            });
            break;
    }
};

// Analyse complète du mot de passe
function analyzePassword(password) {
    const startTime = performance.now();
    
    // Calcul de la complexité
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    // Calcul du nombre de caractères possibles
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSpecialChars) charsetSize += 32;
    
    // Calcul du nombre total de combinaisons possibles
    const totalCombinations = Math.pow(charsetSize, password.length);
    
    // Calcul de la force (0-100)
    let strength = 0;
    strength += password.length * 4; // Longueur
    strength += hasLowercase ? 10 : 0;
    strength += hasUppercase ? 10 : 0;
    strength += hasNumbers ? 10 : 0;
    strength += hasSpecialChars ? 15 : 0;
    
    // Pénalités pour les patterns
    if (/(.)\1{2,}/.test(password)) strength -= 10; // Répétitions
    if (/123|abc|qwe/i.test(password)) strength -= 15; // Séquences
    if (/^(.)\1*$/.test(password)) strength -= 20; // Même caractère
    
    strength = Math.max(0, Math.min(100, strength));
    
    // Détermination du niveau de force
    let strengthLevel = 'très faible';
    if (strength >= 80) strengthLevel = 'très fort';
    else if (strength >= 60) strengthLevel = 'fort';
    else if (strength >= 40) strengthLevel = 'moyen';
    else if (strength >= 20) strengthLevel = 'faible';
    
    // Calcul des temps d'attaque
    const attackSpeeds = {
        basic: 1000,      // 1000 essais/seconde
        gpu: 10000000,    // 10M essais/seconde
        cluster: 1000000000 // 1B essais/seconde
    };
    
    const attackTimes = {};
    for (const [type, speed] of Object.entries(attackSpeeds)) {
        const timeInSeconds = totalCombinations / speed;
        attackTimes[type] = {
            rawSeconds: timeInSeconds,
            time: formatTime(timeInSeconds),
            unit: getTimeUnit(timeInSeconds)
        };
    }
    
    const endTime = performance.now();
    
    return {
        strength,
        strengthLevel,
        hasLowercase,
        hasUppercase,
        hasNumbers,
        hasSpecialChars,
        charsetSize,
        totalCombinations,
        length: password.length,
        calculationTime: endTime - startTime,
        attackTimes
    };
}

// Calcul du temps d'attaque
function calculateAttackTime(password, attackSpeed) {
    const analysis = analyzePassword(password);
    const attemptsPerSecond = attackSpeed;
    
    // Temps en secondes
    const timeInSeconds = analysis.totalCombinations / attemptsPerSecond;
    
    // Conversion en unités plus lisibles
    let time, unit;
    
    if (timeInSeconds < 60) {
        time = timeInSeconds;
        unit = 'secondes';
    } else if (timeInSeconds < 3600) {
        time = timeInSeconds / 60;
        unit = 'minutes';
    } else if (timeInSeconds < 86400) {
        time = timeInSeconds / 3600;
        unit = 'heures';
    } else if (timeInSeconds < 31536000) {
        time = timeInSeconds / 86400;
        unit = 'jours';
    } else if (timeInSeconds < 31536000000) {
        time = timeInSeconds / 31536000;
        unit = 'années';
    } else {
        time = timeInSeconds / 31536000000;
        unit = 'millénaires';
    }
    
    return {
        time: Math.round(time * 100) / 100,
        unit,
        rawSeconds: timeInSeconds,
        attemptsPerSecond
    };
}

// Fonctions utilitaires pour le formatage du temps
function formatTime(seconds) {
    if (seconds < 60) {
        return Math.round(seconds * 100) / 100;
    } else if (seconds < 3600) {
        return Math.round((seconds / 60) * 100) / 100;
    } else if (seconds < 86400) {
        return Math.round((seconds / 3600) * 100) / 100;
    } else if (seconds < 31536000) {
        return Math.round((seconds / 86400) * 100) / 100;
    } else if (seconds < 31536000000) {
        return Math.round((seconds / 31536000) * 100) / 100;
    } else {
        return Math.round((seconds / 31536000000) * 100) / 100;
    }
}

function getTimeUnit(seconds) {
    if (seconds < 60) {
        return 'secondes';
    } else if (seconds < 3600) {
        return 'minutes';
    } else if (seconds < 86400) {
        return 'heures';
    } else if (seconds < 31536000) {
        return 'jours';
    } else if (seconds < 31536000000) {
        return 'années';
    } else {
        return 'millénaires';
    }
}

// Vérification des mots de passe courants
function checkCommonPasswords(password) {
    const commonPasswords = [
        'password', '123456', '123456789', 'qwerty', 'abc123',
        'password123', 'admin', 'letmein', 'welcome', 'monkey',
        'dragon', 'master', 'hello', 'freedom', 'whatever',
        'qwerty123', 'trustno1', 'jordan', 'harley', 'ranger',
        'iwantu', 'jennifer', 'hunter', 'buster', 'soccer',
        'baseball', 'tiger', 'charlie', 'andrew', 'michelle',
        'love', 'sunshine', 'jessica', 'asshole', '696969',
        'pepper', 'daniel', 'access', '1234567', 'maggie',
        '654321', 'pussy', 'george', 'hannah', 'thomas',
        'summer', 'heather', 'secret', 'merlin', 'diamond',
        'ladybug', 'midnight', 'shadow', 'michael', 'jessica',
        'princess', 'superman', 'qwertyuiop', 'asdfghjkl',
        'zxcvbnm', '1q2w3e4r', 'q1w2e3r4', 'password1',
        '12345678', '1234567890', 'qwerty123456', 'admin123'
    ];
    
    return commonPasswords.includes(password.toLowerCase());
} 
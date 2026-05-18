// État du jeu
const gameState = {
    score: 0,
    level: 1,
    isGameActive: false,
    clicksForNextLevel: 10
};

// Éléments du DOM
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameBtn = document.getElementById('gameBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    addEventListeners();
});

// Ajouter les écouteurs d'événements
function addEventListeners() {
    gameBtn.addEventListener('click', handleGameBtnClick);
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
}

// Gestion du clic sur le bouton de jeu
function handleGameBtnClick() {
    if (!gameState.isGameActive) {
        console.log('Le jeu n\'est pas actif. Cliquez sur "Démarrer" d\'abord!');
        return;
    }
    
    gameState.score++;
    
    // Vérifier si on monte de niveau
    if (gameState.score % gameState.clicksForNextLevel === 0) {
        levelUp();
    }
    
    updateDisplay();
    animateButtonClick();
}

// Démarrer le jeu
function startGame() {
    gameState.isGameActive = true;
    startBtn.textContent = 'En cours...';
    startBtn.disabled = true;
    gameBtn.style.opacity = '1';
    gameBtn.style.pointerEvents = 'auto';
    console.log('Jeu commencé!');
}

// Réinitialiser le jeu
function resetGame() {
    gameState.score = 0;
    gameState.level = 1;
    gameState.isGameActive = false;
    startBtn.textContent = 'Démarrer';
    startBtn.disabled = false;
    gameBtn.style.opacity = '0.5';
    gameBtn.style.pointerEvents = 'none';
    updateDisplay();
    console.log('Jeu réinitialisé!');
}

// Monter de niveau
function levelUp() {
    gameState.level++;
    showNotification(`🎉 Niveau ${gameState.level} atteint!`);
    
    // Augmenter la difficulté
    gameState.clicksForNextLevel = 10 * gameState.level;
}

// Mettre à jour l'affichage
function updateDisplay() {
    scoreDisplay.textContent = gameState.score;
    levelDisplay.textContent = gameState.level;
}

// Animation du clic
function animateButtonClick() {
    gameBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        gameBtn.style.transform = 'scale(1)';
    }, 100);
}

// Afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Log initial
console.log('Vancyr Ludo chargé avec succès!');
console.log('Cliquez sur "Démarrer" pour commencer le jeu.');
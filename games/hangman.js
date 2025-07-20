
// Hangman Game JavaScript

// Game variables
let currentWord = '';
let guessedWord = [];
let wrongGuesses = 0;
let maxWrongGuesses = 6;
let gameOver = false;
let guessedLetters = [];

// Word bank with hints
const wordBank = [
    { word: 'JAVASCRIPT', hint: 'A popular programming language for web development' },
    { word: 'COMPUTER', hint: 'Electronic device used for processing data' },
    { word: 'INTERNET', hint: 'Global network connecting millions of computers' },
    { word: 'KEYBOARD', hint: 'Input device with letters and numbers' },
    { word: 'PROGRAMMING', hint: 'Process of creating computer software' },
    { word: 'WEBSITE', hint: 'Collection of web pages on the internet' },
    { word: 'ALGORITHM', hint: 'Step-by-step procedure for solving a problem' },
    { word: 'DATABASE', hint: 'Organized collection of structured information' },
    { word: 'NETWORK', hint: 'System of interconnected computers' },
    { word: 'SOFTWARE', hint: 'Computer programs and applications' },
    { word: 'HARDWARE', hint: 'Physical components of a computer' },
    { word: 'BROWSER', hint: 'Software for accessing websites' },
    { word: 'CODING', hint: 'Writing instructions for computers' },
    { word: 'DEBUGGING', hint: 'Finding and fixing errors in code' },
    { word: 'FUNCTION', hint: 'Reusable block of code that performs a task' },
    { word: 'VARIABLE', hint: 'Storage location with an associated name' },
    { word: 'ARRAY', hint: 'Data structure that stores multiple values' },
    { word: 'OBJECT', hint: 'Data structure with properties and methods' },
    { word: 'LOOP', hint: 'Programming construct that repeats code' },
    { word: 'CONDITION', hint: 'Statement that evaluates to true or false' }
];

// DOM elements
const guessWordElement = document.getElementById('guessword');
const hintElement = document.getElementById('hintpara');
const wrongGuessElement = document.getElementById('wrongguess');
const alphabetButtons = document.querySelectorAll('.alphabets');
const images = document.querySelectorAll('.image img');

// Initialize game
function initGame() {
    // Reset game state
    wrongGuesses = 0;
    gameOver = false;
    guessedLetters = [];
    
    // Choose random word
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    const wordObj = wordBank[randomIndex];
    currentWord = wordObj.word;
    
    // Initialize guessed word array
    guessedWord = Array(currentWord.length).fill('_');
    
    // Update display
    updateWordDisplay();
    updateHint(wordObj.hint);
    updateWrongGuesses();
    updateHangmanImage();
    resetKeyboard();
}

// Update word display
function updateWordDisplay() {
    guessWordElement.textContent = guessedWord.join(' ');
}

// Update hint
function updateHint(hint) {
    hintElement.textContent = hint;
}

// Update wrong guesses counter
function updateWrongGuesses() {
    wrongGuessElement.textContent = `Wrong guesses: ${wrongGuesses}/${maxWrongGuesses}`;
}

// Update hangman image
function updateHangmanImage() {
    // Hide all images first
    images.forEach(img => img.style.display = 'none');
    
    // Show current image based on wrong guesses
    if (wrongGuesses < images.length) {
        images[wrongGuesses].style.display = 'block';
    }
}

// Reset keyboard
function resetKeyboard() {
    alphabetButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect', 'disabled');
        button.style.pointerEvents = 'auto';
    });
}

// Handle letter guess
function guessLetter(letter) {
    if (gameOver || guessedLetters.includes(letter)) {
        return;
    }
    
    guessedLetters.push(letter);
    const button = document.getElementById(letter);
    
    if (currentWord.includes(letter)) {
        // Correct guess
        button.classList.add('correct');
        
        // Update guessed word
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        
        updateWordDisplay();
        
        // Check if word is complete
        if (!guessedWord.includes('_')) {
            gameOver = true;
            setTimeout(() => {
                alert(`🎉 Congratulations! You won! 🎉\n\nClick OK to play again.`);
                initGame();
            }, 500);
        }
    } else {
        // Wrong guess
        button.classList.add('incorrect');
        wrongGuesses++;
        updateWrongGuesses();
        updateHangmanImage();
        
        // Check if game is over
        if (wrongGuesses >= maxWrongGuesses) {
            gameOver = true;
            setTimeout(() => {
                alert(`💀 Game Over! 💀\n\nThe word was: ${currentWord}\n\nClick OK to play again.`);
                initGame();
            }, 500);
        }
    }
    
    // Disable button
    button.classList.add('disabled');
    button.style.pointerEvents = 'none';
}

// Add event listeners to alphabet buttons
alphabetButtons.forEach(button => {
    button.addEventListener('click', () => {
        const letter = button.textContent;
        guessLetter(letter);
    });
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase();
    if (letter >= 'A' && letter <= 'Z') {
        guessLetter(letter);
    }
});

// Add restart functionality (double-click on heading)
const heading = document.querySelector('.heading h1');
heading.addEventListener('dblclick', () => {
    if (confirm('Are you sure you want to start a new game?')) {
        initGame();
    }
});

// Add hover effects and animations
alphabetButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('disabled')) {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.2s ease';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Add some game statistics (optional)
let gamesPlayed = 0;
let gamesWon = 0;

// Enhanced game over handling with statistics
function endGame(won) {
    gamesPlayed++;
    if (won) gamesWon++;
    
    const winRate = Math.round((gamesWon / gamesPlayed) * 100);
    const statsMessage = `\n\nGames Played: ${gamesPlayed}\nGames Won: ${gamesWon}\nWin Rate: ${winRate}%`;
    
    setTimeout(() => {
        if (won) {
            alert(`🎉 Congratulations! You won! 🎉${statsMessage}\n\nClick OK to play again.`);
        } else {
            alert(`💀 Game Over! 💀\n\nThe word was: ${currentWord}${statsMessage}\n\nClick OK to play again.`);
        }
        initGame();
    }, 500);
}

// Add smooth transitions for word reveal
function animateWordReveal() {
    guessWordElement.style.transition = 'all 0.3s ease';
    guessWordElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        guessWordElement.style.transform = 'scale(1)';
},300);
}

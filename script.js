const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const modeToggleButton = document.getElementById('modeToggleButton');
const modeText = document.getElementById('mode-text');
const themeButton = document.getElementById('themeButton');
const html = document.documentElement;

let timer;
let timeLeft;
let isWorkMode = true;
const WORK_TIME = 25 * 60;
const REST_TIME = 5 * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the browser tab title
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                document.title = `Time's Up! - Pomodoro Timer`;
                // Optional: Play sound or show notification
                return;
            }
            timeLeft--;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    modeToggleButton.textContent = isWorkMode ? 'Switch to Rest' : 'Switch to Work';
    modeText.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    
    // Reset timer with new duration
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeButton.addEventListener('click', toggleTheme);

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', () => {
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
});
modeToggleButton.addEventListener('click', toggleMode);

// Initialize
timeLeft = WORK_TIME;
updateDisplay(); 
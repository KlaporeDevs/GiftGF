const greetingText = "You make my days brighter just by being you. I hope your birthday brings you all the love, laughter, and happiness you deserve. 💕";
const greetingElement = document.querySelector('.greeting');
const continueButton = document.querySelector('.cta-button');
const decorations = ['💖', '✨', '🌸', '🎈', '🎉', '💕'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let charIndex = 0;
let transitionStarted = false;

function typeGreeting() {
    if (charIndex >= greetingText.length) return;
    greetingElement.textContent += greetingText.charAt(charIndex);
    charIndex += 1;
    window.setTimeout(typeGreeting, prefersReducedMotion ? 15 : 42);
}

function createFloatingDecoration() {
    const decoration = document.createElement('span');
    decoration.className = 'floating';
    decoration.setAttribute('aria-hidden', 'true');
    decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    decoration.style.left = `${Math.random() * 94 + 3}%`;
    decoration.style.fontSize = `${Math.random() * 14 + 18}px`;
    decoration.style.setProperty('--float-duration', `${Math.random() * 2 + 4}s`);
    decoration.style.setProperty('--float-drift', `${Math.random() * 100 - 50}px`);
    decoration.addEventListener('animationend', () => decoration.remove(), { once: true });
    document.body.appendChild(decoration);
}

typeGreeting();
const decorationTimer = window.setInterval(createFloatingDecoration, 1200);

continueButton.addEventListener('click', () => {
    if (transitionStarted) return;
    transitionStarted = true;
    continueButton.disabled = true;

    if (prefersReducedMotion) {
        window.location.href = './cause.html';
        return;
    }

    document.body.classList.add('is-leaving');
    window.setTimeout(() => {
        window.clearInterval(decorationTimer);
        window.location.href = './cause.html';
    }, 420);
});

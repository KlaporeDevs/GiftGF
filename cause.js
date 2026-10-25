const reasons = [
    {
        text: "You are such a kind and wonderful person, and I feel so lucky to have you in my life. 💖",
        emoji: "🌟",
        gif: "./gif1.gif"
    },
    {
        text: "You make ordinary days feel special. I hope your birthday is full of love, laughter, and all your favorite things. 🌸",
        emoji: "💗",
        gif: "./gif2.gif"
    },
    {
        text: "I’m wishing you happiness, success, and all the beautiful things your heart hopes for. You deserve every bit of it. ✨",
        emoji: "💕",
        gif: "./gif1.gif"
    },
    {
        text: "Keep being the amazing, caring, and joyful girl you are. I’m so proud of you, and I can’t wait to celebrate many more birthdays by your side. 🥳",
        emoji: "🎂",
        gif: "./gif2.gif"
    }
];

const reasonsContainer = document.querySelector('#reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
const endingSection = document.querySelector('.ending-section');
let currentReasonIndex = 0;
let isTransitioning = false;
let isReadyToContinue = false;

function createReasonCard(reason) {
    const card = document.createElement('article');
    card.className = 'reason-card';

    const text = document.createElement('p');
    text.className = 'reason-text';

    const emoji = document.createElement('span');
    emoji.className = 'reason-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = reason.emoji;

    const message = document.createElement('span');
    message.textContent = reason.text;
    text.append(emoji, message);

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.setAttribute('aria-hidden', 'true');

    const gif = document.createElement('img');
    gif.src = reason.gif;
    gif.alt = '';
    gifOverlay.appendChild(gif);

    card.append(text, gifOverlay);
    return card;
}

function createFloatingElement() {
    const element = document.createElement('span');
    const decorations = ['🎈', '✨', '💖', '🎉', '🌸'];
    element.className = 'floating';
    element.setAttribute('aria-hidden', 'true');
    element.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    element.style.left = `${Math.random() * 90 + 5}%`;
    element.style.fontSize = `${Math.random() * 14 + 18}px`;
    element.addEventListener('animationend', () => element.remove(), { once: true });
    document.body.appendChild(element);
}

shuffleButton.addEventListener('click', () => {
    if (isTransitioning) return;

    if (isReadyToContinue) {
        window.location.href = './last.html';
        return;
    }

    isTransitioning = true;
    shuffleButton.disabled = true;
    reasonsContainer.appendChild(createReasonCard(reasons[currentReasonIndex]));
    currentReasonIndex += 1;
    reasonCounter.textContent = `A little love note ${currentReasonIndex} of ${reasons.length}`;
    createFloatingElement();

    if (currentReasonIndex === reasons.length) {
        endingSection.hidden = false;
        isReadyToContinue = true;
        shuffleButton.textContent = 'Open your birthday surprise 🎁';
        reasonCounter.textContent = 'That’s just a few of the reasons you’re so special to me.';
    } else {
        shuffleButton.textContent = 'Tell me another reason 💕';
    }

    window.setTimeout(() => {
        isTransitioning = false;
        shuffleButton.disabled = false;
    }, 450);
});

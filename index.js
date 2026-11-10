//import { generateSecret } from './game/generateSecret';
//import { evaluateGuess } from './game/evaluateGuess';
export const generateSecret = (length, base, random = Math.random) => {
    const chars = '0123456789abcdef'.slice(0, base);
    const shuffled = Array.from({ length }, (_, i) => i % 2 ? chars[Math.floor(random() * chars.length)] : chars[Math.floor(random() * chars.length)]).sort(() => random() - 0.5);
    return shuffled.slice(0, length).join('');
};
export const evaluateGuess = (guess, secret) => {
    let bulls = 0;
    let cows = 0;
    const secretDigitCount = {};
    const guessDigitCount = {};
    guess.split('').forEach((digit, index) => {
        if (digit.toUpperCase() === secret[index].toUpperCase()) {
            bulls++;
        }
        else {
            secretDigitCount[secret[index]] = (secretDigitCount[secret[index]] || 0) + 1;
            guessDigitCount[digit] = (guessDigitCount[digit] || 0) + 1;
        }
    });
    Object.keys(guessDigitCount).forEach((digit) => {
        if (secretDigitCount[digit]) {
            cows += Math.min(guessDigitCount[digit], secretDigitCount[digit]);
        }
    });
    return { bulls, cows };
};
const createInputElement = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'guess-input';
    input.placeholder = 'Enter number';
    input.maxLength = 6;
    return input;
};
const createButton = (text, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
};
const createElem = (tag, id, className) => {
    const element = document.createElement(tag);
    if (id) {
        element.id = id;
    }
    if (className) {
        element.className = className;
    }
    return element;
};
const baseOptions = [2, 8, 10, 16];
const body = document.body;
let container = createElem('div', undefined, 'container');
body.prepend(container);
const btn = createElem('button', 'new-game');
btn.textContent = 'New Game';
btn.addEventListener('click', () => {
    renderSetupScreen();
});
body.append(btn);
const renderTitle = () => {
    const title = createElem('h1', undefined, 'title');
    console.log(title);
    title.textContent = 'Bulls and Cows';
    container.append(title);
};
let currentSecret = '';
let gameHistory = [];
const startGame = () => {
    const baseSelect = document.getElementById('base-select');
    const lengthInput = document.getElementById('length-input');
    const base = parseInt(baseSelect.value);
    const length = parseInt(lengthInput.value);
    console.log(base, length);
    currentSecret = generateSecret(length, base);
    gameHistory = [];
    renderGameScreen(currentSecret, gameHistory);
};
const checkGuess = (secret, history) => {
    const input = document.getElementById('guess-input');
    const guess = input.value;
    if (guess.length === 0) {
        alert('Пожалуйста, введите число');
        return;
    }
    if (guess.length !== secret.length) {
        alert(`Число должно быть длиной ${secret.length} символов`);
        return;
    }
    const result = evaluateGuess(guess, secret);
    history = [...history, {
            guess: guess,
            bulls: result.bulls,
            cows: result.cows
        }];
    renderGameScreen(secret, history);
};
const renderSetupScreen = () => {
    [...container.children].forEach((child) => child.remove());
    renderTitle();
    const form = createElem('form', 'setup-form');
    container.append(form);
    const baseSelect = createElem('select', 'base-select');
    baseOptions.forEach((base) => {
        const option = createElem('option');
        option.textContent = `base of ${base}`;
        option.value = base.toString();
        baseSelect.append(option);
    });
    form.append(baseSelect);
    const lengthInput = createElem('input');
    lengthInput.type = 'number';
    lengthInput.id = 'length-input';
    lengthInput.value = '4';
    lengthInput.min = '2';
    lengthInput.max = '6';
    lengthInput.placeholder = 'Number length (2-16)';
    form.append(lengthInput);
    const startButton = createButton('Start Game', (evt) => {
        evt.preventDefault();
        startGame();
    });
    form.append(startButton);
};
export const renderGameScreen = (secret, history) => {
    [...container.children].forEach((child) => child.remove());
    renderTitle();
    const secretDisplay = createElem('p');
    container.append(secretDisplay);
    const input = createInputElement();
    container.appendChild(input);
    const submitButton = createButton('Check', () => {
        checkGuess(secret, history);
    });
    container.appendChild(submitButton);
    const historyList = createElem('ul', 'history-list');
    container.append(historyList);
    history.forEach((el) => {
        const liElem = createElem('li');
        liElem.textContent = `${el.bulls} - ${el.cows} - ${el.guess}`;
        historyList.append(liElem);
        if (el.guess === secret) {
            secretDisplay.textContent = `Secret number: ${secret}, You win, count step ${history.length}`;
            localStorage.setItem('history', JSON.stringify(history));
            return;
        }
    });
};
document.addEventListener('DOMContentLoaded', () => {
    renderSetupScreen();
});

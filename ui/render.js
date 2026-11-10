import { createButton, createElement, createInputElement } from "./domElements";
import { generateSecret } from '../game/generateSecret';
import { evaluateGuess } from '../game/evaluateGuess';
const baseOptions = [2, 8, 10, 16];
const body = document.body;
let container;
const renderTitle = () => {
    const title = createElement('h1', 'title');
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
    history.push({
        guess: guess,
        bulls: result.bulls,
        cows: result.cows
    });
    renderGameScreen(secret, history);
};
export const renderSetupScreen = () => {
    [...body.children].forEach((child) => child.remove());
    container = createElement('div', undefined, 'container');
    body.append(container);
    renderTitle();
    const form = createElement('form', 'setup-form');
    container.append(form);
    const baseSelect = createElement('select', 'base-select');
    baseOptions.forEach((base) => {
        const option = createElement('option');
        option.textContent = `base of ${base}`;
        option.value = base.toString();
        baseSelect.append(option);
    });
    form.append(baseSelect);
    const lengthInput = createElement('input');
    lengthInput.type = 'number';
    lengthInput.id = 'length-input';
    lengthInput.value = '4';
    lengthInput.min = '2';
    lengthInput.max = '6';
    lengthInput.placeholder = 'Number length (2-16)';
    form.append(lengthInput);
    const startButton = createButton('Start Game', () => {
        startGame();
    });
    form.append(startButton);
};
export const renderGameScreen = (secret, history) => {
    [...body.children].forEach((child) => child.remove());
    container = createElement('div', undefined, 'container');
    body.append(container);
    renderTitle();
    const secretDisplay = createElement('p');
    secretDisplay.textContent = `Secret number: ${secret}`;
    container.append(secretDisplay);
    const input = createInputElement();
    container.appendChild(input);
    const submitButton = createButton('Check', () => {
        checkGuess(secret, history);
    });
    container.appendChild(submitButton);
    const historyList = createElement('ul', 'history-list');
    container.append(historyList);
};

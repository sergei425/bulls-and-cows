import { createButton, createElement, createInputElement } from "./domElements";
import { generateSecret } from '../game/generateSecret';
import { evaluateGuess } from '../game/evaluateGuess';

const baseOptions = [2, 8, 10, 16];

const body = document.body;
let container = createElem('div', undefined, 'container');
body.prepend(container)
const btn: HTMLElement = createElem('button', 'new-game')
btn.textContent = 'New Game'
btn.addEventListener('click', () => {
  renderSetupScreen();
});
body.append(btn)

const renderTitle = () => {
  const title = createElem('h1', undefined, 'title');
  console.log(title)
  title.textContent = 'Bulls and Cows'
  container.append(title);
}

let currentSecret: string = '';
let gameHistory: Array<{guess: string, bulls: number, cows: number}> = [];

const startGame = () => {
  const baseSelect = document.getElementById('base-select') as HTMLSelectElement;
  const lengthInput = document.getElementById('length-input') as HTMLInputElement;
  
  const base = parseInt(baseSelect.value);
  const length = parseInt(lengthInput.value);
  console.log(base, length)
  currentSecret = generateSecret(length, base);
  
  gameHistory = [];
  renderGameScreen(currentSecret, gameHistory);
};

const checkGuess = (secret: string, history: Array<{guess: string, bulls: number, cows: number}>) => {
  const input = document.getElementById('guess-input') as HTMLInputElement;
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
  
  history= [...history,{
    guess: guess,
    bulls: result.bulls,
    cows: result.cows
  }];
  
  renderGameScreen(secret, history);
};


const renderSetupScreen = () => {
  [...container.children].forEach((child) => child.remove())

  renderTitle();
  const form = createElem('form', 'setup-form');
  container.append(form);

  const baseSelect = createElem('select', 'base-select') as HTMLSelectElement;
  baseOptions.forEach((base) => {
    const option = createElem('option') as HTMLOptionElement;
    option.textContent = `base of ${base}`
    option.value = base.toString();
    baseSelect.append(option);
  });
  form.append(baseSelect);

  const lengthInput = createElem('input') as HTMLInputElement;
  lengthInput.type = 'number';
  lengthInput.id = 'length-input';
  lengthInput.value = '4';
  lengthInput.min = '2';
  lengthInput.max = '6';
  lengthInput.placeholder = 'Number length (2-16)'
  form.append(lengthInput);

  const startButton = createButton('Start Game', (evt: Event) => {
    evt.preventDefault();
    startGame()
  });
  form.append(startButton);
}

export const renderGameScreen = (secret: string, history: Array<{guess: string, bulls: number, cows: number}>) => {
  [...container.children].forEach((child) => child.remove())
  renderTitle();

  const secretDisplay =  createElem('p');
  container.append(secretDisplay)

  const input = createInputElement();
  container.appendChild(input);


  const submitButton = createButton('Check', () => {
    checkGuess(secret, history);
  });
  container.appendChild(submitButton);

  const historyList = createElem('ul', 'history-list');
  container.append(historyList)
  history.forEach((el) => {
    const liElem = createElem('li')
    liElem.textContent = `${el.bulls} - ${el.cows} - ${el.guess}`;
    historyList.append(liElem)
    if (el.guess === secret) {
      secretDisplay.textContent = `Secret number: ${secret}, You win, count step ${history.length}`;
      localStorage.setItem('history', JSON.stringify(history))
      return;
    }
  })
}
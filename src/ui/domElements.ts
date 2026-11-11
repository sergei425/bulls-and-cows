/// <reference lib="dom" />

export const createInputElement = (): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'guess-input';
  input.placeholder = 'Enter number';
  input.maxLength = 6; 
  return input;
};

export const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
};

export const createElement = (tag: string, id?: string, className?: string): HTMLElement => {
  const element = document.createElement(tag);
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  return element;
};
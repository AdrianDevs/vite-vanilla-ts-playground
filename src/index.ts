import './styles/style.css';
import typescriptLogo from './assets/images/typescript.svg';
import { setupCounter } from './lib/counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div>
      <button id="my-id" type="button" style="background-color:red">Hello</button>
      <button id="my-ids" type="button"></button>
    </div>
  </div>
`;

const button = document.querySelector<HTMLButtonElement>('#my-id')!;
// // const button = document.getElementById('#my-id')!;
if (!button) {
  throw new Error('Button not found');
}

button.style.backgroundColor = 'blue';

button.addEventListener('click', () => {
  alert('Hello World');
});

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

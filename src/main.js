import './styles/main.scss';
import App from './scripts/templates/App';

const registerScreen = document.getElementById('register-screen');
const loginScreen = document.getElementById('login-screen');
const registerLinkEl = document.getElementById('register-link');

registerLinkEl.addEventListener('click', () => {
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'flex';
});

const app = new App();

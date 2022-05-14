import {
  AUTH_SECTION_ID,
  SIGN_IN_FORM_ID,
  SIGN_IN_SCREEN_ID,
  REGISTER_FORM_ID,
  REGISTER_SCREEN_ID,
  REGISTER_LINK_ID,
} from '../constants';
import { SIGNIN_TEMPLATE, REGISTER_TEMPLATE } from '../templates';
import { store } from '../services/';

const VIEWS_MAP = {
  [SIGN_IN_SCREEN_ID]: SIGNIN_TEMPLATE,
  [REGISTER_SCREEN_ID]: REGISTER_TEMPLATE,
};

class AuthView {
  signInScreenEl = null;
  registerScreenEl = null;
  signInFormEl = null;
  registerFormEl = null;
  linkToRegister = null;

  constructor(callbacks) {
    this.callbacks = callbacks;
    this.activeScreen = SIGN_IN_SCREEN_ID;
    this.root = document.getElementById(AUTH_SECTION_ID);
    store.subscribe(this);
    this.init();
  }

  static getRequestBodyFromForm = (form) => {
    const reqBody = {};
    const inputSelectors = form.querySelectorAll('input');
    for (let index = 0; index < inputSelectors.length; index++) {
      const element = inputSelectors[index];
      const nameAttr = element.getAttribute('name');
      reqBody[nameAttr] = element.value;
    }
    return reqBody;
  };

  init() {
    this.root.innerHTML = VIEWS_MAP[this.activeScreen];
    this.onSetElements();
    this.addListeners();
  }

  update({ user }) {
    if (user) {
      this.destroy();
    } else {
      this.init();
    }
  }

  onSetElements() {
    this.signInScreenEl = document.getElementById(SIGN_IN_SCREEN_ID) || null;
    this.registerScreenEl = document.getElementById(REGISTER_SCREEN_ID) || null;
    this.signInFormEl = document.getElementById(SIGN_IN_FORM_ID) || null;
    this.registerFormEl = document.getElementById(REGISTER_FORM_ID) || null;
    this.linkToRegister = document.getElementById(REGISTER_LINK_ID) || null;
  }

  handleClickToRegisterLink(e) {
    e.preventDefault();
    this.destroy();
    this.activeScreen = REGISTER_SCREEN_ID;
    this.init();
  }

  addListeners() {
    if (this.signInFormEl) {
      this.signInFormEl.addEventListener('submit', this.callbacks.signIn);
    }
    if (this.registerFormEl) {
      this.registerFormEl.addEventListener('submit', this.callbacks.register);
    }
    if (this.linkToRegister) {
      this.linkToRegister.addEventListener(
        'click',
        this.handleClickToRegisterLink.bind(this)
      );
    }
  }

  removeListeners() {
    if (this.signInFormEl) {
      this.signInFormEl.removeEventListener('submit', this.callbacks.signIn);
    }
    if (this.registerFormEl) {
      this.registerFormEl.removeEventListener(
        'submit',
        this.callbacks.register
      );
    }
    if (this.linkToRegister) {
      this.linkToRegister.removeEventListener(
        'click',
        this.handleClickToRegisterLink.bind(this)
      );
    }
  }

  destroy() {
    this.removeListeners();
    this.root.innerHTML = '';
    this.activeScreen = SIGN_IN_SCREEN_ID;
  }
}

export default AuthView;

import { Http } from '../services';
import { AuthView } from '../views';
import { store } from '../services/Store';
import { User } from '../entities';
import { USER_SECTION_ID } from '../constants';

class AuthModule {
  constructor() {
    this.authView = new AuthView({
      signIn: this.signIn.bind(this),
      register: this.register.bind(this),
    });
  }

  async signIn(e) {
    e.preventDefault();
    const reqBody = AuthView.getRequestBodyFromForm(this.authView.signInFormEl);
    const { user, token } = await Http.post({
      url: '/user/login',
      body: reqBody,
    });
    store.setState(
      'user',
      new User({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        token,
      })
    );
  }

  async register(e) {
    e.preventDefault();
    const reqBody = AuthView.getRequestBodyFromForm(
      this.authView.registerFormEl
    );
    const { user, token } = await Http.post({
      url: '/user/register',
      body: reqBody,
    });
    store.setState(
      'user',
      new User({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        token,
      })
    );
  }
}

export default AuthModule;

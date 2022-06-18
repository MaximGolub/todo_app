import { Http } from '../services';
import { AuthView } from '../views';
import { store } from '../services';
import { User } from '../entities';

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
    const { user, accessToken } = await Http.post({
      url: '/signin',
      body: reqBody,
    });
    store.setState(
      'user',
      new User({
        id: user.id,
        email: user.email,
        token: accessToken,
      })
    );
  }

  async register(e) {
    e.preventDefault();
    const reqBody = AuthView.getRequestBodyFromForm(
      this.authView.registerFormEl
    );
    const { user, accessToken } = await Http.post({
      url: '/signup',
      body: reqBody,
    });
    store.setState(
      'user',
      new User({
        id: user._id,
        email: user.email,
        token: accessToken,
      })
    );
  }
}

export default AuthModule;

import { Http } from '../services';
import { UserView } from '../views';
import { store } from '../services';

class UserModule {
  constructor() {
    this.userView = new UserView({
      logout: this.logout.bind(this),
    });
  }

  async logout() {
    await Http.post({ url: '/user/logout' });
    store.setState('user', null);
  }
}

export default UserModule;

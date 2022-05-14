import { AuthModule, UserModule } from './modules';

class App {
  constructor() {
    new AuthModule();
    new UserModule();
  }
}

export default App;

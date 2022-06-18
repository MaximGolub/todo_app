import { AuthModule, TaskModule, UserModule } from './modules';

class App {
  constructor() {
    new AuthModule();
    new UserModule();
    new TaskModule();
  }
}

export default App;

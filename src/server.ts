import { SiswaController } from './core/controller/SiswaController';
import { App } from './app';
import { AppController } from './core/controller/AppController';
import { HelloController } from './core/controller/HelloController';
const app = new App([
  new AppController(),
  new SiswaController(),
  new HelloController()
]);

app.listen();
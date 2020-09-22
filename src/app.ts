
import { Kernel } from "./core/kernel/kernel";
import { IController } from './core/shared/IController';
import basicAuth from "./core/util/basicAuth";
import { MongoSingleton } from './core/util/mongoSingleton';

export class App {
  _kernel: Kernel
  _mongoSingleton: MongoSingleton;
  constructor(_c: IController[]) { 
    this._kernel = new Kernel();
    this._mongoSingleton = new MongoSingleton();
    this.initController(_c);
    this.connectStorage();
  }

  private initController(_c: IController[]) { 
    _c.forEach((controller) => { 
      this._kernel._defaultApps.use('/api/v1/', controller.router);
    })
  }
  private connectStorage() { 
    this._mongoSingleton.connect();
  }
  listen() { 
    this._kernel.appService();
  }
}
import express from 'express';
import { AppUse } from './kernel.app.use';

export class Kernel { 
  
  _defaultApps: express.Application;
  _defaultAppUse: AppUse
  constructor() { 
    this._defaultApps = express();
    this._defaultAppUse = new AppUse(this._defaultApps)
  }

  appService() { 
    this._defaultApps.listen(4000, () => { 
      console.log(`aplikasi ini berjalan di port ${4000}`);
    })
  }
  
}
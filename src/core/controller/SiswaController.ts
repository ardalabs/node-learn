import { IController } from '../shared/IController';
import express from 'express';
import { SiswaWorker } from '../worker/SiswaWorker';
import { ISiswa } from '../model/siswa';

export class SiswaController implements IController {
  path = '/siswa'
  router = express.Router();
  worker: SiswaWorker
  constructor() {
    this.initRouter();
    this.worker = new SiswaWorker();
  }
  private initRouter(): void {
    this.router.post(`${this.path}/create`, this.create);
    this.router.get(`${this.path}/all`, this.all);
    this.router.get(`${this.path}/nis/:id`, this.findByNIS);
    this.router.get(`${this.path}/delete/:id`, this.deleteByNIS);
    this.router.post(`${this.path}/update/:id`, this.updateByNis);
  }

  private deleteByNIS = (req: express.Request, res: express.Response) => {

    this.worker.removeSiswaByNIS(req.params.id).then((data: any) => {
      res.json(data);
    }).catch((err: Error) => {
      res.json(err);
    })
  }

  private updateByNis = (req: express.Request, res: express.Response) => {
 
    const siswa: ISiswa = {
      name: req.body.name,
      gender: Number(req.body.gender),
      nis: Number(req.body.nis)
    };

    this.worker.updateSiswaByNIS(req.params.id, siswa).then((data: any) => {
      res.json(data);
    }).catch((err: Error) => {
      res.json(err);
    })
  }

  private all = (req: express.Request, res: express.Response) => {
 
    this.worker.showAllSiswa().then((data: any) => {
      res.json(data);
    }).catch((err: Error) => {
      res.json(err);
    })
  }
  private findByNIS = (req: express.Request, res: express.Response) => {
 
    this.worker.getSiswaByNIS(req.params.id).then((data: any) => {
      res.json(data);
    }).catch((err: Error) => {
      res.json(err);
    })
  }
  private create = (req: express.Request, res: express.Response) => {
    const siswa: ISiswa = {
      name: req.body.name,
      gender: Number(req.body.gender),
      nis: Number(req.body.nis)
    };

    this.worker.createSiswa(siswa).then((data: any) => {
      res.json(data);
    }).catch((err: Error) => {
      res.json(err);
    })
  }
}
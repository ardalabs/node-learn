import { ISiswa, MSiswa } from '../model/siswa';
import { QueryProxy } from '../util/queryProxy';
interface ISiswaWorker {
  createSiswa(data: ISiswa): Promise<any>
  getSiswaByNIS(nis: string): Promise<any>
  updateSiswaByNIS(nis: string, data: ISiswa): Promise<any>
  removeSiswaByNIS(nis:string):Promise<any>
  showAllSiswa(): Promise<any>
}
export class SiswaWorker implements ISiswaWorker {
  _qp?:QueryProxy
  constructor() {
    this._qp = new QueryProxy(MSiswa);
  }

  removeSiswaByNIS(nis: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = { nis: Number(nis) };
      MSiswa.findOneAndRemove(params).then((result) => {
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }

  updateSiswaByNIS(nis: string, data: ISiswa): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = { nis: Number(nis) };
      MSiswa.findOneAndUpdate(params, data).then((result) => {
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }
  getSiswaByNIS(nis: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = { nis: Number(nis) };
      const params = { select: 'name nis' }
      
      this._qp?.findOne(data, params).then((result) => {
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }
  showAllSiswa(): Promise<any> {
    return new Promise((resolve, reject) => {
      MSiswa.find().then((result) => {
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }

  createSiswa(data: ISiswa): Promise<any> {
    return new Promise((resolve, reject) => {
      MSiswa.create(data).then((result) => {
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }
}
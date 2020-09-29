import { ISiswa, MSiswa } from '../model/siswa';
import { QueryProxy } from '../util/queryProxy';
import { CacheManager } from '../util/cacheManager';
const KEY_SISWA = 'KEY_SISWA';
interface ISiswaWorker {
  createSiswa(data: ISiswa): Promise<any>
  getSiswaByNIS(nis: string): Promise<any>
  updateSiswaByNIS(nis: string, data: ISiswa): Promise<any>
  removeSiswaByNIS(nis:string):Promise<any>
  showAllSiswa(): Promise<any>
}
export class SiswaWorker implements ISiswaWorker {
  _qp?: QueryProxy
  cache?: CacheManager
  constructor() {
    this._qp = new QueryProxy(MSiswa);
    this.cache = new CacheManager();
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
      this.cache?.getCache(KEY_SISWA, (err, cacheResult) => {
        if (err || !cacheResult) {
          MSiswa.find().then((result) => {
            this.cache?.setCache(KEY_SISWA, result);
            resolve(result);
          }).catch((err: Error) => {
            this.cache?.deleteCache(KEY_SISWA);
            reject(err);
          })
        } else { 
          resolve(JSON.parse(cacheResult))
        }

      })
      
    })
  }

  createSiswa(data: ISiswa): Promise<any> {
    return new Promise((resolve, reject) => {
      MSiswa.create(data).then((result) => {
        this.cache?.deleteCache(KEY_SISWA);
        resolve(result);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }
}
import { ISiswa, MSiswa } from '../model/siswa';
interface ISiswaWorker {
  createSiswa(data: ISiswa): Promise<any>
  getSiswaByNIS(nis: string): Promise<any>
  updateSiswaByNIS(nis: string, data: ISiswa): Promise<any>
  removeSiswaByNIS(nis:string):Promise<any>
  showAllSiswa(): Promise<any>
}
export class SiswaWorker implements ISiswaWorker {
  constructor() {

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
      MSiswa.findOne({ nis: Number(nis) }).then((result) => {
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
import mongoose from 'mongoose';
import { resolve } from 'path';
export interface IQueryProxy { 
  findById(id: string, params?: any): Promise<any>;
  findOne(data: any, params?: any): Promise<any>;
  findAll(data: any, params?: any): Promise<any>;
  findOneAndUpdate(data: any, params: any): Promise<any>;
  delete(data: any): Promise<any>;
}

export class QueryProxy implements IQueryProxy {
  public model: mongoose.Model<mongoose.Document>
  constructor(modelName: mongoose.Model<mongoose.Document>) { 
    this.model = modelName;
  }

  findById(id: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const q = this.model
        .findById(id)
        .populate(params.populate ? params.populate : '')
        .maxTimeMS(300000)
        .select(params.select ? params.select : '')
        .lean(true);
      q.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    });
  }
  findOne(data: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const q = this.model
        .findOne(data)
        .populate(params.populate ? params.populate : '')
        .maxTimeMS(300000)
        .select(params.select ? params.select : '')
        .lean(true);
      q.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    });
  }
  findAll(data: any, params?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findOneAndUpdate(data: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  } 
  
}
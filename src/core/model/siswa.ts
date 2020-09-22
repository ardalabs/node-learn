
import mongoose from "mongoose";

export interface ISiswa { 
  name: string,
  nis: number,
  gender: number,
  createdAt?: Date,
  updatedAt?: Date
}
const schema =  new mongoose.Schema({
  name: String,
  nis: Number,
  gender: Number,
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date, default:Date.now}
})

schema.pre('update', function update() {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  })
});
export const MSiswa = mongoose.model<ISiswa & mongoose.Document>('Siswa', schema);

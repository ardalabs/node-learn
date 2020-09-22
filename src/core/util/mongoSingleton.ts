import mongoose from 'mongoose';
const dbUrl = 'mongodb://localhost:27017/moklet'
export class MongoSingleton { 
  constructor() { 

  }
  
  connect() { 
    const env = process.env.NODE_ENV;
    mongoose.set('debug', true);
    mongoose.connect(dbUrl, {
      useNewUrlParser:true,
    }).catch((err) => {
      console.log(`something wrong ${err}`);
    })
  }
}
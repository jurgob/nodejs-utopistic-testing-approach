import {connect, disconnect as mongooseDisconnect, Schema, model} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

type User= {
  name: string;
  email: string;
}

const userSchema = new Schema<User>({
  name: {type: String, required: true},
  email: {type: String, required: true},
});
const User = model<User>('User', userSchema);


export async function  createDBClient(){
  const mongoServer = await MongoMemoryServer.create();
  await connect(mongoServer.getUri(), { dbName: "verifyMASTER" });

  

  const disconnect = () => {
    mongooseDisconnect();
    mongoServer.stop();
  
  }

  const createUser = async (user:User) => {
    const userNew = new User(user);
    return await userNew.save();
    
  }



  return {
    disconnect,
    createUser
  }
// (async () => {
  

//   // your code here
  
//   await mongoose.disconnect();
// })();
}


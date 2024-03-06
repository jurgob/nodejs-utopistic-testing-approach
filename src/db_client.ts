
import {MongoClient} from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import env from './env';
type User= {
  name: string;
  email: string;
}


export async function  createDBClient(){

  let mongoServer:MongoMemoryServer|undefined =undefined;
  let mongo_db_name: string| undefined = undefined;
  let mongo_url: string| undefined = undefined;
  if(!env.MONGO_URL){
    mongoServer = await MongoMemoryServer.create()
    mongo_db_name = `db_${Math.random().toString(36).substring(7)}`;
    mongo_url = mongoServer.getUri()+`/${mongo_db_name}`
  }else {
    if(!env.MONGO_DB_NAME){
      throw new Error('MONGO_DB_NAME is required when using a real mongodb server (aka when MONGO_URL is defined)');
    }
    mongo_url = `${env.MONGO_URL}/${env.MONGO_DB_NAME}`;
    mongo_db_name = env.MONGO_DB_NAME;
  }  

  const db = new MongoClient(mongo_url);
  const collectionUsers = db.db(mongo_db_name).collection<User>('users');

  const disconnect = async () => {
    await db.close();
    
    if(mongoServer)
      await mongoServer.stop();
    
  }

  const createUser = async (user:User) => {
    const {insertedId} = await collectionUsers.insertOne(user);
    const newUser = await collectionUsers.findOne({_id: insertedId});
    return newUser;
    
  }



  return {
    disconnect,
    createUser
  }

}


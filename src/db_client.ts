
import {MongoClient} from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import env from './env';
type User= {
  name: string;
  email: string;
}


export async function  createDBClient(){

  // const useMock = env.NODE_ENV === 'test';
  const mongoServer = await MongoMemoryServer.create();
  
  const mongo_db_name = `db_${Math.random().toString(36).substring(7)}`;
  const mongo_url = mongoServer.getUri()+`/${mongo_db_name}`

  const db = new MongoClient(mongo_url);
  const collectionUsers = db.db(mongo_db_name).collection<User>('users');



  

  const disconnect = async () => {
    await db.close();
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


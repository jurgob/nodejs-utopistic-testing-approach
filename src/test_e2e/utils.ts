import {createApp} from '../server';
import { Server } from "http";

import { AddressInfo } from 'node:net';
import env from '../env';
export async function createMockServer() {
    let server:Server|undefined = undefined
    let intUrl = undefined
    if(!env.TEST_API_URL){
        const app = await createApp()
        server = app.listen(0); // this will open the server on a random ephimeral port
        const address = server.address() as AddressInfo;
        server.on('close', () => {
            app.emit('close');
        });
        intUrl = `http://localhost:${address.port}`
    }else {
        intUrl = env.TEST_API_URL
    }
    
    const url: string = intUrl
    return {
        url,
        close: () => {
            if(server)
                server.close()
        }
    }
}
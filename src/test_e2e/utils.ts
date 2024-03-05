import {createApp} from '../server';
import { AddressInfo } from 'node:net';

export async function createMockServer() {
    const app = await createApp()
    const server = app.listen(0); // this will open the server on a random ephimeral port
    const address = server.address() as AddressInfo;
    return {
        url: `http://localhost:${address.port}`,
        close: () => server.close()
    }
}
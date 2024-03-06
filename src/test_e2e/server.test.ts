import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createMockServer} from './utils.js';
import axios from 'axios';


test('endpoint /health', async () => assert.doesNotReject(async () => {
    const {url,close } = await createMockServer();
    const res = await axios({
        baseURL: `${url}`,
        url: '/health',
    });
    assert.deepStrictEqual(res.status, 200, 'Unexpected status code from GET /health endpoint');
    assert.deepStrictEqual(res.data, {status: 'ok'}, 'Unexpected response from GET /health endpoint');
    close();
}));



test('endpoint /users', async () => assert.doesNotReject(async () => {
    const {url,close } = await createMockServer();
    const res = await axios({
        baseURL: `${url}`,
        url: '/users',
        method: 'post',
        data: {
            name: 'test',
            email: 'test@email.com',   
        }
    });
    const {_id, ...data} = res.data;

    assert.deepStrictEqual(res.status, 201, 'Unexpected status code from POST /users endpoint');
    assert.deepEqual(data, {
        name: 'test',
        email: 'test@email.com',
    }, 'Unexpected response from POST /users endpoint');
    assert.ok(_id, 'Expected _id to be defined');

    close();
}));
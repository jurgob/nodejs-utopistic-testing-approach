import assert from 'node:assert/strict';
import {createMockServer} from './utils.js';
import axios from 'axios';

assert.doesNotReject(
    async () => {
        const {url,close } = await createMockServer();
        const res = await axios({
            baseURL: `${url}`,
            url: '/health',
        });
        assert.deepStrictEqual(res.status, 200, 'Unexpected status code from GET /health endpoint');
        assert.deepStrictEqual(res.data, {status: 'ok'}, 'Unexpected response from GET /health endpoint');
        close();
    }
  );
import { z } from 'zod'



const envSchema = z.object({
    PORT: z.coerce.number().min(1000).default(3000),
    TEST_API_URL: z.string().url().optional(),//if empty, the test will use an inmemory-mock server
    MONGO_URL: z.string().url().optional(),// if empty, the express server will use an inmemory-mock mongodb version
    MONGO_DB_NAME: z.string().max(50).optional(),
});

const env = envSchema.parse(process.env)

console.log(`NODE_ENV: `,process.env.NODE_ENV);
console.log(`TEST_API_URL: `,env.TEST_API_URL);

export default env


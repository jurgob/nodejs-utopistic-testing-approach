import dotenv from "dotenv";
import { z } from 'zod'

dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().min(1000).default(3000),
});

const env = envSchema.parse(process.env)

export default env


import { createClient } from "redis";
import { Logger } from "../utils/generators/logs/logger.log.js";
import { config } from "dotenv";

config()

const { REDIS_URL } = process.env

export const client = createClient({ url: REDIS_URL })

client.on('error', (err) => {
  Logger.system('Redis-Error : ' + err.message)
  console.log('Redis Client Error', err.message)
});

await client.connect();

export default client
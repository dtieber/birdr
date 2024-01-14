import * as dotenv from 'dotenv'
import * as env from 'env-var'

dotenv.config()

export const config = {
  HOST: env.get('HOST').required().asString(),
  LOG_LEVEL: env.get('LOG_LEVEL').required().asString(),
  PORT: env.get('PORT').required().asIntPositive(),
}

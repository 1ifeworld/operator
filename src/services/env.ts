import { objectKeys } from '@/utils'
import { config } from 'dotenv'

config()

interface Env {
  ALCHEMY_KEY: string
  PRIVATE_KEY: string
  PIMLICO_KEY: string
}

export const env: Env = {
  ALCHEMY_KEY: process.env.ALCHEMY_KEY as string,
  PRIVATE_KEY: process.env.PRIVATE_KEY as string,
  PIMLICO_KEY: process.env.PIMLICO_KEY as string,
}

objectKeys(env).forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing environment variable ${key}`)
  }
})

export default env

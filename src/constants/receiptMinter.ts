import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'
import { config } from 'dotenv'

config()

export const receiptMinter = privateKeyToAccount(
  process.env.PRIVATE_KEY as Hash,
)

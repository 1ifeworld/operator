import { optimismGoerli } from 'viem/chains'
import {
  http,
  createClient,
  createPublicClient,
  createWalletClient,
  PublicClient,
} from 'viem'
import { receiptMinter } from '@/constants'
import { config } from 'dotenv'

config()

const chain = 'optimism-goerli'

export const publicClient = createPublicClient({
  chain: optimismGoerli,
  transport: http(
    `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
  ),
}) as PublicClient

export const walletClient = createWalletClient({
  account: receiptMinter,
  chain: optimismGoerli,
  transport: http(),
})

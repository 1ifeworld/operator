import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from 'permissionless/actions/pimlico'
import { bundlerActions } from 'permissionless'
import { optimismGoerli } from 'viem/chains'
import {
  http,
  createClient,
  createPublicClient,
  createWalletClient,
  PublicClient,
} from 'viem'
import { riverNetSigner } from '@/constants'
import { env } from '@/services'

const chain = 'optimism-goerli'

export const pimlicoBundlerClient = createClient({
  chain: optimismGoerli,
  // ⚠️ using v1 of the API ⚠️
  transport: http(
    `https://api.pimlico.io/v1/${chain}/rpc?apikey=${env.PIMLICO_KEY}`,
  ),
})
  .extend(bundlerActions)
  .extend(pimlicoBundlerActions)

export const pimlicoPaymasterClient = createClient({
  chain: optimismGoerli,
  // ⚠️ using v2 of the API ⚠️
  transport: http(
    `https://api.pimlico.io/v2/${chain}/rpc?apikey=${env.PIMLICO_KEY}`,
  ),
}).extend(pimlicoPaymasterActions)

export const publicClient = createPublicClient({
  chain: optimismGoerli,
  transport: http(`https://opt-goerli.g.alchemy.com/v2/${env.ALCHEMY_KEY}`),
}) as PublicClient

export const walletClient = createWalletClient({
  account: riverNetSigner,
  chain: optimismGoerli,
  transport: http(),
})

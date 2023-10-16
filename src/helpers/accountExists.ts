import { type Hex } from 'viem'
import { publicClient, pimlicoBundlerClient } from '@/config'
import { getSenderAddress } from 'permissionless'
import { buildInitCode } from './buildInitCode'
import { entryPoint } from '@/constants'

export async function accountExists({ address }: { address: Hex }) {

  const initCode = buildInitCode({ initialAdmin: address })

  const initialAdminCounterfactual = await getSenderAddress(publicClient, {
    initCode: initCode,
    entryPoint: entryPoint,
  })

  const bytecode = await publicClient.getBytecode({
    address: initialAdminCounterfactual,
  })

  return bytecode
}

console.log('Deployed account', accountExists({address: '0x1F3b84B0377218ed33Dd3C53B9Ec40CA11aA8A6d'}))

console.log('Undeployed account', accountExists({address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'}))

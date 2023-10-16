import { type Hex } from 'viem'
import { publicClient } from '@/config'
import { getSenderAddress } from 'permissionless'
import { buildInitCode } from './buildInitCode'
import { entryPoint } from '@/constants'

export async function accountExists({ initialAdmin }: { initialAdmin: Hex }) {
  const initCode = buildInitCode({ initialAdmin })

  const senderAddress = await getSenderAddress(publicClient, {
    initCode: initCode,
    entryPoint: entryPoint,
  })

  const bytecode = await publicClient.getBytecode({
    address: senderAddress,
  })

  return bytecode
}

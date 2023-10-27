import { Hex, concatHex, encodeFunctionData } from 'viem'
import { riverAccountFactory, salt } from '@/constants'
import { riverAccountFactoryAbi } from '@/abi'

/**
 *
 * Requesting a smart contract deployment is done through the initCode field, where the first 20 bytes specify the
 * factory address the EntryPoint will call, and anything after corresponds to the data that will be called on that
 * factory.
 *
 */

export function buildInitCode({ initialAdmin }: { initialAdmin: Hex }) {
  const initCode = concatHex([
    riverAccountFactory,
    encodeFunctionData({
      abi: riverAccountFactoryAbi,
      functionName: 'createAccount',
      args: [initialAdmin, salt],
    }),
  ])
  return initCode
}

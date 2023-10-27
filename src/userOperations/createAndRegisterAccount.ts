import { type Hex, type Hash, encodeFunctionData } from 'viem'
import { signMessage } from 'viem/accounts'
import { optimismGoerli } from 'viem/chains'
import {
  type UserOperation,
  getSenderAddress,
  getUserOperationHash,
  type GetUserOperationReceiptReturnType,
} from 'permissionless'
import {
  publicClient,
  pimlicoBundlerClient,
  pimlicoPaymasterClient,
} from '@/config'
import { entryPoint, riverNetSigner, idRegistry } from '@/constants'
import { idRegistryAbi, riverAccountAbi } from '@/abi'
import { buildInitCode } from '@/helpers'
import { config } from 'dotenv'

config()

export async function createAndRegisterAccount({
  initialAdmin,
}: {
  initialAdmin: Hex
}) {

  const initCode = buildInitCode({ initialAdmin })

  const senderAddress = await getSenderAddress(publicClient, {
    initCode: initCode,
    entryPoint: entryPoint,
  })

  const registerCalldata = encodeFunctionData({
    abi: idRegistryAbi,
    functionName: 'register',
    args: [riverNetSigner.address as Hex, riverNetSigner.address as Hex],
  })

  const executeCalldata = encodeFunctionData({
    abi: riverAccountAbi,
    functionName: 'execute',
    args: [idRegistry, BigInt(0), registerCalldata],
  })

  const gasPrice = await pimlicoBundlerClient.getUserOperationGasPrice()

  const userOperation = {
    sender: senderAddress,
    nonce: 0n,
    initCode,
    callData: executeCalldata,
    maxFeePerGas: gasPrice.fast.maxFeePerGas,
    maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
    signature:
      '0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c' as Hash, // dummy signature
  }

  const sponsorUserOperationResult =
    await pimlicoPaymasterClient.sponsorUserOperation({
      userOperation,
      entryPoint: entryPoint,
    })

  const sponsoredUserOperation: UserOperation = {
    ...userOperation,
    preVerificationGas: sponsorUserOperationResult.preVerificationGas,
    verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
    callGasLimit: sponsorUserOperationResult.callGasLimit,
    paymasterAndData: sponsorUserOperationResult.paymasterAndData,
  }

  const signature = await signMessage({
    message: {
      raw: getUserOperationHash({
        userOperation: sponsoredUserOperation as UserOperation,
        entryPoint: entryPoint,
        chainId: optimismGoerli.id,
      }),
    },
    privateKey: process.env.PRIVATE_KEY as Hash,
  })

  sponsoredUserOperation.signature = signature

  const userOperationHash = await pimlicoBundlerClient.sendUserOperation({
    userOperation: sponsoredUserOperation,
    entryPoint: entryPoint,
  })

  console.log(
    'Received User Operation hash:',
    `https://jiffyscan-frontend.vercel.app/userOpHash/${userOperationHash}?network=optimism-goerliuserOperationHash`,
  )

  // Wait for the userOperation to be included, by continually querying for the receipts
  console.log('Querying for receipts...')
  let receipt: GetUserOperationReceiptReturnType = null
  while (receipt === null) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    receipt = await pimlicoBundlerClient.getUserOperationReceipt({
      hash: userOperationHash,
    })
    console.log(
      receipt === null
        ? 'Still waiting...'
        : `Receipt received: ${receipt.success ? 'success' : 'failure'}`,
    )
  }

  const txHash = receipt.receipt.transactionHash

  console.log(
    `UserOperation included: https://goerli-optimism.etherscan.io/tx/${txHash}`,
  )

  return { txHash, senderAddress }
}

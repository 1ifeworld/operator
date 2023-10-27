import { erc6551registry, salt, erc6551Impl, receipts } from '@/constants'
import { publicClient, walletClient } from '@/config'
import { erc6551RegistryAbi } from '@/abi'
import { optimismGoerli } from 'viem/chains'

export async function create6551Account({
  idRegistryToken,
}: { idRegistryToken: number }) {
  const { request } = await publicClient.simulateContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: erc6551RegistryAbi,
    functionName: 'createAccount',
    args: [
      erc6551Impl,
      salt,
      BigInt(optimismGoerli.id),
      receipts,
      BigInt(idRegistryToken),
    ],
  })

  await walletClient.writeContract(request)
}

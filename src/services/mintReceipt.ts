import { create6551Account } from '@/helpers'
import { Router } from 'express'
import { optimismGoerli } from 'viem/chains'
import { publicClient, walletClient } from '@/config'
import { erc6551RegistryAbi, receiptsAbi } from '@/abi'
import { erc6551registry, salt, erc6551Impl, receipts } from '@/constants'

export const router = Router()

router.post('/', async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: 'Request body is missing' })
    return
  }

  const { idRegistryToken } = req.body

  const data = await publicClient.readContract({
    address: erc6551registry,
    abi: erc6551RegistryAbi,
    functionName: 'account',
    args: [
      erc6551Impl,
      salt,
      BigInt(optimismGoerli.id),
      receipts,
      BigInt(idRegistryToken),
    ],
  })

  // Exclusively for renaming the returned data
  const tokenboundAcct = data

  const bytecode = await publicClient.getBytecode({
    address: tokenboundAcct,
  })

  if (!bytecode) {
    await create6551Account(idRegistryToken)
  }

  const { request } = await publicClient.simulateContract({
    address: receipts,
    abi: receiptsAbi,
    functionName: 'mint',
    args: [tokenboundAcct, BigInt(1)],
  })

  const hash = await walletClient.writeContract(request)

  const transaction = await publicClient.waitForTransactionReceipt({ hash })

  // Send the transaction back to the client
  res.json({ transaction })
})

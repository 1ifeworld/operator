import { accountExists } from '@/helpers'
import { Router } from 'express'
import { isAddress } from 'viem'

export const router = Router()

router.post('/', async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: 'Request body is missing' })
    return
  }

  const { idToMintFor } = req.body

  //   if (!isAddress(initialAdmin)) {
  //   res.status(400).json({ error: 'Invalid address' })
  //     return
  //   }

  // account exists?

  // @ts-expect-error
  const bytecode = await accountExists()
  if (bytecode && bytecode !== '0x') {
    res.status(400).json({ error: 'Sender already has an account' })
    return
  }
})

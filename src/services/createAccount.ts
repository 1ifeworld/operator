import { accountExists } from '@/helpers'
import { createAndRegisterAccount } from '@/userOperations'
import { Router } from 'express'
import { isAddress } from 'viem'

export const router = Router()

router.post('/', async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: 'Request body is missing' })
    return
  }
  const { initialAdmin } = req.body
  if (!isAddress(initialAdmin)) {
  res.status(400).json({ error: 'Invalid address' })
    return
  }

  const bytecode = await accountExists({initialAdmin});
  if (bytecode && bytecode !== '0x') {
    res.status(400).json({ error: 'Sender already has an account' });
    return;
  }

  const { senderAddress, txHash } = await createAndRegisterAccount({initialAdmin})

  res.json({ senderAddress, txHash })
})

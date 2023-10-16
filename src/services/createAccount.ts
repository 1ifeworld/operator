import { accountExists } from '@/helpers'
import { createAndRegisterAccount } from '@/userOperations'
import { Router } from 'express'
import { isAddress } from 'viem'

const router = Router()

router.post('/create-account', async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: 'Request body is missing' })
    return
  }
  const { initialAdmin } = req.body

  if (!isAddress(initialAdmin)) {
    res.status(400).json({ error: 'Invalid address' })
  }

  if (!(await accountExists(initialAdmin))) {
    res.status(400).json({ error: 'Sender already has an account' })
  }

  const { senderAddress, txHash } = await createAndRegisterAccount(initialAdmin)

  res.json({ senderAddress, txHash })
})

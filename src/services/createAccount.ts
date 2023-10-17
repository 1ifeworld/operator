import { accountExists } from '@/helpers'
import { createAndRegisterAccount } from '@/userOperations'
import { Router } from 'express'
import { isAddress } from 'viem'

export const router = Router()

router.post('/', async (req, res) => {
  console.log("REQQQ<3", req.body)
  console.log("ITS HITTING")
  if (req.body == null) {
    res.status(400).json({ error: 'Request body is missing' })
    console.log("ITS HITTING2")
    return
  }
  const { initialAdmin } = req.body
  if (!isAddress(initialAdmin)) {
    console.log("ITS HITTING3")
    res.status(400).json({ error: 'Invalid address' })
    return
  }

  const bytecode = await accountExists({initialAdmin});
  if (bytecode && bytecode !== '0x') {
    console.log("ITS HITTING4");
    res.status(400).json({ error: 'Sender already has an account' });
    return;
  }

  const { senderAddress, txHash } = await createAndRegisterAccount({initialAdmin})
  console.log("ITS HITTING5")

  res.json({ senderAddress, txHash })
})

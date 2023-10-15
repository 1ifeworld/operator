import { Router } from 'express'
import { isAddress } from 'viem'

const router = Router()

router.post('/create-account', (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: 'Bad request, body is missing' })
    return
  }
  const { initialAdmin } = req.body

  if (!isAddress(initialAdmin)) {
    res.status(400).json({ error: 'Invalid address' })
  }

  // TODO: Add UO building functionality, ensure address doesn't already exist in the database
})

import cors from 'cors'
import express from 'express'
import { router as createAccountRouter } from '@/services'

const PORT = process.env.PORT ?? 8080

const app = express()

app.use(cors())

app.use('/create-account', createAccountRouter)

app.listen(PORT)

console.log(`Listening on port ${PORT}...`)

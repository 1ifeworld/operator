import cors from 'cors'
import express from 'express'
import { router as mintReceiptRouter } from '@/services'

const PORT = process.env.PORT ?? 8080

const app = express()

app.use('/mint-receipt', mintReceiptRouter)

app.listen(PORT)
console.log(`Listening on port ${PORT}...`)

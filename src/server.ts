import cors from 'cors'
import express from 'express'
import { Unkey } from '@unkey/api'
import { verifyKey } from '@unkey/api'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import pgPromise from 'pg-promise'
import { router as createAccountRouter } from '@/services'

declare module 'express-session' {
  interface SessionData {
    verified: boolean
  }
}

const PORT = process.env.PORT ?? 8080

const app = express()
const unkey = new Unkey({ rootKey: `${process.env.UNKEY_ROOT}` })

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use(express.urlencoded({ extended: true }))

const pgp = pgPromise()
const db = pgp(`${process.env.DATABASE_URL}`)
const pgStore = connectPgSimple(session)

app.use(
  session({
    store: new pgStore({
      pgPromise: db,
      tableName: 'river-sessions',
    }),
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
)

app.use(async (req, res, next) => {
  console.log('Session ID:', req.sessionID)
  console.log('Session data:', req.session)
  console.log('IS VERIFIED?', req.session.id)
  if (req.session.id) {
    console.log('User-Agent:', req.headers['user-agent'])
    console.log('IP Address:', req.ip)
    return next()
  }
  const apiKey = req.headers.authorization?.replace('Bearer ', '')
  if (!apiKey) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const { result, error } = await verifyKey(apiKey)
    if (error || !result.valid) {
      console.error(error)
      return res.status(401).send('Unauthorized')
    }
    req.session.verified = true
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal Server Error')
  }
})

app.use('/create-account', createAccountRouter)

app.listen(PORT)
console.log(`Listening on port ${PORT}...`)

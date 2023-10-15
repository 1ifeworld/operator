import cors from 'cors'
import express from 'express'

const PORT = process.env.PORT ?? 8080

const app = express()

app.use(cors())

// register(app, {
//   imdb,
// });

app.listen(PORT)

console.log(`Listening on port ${PORT}...`)

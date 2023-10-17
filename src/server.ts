import cors from 'cors'
import express from 'express'
import { Unkey } from '@unkey/api'
import { verifyKey } from '@unkey/api'
import { router as createAccountRouter } from '@/services'

const PORT = process.env.PORT ?? 8080

const app = express()
const unkey = new Unkey({ rootKey: `${process.env.UNKEY_ROOT}` });


const corsOptions = {
    origin: 'https://auth-demo-bice.vercel.app/',
  };

app.use(cors(corsOptions))


app.use('/create-account', async (req, res) => {
  const apiKey = req.headers.authorization?.replace("Bearer ", "");
  if (!apiKey) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const { result, error } = await verifyKey(apiKey);

    if (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }

    if (!result.valid) {
      return res.status(401).send("Unauthorized");
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
});

app.listen(PORT)

console.log(`Listening on port ${PORT}...`)

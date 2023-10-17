import cors from 'cors'
import express from 'express'
import { Unkey } from '@unkey/api'
import { verifyKey } from '@unkey/api'
import { router as createAccountRouter } from '@/services'

const PORT = process.env.PORT ?? 8080

const app = express()
const unkey = new Unkey({ rootKey: `${process.env.UNKEY_ROOT}` });


// const corsOptions = {
//     // origin: 'https://auth-demo-bice.vercel.app/',
//     origin: 'http://localhost:3000/',
//   };

app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.log("REQROUTE", req.body)
  const apiKey = req.headers.authorization?.replace("Bearer ", "");
  if (!apiKey) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const { result, error } = await verifyKey(apiKey);
    if (error || !result.valid) {
      console.error(error);
      return res.status(401).send("Unauthorized");
    }
    console.log("RESULT", result);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
});


app.use('/create-account', createAccountRouter);

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);


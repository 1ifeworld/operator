import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'
import { env } from '@/services'


export const riverNetSigner = privateKeyToAccount(env.PRIVATE_KEY as Hash)

export const riverAccountFactoryAbi = [
  {
    inputs: [
      {
        internalType: 'contract IEntryPoint',
        name: '_entryPoint',
        type: 'address',
      },
      { internalType: 'address', name: '_riverNetSigner', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'accountImplementation',
    outputs: [
      { internalType: 'contract RiverAccount', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'initialAdmin', type: 'address' },
      { internalType: 'uint256', name: 'salt', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [
      { internalType: 'contract RiverAccount', name: 'ret', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'initialAdmin', type: 'address' },
      { internalType: 'uint256', name: 'salt', type: 'uint256' },
    ],
    name: 'getAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'riverNetSigner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

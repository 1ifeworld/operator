## River Net

River Net is a transaction engine responsible for executing actions on behalf of River accounts. River accounts are hardcoded to permission River Net for a select set of functions. The engine is capable of building and submitting User Operations (UOs) in addition to non-4337 transactions.

## Getting Started

Clone the repository:

```bash
$ git clone https://github.com/1ifeworld/river-net.git
```

Ensure your pnpm version is up to date, then install dependencies:

```bash
$ pnpm install
```

Refer to the `env.example` to configure your environment variables

- Obtain an `ALCHEMY_KEY` via the [Alchemy dashboard](https://dashboard.alchemy.com)
- Obtain a `PIMLICO_KEY` via the [Pimlico dashboard](https://dashboard.pimlico.io/)
- Provide the `PRIVATE_KEY` for the EOA coupled with River Net. For security reasons, this will not be shared with anyone outside of Lifeworld.

Lastly, run the development server:

```bash
$ pnpm dev
```



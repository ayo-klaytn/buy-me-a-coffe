# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

# Set environment variables

You will need to set environment variables. You can do so by setting them in your `.env` file (install the [dotenv package](https://www.npmjs.com/package/dotenv) and create a .env file it if it's not there). You'll find a sample of what this file will look like in `.env.example`

IMPORTANT: MAKE SURE YOU'D DON'T EXPOSE THE KEYS YOU PUT IN THIS .env FILE. By that, I mean don't push them to a public repo, and please try to keep them keys you use in development not associated with any real funds.

**Set your BAOBAB_URL  environment variable.**

You can get one for free from our list of RPC Provider [here](https://docs.klaytn.foundation/content/dapp/rpc-service/public-en).

**Set your PRIVATE_KEY environment variable.**

This is your private key from your wallet, ie MetaMask. This is needed for deploying contracts to public networks. You can 

**WARNING WARNING WARNING**

> When developing, it's best practice to use a Metamask that isn't associated with any real money. A good way to do this is to make a new browser profile (on Chrome, Brave, Firefox, etc) and install Metamask on that browser, and never send this wallet money.

> Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:

```js
BAOBAB_URL='Paste RPC URL'
PRIVATE_KEY='Paste Private Key'
```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

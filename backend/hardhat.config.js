require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const BAOBAB_URL = process.env.BAOBAB_URL;
const PRIAVTE_KEY = process.env.PRIAVTE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    baobab: {
      url: BAOBAB_URL,
      accounts: [PRIAVTE_KEY],
    }
  }
};

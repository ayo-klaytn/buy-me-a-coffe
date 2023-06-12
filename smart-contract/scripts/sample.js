// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);

    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function getBalances(addresses) {
  let idx = 0;

  for (const address of addresses) {
      console.log(`address ${idx} balances`, await getBalance(address));
      idx++;
  }
}

async function getAllCoffee(memos) {
  for (const memo of memos) {
      const timestamp = memo.timestamp;
      const sender = memo.sender;
      const name = memo.name;
      const message = memo.message
      console.log(`At ${timestamp}, ${name}, with ${sender}, said: "${message}"`);
  }
}


async function main() {

  const [owner, tipper1, tipper2, tipper3 ] = await hre.ethers.getSigners();

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffe = await BuyMeACoffee.deploy();

  await buyMeACoffe.deployed();

  console.log(`BuyMeACoffee Contract Address`, buyMeACoffe.address);

  // (========Check Balance==========)

  const addressses = [owner.address, tipper1.address, buyMeACoffe.address];
  console.log("======GET BALANCE=======");
  await getBalances(addressses);

  // Buy Coffee for owner

  const tip = {value: hre.ethers.utils.parseEther("1")}
  await buyMeACoffe.connect(tipper1).buyCoffee("Alice", "Hi Jude", tip);
  await buyMeACoffe.connect(tipper2).buyCoffee("Bob", "Hi Alice", tip);
  await buyMeACoffe.connect(tipper3).buyCoffee("Japhet", "Hi Ox", tip);

  // check balance after tipping 
  console.log("======GET BALANCE AFTER TIPPING=======");
  await getBalances(addressses);

  // withdraw coffee tips
  await buyMeACoffe.connect(owner).withdrawCoffeTips();

  // check balance after tipping 
  console.log("======GET BALANCE AFTER WITHDRAWING TIP=======");
  await getBalances(addressses);

  // get the current coffee tx id.
  const coffeeId = await buyMeACoffe.coffeeId()
  const id = coffeeId.toString();

  console.log(coffeeId.toString());

  // get all existing coffee tx
  const allCoffee = await buyMeACoffe.getAllCoffee(id);
  
  await getAllCoffee(allCoffee);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

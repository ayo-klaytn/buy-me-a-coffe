// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// contract address of BMC Contract
const buyMeACoffeAddress = "0xaB720954D64F14ADb21311D81F65d5EB006446B6";

// address of the contract deployer
// useful when calling the withdrawCoffeTips() function
// ensure that this address is the SAME address as the original contract deployer
const deployerAddress = "0x1C42aCcd92d491DB8b083Fa953B5E3D9A9E42aD5";


// get the balance of a specified address
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);

    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function main() {
  
  // initialize the deployerAddress to a signer object
  // this will be useful when calling the withdrawCoffeTips() to the owner address
  const signer = await hre.ethers.getSigner(deployerAddress);

  // instantiate the BMC contract
  const BuyMeACoffee = await hre.ethers.getContractAt("BuyMeACoffee", buyMeACoffeAddress, signer);

  const balanceBefore = await getBalance(signer.address);
  const contractBalance = await getBalance(BuyMeACoffee.address);

  console.log(`Owner balance before withdrawing tips: ${balanceBefore} KLAY`);
  console.log(`Contract balance before withdrawing tips:  ${contractBalance} KLAY`);

    // Withdraw funds if there are funds to withdraw.
    if (contractBalance !== "0.0") {
        console.log("withdrawing funds..")
        const withdrawCoffeTxn = await BuyMeACoffee.withdrawCoffeTips();
        await withdrawCoffeTxn.wait();

        // check owner's balance after withdrawing coffee tips
        const balanceAfter = await getBalance(signer.address);
        console.log(`Owner balance after withdrawing tips ${balanceAfter} KLAY`);
      } else {
        console.log("no funds to withdraw!");
      }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

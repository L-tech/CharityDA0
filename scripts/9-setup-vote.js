import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the governance contract.
const voteModule = sdk.getVoteModule(
  "0x56ea9a99d9f8b2691c711950bc796aEcAC45Eee2",
);

// This is the ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x7c8d0def399CA9264c8D6B9c7EE1F8C955e1B836",
);

(async () => {
  try {
    // Give thwe treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab the wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      // The wallet address stored in your env file or Secrets section of Repl
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();

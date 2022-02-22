import sdk from "./1-initialize-sdk.js";

// Get the app module address.
const appModule = sdk.getAppModule(
  "0x0725732d8982C34DD7a2989a789392f693816DaC",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "CharityDAO's Epic Proposals",
      votingTokenAddress: "0x7c8d0def399CA9264c8D6B9c7EE1F8C955e1B836",
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, i set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();

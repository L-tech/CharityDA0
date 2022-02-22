import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x9238DE7c4afF231DA301062c5A89D9bDF430109B",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Benevolence",
        description: "This NFT will give you access to CharityDAO!",
        image: readFileSync("scripts/assets/be.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
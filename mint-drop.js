const { ethers } = require("ethers");
const GEN_ART_ABI = require("./abi.json");

// -----

const MNEMONIC = "...";

const GEN_ART_MEMBERSHIP_ID = 0;
const GEN_ART_GROUP_ID = 8;
const GEN_ART_MINT_FEE = ethers.utils.parseEther("0.15");

// ------

const GEN_ART_CONTRACT_ADDRESS = "0xd8b7cc75e22031a72d7b8393113ef2536e17bde6";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/14c37b56a06349bfa1f98ff6bf98204b"
);

const walletMnemonic = ethers.Wallet.fromMnemonic(MNEMONIC);
const wallet = walletMnemonic.connect(provider);

const genArtContract = new ethers.Contract(GEN_ART_CONTRACT_ADDRESS, GEN_ART_ABI, wallet);

async function mint() {
  const txn = await genArtContract.mint(wallet.address, GEN_ART_GROUP_ID, GEN_ART_MEMBERSHIP_ID, {
    value: GEN_ART_MINT_FEE,
  });
  console.log("transaction", txn.hash);
}

async function main() {
  await mint();
}

main().then(() => process.exit());

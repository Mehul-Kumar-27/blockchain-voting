require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.19",
  compilers: [
    {
      version: "0.8.9",
    },
  ],
  networks:{
    hardhat:{
      chainId:1337
    }
  }
};

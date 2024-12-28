const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Marketplace contract...");

  // Marketplace kontratını deploy et
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(
    "CourseNFT", // NFT adı
    "CNFT",      // NFT sembolü
    {
      gasLimit: 8000000,
      gasPrice: ethers.utils.parseUnits("20", "gwei"),
    }
  );
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);

  console.log("Deploying AccessKey contract...");

  // AccessKey kontratını deploy et
  const AccessKey = await ethers.getContractFactory("AccessKey");
  const accessKey = await AccessKey.deploy({
    gasLimit: 8000000,
    gasPrice: ethers.utils.parseUnits("20", "gwei"),
  });
  await accessKey.deployed();
  console.log("AccessKey deployed to:", accessKey.address);

  console.log("Deploying Certificate contract...");

  // Certificate kontratını deploy et
  const Certificate = await ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy(
    "CourseCertificate", // Sertifika NFT adı
    "CERT"               // NFT sembolü
  );
  await certificate.deployed();
  console.log("Certificate deployed to:", certificate.address);

  console.log("Deployment completed successfully!");
  console.log("Marketplace Address:", marketplace.address);
  console.log("AccessKey Address:", accessKey.address);
  console.log("Certificate Address:", certificate.address);
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});

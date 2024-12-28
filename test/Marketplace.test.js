const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace Contract", function () {
  let marketplace;
  let owner, addr1, addr2;

  beforeEach(async function () {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    [owner, addr1, addr2] = await ethers.getSigners();

    marketplace = await Marketplace.deploy("CourseNFT", "CNFT");
    await marketplace.deployed();
  });

  it("Should create a course and mint NFTs", async function () {
    await marketplace.createCourse("ipfs://example-uri", ethers.utils.parseEther("0.1"), 10);

    const course = await marketplace.getCourseDetails(1);
    expect(course.uri).to.equal("ipfs://example-uri");
    expect(course.price).to.equal(ethers.utils.parseEther("0.1"));
    expect(course.maxSupply).to.equal(10);

    await marketplace.connect(addr1).mintCourse(1, { value: ethers.utils.parseEther("0.1") });

    const ownerOfToken = await marketplace.ownerOf(1);
    expect(ownerOfToken).to.equal(addr1.address);
  });
});

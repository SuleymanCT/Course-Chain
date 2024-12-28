import { ethers } from "ethers";
import MarketplaceABI from "../abis/Marketplace.json";
import AccessKeyABI from "../abis/AccessKey.json";
import { CONTRACT_ADDRESSES } from "../config";
import axios from "axios";
import placeholder from "../metadata/placeholder.json";

// Pinata Gateway ve Yetkilendirme
const PINATA_GATEWAY_URL = "https://brown-given-giraffe-132.mypinata.cloud/ipfs/";
const PINATA_AUTH_HEADER = "Bearer vTrc5zEXAzcJPxq52pTGYYAgx0r-PPHSu36Ovr6X-ll0dsEe8_fYu0WWkK4-fml-";

// Ethereum sağlayıcısı ve imzalayıcı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Marketplace sözleşmesi
export const marketplaceContract = new ethers.Contract(
  CONTRACT_ADDRESSES.marketplace,
  MarketplaceABI.abi,
  signer
);

// AccessKey sözleşmesi
export const accessKeyContract = new ethers.Contract(
  CONTRACT_ADDRESSES.accessKey,
  AccessKeyABI.abi,
  signer
);

// **IPFS URI'yi Pinata Gateway'e dönüştür**
const convertIPFSToGateway = (uri) => {
  if (uri.startsWith("ipfs://")) {
    // Eğer özel gateway çalışmıyorsa public gateway'e geç
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return uri;
};

// **NFT Metadata Fetch Helper**
const fetchMetadata = async (uri) => {
  if (!uri) return placeholder;

  const proxyUri = convertIPFSToGateway(uri);

  try {
    const response = await axios.get(proxyUri, { timeout: 30000 });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch metadata from ${proxyUri}:`, error.message);
    return placeholder;
  }
};

// **Kurs Detaylarını Getir**
export const getCourseDetails = async (courseId) => {
  try {
    const course = await marketplaceContract.getCourseDetails(courseId);
    return {
      uri: course[0],
      price: ethers.utils.formatEther(course[1]),
      maxSupply: course[2].toNumber(),
      minted: course[3].toNumber(),
    };
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw new Error("Failed to fetch course details.");
  }
};

// **Yeni Bir Kurs Oluştur**
export const createCourse = async (uri, price, maxSupply) => {
  if (!uri || !price || !maxSupply) {
    throw new Error("All fields (URI, price, max supply) are required.");
  }

  try {
    const tx = await marketplaceContract.createCourse(
      uri,
      ethers.utils.parseEther(price.toString()),
      maxSupply,
      { gasLimit: 8000000 }
    );
    await tx.wait();
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course.");
  }
};

// **NFT Satın Al (Primary Market)**
export const mintNFT = async (courseId) => {
  try {
    const course = await getCourseDetails(courseId);
    const tx = await marketplaceContract.mintCourse(courseId, {
      value: ethers.utils.parseEther(course.price),
      gasLimit: 800000,
    });
    await tx.wait();
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw new Error("Failed to mint NFT.");
  }
};

// **Sahip Olunan NFT'leri Getir**
export const getOwnedNFTs = async () => {
  try {
    const address = await signer.getAddress();
    const balance = await marketplaceContract.balanceOf(address);

    const nfts = [];
    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await marketplaceContract.tokenOfOwnerByIndex(address, i);
      const uri = await marketplaceContract.tokenURI(tokenId);

      const metadata = await fetchMetadata(uri);
      nfts.push({ tokenId: tokenId.toString(), uri, metadata });
    }

    return nfts;
  } catch (error) {
    console.error("Error fetching owned NFTs:", error);
    throw new Error("Failed to fetch owned NFTs.");
  }
};

// **NFT'yi Satışa Çıkar**
export const listNFTForSale = async (tokenId, price) => {
  if (!tokenId || !price) {
    throw new Error("Token ID and price are required.");
  }

  try {
    const tx = await marketplaceContract.listNFTForSale(
      tokenId,
      ethers.utils.parseEther(price.toString())
    );
    await tx.wait();
  } catch (error) {
    console.error("Error listing NFT for sale:", error);
    throw new Error("Failed to list NFT for sale.");
  }
};

// **NFT Satın Al (İkinci El)**
export const buyNFT = async (tokenId) => {
  try {
    const price = await marketplaceContract.getNFTSalePrice(tokenId);
    const tx = await marketplaceContract.buyNFT(tokenId, {
      value: price,
    });
    await tx.wait();
  } catch (error) {
    console.error("Error buying NFT:", error);
    throw new Error("Failed to buy NFT.");
  }
};

// **Satışa Çıkarılan NFT'leri Getir**
export const getListedNFTs = async () => {
  try {
    const totalTokens = await marketplaceContract.currentTokenId();
    const nfts = [];

    for (let i = 1; i <= totalTokens.toNumber(); i++) {
      const salePrice = await marketplaceContract.getNFTSalePrice(i);

      if (salePrice.toString() !== "0") {
        const owner = await marketplaceContract.getNFTOwner(i);
        const uri = await marketplaceContract.tokenURI(i);
        const metadata = await fetchMetadata(uri);

        nfts.push({
          tokenId: i,
          price: ethers.utils.formatEther(salePrice),
          owner,
          uri,
          metadata,
        });
      }
    }

    return nfts;
  } catch (error) {
    console.error("Error fetching listed NFTs:", error);
    throw new Error("Failed to fetch listed NFTs.");
  }
};

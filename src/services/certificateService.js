import { ethers } from "ethers";
import CertificateABI from "../abis/Certificate.json"; // Sertifika sözleşmesinin ABI'si
import { CONTRACT_ADDRESSES } from "../config";

// Ethereum Sağlayıcısı ve İmzalayıcı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Sertifika Sözleşmesi
const certificateContract = new ethers.Contract(
  CONTRACT_ADDRESSES.certificate,
  CertificateABI.abi, // ABI
  signer
);

// IPFS Gateway dönüşüm fonksiyonu
const convertIPFSToGateway = (uri) => {
  if (uri && uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return uri;
};

// Kullanıcının bir kurs için sertifikaya sahip olup olmadığını kontrol et
export const hasCertificate = async (courseId) => {
  try {
    const userAddress = await signer.getAddress();
    const hasCert = await certificateContract.hasCertificate(userAddress, courseId);
    return hasCert;
  } catch (error) {
    console.error("Error checking certificate ownership:", error.message);
    throw new Error("Failed to check certificate ownership.");
  }
};

// Sertifika Mintleme Fonksiyonu
export const mintCertificate = async (courseId, tokenURI) => {
  try {
    // tokenURI kontrolü
    if (!tokenURI || !tokenURI.startsWith("ipfs://")) {
      throw new Error("Invalid tokenURI. Ensure it starts with 'ipfs://'");
    }

    const userAddress = await signer.getAddress();
    const alreadyHasCertificate = await hasCertificate(courseId);

    if (alreadyHasCertificate) {
      console.warn("You already have a certificate for this course.");
      throw new Error("You already have the certificate for this course.");
    }

    console.log(`Minting certificate for Course ID: ${courseId}...`);

    // Mintleme işlemi
    const tx = await certificateContract.mintCertificate(userAddress, courseId, tokenURI, {
      gasLimit: 800000, // Gas sınırı
    });

    await tx.wait();
    console.log("Certificate NFT successfully minted!");
    return true;
  } catch (error) {
    console.error("Error minting certificate NFT:", error.message);
    throw new Error("Failed to mint certificate NFT. Please try again.");
  }
};

// Kullanıcının Sahip Olduğu Sertifikaları Getirme
export const getUserCertificates = async () => {
  try {
    const userAddress = await signer.getAddress();
    const balance = await certificateContract.balanceOf(userAddress);
    const certificates = [];

    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await certificateContract.tokenOfOwnerByIndex(userAddress, i);
      const tokenURI = await certificateContract.tokenURI(tokenId);

      certificates.push({
        tokenId: tokenId.toString(),
        tokenURI: convertIPFSToGateway(tokenURI),
      });
    }

    console.log("Fetched certificates:", certificates);
    return certificates;
  } catch (error) {
    console.error("Error fetching user certificates:", error.message);
    throw new Error("Failed to fetch certificates.");
  }
};

// Kullanıcının Sertifika Detayını Getirme
export const getCertificateDetails = async (tokenId) => {
  try {
    const tokenURI = await certificateContract.tokenURI(tokenId);
    return convertIPFSToGateway(tokenURI);
  } catch (error) {
    console.error("Error fetching certificate details:", error.message);
    throw new Error("Failed to fetch certificate details.");
  }
};

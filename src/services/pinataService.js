import axios from "axios";

const PINATA_API_KEY = "1b2fe9d67bca18e1d696";
const PINATA_API_SECRET = "a4a3cde51c524fd9e6ce9e037c347e90a10e917b97e9a8b1d1967226be64ac51";

/**
 * Dosyayı Pinata'ya yükler ve IPFS hash'i döner.
 */
export const uploadToPinata = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw new Error("Failed to upload file.");
  }
};

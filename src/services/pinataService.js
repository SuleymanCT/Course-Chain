import axios from "axios";

const PINATA_API_KEY = "**";
const PINATA_API_SECRET = "**";


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

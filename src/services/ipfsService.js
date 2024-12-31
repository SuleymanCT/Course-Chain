import axios from "axios";

// Pinata Gateway
const PINATA_GATEWAY_URL = "https://brown-given-giraffe-132.mypinata.cloud/ipfs/";
const PINATA_AUTH_HEADER = "Bearer vTrc5zEXAzcJPxq52pTGYYAgx0r-PPHSu36Ovr6X-ll0dsEe8_fYu0WWkK4-fml-";

/**
 * IPFS URI'yi Pinata Gateway URL'sine dönüştürür.
 */
export const convertIPFSToGateway = (uri) => {
    if (uri.startsWith("ipfs://")) {
      // Eğer özel gateway çalışmıyorsa public gateway'e geç
      return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return uri;
  };


export const fetchMetadata = async (uri) => {
  const gatewayUri = convertIPFSToGateway(uri);

  try {
    const response = await axios.get(gatewayUri, {
      headers: { Authorization: PINATA_AUTH_HEADER },
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch metadata from ${gatewayUri}:`, error);
    return { name: "Unknown", description: "Error fetching metadata", image: "https://via.placeholder.com/200" };
  }
};

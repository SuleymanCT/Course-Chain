import React, { useEffect, useState } from "react";
import axios from "axios";
import { getOwnedNFTs } from "../services/contractService";
import { mintCertificate } from "../services/certificateService";
import "../styles/pages/AccessPage.css";

const convertIPFSToGateway = (uri) => {
  if (uri?.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return uri;
};

const fetchMetadataWithCache = async (uri) => {
  const cachedMetadata = localStorage.getItem(uri);
  if (cachedMetadata) return JSON.parse(cachedMetadata);

  try {
    const response = await axios.get(convertIPFSToGateway(uri), { timeout: 10000 });
    localStorage.setItem(uri, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch metadata from ${uri}:`, error);
    return {
      name: "Unknown",
      description: "Metadata fetch failed.",
      image: "https://via.placeholder.com/200",
      video: "",
      uri: "",
    };
  }
};

const AccessPage = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoProgress, setVideoProgress] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ownedNFTs = await getOwnedNFTs();

        const nftMetadataPromises = ownedNFTs.map(async (nft) => {
          const metadata = await fetchMetadataWithCache(nft.uri);
          return { ...nft, metadata };
        });

        const nftData = await Promise.all(nftMetadataPromises);
        setNfts(nftData);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVideoProgress = async (tokenId, metadata, currentTime, duration) => {
    if (videoProgress[tokenId]) return;

    if (currentTime >= duration - 5) {
      try {
        console.log(`Minting certificate for token ${tokenId}...`);

        const tokenURI = metadata?.uri || `ipfs://default_metadata_path/${tokenId}.json`;

        if (!tokenURI || tokenURI.trim() === "") {
          console.error("Invalid tokenURI. Cannot mint certificate.");
          alert("TokenURI is invalid. Please check the metadata.");
          return;
        }

        setVideoProgress((prev) => ({ ...prev, [tokenId]: true }));
        await mintCertificate(tokenId, tokenURI);

        alert(`Certificate successfully minted for NFT ${tokenId}!`);
      } catch (error) {
        console.error(`Minting failed for NFT ${tokenId}:`, error.message);
        alert("Failed to mint certificate. Please try again.");
        setVideoProgress((prev) => ({ ...prev, [tokenId]: false }));
      }
    }
  };

  return (
    <div className="access-page">
      <h1 className="page-title">Your Access NFTs</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="nft-container">
          {nfts.length > 0 ? (
            nfts.map((nft, index) => (
              <div key={index} className="nft-card">
                <h3>{nft.metadata?.name || `NFT ${nft.tokenId}`}</h3>
                <img
                  src={convertIPFSToGateway(nft.metadata?.image)}
                  alt={nft.metadata?.name || `NFT ${nft.tokenId}`}
                />
                <p>{nft.metadata?.description || "No description available"}</p>
                {nft.metadata?.video && (
                  <div className="video-container">
                    <video
                      controls
                      onTimeUpdate={(e) =>
                        handleVideoProgress(
                          nft.tokenId,
                          nft.metadata,
                          e.target.currentTime,
                          e.target.duration
                        )
                      }
                    >
                      <source
                        src={convertIPFSToGateway(nft.metadata.video)}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-message">You don't own any access NFTs.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessPage;

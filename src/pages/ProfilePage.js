import React, { useEffect, useState } from "react";
import { getOwnedNFTs } from "../services/contractService";
import "../styles/pages/Profile.css";
import axios from "axios";
import { getUserCertificates } from "../services/certificateService";

const convertIPFSToGateway = (uri) => {
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return uri;
};

const fetchMetadataWithCache = async (uri) => {
  const cachedMetadata = localStorage.getItem(uri);
  if (cachedMetadata) return JSON.parse(cachedMetadata);

  try {
    const response = await axios.get(convertIPFSToGateway(uri), { timeout: 30000 });
    localStorage.setItem(uri, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch metadata: ${uri}`, error);
    return {
      name: "Unknown",
      description: "Metadata fetch failed.",
      image: "https://via.placeholder.com/200",
    };
  }
};

const ProfilePage = () => {
  const [nfts, setNfts] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCertificates, setShowCertificates] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const ownedNFTs = await getOwnedNFTs();
        const nftDetails = await Promise.all(
          ownedNFTs.map(async (nft) => {
            const metadata = await fetchMetadataWithCache(nft.uri);
            return { ...nft, metadata };
          })
        );

        const certificateNFTs = await getUserCertificates();
        const certificateDetails = await Promise.all(
          certificateNFTs.map(async (cert) => {
            const metadata = await fetchMetadataWithCache(cert.tokenURI);
            return { ...cert, metadata };
          })
        );

        setNfts(nftDetails);
        setCertificates(certificateDetails);
      } catch (error) {
        console.error("Error fetching NFTs and certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="profile-page">
      <h1 className="page-title">Your NFTs</h1>
      {loading ? (
        <p className="loading-text">Loading NFTs...</p>
      ) : (
        <div>
          <div className="filter-container">
            <button
              className={`filter-button ${!showCertificates ? "active" : ""}`}
              onClick={() => setShowCertificates(false)}
            >
              Access NFTs
            </button>
            <button
              className={`filter-button ${showCertificates ? "active" : ""}`}
              onClick={() => setShowCertificates(true)}
            >
              Certificates
            </button>
          </div>
          <div className="nft-container">
            {!showCertificates
              ? nfts.map((nft, index) => (
                  <div key={index} className="nft-card">
                    <h3>{nft.metadata?.name || `NFT ${nft.tokenId}`}</h3>
                    <img
                      src={
                        nft.metadata?.image?.startsWith("ipfs://")
                          ? convertIPFSToGateway(nft.metadata.image)
                          : nft.metadata?.image || "https://via.placeholder.com/200"
                      }
                      alt={nft.metadata?.name || `NFT ${nft.tokenId}`}
                    />
                    <p>{nft.metadata?.description || "No description available"}</p>
                  </div>
                ))
              : certificates.map((cert, index) => (
                  <div key={index} className="nft-card">
                    <h3>Certificate: {cert.metadata?.name || `ID ${cert.tokenId}`}</h3>
                    <img
                      src={
                        cert.metadata?.image?.startsWith("ipfs://")
                          ? convertIPFSToGateway(cert.metadata.image)
                          : cert.metadata?.image || "https://via.placeholder.com/200"
                      }
                      alt={`Certificate ${cert.tokenId}`}
                    />
                    <p>{cert.metadata?.description || "No certificate details available."}</p>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

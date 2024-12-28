import React, { useEffect, useState } from "react";
import { listNFTForSale, buyNFT, marketplaceContract } from "../services/contractService";
import "../styles/pages/SecondaryMarketPage.css";
import { ethers } from "ethers";

const SecondaryMarketPage = () => {
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [listedNFTs, setListedNFTs] = useState([]);

  useEffect(() => {
    const fetchListedNFTs = async () => {
      try {
        const totalTokens = await marketplaceContract.currentTokenId();
        const nfts = [];

        for (let i = 1; i <= totalTokens.toNumber(); i++) {
          const salePrice = await marketplaceContract.getNFTSalePrice(i);

          if (!salePrice.isZero()) {
            const owner = await marketplaceContract.getNFTOwner(i);
            nfts.push({
              tokenId: i,
              price: ethers.utils.formatEther(salePrice),
              owner,
            });
          }
        }

        setListedNFTs(nfts);
      } catch (error) {
        console.error("Error fetching listed NFTs:", error);
        alert("Failed to fetch listed NFTs.");
      }
    };

    fetchListedNFTs();
  }, []);

  const handleListForSale = async () => {
    if (!tokenId || !price) {
      alert("Token ID and Price are required.");
      return;
    }

    try {
      await listNFTForSale(parseInt(tokenId), parseFloat(price));
      alert("NFT listed for sale successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error listing NFT for sale:", error);
      alert("Failed to list NFT for sale.");
    }
  };

  const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="secondary-market">
      <h1 className="section-title">Secondary Market</h1>

      <div className="form-section">
        <h3>List NFT for Sale</h3>
        <div className="form-group">
          <input
            type="number"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Price (ETH)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
          <button onClick={handleListForSale} className="primary-button">
            List for Sale
          </button>
        </div>
      </div>

      <div className="listed-nfts-section">
        <h3>Listed NFTs</h3>
        {listedNFTs.length > 0 ? (
          <div className="nft-grid">
            {listedNFTs.map((nft, index) => (
              <div key={index} className="nft-card">
                <p className="nft-id"><strong>Token ID:</strong> {nft.tokenId}</p>
                <p className="nft-price"><strong>Price:</strong> {nft.price} ETH</p>
                <p className="nft-owner">
                  <strong>Owner:</strong> {shortenAddress(nft.owner)}
                </p>
                <button className="buy-button">Buy</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-nfts">No NFTs listed for sale.</p>
        )}
      </div>
    </div>
  );
};

export default SecondaryMarketPage;

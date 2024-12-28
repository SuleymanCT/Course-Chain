import React, { useEffect, useState } from "react";
import { getCourseDetails, mintNFT, marketplaceContract } from "../services/contractService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages/PrimaryMarketPage.css";

// IPFS Gateway dönüşüm fonksiyonu
const convertIPFSToGateway = (uri) => {
    if (uri && uri.startsWith("ipfs://")) {
        return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return uri || "https://via.placeholder.com/200"; // Placeholder görseli
};

// Metadata'yı IPFS'ten çek
const fetchMetadata = async (uri) => {
    try {
        const response = await axios.get(convertIPFSToGateway(uri));
        return response.data; // Başlık ve açıklamayı getirir
    } catch (error) {
        console.error("Failed to fetch metadata:", error);
        return { name: "Unknown NFT", description: "No description available" };
    }
};

const PrimaryMarketPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const totalCourses = await marketplaceContract.currentCourseId();
                const courseIds = Array.from({ length: totalCourses.toNumber() }, (_, i) => i + 1);

                const details = [];
                for (const id of courseIds) {
                    const course = await getCourseDetails(id);
                    if (!course) continue;

                    // Metadata'yı getir
                    const metadata = await fetchMetadata(course.uri);

                    details.push({
                        id,
                        uri: course.uri,
                        price: course.price,
                        maxSupply: course.maxSupply,
                        minted: course.minted,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image,
                    });
                }
                setCourses(details);
            } catch (error) {
                console.error("Error fetching courses:", error);
                alert("Failed to fetch courses. Please try again.");
            }
        };

        fetchCourses();
    }, []);

    const handleBuy = async (courseId) => {
        try {
            await mintNFT(courseId);
            alert(`NFT from Course ID ${courseId} successfully purchased!`);
            navigate("/profile");
        } catch (error) {
            console.error("Error purchasing NFT:", error);
            alert("Failed to purchase NFT. Please try again.");
        }
    };

    return (
      <div className="primary-market">
      <h1 className="page-title">Primary Market</h1>
      <div className="nft-container">
          {courses.map((course, index) => {
              const remainingSupply = course.maxSupply - course.minted;
  
              return (
                  <div className="nft-card" key={index}>
                      <img
                          src={convertIPFSToGateway(course.image)}
                          alt={course.name || `NFT ${course.id}`}
                      />
                      <h3 className="nft-name">{course.name || `NFT ${course.id}`}</h3>
                      <p className="nft-description">
                          {course.description || "No description available"}
                      </p>
                      <p className="nft-price">Price: {course.price} ETH</p>
                      <div className="nft-stats">
                          <span>Max Supply: {course.maxSupply}</span>
                          <span>Minted: {course.minted}</span>
                      </div>
                      {remainingSupply > 0 ? (
                          <button className="buy-button" onClick={() => handleBuy(course.id)}>
                              Buy Now
                          </button>
                      ) : (
                          <div className="sold-out">Sold Out</div>
                      )}
                  </div>
              );
          })}
      </div>
  </div>
  


    );
};

export default PrimaryMarketPage;

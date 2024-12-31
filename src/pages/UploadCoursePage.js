import React, { useState } from "react";
import { createCourse } from "../services/contractService";
import { uploadToPinata } from "../services/pinataService";
import "../styles/pages/UploadCoursePage.css";

const UploadCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uri, setUri] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event, type) => {
    if (type === "image") {
      setImageFile(event.target.files[0]);
    } else if (type === "video") {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleUploadToIPFS = async () => {
    if (!imageFile || !videoFile) {
      alert("Please select both an image and a video file.");
      return;
    }

    try {
      setIsUploading(true);
      const imageIpfsUri = await uploadToPinata(imageFile);
      const videoIpfsUri = await uploadToPinata(videoFile);

      const metadata = {
        name: courseName,
        description,
        image: imageIpfsUri,
        video: videoIpfsUri,
        duration: "3 hours",
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([metadataBlob], "metadata.json");

      const metadataIpfsUri = await uploadToPinata(metadataFile);
      setUri(metadataIpfsUri);

      alert("Course metadata uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload files to IPFS:", error);
      alert("Failed to upload course files.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!uri) {
      alert("Metadata URI not generated. Please upload the course first.");
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Invalid price. Please enter a valid positive number.");
      return;
    }

    if (!maxSupply || isNaN(maxSupply) || parseInt(maxSupply) <= 0) {
      alert("Invalid max supply. Please enter a valid positive integer.");
      return;
    }

    try {
      await createCourse(uri, price, maxSupply);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please check your input and try again.");
    }
  };

  return (
    <div className="upload-course-page">
      <h1>Create a New Course</h1>
      <form
        className="upload-course-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCourse();
        }}
      >
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Course Description</label>
          <textarea
            id="description"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageFile">Upload Course Image</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoFile">Upload Course Video</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            required
          />
        </div>

        <button
          type="button"
          className="upload-button"
          onClick={handleUploadToIPFS}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Course to IPFS"}
        </button>

        {uri && (
          <div className="metadata-uri">
            <strong>Uploaded Metadata URI:</strong>
            <p>{uri}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="price">Price (ETH)</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxSupply">Max Supply</label>
          <input
            type="number"
            id="maxSupply"
            placeholder="Enter max supply"
            value={maxSupply}
            onChange={(e) => setMaxSupply(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default UploadCoursePage;

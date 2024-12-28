import React, { useEffect, useRef, useState } from "react";
import { mintCertificate, hasCertificate } from "../services/certificateService";

const CourseVideo = ({ courseId, tokenURI }) => {
  const videoRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [alreadyMinted, setAlreadyMinted] = useState(false);

  useEffect(() => {
    const checkIfMinted = async () => {
      const minted = await hasCertificate(courseId);
      setAlreadyMinted(minted);
    };
    checkIfMinted();
  }, [courseId]);

  const handleVideoEnd = () => {
    setIsCompleted(true);
  };

  const handleMintCertificate = async () => {
    try {
      await mintCertificate(courseId, tokenURI);
      alert("Certificate successfully minted!");
      setAlreadyMinted(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="100%" controls onEnded={handleVideoEnd}>
        <source src="https://your-course-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isCompleted && !alreadyMinted && (
        <button onClick={handleMintCertificate}>Claim Your Certificate</button>
      )}
      {alreadyMinted && <p>You already own the certificate for this course!</p>}
    </div>
  );
};

export default CourseVideo;

import React from "react";
import "../styles/pages/Homepage.css";
import imageSrc from "../assets/aa.jpeg";
const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to CourseChain</h1>
        <p>Discover, Learn, and Trade Educational NFTs.</p>
        <button className="hero-button">Get Started</button>
      </section>

      {/* Why Us Section */}
      <section className="section why-us">
        <h2>Why Choose CourseChain?</h2>
        <p>Revolutionize the way you access and trade educational content.</p>
        <div className="features-container">
          <div className="feature-card">
            <h3>Innovative</h3>
            <p>Access exclusive educational content via NFTs.</p>
          </div>
          <div className="feature-card">
            <h3>Secure</h3>
            <p>Built on blockchain for transparency and reliability.</p>
          </div>
          <div className="feature-card">
            <h3>Flexible</h3>
            <p>Buy, sell, or transfer course access effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="steps-text">
          <h2>New to CourseChain?</h2>
          <p>Follow these 4 simple steps to start your learning and trading journey with CourseChain.</p>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-icon">1</div>
              <div className="step-text">
                <h3>Create an Account</h3>
                <p>Sign up in minutes and start your journey with CourseChain.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-icon">2</div>
              <div className="step-text">
                <h3>Verify Your Identity</h3>
                <p>Complete the verification process quickly and securely.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-icon">3</div>
              <div className="step-text">
                <h3>Fund Your Account</h3>
                <p>Add ETH or supported crypto to start trading NFTs.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-icon">4</div>
              <div className="step-text">
                <h3>Start Trading</h3>
                <p>Buy, sell, or collect NFTs and start learning today.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="steps-image">
          <img
            src={imageSrc}
            alt="New to CourseChain"
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Start Your Journey with CourseChain Today!</h2>
        <button>Join Now</button>
      </section>
      <div className="testimonials-section">
  <h2>What Our Users Say</h2>
  <div className="testimonials-container">
    <div className="testimonial-card">
      <p>"CourseChain has completely transformed how I learn and trade NFTs. Amazing platform!"</p>
      <h4>- Jane Doe</h4>
    </div>
    <div className="testimonial-card">
      <p>"I was skeptical at first, but the user-friendly design and courses blew my mind. Highly recommend!"</p>
      <h4>- John Smith</h4>
    </div>
    <div className="testimonial-card">
      <p>"Learning has never been this rewarding. The NFT integration is next-level!"</p>
      <h4>- Sarah Johnson</h4>
    </div>
  </div>
</div>

    </div>
    
  );
};

export default Homepage;

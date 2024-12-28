import React from "react";
import "../styles/pages/Homepage.css";

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Bölümü */}
            <section className="hero">
                <h1>Welcome to CourseChain</h1>
                <p>Discover, Trade, and Collect NFTs for Learning</p>
                <button className="hero-button">Get Started</button>
            </section>

            {/* Neden Biz? */}
            <section className="section why-us">
                <h2>Why Choose Us?</h2>
                <p>
                    We provide a secure and transparent NFT marketplace for educational
                    content. Unlock new opportunities for learning and earning.
                </p>
            </section>

            {/* Avantajlar */}
            <section className="section">
                <div className="features-container">
                    <div className="feature-card">
                        <h3>Fast and Secure Transactions</h3>
                        <p>We offer a platform where transactions are fast, secure, and easy to perform.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Rewards and Incentives</h3>
                        <p>Earn rewards for completing courses and sharing educational content.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Decentralized Learning</h3>
                        <p>Access courses from anywhere in the world with no restrictions.</p>
                    </div>
                </div>
            </section>

            {/* Adım Adım Süreç */}
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
                    <img src={require("../assets/moobil.jpeg")} alt="Mobile App Preview" />
                </div>
            </section>

            {/* Call To Action */}
            <section className="cta">
                <h2>Ready to Start Your Learning Journey?</h2>
                <button>Join Now</button>
            </section>
        </div>
    );
};

export default HomePage;

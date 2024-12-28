import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Navbar.css";

const Navbar = ({ connectWallet, walletAddress }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    CourseChain
                </Link>
            </div>
            <div className="navbar-center">
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/primary-market">Marketplace</Link>
                    </li>
                    <li>
                        <Link to="/secondary-market">Secondary Market</Link>
                    </li>
                    <li>
                        <Link to="/upload-course">Upload Course</Link>
                    </li>
                    <li>
                        <Link to="/access">Access Course</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                {walletAddress ? (
                    <button className="connect-wallet-button">
                        Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </button>
                ) : (
                    <button className="connect-wallet-button" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

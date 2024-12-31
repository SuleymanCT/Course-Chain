import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "../styles/components/Navbar.css";

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState(null);

    // Cüzdan bağlama fonksiyonu
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Metamask veya Web3 destekleyen bir cüzdan yükleyin!");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]); // İlk hesabı ayarla
        } catch (error) {
            console.error("Cüzdan bağlama hatası:", error);
        }
    };

    // Sayfa yüklendiğinde mevcut hesabı kontrol et
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (!window.ethereum) {
                console.log("Metamask bulunamadı!");
                return;
            }

            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                }
            } catch (error) {
                console.error("Hesap kontrol hatası:", error);
            }
        };

        checkWalletConnection();

        // Hesap değişikliğini dinle
        window.ethereum?.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
            } else {
                setWalletAddress(null);
            }
        });
    }, []);

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
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
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

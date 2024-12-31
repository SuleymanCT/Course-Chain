import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadCoursePage from "./pages/UploadCoursePage";
import PrimaryMarketPage from "./pages/PrimaryMarketPage";
import SecondaryMarketPage from "./pages/SecondaryMarketPage";
import AccessPage from "./pages/AccessPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
    const [account, setAccount] = useState(null);

    // Metamask Bağlantı
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]); // Bağlanan hesabı kaydet
                console.log("Connected account:", accounts[0]);
            } catch (error) {
                console.error("Failed to connect wallet:", error);
            }
        } else {
            alert("Metamask not detected. Please install Metamask!");
        }
    };

    return (
        <div className="app">
            <Router>
                {/* Navbar - Cüzdan bağlantı durumu ve işlevi gönderiliyor */}
                <Navbar account={account} connectWallet={connectWallet} />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/upload-course" element={<UploadCoursePage />} />
                        <Route path="/primary-market" element={<PrimaryMarketPage />} />
                        <Route path="/secondary-market" element={<SecondaryMarketPage />} />
                        <Route path="/access" element={<AccessPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

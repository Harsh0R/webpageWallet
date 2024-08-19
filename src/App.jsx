import { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { WalletProvider } from './Context/WalletProvider';
import SeedPage from './Pages/SeedPage/SeedPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';

function App() {

  const [secretPhrase, setSecretPhrase] = useState("");

  const handleGenerateWallet = () => {
    if (!secretPhrase) {
      // Generate a random wallet (for demo purposes, use ethers.js or similar)
      console.log("Generating new wallet...");
    } else {
      // Use the provided secret phrase to generate wallet
      console.log("Using secret phrase to generate wallet...");
    }
  };

  return (
    <WalletProvider>
      <div className='container'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/seed' element={<SeedPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </WalletProvider>
  )
}

export default App

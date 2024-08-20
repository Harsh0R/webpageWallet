import Navbar from './Components/Navbar/Navbar'
import { WalletProvider } from './Context/WalletProvider';
import SeedPage from './Pages/SeedPage/SeedPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import { Buffer } from 'buffer';
import './App.css'

// Make Buffer available globally
window.Buffer = Buffer;

function App() {


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

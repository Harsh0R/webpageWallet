import React, { useState, useContext } from 'react';
import { WalletContext } from '../../Context/WalletProvider';
import AddressDisplay from '../AddressDisplay/AddressDisplay';
import Style from './Addresses.module.css';

const Addresses = () => {
    const { getEthAddress, seedPhrase, getSolAddress } = useContext(WalletContext);
    const [generatedAddresses, setGeneratedAddresses] = useState([]); // State to store multiple addresses
    const [ethIndex, setEthIndex] = useState(0); // State to track the derivation index for Ethereum/Polygon
    const [solIndex, setSolIndex] = useState(0); // State to track the derivation index for Solana
    const [availableEthIndexes, setAvailableEthIndexes] = useState([]); // State to track deleted Ethereum/Polygon indexes
    const [availableSolIndexes, setAvailableSolIndexes] = useState([]); // State to track deleted Solana indexes

    const handleEthOrPolyAddress = async () => {
        if (seedPhrase || localStorage.getItem("seedWords")) {
            const seed = seedPhrase || localStorage.getItem("seedWords")
            const index = availableEthIndexes.length > 0 ? availableEthIndexes[0] : ethIndex;
            const address = await getEthAddress(seed, index);
            
            setGeneratedAddresses(prevAddresses => [...prevAddresses, { type: 'Ethereum/Polygon', address, index }]); // Add the new address to the list
            
            if (availableEthIndexes.length > 0) {
                setAvailableEthIndexes(prevIndexes => prevIndexes.slice(1)); // Remove the used index from available indexes
            } else {
                setEthIndex(prevIndex => prevIndex + 1); // Increment the derivation index
            }
        }else{
            alert("Set seed phrase")
        }
    };
    
    const handleSolanaAddress = async () => {
        
        if (seedPhrase || localStorage.getItem('seedWords')) {
            const seed = seedPhrase || localStorage.getItem("seedWords")
            const index = availableSolIndexes.length > 0 ? availableSolIndexes[0] : solIndex;
            const address = await getSolAddress(seed, index);
            setGeneratedAddresses(prevAddresses => [...prevAddresses, { type: 'Solana', address, index }]);


            if (availableSolIndexes.length > 0) {
                setAvailableSolIndexes(prevIndexes => prevIndexes.slice(1)); // Remove the used index from available indexes
            } else {
                setSolIndex(prevIndex => prevIndex + 1); // Increment the derivation index
            }
        }else{
            alert("Set Seed phrase.")
        }
    };

    const handleDeleteAddress = (index) => {
        setGeneratedAddresses(prevAddresses =>
            prevAddresses.filter((_, i) => i !== index) // Remove the address at the specified index
        );

        const deletedAddress = generatedAddresses[index];
        if (deletedAddress.type === 'Ethereum/Polygon') {
            setAvailableEthIndexes(prevIndexes => [...prevIndexes, deletedAddress.index]); // Add the deleted index back to available indexes
        } else if (deletedAddress.type === 'Solana') {
            setAvailableSolIndexes(prevIndexes => [...prevIndexes, deletedAddress.index]); // Add the deleted index back to available indexes
        }
    };

    return (
        <>
            <div className={Style.containerAddress}>
                <h3>Wallets Address</h3>
                <div className={Style.buttoncontainer}>
                    <button onClick={handleSolanaAddress}>Generate Solana Wallet</button>
                    <button onClick={handleEthOrPolyAddress}>Generate Ethereum / Polygon Wallet</button>
                </div>
            </div>
            {generatedAddresses.map((entry, index) => (
                <AddressDisplay
                    key={index}
                    type={entry.type}
                    address={entry.address}
                    onDelete={() => handleDeleteAddress(index)} 
                />
            ))}
        </>
    );
};

export default Addresses;

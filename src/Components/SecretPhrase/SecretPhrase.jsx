import React, { useState, useEffect, useRef, useContext } from 'react';
import { WalletContext } from '../../Context/WalletProvider';
import { useNavigate } from 'react-router-dom';
import Style from './SecretPhrase.module.css';

const SecretPhrase = ({ seeds }) => {
    const [seedPhrase, setSeedPhrase] = useState(Array(12).fill("")); // Initialize with 12 empty strings
    const [showInputs, setShowInputs] = useState(false); // State to control input visibility
    const dropdownRef = useRef(null);
    const { getEthAddress, setSeedPhrases } = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (seeds) {
            setSeedPhrase(seeds.split(' '));
        }
    }, [seeds]);

    const handleNext = () => {
        const combined = seedPhrase.join(' ');
        localStorage.setItem("seedWords", combined);
        console.log("Seed Phrases ===>>> ", combined);
        
        setSeedPhrases(combined);
        navigate('/');
    };

    const handleInputChange = (index, value) => {
        let words = value.trim().split(' ');
        
        if (words.length > 1) {
            // Distribute the words across the input boxes starting from the current index
            const newSeedPhrase = [...seedPhrase];
            words.forEach((word, i) => {
                if (index + i < 12) {
                    newSeedPhrase[index + i] = word;
                }
            });
            setSeedPhrase(newSeedPhrase);
            
            // Move focus to the appropriate input box after paste
            if (index + words.length - 1 < 12) {
                document.getElementById(`input-${index + words.length - 1}`).focus();
            }
        } else {
            // Handle normal single-word input
            const newSeedPhrase = [...seedPhrase];
            newSeedPhrase[index] = value.trim();
            setSeedPhrase(newSeedPhrase);
            
            // Move focus to the next input only if space key was pressed
            if (value.endsWith(' ') && index < 11) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleCopy = () => {
        const phrase = seedPhrase.join(" ");
        navigator.clipboard.writeText(phrase);
        alert("Seed phrase copied to clipboard!");
    };

    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.style.height = showInputs ? `${dropdownRef.current.scrollHeight}px` : '0px';
            dropdownRef.current.style.opacity = showInputs ? '1' : '0';
        }
    }, [showInputs]);

    return (
        <div className={Style.secretphrasecontainer}>
            {seeds ? (
                <div>
                    <h1>Your Seed Phrase</h1>
                    <div>
                        <p>Please save this seed phrase securely:</p>
                        <div className={Style.seedphrasegrid}>
                            {seeds.split(' ').map((word, index) => (
                                <span key={index} className={Style.seedword}>{word}</span>
                            ))}
                        </div>
                        <button onClick={handleCopy} className={Style.copybutton}>Copy Seed Phrase</button>
                    </div>
                    <button onClick={handleNext} className={Style.copybutton}>Next</button>
                </div>
            ) : (
                <div>
                    <p>No seed phrase provided. Please enter your existing seed phrase.</p>
                    <button onClick={() => setShowInputs(!showInputs)} className={Style.showinputsbutton}>
                        Enter Your Secret Phrase
                    </button>
                    <div ref={dropdownRef} className={`${Style.dropdowncontainer} ${showInputs ? 'open' : ''}`}>
                        <div className={Style.phrasegrid}>
                            {seedPhrase.map((word, index) => (
                                <input
                                    id={`input-${index}`}
                                    key={index}
                                    className={Style.wordbox}
                                    type="text"
                                    value={word}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    placeholder={`Word ${index + 1}`}
                                />
                            ))}
                        </div>
                        <div>
                            <button onClick={handleCopy} className={Style.copybutton}>Copy Seed Phrase</button>
                        </div>
                        <button onClick={handleNext} className={Style.copybutton}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecretPhrase;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../Context/WalletProvider';
import Addresses from '../../Components/Addresses/Addresses';
import Style from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();
    const { generateNewSeed, seedPhrase, clearSeedPhrase } = useContext(WalletContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSeedVisible, setIsSeedVisible] = useState(false); // State to toggle visibility
    const [seeds, setSeeds] = useState([]);
    // console.log("seed in Home ==> ", seedPhrase);

    useEffect(() => {
        if (seedPhrase || localStorage.getItem("seedWords")) {
            const seedArr = localStorage.getItem("seedWords").split(' ');

            setSeeds(seedArr);
        }
    }, [seedPhrase]);

    const handleClear = () => {
        clearSeedPhrase();
        setSeeds([]);
    };

    const handleSeedPage = async (generateNew) => {
        if (generateNew) {
            const newSeedPhrase = await generateNewSeed();
            navigate('/seed', { state: { seedPhrase: newSeedPhrase } });
        } else {
            navigate('/seed');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(seedPhrase);
        alert("Seed phrase copied to clipboard!");
    };

    return (
        <div className={Style.secretphrasecontainer}>
            {seeds && seeds.length > 0 ? (
                <div className={Style.dropdownwrapper}>
                    <div
                        className={Style.dropdownheader}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <p className={Style.dropdowntitle}>Current Seed Phrase</p>
                        <span className={`${Style.dropdownarrow} ${isDropdownOpen ? 'open' : ''}`}>
                            &#9662;
                        </span>
                    </div>
                    {isDropdownOpen && (
                        <div className={Style.dropdowncontent}>
                            {seeds.map((word, index) => (
                                <div
                                    key={index}
                                    className={Style.dropdownitem}
                                    style={{ '--delay': `${index * 0.1}s` }}
                                >
                                    {index + 1}. {isSeedVisible ? word : '••••'}
                                </div>
                            ))}
                            <div className={Style.allbuttons} >
                                <button onClick={() => setIsSeedVisible(!isSeedVisible)} className={Style.toggleVisibilityButton}>
                                    {isSeedVisible ? 'Hide Seed Phrase' : 'Show Seed Phrase'}
                                </button>
                                <button onClick={handleCopy} className={Style.copybutton}>
                                    Copy Seed Phrase
                                </button>

                                <button onClick={handleClear} className={Style.clearbutton}>
                                    Clear Seed Phrase
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={Style.buttoncontainer}>
                    <button onClick={() => handleSeedPage(false)} className={Style.btns1}>
                        Enter Your Secret Phrase
                    </button>
                    <button onClick={() => handleSeedPage(true)} className={Style.btns1}>
                        Generate New Secret Phrase
                    </button>
                </div>
            )}
            {
                seeds && (
                    <div className={Style.addressContainer}>
                        <Addresses />
                    </div>
                )
            }
        </div>
    );
};

export default Home;

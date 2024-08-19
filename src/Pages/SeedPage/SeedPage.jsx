import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
 
import SecretPhrase from '../../Components/SecretPhrase/SecretPhrase';
import Style from "./SeedPage.module.css";
import {  backButton1 } from '../../assets/imgs';

const SeedPage = () => {
    const nav = useNavigate();
    const location = useLocation();

    const handleBackButton = () => {
        nav('/');
    }

    const seedPhrase = location.state?.seedPhrase || '';

    return (
        <div className={Style.containerseed}>
            <div className={Style.headercontainer}>
                <img
                    className={Style.imgclass}
                    onClick={handleBackButton}
                    src={backButton1}
                    alt="Back"
                />
                {/* <h1>WEBPAGE WALLET</h1> */}
            </div>
            <div>
                {seedPhrase ? (<SecretPhrase seeds={seedPhrase} />) : (<SecretPhrase />)}
            </div>
        </div>
    );
}

export default SeedPage;

import { createContext, useEffect, useState } from 'react';
import { HDNode } from '@ethersproject/hdnode';
import { wordlists } from '@ethersproject/wordlists';
import { ethers } from "ethers"
import * as bip39 from 'bip39';
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const [seedPhrase, setSeedPhrases] = useState()
    const [ETHaddresses, setETHaddresses] = useState([])
    const [SOLaddresses, setSOLaddresses] = useState([])




    useEffect(() => {
        // localStorage.removeItem('seedWords');
        const seedWords = localStorage.getItem("seedWords");

        console.log("see => ", seedWords);
        console.log("seePh => ", seedPhrase);

        setSeedPhrases(seedPhrase)
        console.log("Words ==> ", seedWords);
    }, [setSeedPhrases, seedPhrase])




    const clearSeedPhrase = () => {
        localStorage.removeItem('seedWords');
        setSeedPhrases('');
    };

    const generateNewSeed = async () => {
        console.log("called.......");

        const entropy = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes = 128 bits
        const entropyHex = Array.from(entropy).map(byte => byte.toString(16).padStart(2, '0')).join('');
        const mnemonic = bip39.entropyToMnemonic(entropyHex);

        console.log("mnv ==> ", mnemonic);
        localStorage.setItem("seedWords", mnemonic);
        return mnemonic;
    }


    // const getEthAddress = async (mnemonicStr) => {
    //     try {
    //         console.log("Mnemo => ", mnemonicStr);

    //         // const mnemonic = mnemonicStr.join(' ');
    //         // setSeedPhrases(mnemonic)

    //         const node = HDNode.fromMnemonic(mnemonicStr, null, wordlists.en);

    //         for (let i = 0; i < 4; i++) { 
    //             const path = `m/44'/60'/0'/0/${i}`;
    //             const wallet = node.derivePath(path);
    //             const privateKey = wallet.privateKey.toString("hex");
    //             const publicKey = wallet.publicKey.toString("hex");
    //             const address = ethers.utils.computeAddress(publicKey);
    //             console.log("Address HEX:", address);
    //         }
    //     } catch (error) {
    //         console.error("Error in getEthAddress:", error);
    //     }
    // };


    const getEthAddress = async (mnemonicStr, index = 0) => {
        try {
            if (mnemonicStr) {

                console.log("Mnemo => ", mnemonicStr);
                const node = HDNode.fromMnemonic(mnemonicStr, null, wordlists.en);

                const path = `m/44'/60'/0'/0/${index}`;
                const wallet = node.derivePath(path);
                // const privateKey = wallet.privateKey.toString("hex");
                const publicKey = wallet.publicKey.toString("hex");
                const address = ethers.utils.computeAddress(publicKey);

                console.log("Address HEX:", address);
                return address;
            }
        } catch (error) {
            console.error("Error in getEthAddress:", error);
        }
    };

    const getSolAddress = async (mnemonicStr, index = 0) => {
        try {
            console.log("Mnemo => ", mnemonicStr);
            if (mnemonicStr) {
                // const seed = bip39.mnemonicToSeedSync(mnemonicStr);
                const seed = HDNode.fromMnemonic(mnemonicStr, null, wordlists.en);


                // const keypair = Keypair.fromSecretKey(
                //     Buffer.from(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
                //   );

                //   const privateKey = Buffer.from(keypair.secretKey).toString("hex");
                //   const publicKey = keypair.publicKey.toBase58();


                const path = `m/44'/501'/${index}'/0'`;
                const derivedSeed = derivePath(path, seed.toString("hex")).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const address = Keypair.fromSecretKey(secret).publicKey.toBase58();
                console.log("Generated Address:", address);
                return address;
            }
        } catch (error) {
            console.error("Error in getEthAddress:", error);
            return null;
        }
    };





    return (
        <WalletContext.Provider value={{ getEthAddress, generateNewSeed, setSeedPhrases, getSolAddress, clearSeedPhrase, SOLaddresses, ETHaddresses, seedPhrase }}>
            {children}
        </WalletContext.Provider>
    );
};

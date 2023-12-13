import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
}


export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [isLoading, setIsLoading] = useState(false)
const [transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'))



    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const checkIfWalletIsConected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            }
            else {
                console.log("No accouts found")
            }
        } catch (error) {
            console.log(error)
            throw new Error("No ETH object.")
        }

    };

    const connectWallet = async () => {
        try {
            console.log("Trying to connect wallet...");

            if (!ethereum) {
                console.error("Metamask not found.");
                alert("Please install Metamask");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                console.log("Wallet connected successfully. Current account:", accounts[0]);
            } else {
                console.warn("No accounts found.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            throw new Error("Error connecting wallet.");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask.')
            //get data from the form

            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.parseEther(amount)
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',//21000GWEI
                    value: parsedAmount.toString(16),
                }]
            })
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const transactionCount = await transactionsContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber)


        } catch (error) {
            console.log(error)
            throw new Error("No ETH object.")
        }
    }
    useEffect(() => {
        checkIfWalletIsConected();
    }, []);
    return (<TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
        {children}
    </TransactionContext.Provider>
    );
}
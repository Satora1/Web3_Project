import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionsContract;
    };


export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
const[transaction,setTransaction]=useState([])


    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };


    const getaAllTransactions = async () => {
        try {
            if (!ethereum) return alert("install metamask");
         
            const transactionsContract = createEthereumContract();
            const avilableTransactions = await transactionsContract.getAllTransactions();
            const structuredTransaction=avilableTransactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
          setTransaction(structuredTransaction)
             console.log('hi')
        }
        catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
       
            if (accounts.length) {
       
                setCurrentAccount(accounts[0]);
                getaAllTransactions();
            }
            else {
                console.log("No accouts found")
            }
        } catch (error) {
            console.log(error)
        }

    };
    const checkIfTransactionExist = async () => {
        try {
            if (window.ethereum) { // Sprawdzamy, czy ethereum istnieje w obiekcie window
                const transactionsContract = createEthereumContract();
                const transactionCount =  await transactionsContract.getTransactionCount();
                window.localStorage.setItem("transactionCount", transactionCount)
            } else {
                throw new Error("No ETH object.");
            }
        } catch (error) {
            console.log(error);
            // Przerzucamy błąd, aby móc go obsłużyć w miejscu, gdzie funkcja jest wywoływana
            throw error; 
        }
    };
    


    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    const sendTransaction = async () => { try { if (!ethereum) return alert('Please install MetaMask.')
            //get data from the form

            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = createEthereumContract();
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
            setTransactionCount(transactionCount.toNumber())
window.reload()

        } catch (error) {
            console.log(error)
            throw new Error("No ETH object.")
        }
    }
    useEffect(() => {
        checkIfWalletIsConected();
        checkIfTransactionExist();
    }, [transactionCount]);
    return (<TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction,transaction,isLoading }}>
        {children}
    </TransactionContext.Provider>
    );
}
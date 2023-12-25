import React, { useEffect, useState } from 'react';
import eth from "../../images/ethereum.png";
import fetchDataEth from '../hoks/fetchDataEth';
import fetchDataBtc from '../hoks/fetchDataBtc';
import fetchDataBnb from '../hoks/fetchDataBnb';
import btc from "../../images/BTC.png";
import bnb from "../../images/BNB.png";

const Market = () => {
    const [ethPrice, setEthPrice] = useState(null);
    const [btcPrice, setBtcPrice] = useState(null);
    const [bnbPrice, setBnbPrice] = useState(null);
    const [cryptoType, setCryptoType] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');

    const InputC = ({ placeholder, name, type, value, handleChange }) => {
        return (
            <input
                placeholder={placeholder}
                name={name}
                type={type}
                step="0.0001"
                value={value}
                onChange={(e) => handleChange(e)}
            />
        );
    }

    const InputP = ({ placeholder, name, type, value }) => {
        const calculatePrice = () => {
            if (cryptoType === 'ETH') {
                return ethPrice * amount;
            } else if (cryptoType === 'BTC') {
                return btcPrice * amount;
            } else if (cryptoType === 'BNB') {
                return bnbPrice * amount;
            } else {
                return '';
            }
        };

        return (
            <input
                placeholder={placeholder}
                name={name}
                type={type}
                value={calculatePrice()}
                readOnly
            />
        );
    }

    useEffect(() => {
        const fetchDataFromETH = async () => {
            try {
                const responseETH = await fetchDataEth();
                setEthPrice(responseETH?.market_data?.current_price?.usd);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromETH();
    }, []);

    useEffect(() => {
        const fetchDataFromBTC = async () => {
            try {
                const responseBTC = await fetchDataBtc();
                setBtcPrice(responseBTC?.market_data?.current_price?.usd);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromBTC();
    }, []);

    useEffect(() => {
        const fetchDataFromBNB = async () => {
            try {
                const responseBNB = await fetchDataBnb();
                setBnbPrice(responseBNB?.market_data?.current_price?.usd);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromBNB();
    }, []);

    const handleAmountChange = (event) => {
        const newAmount = event.target.value;
        setAmount(newAmount);

        // Calculate and update price
        const calculatedPrice = cryptoType === 'ETH' ? ethPrice * newAmount :
            cryptoType === 'BTC' ? btcPrice * newAmount :
            cryptoType === 'BNB' ? bnbPrice * newAmount :
            '';
        setPrice(calculatedPrice);
    };

    const handleCryptoChange = (event) => {
        setCryptoType(event.target.value);

        // Reset input values on crypto change
        setAmount('');
        setPrice('');
    };

    return (
        <div className="flex items-center text-center justify-center w-full">
        <div className="flex flex-col justify-between p-4 md:p-20 py-12">
        <div className="flex flex-col items-center p-4 md:p-20 py-12">        
            <h1 className="text-4xl sm:text-5xl text-white py-2 font-semibold">
                Market
            </h1>
            <div className='items-center justify-center'>
    <h1 className='text-white text-center'>Select crypto and calculate value of coins</h1>
    <select id="mySelect" onChange={handleCryptoChange} value={cryptoType} className="my-2">
        <option value="ETH">ETH</option>
        <option value="BTC">BTC</option>
        <option value="BNB">BNB</option>
    </select>
    <InputC
        placeholder="Amount"
        name="amount"
        type="number"
        value={amount}
        handleChange={handleAmountChange}
        className="my-2"
    />
    <InputP
        placeholder="Price"
        name="price"
        type="number"
        value={price}
        className="my-2"
    />
</div>

                </div>
                <div className="flex flex-col md:flex-row  justify-start items-center mt-4">

                    <div
                        className="flex flex-row  justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl"
                        onClick={() => window.open('https://www.coingecko.com/en/coins/ethereum', '_blank')}
                    >
                        <div className="w-35 h-35 rounded-full flex justify-center items-center overflow-hidden">
                            <img src={eth} alt="ETH icon" className="w-40 h-40 object-cover" />
                        </div>
                        <div className="ml-5 flex flex-col flex-1">
                            <h1 className="mt-2 text-white text-lg">{ethPrice ? `$${ethPrice}` : 'Loading...'}</h1>
                        </div>
                    </div>

                    <div
                        className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl"
                        onClick={() => window.open('https://www.coingecko.com/en/coins/bitcoin', '_blank')}
                    >
                        <div className="w-40 h-40 rounded-full flex justify-center items-center overflow-hidden">
                            <img src={btc} alt="BTC icon" className="w-40 h-40 object-cover" />
                        </div>
                        <div className="ml-5 flex flex-col flex-1">
                            <h1 className="mt-2 text-white text-lg">{btcPrice ? `$${btcPrice}` : 'Loading...'}</h1>
                        </div>
                    </div>

                    <div
                        className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl"
                        onClick={() => window.open('https://www.coingecko.com/en/coins/binancecoin', '_blank')}
                    >
                        <div className="w-40 h-40 rounded-full flex justify-center items-center overflow-hidden">
                            <img src={bnb} alt="BNB icon" className="w-40 h-40 object-cover" />
                        </div>
                        <div className="ml-5 flex flex-col flex-1">
                            <h1 className="mt-2 text-white text-lg">{bnbPrice ? `$${bnbPrice}` : 'Loading...'}</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Market;

import React, { useEffect, useState } from 'react';
import eth from "../../images/ethereum.png";
import fetchDataEth from '../hoks/fetchDataEth';
import fetchDataBtc from '../hoks/fetchDataBtc';
import btc from "../../images/BTC.png"
const Market = () => {
    const [ethPrice, setEthPrice] = useState(null);
    const [btcPrice, setBtcPrice] = useState(null);

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

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col justify-between items-start p-4 md:p-20 py-12">
                <div className="flex flex-1 flex-col mr-4 items-center">
                    <h1 className="text-4xl sm:text-5xl text-white py-2 font-semibold">
                        Market
                    </h1>
                    <p className="text-lg text-center text-gray-300">
                        Explore the crypto world in the market.
                    </p>
                  

                    <div className="flex   justify-start items-center">

                    <div
    className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl"
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

          </div>
          
                </div>
            </div>
        </div>
    );
};

export default Market;

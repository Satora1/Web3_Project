// fetchData.js

const fetchDataEth = async () => {
    try {
      const responseETH = await fetch('https://api.coingecko.com/api/v3/coins/ethereum');
      if (!responseETH.ok) {
        throw new Error('Network responseETH was not ok');
      }
  
      const dataETH = await responseETH.json();
      return dataETH;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export default fetchDataEth;
  
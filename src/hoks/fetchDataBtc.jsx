

const fetchDataBtc = async () => {
    try {
      const responseBTC =await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
     
      if (!responseBTC.ok) {
        throw new Error('Network responseETH was not ok');
      }
    
      const dataBTC=await responseBTC.json();
      return dataBTC;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export default fetchDataBtc;
  
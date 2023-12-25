

const fetchDataBnb = async () => {
    try {
      const responseBNB =await fetch("https://api.coingecko.com/api/v3/coins/binancecoin");
     
      if (!responseBNB.ok) {
        throw new Error('Network responseETH was not ok');
      }
    
      const dataBNB=await responseBNB.json();
      return dataBNB;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export default fetchDataBnb;
  
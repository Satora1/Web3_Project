

const fetchDataGfal = async () => {
    try {
      const responseGFAL =await fetch("https://api.coingecko.com/api/v3/coins/games-for-a-living");
     
      if (!responseGFAL.ok) {
        throw new Error('Network responseETH was not ok');
      }
    
      const dataGFAL=await responseGFAL.json();
      return dataGFAL;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export default fetchDataGfal;
  
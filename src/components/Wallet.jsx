import Met from "../../images/Metamask.png";
const Wallet = () => (
    <div id="Wallet" className="text-4xl sm:text-5xl text-white py-2 font-semibold text-center">
 <h1>Wallet</h1>
 <div className="text-2xl sm:text-3xl">
     click to see more

 </div>
 <div className="w-35 h-35 rounded-full flex justify-center items-center overflow-hidden cursor-pointer "
  onClick={() => window.open('https://metamask.io/', '_blank')}>
                            <img src={Met} alt="Met icon" className="w-40 h-40 object-cover" />
                        </div>
    </div>
  );
  
  export default Wallet;
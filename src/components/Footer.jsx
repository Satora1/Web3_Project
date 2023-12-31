import logo from "../../images/logo.png"
import git from "../../images/Git.png"
const Footer = () => {

  const scrollToMarket = () => {
    const element = document.getElementById("Market");
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  const scrollToWallet = () => {
    const element = document.getElementById("Wallet");
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  const scrollToTutorials = () => {
    const element = document.getElementById("Tutorials");

    element.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer " onClick={scrollToMarket}>Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer" onClick={scrollToTutorials}>Tutorials</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer" onClick={scrollToWallet}>Wallets</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <a href="https://github.com/Satora1" target="_blank" rel="noopener noreferrer" className="text-white text-sm text-center">
          <img src={git} alt="GitHub icon" className="w-4 h-4 inline-block mr-1" />
          Support us on GitHub
        </a>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">@Satora2023</p>
        <p className="text-white text-left text-xs">All rights reserved</p>
      </div>
    </div>
  )
}
export default Footer;
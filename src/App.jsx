import { Navbar,Welcome,Services,Transactions,Loader,Footer, Market,Tutorials,Wallet } from './components'
//import {BrowserRouter,Routes,Route} from "react-router-dom"

const App = () => {
  return (
   <div className='min-h-screen'>
<div className='gradient-bg-welcome '>
  <Navbar/>
  <Welcome/>
<Market/>
<Tutorials/>
<div className="my-20"></div>
<Wallet/>

</div>

<Services/>
<Transactions/>

<Footer/>
   </div>

  )
}


export default App;
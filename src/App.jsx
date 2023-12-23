import { Navbar,Welcome,Services,Transactions,Loader,Footer, Market } from './components'


const App = () => {
  return (
   <div className='min-h-screen'>
<div className='gradient-bg-welcome'>
  <Navbar/>
  <Welcome/>
<Market/>
</div>
<Services/>
<Transactions/>

<Footer/>
   </div>

  )
}


export default App;
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Result from "./pages/Result.jsx"
import BuyCredit from "./pages/BuyCredit.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/result" element={<Result/>}></Route>
        <Route path="/buy" element={<BuyCredit/>}></Route>
      </Routes>
      <Footer/>
    </div>
    // ..
  )
}

export default App
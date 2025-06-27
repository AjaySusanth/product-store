import { Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  )
}
export default App
import { Route, Routes, useNavigate } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Details from "./pages/Details"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import About from "./pages/About"
import Home from "./pages/Home"
import Orders from "./pages/Orders"
import Checkout from "./pages/Checkout"
import Leyout from "./leyout"
import { createContext, useEffect, useState } from "react"


export const ThemeContxt = createContext(null)


function App() {
  
  const [theme , setTheme] = useState('light')

  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
    }
  }, [])

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme])


  function ProtectedRoute({ children, isAuthentication, redirectTo }) {
    if (!isAuthentication) {
      navigate(redirectTo)
    }
    return children
  }
  return (
    <ThemeContxt.Provider value={{theme, setTheme}}>
      <Routes>
        <Route path="/" element={<Leyout><Home></Home></Leyout>}></Route>
        <Route path="/about" element={<Leyout><About></About></Leyout>}></Route>
        <Route path="/products" element={<Leyout><Products></Products></Leyout>}></Route>
        <Route path="/cart" element={<Leyout><Cart></Cart></Leyout>}></Route>
        <Route path="/product/:id" element={<Details></Details>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>


        <Route path="checkout" element={<ProtectedRoute isAuthentication={true}>
          <Leyout><Checkout></Checkout></Leyout>
        </ProtectedRoute>}></Route>

        <Route path="orders" element={<ProtectedRoute isAuthentication={true}>
          <Leyout><Orders></Orders></Leyout>
        </ProtectedRoute>}></Route>


        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </ThemeContxt.Provider>
  )
}

export default App

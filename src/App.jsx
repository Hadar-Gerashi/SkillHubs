import { Routes, Route } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";

import './App.css'
import CoursesList from './pages/CoursesList'
import { Provider } from "../src/components/ui/provider"
import Cart from './pages/Cart'
import CourseDetails from './pages/CourseDetails'
import { SignUp } from './pages/SignUp'
import Login from './pages/Login'
import NavBar from './component/NavBar'
import AddCourse from './pages/AddCourseForm'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import HomePage from './pages/HomePage.jsx'
import Footer from './component/Footer'
import ScrollToTop from './component/ScrollToTop'


function App() {

  // const stripePromise = loadStripe("pk_test_51QzFsb4SREYpQGgTFYbNdzItzEYcbYkkUqgJsd98a2vnvjpvTW4gU6m3f374ePldLZO1kAA7E7vu0pXBLQbVwQiE001oxluMXN")
  return (

    <>
      <Provider>

        <NavBar />
        <ScrollToTop /> 

        <Routes>
          <Route path="/" element={<CoursesList type={'list'} />} >
            <Route path="details/:id" element={<CourseDetails />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/add" element={<AddCourse key="Add" />} />
          <Route path="/edit/:id" element={<AddCourse key="Edit" />} />
          <Route path="/myOrders" element={<MyOrders status={"One"} key="One" />} />
          <Route path="/orders" element={<MyOrders status={"All"} key="All" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  )
}

export default App






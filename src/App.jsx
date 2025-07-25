import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import TrendingGames from "./components/TrendingGames/TrendingGames.jsx";
import RecommendedArticles from "./components/RecommendedArticles/RecommendedArticles.jsx";
import WhatsNew from "./components/WhatsNew/WhatsNew.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginForm from "./components/Auth/Login.jsx";
import SignupForm from "./components/Auth/Signup.jsx";


const App = () => {

  return (
    <>
      <Hero />
      <TrendingGames />
      <RecommendedArticles />
      <WhatsNew />
    </>
  )
}

export default App

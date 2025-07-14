import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginForm from "./components/Auth/Login.jsx";
import SignupForm from "./components/Auth/Signup.jsx";
import Layout from './Layout/Layout.jsx'
import App from './App.jsx'
import AllTrendingGames from './components/AllTrendingGames/AllTrendingGames.jsx'
import NewGames from './components/NewGames/NewGames.jsx'
import GameDetails from './components/GameDetails/GameDetails.jsx'
import SearchResults from './components/SearchBar/SearchBar.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route index element={<App/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/trending-games' element={<AllTrendingGames/>}/>
      <Route path='/new-games' element={<NewGames/>}/>
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/search" element={<SearchResults />} />
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

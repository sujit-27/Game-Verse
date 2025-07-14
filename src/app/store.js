import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/themeSlice'
import gamesReducer from '../features/gameSlice'
import articleReducer from '../features/articlesSlice'
import newGamesReducer from '../features/WhatsnewSlice'
import authReducer from '../features/authSlice'
import allGamesReducer from '../features/allgamesSlice'
import allNewGamesReducer from '../features/allnewgamesSlice'
import  gameDetailsReducer from '../features/gameDetailsSlice'

export const store = configureStore({
    reducer: {
        theme : themeReducer,
        games: gamesReducer,
        articles: articleReducer,
        newGames: newGamesReducer,
        auth: authReducer,
        allGames: allGamesReducer,
        allNewGames: allNewGamesReducer,
        gameDetails: gameDetailsReducer,
    },
})
import React from "react"
import reactDom from "react-dom"
import { createStore, combineReducers } from 'redux'
import { composeWithDevtools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})


const store = createStore(reducer)





export default store
import { createStore, compose, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'
import rootLogics from './redux/logics/index.js'
import rootReducer from './redux/reducers/index.js'

const dependencies = {
  api: 'http://localhost:4000'
}

const middleWare = applyMiddleware(
  createLogicMiddleware(rootLogics, dependencies)
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    middleWare
  )
)

ReactDOM.render(
  <Provider store={ store }>

    <App />

  </Provider>
  , document.getElementById('root'))

import { portfel } from '../reducers/portfel';
import { menu } from '../reducers/main';
import { tabs } from '../reducers/tabs';
import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { localStorageMiddleware, promiseMiddleware } from './middleware';

export const rootReducer = combineReducers({
  menu,
  portfel,
  tabs,
  router: routerReducer
})

export type AppState = typeof rootReducer extends Reducer<infer R> ? R : never

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}

export const getStore = () => {
  const middlewares = [thunk, localStorageMiddleware, promiseMiddleware];

  const store = createStore(rootReducer, composeWithDevTools({
    name: 'Sygnity Forecast'
  })(
    applyMiddleware(...middlewares)
  ))

  return store;
}
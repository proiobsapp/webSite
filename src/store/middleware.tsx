import { Token } from './api';
import * as actionTypes from '../constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: actionTypes.ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: actionTypes.ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: actionTypes.ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  } else if (action.type === actionTypes.DAJ_PORTFEL){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  } else if (action.type === actionTypes.DAJ_LISTE_OBIEKTOW_PORTFELA){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  } else if (action.type === actionTypes.DAJ_LISTE_ELEMENTOW_PORTFELA){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  } else if (action.type === actionTypes.WCZYTAJ_PORTFEL){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  } else if (action.type === actionTypes.WCZYTAJ_LISTE_OBIEKTOW_PORTFELA){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  } else if (action.type === actionTypes.WCZYTAJ_LISTE_ELEMENTOW_PORTFELA){
    const currentView = store.getState();
    if(currentView.portfel.data === undefined){ 
      const bb = '';
    }
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === actionTypes.REGISTER || action.type === actionTypes.LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      Token.setToken(action.payload.user.token);
    }
  } else if (action.type === actionTypes.LOGOUT) {
    window.localStorage.setItem('jwt', '');
    Token.setToken('');
  } 

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }

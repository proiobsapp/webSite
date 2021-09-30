import './App.css';
import { Provider } from 'react-redux';
import { getStore } from './store/store' 
import { MainComponent }  from './components/MainComponent';

const store = getStore();
export const App = () => {
  return ( 
    <Provider store={store}>
      <MainComponent/>
    </Provider>
  );
}
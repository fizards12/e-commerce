import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';
import { Provider } from 'react-redux';
import store, { persistor } from './stores';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingState from './components/LoadingState';
import Toast from './components/atoms/toast';
import Loading from './components/Loading';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <LoadingState/>
        <Toast/>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;

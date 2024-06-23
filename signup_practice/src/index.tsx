import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './Root';
import confiureStore from './redux/configureStore';
import MediaProvider from './styles/media';

const store = confiureStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MediaProvider>
    <React.StrictMode>
      <Root store={store}/>
    </React.StrictMode>
  </MediaProvider>
);

reportWebVitals();

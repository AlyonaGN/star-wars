import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './index.css';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import PersonProvider from './contexts/PersonProvider';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <PersonProvider>
            <App />
          </PersonProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

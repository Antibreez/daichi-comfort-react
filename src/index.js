import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

function loggerMiddleware(store) {
    return function(next) {
        return function(action) {
            const result = next(action)
            console.log('Middleware', store.getState());
            return result
        }
    }
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { render } from 'react-dom';
import { Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import Root from './router'
import './app.css';


render(
  <BrowserRouter>
    <Provider store={store}>
      <Root />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root'));

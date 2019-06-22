import './rhlConfig';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from './Root.js';


render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root-entry')
);

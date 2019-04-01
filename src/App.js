import { hot } from 'react-hot-loader/root';
import React from 'react';

import Boxy from './Boxy.js';


const App = ({ title='getting started' }) => {
  return (
    <div>Hola!
      <div>{ title }</div>
      <div>{ process.env.NODE_ENV }</div>
      <Boxy />
    </div>
  );
};


export default hot(App);

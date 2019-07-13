import React from 'react';
import {Link}  from 'react-router-dom';
import {navStyle} from './styles.scss';


function Navigation (){


  return (
    <nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/top-domains">Top-Domains</Link>
    </nav>

  )
}

export default Navigation;
import React from 'react';

import Row from './Row';
import {
  tableHead, domainStyle, scoreStyle,
  postsStyle, pointsStyle, list
} from './styles.scss';


function DomainTable({ domains }) {
  return (
    <>
      <header className={tableHead}>
        <span className={domainStyle}>Domain</span>
        <span className={scoreStyle}>Score</span>
        <span className={postsStyle}># Posts</span>
        <span className={pointsStyle}>Mean Points</span>
      </header>
      <ul className={list}>
        {domains.map((domain, indx) => <Row key={indx} domain={domain} />)}
      </ul>
    </>
  );
}


export default DomainTable;

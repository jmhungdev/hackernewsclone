import React from 'react';
import {
  rowGrid, rankStyle, domainStyle,
  scoreStyle, postsStyle, pointsStyle
} from './styles.scss';


function Row({ domain=[] }) {
  const { rank, hostname, score, numPosts, mean } = domain;

  return (
    <li className={rowGrid}>
      <span className={rankStyle}>{rank}</span>
      <span className={domainStyle}>{hostname}</span>
      <span className={scoreStyle}>{score}</span>
      <span className={postsStyle}>{numPosts}</span>
      <span className={pointsStyle}>{mean}</span>
    </li>
  );
}


export default Row;

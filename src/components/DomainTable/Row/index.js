import React from 'react';
import {
  rowGrid, rankStyle, domainStyle,
  scoreStyle, postsStyle, pointsStyle
} from './styles.scss';


let points = 1000;

function Row({ indx, domain }) {
  const { url, score, numPosts } = domain;

  return (
    <li className={rowGrid}>
      <span className={rankStyle}>{indx}</span>
      <span className={domainStyle}>{url}</span>
      <span className={scoreStyle}>{score}</span>
      <span className={postsStyle}>{numPosts}</span>
      <span className={pointsStyle}>{points++}</span>
    </li>
  );
}


export default Row;

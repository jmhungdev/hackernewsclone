import React from 'react';
import webFountainLogo from 'Images/logo.jpg';


const styles = {
  margin: 0,
  fontSize: '16px',
  color: '#0B69AF'
};

function ReactWeekend() {
  return (
    <>
      <img src={webFountainLogo} alt="web-fountain-logo" width="35px" height="39px" />
      <div style={{ marginLeft: '10px'}}>
        <h1 style={styles}>React</h1>
        <h1 style={styles}>Weekend</h1>
      </div>
    </>
  );
}


export default ReactWeekend;

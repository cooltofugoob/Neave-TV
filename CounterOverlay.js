import React from 'react';

function CounterOverlay({ counter }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'green',
        fontSize: '1.5em',
        zIndex: 10,
      }}
    >
      CH {counter}
    </div>
  );
}

export default CounterOverlay;

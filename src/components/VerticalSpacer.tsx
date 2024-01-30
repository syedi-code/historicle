import React from 'react';


const VerticalSpacer = () => {
  return (
    <div
      style={{
        position: 'relative',
        marginRight: '20px', // Adjust the margin as needed
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          borderRight: '1px solid black', // Border to represent the vertical line
        }}
      ></div>
    </div>
  );
};

export default VerticalSpacer;
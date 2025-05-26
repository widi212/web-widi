import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animation.json';

const LoadingAnimation = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // atau 100vh jika ingin full screen
    width: '100%',
  }}>
    <div style={{ width: 500, height: 500 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  </div>
);

export default LoadingAnimation;

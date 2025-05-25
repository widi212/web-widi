import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animation.json';

const LoadingAnimation = () => (
  <div style={{ width: 200, height: 200 }}>
    <Lottie animationData={animationData} loop={true} />
  </div>
);

export default LoadingAnimation;

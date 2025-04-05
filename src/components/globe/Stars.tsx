
import React from "react";
import { Stars as DreiStars } from "@react-three/drei";

export const Stars = () => {
  return (
    <DreiStars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0.5} 
      fade 
      speed={1}
    />
  );
};

export default Stars;

import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial } from 'three';

const ModelViewer = ({ path }) => {
  const obj = useLoader(OBJLoader, path);
  const ref = useRef();

  // Apply orange material to the model
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({ color: 'orange' });
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <primitive object={obj} ref={ref} scale={[0.5, 0.5, 0.5]} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;

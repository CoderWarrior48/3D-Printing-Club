import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const ModelViewer = () => {

  const earth = useLoader(OBJLoader, '/sampleProduct.obj');


  return (
    <Canvas frameloop="demand" camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 100] }}>
      <OrbitControls autoRotate enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={true} /> 
      <mesh receiveShadow castShadow>
        <primitive object={earth} scale={1} />
        <MeshStandardMaterial color="blue" />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]}  castShadow/>
      <directionalLight color="blue" position={[0, 10, 0]} castShadow/>

    </Canvas>
  );
};

export default ModelViewer;
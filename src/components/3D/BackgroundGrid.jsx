import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

const MovingGrid = () => {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + delta * 0.5) % 1;
    }
  });

  return (
    <Grid
      ref={gridRef}
      position={[0, -2, -5]}
      args={[100, 100]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#1e293b"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#334155"
      fadeDistance={25}
      fadeStrength={1}
    />
  );
};

const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <fog attach="fog" args={['#0B0F19', 5, 25]} />
        <ambientLight intensity={0.5} />
        <MovingGrid />
      </Canvas>
    </div>
  );
};

export default BackgroundGrid;

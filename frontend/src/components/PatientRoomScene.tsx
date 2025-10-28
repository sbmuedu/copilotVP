// frontend/src/components/PatientRoomScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

export const PatientRoomScene: React.FC = () => {
  return (
    <div className="w-full h-[500px] rounded overflow-hidden shadow">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Room />
          <Patient />
        </Suspense>
        <OrbitControls />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

// Placeholder components
function Room() {
  return (
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={[6, 0.1, 6]} />
      <meshStandardMaterial color="#e0e0e0" />
    </mesh>
  );
}

function Patient() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

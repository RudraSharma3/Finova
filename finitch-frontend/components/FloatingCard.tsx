"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { RoundedBox, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function CardInstance() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const { x, y } = state.mouse;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.4, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[3.5, 2.2, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color="#080808" 
          metalness={0.9} 
          roughness={0.15} 
        />
      </RoundedBox>

      {/* Gold Chip */}
      <mesh position={[-1.1, 0.4, 0.06]}>
        <planeGeometry args={[0.5, 0.4]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </mesh>

      {/* Decorative Line */}
      <mesh position={[0, -0.7, 0.06]}>
        <planeGeometry args={[2.8, 0.01]} />
        <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
      </mesh>
    </mesh>
  );
}

export default function FloatingCard() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0.2, 5], fov: 38 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        
        <Environment preset="city" /> 

        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
          <CardInstance />
        </Float>
        <ContactShadows position={[0, -1.6, 0]} opacity={0.3} scale={8} blur={3} far={4} />
      </Canvas>
    </div>
  );
}
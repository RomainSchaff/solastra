import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type NeptuneProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Neptune: React.FC<NeptuneProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const texture = useLoader(TextureLoader, "./texture/2k_neptune.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 1.2;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.03) / 5;
    const x = 1200 * Math.cos(angle);
    const z = 1200 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 8) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 8) {
      setPlanetActive(8);
    } else if (planetActive === 8) {
      setPlanetActive(0);
    }
  }

  // // Géométrie pour la trajectoire orbitale
  // const orbitGeometry = useMemo(() => {
  //   const geometry = new THREE.BufferGeometry();
  //   const vertices = [];
  //   for (let i = 0; i <= 64; i++) {
  //     const theta = (i / 64) * Math.PI * 2;
  //     vertices.push(1200 * Math.cos(theta), 0, 1200 * Math.sin(theta));
  //   }
  //   geometry.setAttribute(
  //     "position",
  //     new THREE.Float32BufferAttribute(vertices, 3)
  //   );
  //   return geometry;
  // }, []);

  return (
    <>
      {/* <lineLoop>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial attach="material" color="rgb(50, 50, 50)" />
      </lineLoop> */}
      <group
        ref={mesh}
        scale={planetActive === 8 ? 1.3 : 1}
        position={[-1200, 0, 0]}
        onClick={handleClick}
        rotation-x={28 * (Math.PI / 180)}
      >
        <mesh>
          <sphereGeometry args={[19, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            color={planetActive === 8 ? "rgb(165, 165, 165)" : "gray"}
          />
          <axesHelper args={[19 + 10]} />
        </mesh>
        <group ref={ringMesh} rotation-x={90 * (Math.PI / 180)}>
          <mesh>
            <ringGeometry args={[30, 31, 30]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.5}
              color="rgb(45, 45, 45)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[32.5, 33, 30]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.5}
              color="rgb(45, 45, 45)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[34, 35.5, 30]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.5}
              color="rgb(45, 45, 45)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default Neptune;

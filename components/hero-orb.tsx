"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei"
import * as THREE from "three"

function EnergyBeam() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.5 + 0.1
      positions[i * 3] = Math.cos(angle) * radius * 0.35
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.35
      speeds[i] = Math.random() * 0.6 + 0.3
      sizes[i] = Math.random() * 0.4 + 0.4
    }

    return { positions, speeds, sizes, count }
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particles.count; i++) {
        positions[i * 3 + 1] += particles.speeds[i] * 0.02
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#a5f3fc" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerMeshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -state.clock.elapsedTime * 0.1
      innerMeshRef.current.rotation.y = -state.clock.elapsedTime * 0.12
    }
  })

  return (
    <>
      <ambientLight intensity={0.08} color="#0c4a6e" />
      <directionalLight position={[10, 10, 5]} intensity={0.15} color="#22d3ee" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#0891b2" />
      <pointLight position={[10, 10, 5]} intensity={0.4} color="#a5f3fc" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#67e8f9" />
      <pointLight position={[0, -3, 0]} intensity={0.6} color="#0891b2" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere ref={meshRef} args={[1.1, 128, 128]}>
          <MeshDistortMaterial
            color="#0c4a6e"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#0891b2"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={innerMeshRef} args={[0.5, 64, 64]}>
          <MeshDistortMaterial
            color="#67e8f9"
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0}
            metalness={1}
            emissive="#a5f3fc"
            emissiveIntensity={1.2}
          />
        </Sphere>
      </Float>

      <EnergyBeam />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.012, 16, 100]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
          <torusGeometry args={[1.7, 0.008, 16, 100]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.2}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, Math.PI / 5]}>
          <torusGeometry args={[1.9, 0.006, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
        </mesh>
      </Float>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.4, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.2, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.08, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

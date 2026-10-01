"use client";

import { useEffect, useMemo, useRef, useState, type ComponentRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

type Props = {
  /** 0 → 1 hero scroll progress, written by a ScrollTrigger in the Hero. */
  progress: RefObject<number>;
  /** Container used to pause rendering when off-screen. */
  container: RefObject<HTMLElement | null>;
};

function Blob({ progress }: { progress: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const { viewport } = useThree();
  const mobile = viewport.width < 5;

  useEffect(() => {
    if (!mesh.current) return;
    const s = mesh.current.scale;
    s.setScalar(0.001);
    return onIntroDone(() => {
      gsap.to(s, { x: 1, y: 1, z: 1, duration: 2.2, ease: "elastic.out(1, 0.55)", delay: 0.2 });
    });
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    const { x, y } = state.pointer;
    // Pointer: smooth tilt + slight drift
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.6 + p * 1.6, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.4 + p * 0.6, 3, delta);
    const baseX = mobile ? 0 : viewport.width * 0.26;
    const baseY = mobile ? viewport.height * 0.2 : 0.1;
    g.position.x = THREE.MathUtils.damp(g.position.x, baseX + x * 0.25, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, baseY + y * 0.2 + p * 1.4, 2.5, delta);
    const scale = (mobile ? 0.62 : 0.9) * (1 - p * 0.35);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, scale, 4, delta));
    if (mat.current) {
      mat.current.distort = THREE.MathUtils.damp(mat.current.distort, 0.38 + p * 0.35 + Math.abs(x) * 0.08, 2, delta);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 64]} />
        <MeshDistortMaterial
          ref={mat}
          color="#9d8cff"
          roughness={0.3}
          metalness={0.55}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[200, 900]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.38}
          speed={1.6}
        />
      </mesh>
    </group>
  );
}

function Shapes({ progress }: { progress: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const w = viewport.width;

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.current ?? 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, p * 2.6, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, state.pointer.x * 0.1, 2, delta);
  });

  const wire = (
    <meshBasicMaterial color="#8b7cf6" wireframe transparent opacity={0.35} />
  );

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-w * 0.45, 1.6, -1]} scale={0.24}>
          <octahedronGeometry args={[1, 0]} />
          {wire}
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={1.5} floatIntensity={1.6}>
        <mesh position={[w * 0.4, 1.5, -0.8]} scale={0.22}>
          <torusGeometry args={[1, 0.36, 16, 48]} />
          <meshStandardMaterial color="#5eead4" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-w * 0.3, -1.95, 0.2]} scale={0.13}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a78bfa" metalness={0.8} roughness={0.25} flatShading />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.4}>
        <mesh position={[w * 0.08, 1.9, -1.6]} scale={0.22}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Deterministic pseudo-random so renders stay pure.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.08, 1.5, delta);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#c4b5fd" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#60a5fa" />
      <pointLight position={[4, 2, 1]} intensity={14} color="#a78bfa" />
      {/* Local light-formers: reflections without fetching an HDR file. */}
      <Environment resolution={256}>
        <color attach="background" args={["#140f2a"]} />
        <Lightformer form="circle" intensity={2.5} color="#a78bfa" position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={9} />
        <Lightformer form="circle" intensity={2.2} color="#5eead4" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={9} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#60a5fa" position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="circle" intensity={1.4} color="#f0abfc" position={[2, 2, 6]} scale={4} />
      </Environment>
    </>
  );
}

export default function HeroScene({ progress, container }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [container]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={visible ? "always" : "never"}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Lights />
      <Blob progress={progress} />
      <Shapes progress={progress} />
      <Particles />
    </Canvas>
  );
}

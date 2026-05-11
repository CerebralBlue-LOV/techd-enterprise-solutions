import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Automation & FinOps — single-line (3,2) torus knot.
 * One clean parametric curve through 3D space — no tube facets, no boxiness.
 * A small glowing point travels along the curve to evoke flow / scheduled
 * automation.
 */
const P = 3;
const Q = 2;
const R = 1.4;
const SAMPLES = 220;

const curvePoint = (t: number, out = new THREE.Vector3()) => {
  const u = t * Math.PI * 2;
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const qu = Q * u;
  const pu = P * u;
  const r = R * (2 + Math.cos(qu)) * 0.5;
  out.set(r * Math.cos(pu), r * Math.sin(pu), R * Math.sin(qu));
  return out;
};

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const travelerRef = useRef<THREE.Points>(null);
  const travelerPos = useMemo(() => new Float32Array(3), []);

  // Build the curve once
  const { linePositions, vertexPositions } = useMemo(() => {
    const linePts = new Float32Array((SAMPLES + 1) * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i <= SAMPLES; i++) {
      curvePoint(i / SAMPLES, v);
      linePts[i * 3] = v.x;
      linePts[i * 3 + 1] = v.y;
      linePts[i * 3 + 2] = v.z;
    }
    // Sparse vertex highlights along the curve (every Nth point)
    const STEP = 14;
    const count = Math.floor(SAMPLES / STEP);
    const vertexPts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      curvePoint((i * STEP) / SAMPLES, v);
      vertexPts[i * 3] = v.x;
      vertexPts[i * 3 + 1] = v.y;
      vertexPts[i * 3 + 2] = v.z;
    }
    return { linePositions: linePts, vertexPositions: vertexPts };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.rotation.x = Math.sin(t * 0.13) * 0.18;
    }
    if (lineMat.current) {
      lineMat.current.opacity = 0.6 + Math.sin(t * 0.8) * 0.08;
    }

    // Traveling glow point along the curve
    const u = (t * 0.12) % 1;
    const v = new THREE.Vector3();
    curvePoint(u, v);
    travelerPos[0] = v.x;
    travelerPos[1] = v.y;
    travelerPos[2] = v.z;
    if (travelerRef.current) {
      const attr = travelerRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* The knot itself — single parametric line */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMat}
          color={PRIMARY}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </line>

      {/* Sparse vertex points along the curve */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[vertexPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Bright traveler glow */}
      <points ref={travelerRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[travelerPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.22}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const AutomationFinOpsFigure = () => (
  <WireframePanel cameraZ={6.5}>
    <Geometry />
  </WireframePanel>
);

export default AutomationFinOpsFigure;

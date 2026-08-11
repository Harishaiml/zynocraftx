import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The core "digital sculpture": a morphing mathematical surface
 * rendered as a wireframe + point cloud, wrapped by orbiting rings.
 * Represents flowing intelligence / algorithmic elegance.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDist;

  // simplex noise (ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vNormal = normal;
    vec3 p = position;
    float n = snoise(p * 1.2 + vec3(uTime * 0.15));
    float n2 = snoise(p * 2.4 - vec3(uTime * 0.1));
    float disp = n * 0.35 + n2 * 0.15;
    p += normal * disp * uMorph;
    vPos = p;
    vDist = length(p);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDist;

  void main(){
    float fres = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 2.0);
    float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + vDist * 2.0);
    vec3 col = mix(uColorA, uColorB, fres);
    col += pulse * 0.15 * uColorB;
    float alpha = 0.12 + fres * 0.5;
    gl_FragColor = vec4(col, alpha);
  }
`;

const pointVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;
  void main(){
    vec3 p = position;
    float n = sin(uTime * 0.6 + aPhase) * 0.15;
    p *= 1.0 + n * 0.05;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);
    vAlpha = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * 1.2 + aPhase));
  }
`;

const pointFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(uColor, a * 0.7);
  }
`;

function SculptureCore() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 1.0 },
      uColorA: { value: new THREE.Color('#2563eb') },
      uColorB: { value: new THREE.Color('#7c3aed') },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * (Math.PI * 2) / 45;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * (5 * Math.PI / 180);
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * (2 * Math.PI / 180);
      const float = Math.sin(state.clock.elapsedTime * (2 * Math.PI / 7.5)) * 0.012;
      meshRef.current.position.y = float;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 48]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function SculpturePoints() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.3, 24);
    const count = g.attributes.position.count;
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      scales[i] = Math.random() * 2 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 18 },
      uColor: { value: new THREE.Color('#9bb8ff') },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={pointVertexShader}
        fragmentShader={pointFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRings() {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) g1.current.rotation.z = t * 0.15;
    if (g2.current) g2.current.rotation.x = t * 0.12;
    if (g3.current) g3.current.rotation.y = t * 0.1;
  });

  return (
    <group>
      <mesh ref={g1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 16, 200]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.3} />
      </mesh>
      <mesh ref={g2} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[2.45, 0.004, 16, 200]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} />
      </mesh>
      <mesh ref={g3} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.003, 16, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { positions, scales, phases } = useMemo(() => {
    const COUNT = 380;
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = Math.random() * 2 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, scales, phases };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 15 },
      uColor: { value: new THREE.Color('#aac4ff') },
    }),
    []
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    if (ref.current && ref.current.material instanceof THREE.ShaderMaterial) {
      (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={pointVertexShader}
        fragmentShader={pointFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(1.2, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // orbit
    const orbitDuration = 22;
    const angle = (t * Math.PI * 2) / orbitDuration;
    const radius = 6.8 + Math.sin(t * 0.1) * 0.3;
    const desiredX = Math.cos(angle) * radius + mouse.current.x * 0.4;
    const desiredY = Math.sin(t * 0.13) * 0.5 + mouse.current.y * 0.3;
    const desiredZ = Math.sin(angle) * radius;
    camera.position.x += (desiredX - camera.position.x) * 0.04;
    camera.position.y += (desiredY - camera.position.y) * 0.04;
    camera.position.z += (desiredZ - camera.position.z) * 0.04;
    camera.lookAt(target.current);
  });

  // mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}

export default function HeroScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-4, 2, -4]} intensity={1.6} color="#2563eb" distance={20} />
      <pointLight position={[4, -2, 4]} intensity={1.2} color="#7c3aed" distance={20} />
      <fog attach="fog" args={['#050505', 4, 14]} />
      <group position={[1.2, 0, 0]}>
        <SculptureCore />
        <SculpturePoints />
        <OrbitRings />
        <ParticleField />
      </group>
    </>
  );
}

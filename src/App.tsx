import { useRef, useState } from "react";
import "./App.css";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { useBoolean, useInterval, useWindowSize } from "react-use";

const { PI } = Math;

function Dog(props: MeshProps & { color?: string }) {
  const { color = "saddlebrown", ...meshProps } = props;
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => ((ref.current as any).rotation.x += 0.04 * 1));
  // useFrame((state, delta) => ((ref.current as any).rotation.y += 0.03 * 1));
  // useFrame((state, delta) => ((ref.current as any).rotation.z += 0.04 * 1));
  // useFrame((state, delta) => console.log({ state, delta }));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...meshProps} ref={ref}>
      <mesh rotation={[PI / 2, 0, 0]}>
        {/* corpus */}
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color={color} />

        {/* head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshStandardMaterial color={color} />

          {/* nose */}
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="black" />
          </mesh>

          {/* left eye */}
          <mesh position={[-0.3, 0.7, -0.3]}>
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="white" />

            {/* iris */}
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.04, 32, 16]} />
              <meshStandardMaterial color="black" />
            </mesh>
          </mesh>

          {/* right eye */}
          <mesh position={[0.3, 0.7, -0.3]}>
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="white" />
            {/* iris */}
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.04, 32, 16]} />
              <meshStandardMaterial color="black" />
            </mesh>
          </mesh>

          {/* right ear */}
          <mesh position={[-0.5, 0.3, -0.7]}>
            <sphereGeometry args={[0.2, 32, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>

          {/* left ear */}
          <mesh position={[0.5, 0.3, -0.7]}>
            <sphereGeometry args={[0.2, 32, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </mesh>

        {/* front right leg */}
        <mesh rotation={[PI / 4, 0, PI / 4]} position={[-0.5, 0.8, 0.5]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* front left leg */}
        <mesh
          rotation={[(-PI / 4) * 3, 0, (-PI / 4) * 3]}
          position={[0.5, 0.8, 0.5]}
        >
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* bottom left leg */}
        <mesh
          rotation={[(PI / 4) * 3, 0, (PI / 4) * 3]}
          position={[0.5, -0.8, 0.5]}
        >
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* bottom right leg */}
        <mesh rotation={[-PI / 4, 0, -PI / 4]} position={[-0.5, -0.8, 0.5]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* tail */}
        <mesh rotation={[-PI / 6, 0, PI / 2]} position={[0, -1.6, -1]}>
          <boxGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </mesh>
    </mesh>
  );
}

const Dogs = (props: {
  rotating?: boolean;
  rotationSpeed?: number;
  color?: string;
}) => {
  const { rotating, rotationSpeed = 1, color } = props;
  const dH = 2;
  const dV = 2;
  const dZ = 2;

  const ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => ((ref.current as any).rotation.x += 0.04 * 1));
  // useFrame((state, delta) => ((ref.current as any).rotation.z += 0.1 * 1));
  useFrame(
    (state, delta) =>
      rotating && ((ref.current as any).rotation.y += 0.03 * rotationSpeed)
  );

  return (
    <mesh ref={ref} scale={0.3}>
      {Array.from({ length: dH }).flatMap((_, i) => {
        return Array.from({ length: dV }).flatMap((__, j) => {
          return Array.from({ length: dZ }).map((__, k) => {
            return (
              <Dog
                key={i * dH + j}
                scale={0.2}
                color={color}
                position={[
                  -(dH / 2) + i / 2 + dH * 0.3,
                  -(dV / 2) + j / 2 + dV * 0.3,
                  -(dZ / 2) + k / 1.1 + dZ * 0.1,
                ]}
              />
            );
          });
        });
      })}
    </mesh>
  );
};

function App() {
  const { width, height } = useWindowSize();
  const [shown, toggleShown] = useBoolean(true);
  const [disco, toggleDisco] = useBoolean(false);
  const [rotating, toggleRotating] = useBoolean(true);
  const [scale, setScale] = useState(3);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [color, setColor] = useState<string>("#8b4513");

  useInterval(() => {
    disco && toggleShown();
  }, 100);

  const dV = 3;
  const dH = 3;
  const dZ = 3;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "flex-start",
          gap: "2px",
          padding: "5px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <h4 style={{ color: "#fff" }}>Controls</h4>
        <button
          onClick={() => {
            toggleDisco();
            toggleShown(true);
          }}
        >
          toggle disco
        </button>
        <button
          onClick={() => {
            toggleRotating();
          }}
        >
          toggle rotating
        </button>

        <label style={{ color: "#fff" }}>
          scale
          <input
            type="range"
            min={1}
            max={5}
            value={scale}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setScale(valueAsNumber);
            }}
          />
        </label>

        <label style={{ color: "#fff" }}>
          rotation speed
          <input
            type="range"
            min={1}
            max={5}
            value={rotationSpeed}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setRotationSpeed(valueAsNumber);
            }}
          />
        </label>
        <label style={{ color: "#fff" }}>
          set color
          <input
            type="color"
            value={color}
            onChange={({ currentTarget: { value } }) => {
              setColor(value);
            }}
          />
        </label>
      </div>
      <Canvas style={{ width, height, background: "black" }}>
        {shown && (
          <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
          </>
        )}
        {/* <Dog position={[-2, 0, -3]} invert />
      <Dog position={[-4, 0, -3]} invert />
      <Dog position={[-6, 0, -3]} invert />
      <Dog position={[-0, 0, -3]} invert /> */}
        {/* <Dog position={[0, 0, -8]} scale={0.5} />
      <Dog position={[-4, 0, -8]} scale={0.3} />
      <Dog position={[4, 0, -8]} scale={0.1} /> */}
        <mesh rotation={[PI / 5, PI / 4, 0]} scale={scale * 0.3}>
          {Array.from({ length: dH }).flatMap((_, x) => {
            return Array.from({ length: dV }).flatMap((_, y) => {
              return Array.from({ length: dZ }).map((_, z) => {
                return (
                  <mesh
                    key={x * dH + y * dV + z * dZ}
                    position={[-1 + x, -1 + y, -1 + z]}
                  >
                    <Dogs
                      rotating={rotating}
                      rotationSpeed={rotationSpeed}
                      color={color}
                    />
                  </mesh>
                );
              });
            });
          })}
        </mesh>

        {/* <Dog position={[0, 4, -8]} />
      <Dog position={[-4, 4, -8]} />
      <Dog position={[4, 4, -8]} />

      <Dog position={[0, -4, -8]} />
      <Dog position={[-4, -4, -8]} />
      <Dog position={[4, -4, -8]} />

      <Dog position={[0, -7, -8]} />
      <Dog position={[-4, -7, -8]} />
      <Dog position={[4, -7, -8]} />

      <Dog position={[0, 7, -8]} />
      <Dog position={[-4, 7, -8]} />
      <Dog position={[4, 7, -8]} /> */}
      </Canvas>
    </>
  );
}

export default App;

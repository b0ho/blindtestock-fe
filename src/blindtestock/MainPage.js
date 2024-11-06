import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./MainPage.css";

function Box() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

function MainPage() {
  return (
    <div className="main-page">
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
      <div className="content">
        <h1>Blind Testock</h1>
        <p>
          이 웹페이지는 특정 종목의 과거 주가 추이를 맞추는 기능을 제공합니다.
        </p>
        <div className="buttons">
          <Link to="/blind-test" className="button">
            블라인드 테스트하기
          </Link>
          <Link to="/open-test" className="button">
            오픈 테스트하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./MainPage.css";
import { useState } from "react";
import axios from "axios";

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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAskQuestion = async () => {
    try {
      console.log(question);
      setAnswer("loading");
      const aiChatResponse = await axios.post("http://127.0.0.1:5000/aiChat", {
        message: question,
      });
      console.log(aiChatResponse.data);
      setAnswer(aiChatResponse.data || "");
    } catch (error) {
      console.error("Error fetching the stock event:", error);
    }
  };

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
          <Link to="/buy-advice" className="button">
            매수 검증하기
          </Link>
        </div>
        <div className="ask-anything">
          <h2>무엇이든 물어보세요</h2>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="질문을 입력하세요"
          />
          <button onClick={handleAskQuestion}>질문하기</button>
          {answer === "loading" && <p>음,, 생각 중...</p>}
          {answer && answer !== "loading" && <p className="answer">{answer}</p>}
        </div>
      </div>
    </div>
  );
}

export default MainPage;

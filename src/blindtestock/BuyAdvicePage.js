import React, { useState } from "react";
import axios from "axios";
import "./BuyAdvicePage.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function BuyAdvicePage() {
  const [symbol, setSymbol] = useState("");
  const [advice, setAdvice] = useState(null);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleAskAdvice = async () => {
    try {
      console.log(symbol);
      setAdvice("loading");
      const buyAdviceResponse = await axios.post(
        "http://127.0.0.1:5000/buyAdvice",
        {
          message: symbol + " 매수해도 될까요?",
        }
      );
      console.log(buyAdviceResponse.data);
      const parsedAdvice = JSON.parse(buyAdviceResponse.data);
      setAdvice(parsedAdvice);
    } catch (error) {
      console.error("Error fetching the buy advice:", error);
    }
  };

  useEffect(() => {
    if (advice) {
      console.log("Advice: ", advice);
      console.log("Good: ", advice.good);
      console.log("Bad: ", advice.bad);
    }
  }, [advice]);

  return (
    <div className="buy-advice-page">
      <h1>매수 검증하기</h1>
      <input
        type="text"
        value={symbol}
        onChange={handleSymbolChange}
        placeholder="종목명을 입력하세요"
      />
      <button onClick={handleAskAdvice}>매수해도 될까요?</button>
      {advice === "loading" && <p>음,, 생각 중...</p>}
      {advice && advice !== "loading" && (
        <div className="advice-container">
          <p className="answer">{advice.answer}</p>
          <div className="good-bad-container">
            <div className="good">
              <h2>긍정적인 요인</h2>
              <p>{advice.good}</p>
            </div>
            <div className="bad">
              <h2>부정적인 요인</h2>
              <p>{advice.bad}</p>
            </div>
          </div>
          <div className="buy-indicator">
            {advice.buy === "산다" ? (
              <div className="buy-icon">✔️</div>
            ) : (
              <div className="sell-icon">❌</div>
            )}
          </div>
        </div>
      )}
      <div className="to-main">
        <Link to="/" className="button">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default BuyAdvicePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./BlindTestPage.css";

// 미국 주식 50대 종목 심볼 목록
const symbols = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "FB",
  "TSLA",
  "BRK.B",
  "NVDA",
  "JPM",
  "JNJ",
  "V",
  "PG",
  "UNH",
  "HD",
  "DIS",
  "MA",
  "PYPL",
  "BAC",
  "VZ",
  "ADBE",
  "NFLX",
  "INTC",
  "CMCSA",
  "PFE",
  "KO",
  "PEP",
  "T",
  "MRK",
  "ABT",
  "CSCO",
  "XOM",
  "CVX",
  "NKE",
  "WMT",
  "LLY",
  "MCD",
  "MDT",
  "CRM",
  "NEE",
  "HON",
  "TXN",
  "COST",
  "AVGO",
  "QCOM",
  "DHR",
  "BMY",
  "UNP",
  "PM",
  "LIN",
  "ORCL",
];

// 랜덤 심볼 선택 함수
function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function getRandomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function BlindTestPage() {
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [result, setResult] = useState(null);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const randomDate = getRandomDate(
      new Date(2021, 0, 1),
      new Date(2023, 0, 1)
    );
    const randomSymbol = getRandomSymbol();
    console.log("Random Date: ", randomDate);
    console.log("Random Symbol: ", randomSymbol);

    const fetchData = async () => {
      try {
        const [goodEventResponse, badEventResponse, pricesResponse] =
          await Promise.all([
            axios.post("http://127.0.0.1:5000/getStockGoodEvent", {
              message: `${randomDate}의 ${randomSymbol} 좋은 뉴스 알려줘`,
            }),
            axios.post("http://127.0.0.1:5000/getStockBadEvent", {
              message: `${randomDate}의 ${randomSymbol} 나쁜 뉴스 알려줘`,
            }),
            axios.post("http://127.0.0.1:5000/getStockPrices", {
              symbol: randomSymbol,
              date: randomDate,
            }),
          ]);

        setHint1(goodEventResponse.data || "");
        setHint2(badEventResponse.data || "");
        setPrices(pricesResponse.data || []);
      } catch (error) {
        console.error("Error fetching the stock data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowHint1 = () => {
    setShowHint1(true);
  };

  const handleShowHint2 = () => {
    setShowHint2(true);
  };

  const handlePrediction = (prediction) => {
    if (prices.length < 2) {
      setResult({ correct: false, stock: "Example Stock" });
      return;
    }

    const tomorrowPrice = prices[prices.length - 1];
    const todayPrice = prices[prices.length - 2];
    const correctPrediction =
      prediction === "up"
        ? tomorrowPrice > todayPrice
        : tomorrowPrice < todayPrice;

    setResult({
      correct: correctPrediction,
      stock: "Example Stock",
    });
  };

  const data = {
    labels: prices.slice(0, -1).map((_, index) => index + 1),
    datasets: [
      {
        label: "종가",
        data: prices.slice(0, -1),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };
  return (
    <div className="blind-test-page">
      <h1>블라인드 테스트</h1>
      <div className="stock-graph">
        <Line data={data} />
      </div>
      <button onClick={handleShowHint1} className="hint-button">
        힌트 1 보기
      </button>
      {showHint1 && hint1 && (
        <div className="hint-area">
          <h2>긍정적인 이벤트</h2>
          <p
            dangerouslySetInnerHTML={{ __html: hint1.replace(/\n/g, "<br/>") }}
          />
        </div>
      )}
      <button onClick={handleShowHint2} className="hint-button">
        힌트 2 보기
      </button>
      {showHint2 && hint2 && (
        <div className="hint-area">
          <h2>부정적인 이벤트</h2>
          <p
            dangerouslySetInnerHTML={{ __html: hint2.replace(/\n/g, "<br/>") }}
          />
        </div>
      )}
      <button
        onClick={() => handlePrediction("up")}
        className="prediction-button"
      >
        상승 예측
      </button>
      <button
        onClick={() => handlePrediction("down")}
        className="prediction-button"
      >
        하락 예측
      </button>
      {result && (
        <div className="result-area">
          <p>
            {result.correct ? "정답" : "오답"} : {prices.slice(-1)}
          </p>
        </div>
      )}
    </div>
  );
}

export default BlindTestPage;

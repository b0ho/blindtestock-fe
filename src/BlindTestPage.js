import React, { useState } from 'react';
import './BlindTestPage.css';

function BlindTestPage() {
    const [showHint, setShowHint] = useState(false);
    const [result, setResult] = useState(null);

    const handleShowHint = () => {
        setShowHint(true);
    };

    const handlePrediction = (prediction) => {
        // Here you would normally check the prediction against the actual data
        const correctPrediction = true; // This is just a placeholder
        setResult({
            correct: prediction === 'up' ? correctPrediction : !correctPrediction,
            stock: 'Example Stock'
        });
    };

    return (
        <div className="blind-test-page">
            <h1>블라인드 테스트</h1>
            <div className="stock-graph">
                {/* Placeholder for the stock graph */}
                <p>주가 그래프 영역</p>
            </div>
            <button onClick={handleShowHint} className="hint-button">힌트보기</button>
            {showHint && (
                <div className="hint-area">
                    <p>시장 이벤트: Example Market Event</p>
                </div>
            )}
            <div className="prediction-buttons">
                <button onClick={() => handlePrediction('up')} className="prediction-button">오른다</button>
                <button onClick={() => handlePrediction('down')} className="prediction-button">내린다</button>
            </div>
            {result && (
                <div className="result-area">
                    <p>{result.correct ? '정답입니다!' : '틀렸습니다.'}</p>
                    <p>종목: {result.stock}</p>
                </div>
            )}
        </div>
    );
}

export default BlindTestPage;
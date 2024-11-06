import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
    return (
        <div className="main-page">
            <h1>Blind Testock</h1>
            <p>이 웹페이지는 특정 종목의 과거 주가 추이를 맞추는 기능을 제공합니다.</p>
            <div className="buttons">
                <Link to="/blind-test" className="button">블라인드 테스트하기</Link>
                <Link to="/open-test" className="button">오픈 테스트하기</Link>
            </div>
        </div>
    );
}

export default MainPage;
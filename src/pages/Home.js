import React, { useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
  const [showH2, setShowH2] = useState(false);

  useEffect(() => {
    // 1. h1 애니메이션 끝난 뒤 h2로 전환
    const timer = setTimeout(() => {
      setShowH2(true);
    }, 7000); // h1 애니메이션 시간과 맞추기 (3초)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      <div className="retro-overlay"></div>
      <div className="retroLine"></div>
      <video
        className="background-video"
        src="/video/1_1080p_twopass.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>
      
      <div className="overlay">
        {!showH2 ? (
          <h1 className="slide-text">Welcome to KANCE</h1>
        ) : (
          <h2 className="scale-text">Welcome to KANCE</h2>
        )}
        
      </div>
      <p>Feel the K-Dance, Join the World
        <br></br>
        <span>Challenge + Learning + Community</span>
        {/* <span>도전, 배움, 스토어가 함께하는 플랫폼</span> */}
      </p>
      
    </div>
  );
};

export default Home;

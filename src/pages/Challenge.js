import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Challenge.scss";
import { useNavigate } from "react-router-dom";

const Challenge = () => {
  const [videos, setVideos] = useState([]); // 챌린지 비디오
  const [trendingVideos, setTrendingVideos] = useState([]); // 트렌딩 비디오
  const [newVideos, setNewVideos] = useState([]); // 신곡 비디오
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("Trending");
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router

  // 비디오 불러오기 (트렌딩 / 신곡)
  const fetchVideos = async (type) => {
    const API_KEY = "";
    let url;

    if (type === "Trending") {
      // 트렌딩 비디오
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=kpop&maxResults=12&order=viewCount&type=video&videoCategoryId=10&regionCode=KR&key=${API_KEY}`;
    } else if (type === "New") {
      // 신곡 비디오
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=kpop&maxResults=12&order=date&type=video&videoCategoryId=10&regionCode=KR&key=${API_KEY}`;
    }

    try {
      const response = await axios.get(url);
      if (type === "Trending") {
        setTrendingVideos(response.data.items);
      } else if (type === "New") {
        setNewVideos(response.data.items);
      }
    } catch (error) {
      console.error(`${type} 비디오 가져오기 실패:`, error);
    }
  };

  // 챌린지 슬라이더용 비디오 불러오기
  useEffect(() => {
    const fetchChallengeVideos = async () => {
      const API_KEY = "";
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        "kpop Dance tuto Shorts"
      )}&type=video&maxResults=20&videoDuration=any&key=${API_KEY}`;
      const response = await axios.get(url);
      setVideos(response.data.items);
    };
    fetchChallengeVideos();
  }, []);

  // 트렌딩/신곡 실시간 갱신
  useEffect(() => {
    fetchVideos("Trending");
    fetchVideos("New");
    const interval = setInterval(() => {
      fetchVideos("Trending");
      fetchVideos("New");
    }, 1000 * 60 * 60); // 60분마다 갱신
    return () => clearInterval(interval);
  }, []);

  // 필터에 따라 보여줄 리스트 선택
  const getFilteredVideos = () => {
    if (filter === "Trending") return trendingVideos;
    if (filter === "New") return newVideos;
    return trendingVideos;
  };

  // 비디오 클릭 시 숏츠 페이지로 이동
  const handleVideoClick = (videoId) => {
    // 유튜브 숏츠 페이지로 이동 (예: 유튜브 Shorts 페이지 URL)
    navigate(`/shorts/${videoId}`);
  };

  return (
    <div>
      {/* ▼▼ This Week Section ▼▼ */}
      <div className="challenge-section">
        <div className="first-title">
          🔥 THIS WEEK'S HOT CHALLENGE: {/* [RICH MAN] */}
        </div>
        <img
          src="/img/challenge/colortext.png"
          alt="Challenge Color Text"
          className="challenge-section-img"
          // style={{ width: "320px", marginBottom: "2rem" }}
        />

        <Swiper
          modules={[Navigation]}
          spaceBetween={-150}
          centeredSlides={true}
          breakpoints={{
            1920: { slidesPerView: 7 },
            1440: { slidesPerView: 6 },
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 4 },
            0: { slidesPerView: 3 },
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          className="challenge-slider"
        >
          {videos
            .filter((video) => video.id.kind === "youtube#video")
            .map((video, index) => {
              const diff = index - currentIndex;
              let positionClass = '';

              if (diff === 0) positionClass = 'center';
              else if (diff === -1) positionClass = 'prev';
              else if (diff === -2) positionClass = 'prev2';
              else if (diff === -3) positionClass = 'prev3';
              else if (diff === -4) positionClass = 'prev4';
              else if (diff === 1) positionClass = 'next';
              else if (diff === 2) positionClass = 'next2';
              else if (diff === 3) positionClass = 'next3';
              else if (diff === 4) positionClass = 'next4';
              else positionClass = 'hidden';

              // 센터에 있을 때만 클릭 시 영상 재생
              const isCenter = positionClass === 'center';

              return (
                <SwiperSlide key={video.id.videoId} className={`slide-item ${positionClass}`}>
                  <div
                    className="video-card"
                    onClick={() => {
                      if (isCenter) setPlayingVideoId(video.id.videoId);
                    }}
                    style={{ cursor: isCenter ? "pointer" : "default" }}
                  >
                    {playingVideoId === video.id.videoId && isCenter ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${video.id.videoId}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={video.snippet.title}
                      />
                    ) : (
                      <img
                        src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>

      {/* ▼▼ Trending Section ▼▼ */}
      <div className="trending-section">
        <div className="second-title">
          <h1>TRENDING NOW</h1>
          <p>K-pop challenge</p>
        </div>
        <div className="filter">
          <span>Filter :</span>
          <button className={filter === "Trending" ? "active" : ""} onClick={() => setFilter("Trending")}>
            Trending
          </button>
          <button className={filter === "New" ? "active" : ""} onClick={() => setFilter("New")}>
            New
          </button>
          <button className={filter === "Level" ? "active" : ""} onClick={() => setFilter("Level")}>
            Level
          </button>
        </div>
        <div className="trending-grid">
          {getFilteredVideos().map((video, idx) => (
            <div
              key={video.id.videoId || video.id}
              className="challenge-card"
              onClick={() => handleVideoClick(video.id.videoId)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url || "/images/default_album.png"}
                alt={video.snippet.title}
                className="album-cover"
              />
              <div className="challenge-info">
                <div className={`challenge-title${video.snippet.title.length >= 15 ? " long-title" : ""}`}>
                  {video.snippet.title}
                </div>
                <span className="level">
                  Lv. <span className="hearts">❤️❤️❤️</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ▼▼ Scoring Section ▼▼ */}
      
      <div className="scoring-section">
        <div className="third-title">
          AI SCORING
        </div>
        {/* 메인 동영상 */}
        <div className="video-container">
          <video
            controls
            width="100%" // 비디오의 크기를 100%로 설정
            height="auto" // 자동으로 세로 비율을 맞춰 크기를 조정
          >
            <source 
              src={`${process.env.PUBLIC_URL}/video/challenge/go.mp4`} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
            {/* 비디오를 지원하지 않는 브라우저입니다. */}
          </video>
        </div>
        <div className="description">
          <div className="description-left">
            <p>
              정확도(Precision): 동작이 얼마나 정확하게 표현됐는지
            </p>
            
            <p>
              리듬감(Timing & Rhythm): 음악 박자와 얼마나 잘 맞는지
            </p>
            <p>
              표현력(Expression): 춤으로 감정과 스타일이 얼마나 잘 전달하는지
            </p>
          </div>
          <div className="description-right">
            <p>
              에너지(Energy): 동작이 얼마나 활기차고 힘있게 표현됐는지
            </p>
            <p>
              창의성(Creativity): 자신만의 스타일과 아이디어가 얼마나 잘 녹아있는지 
            </p>
          </div>
        </div>
        {/* 그래프 */}
        <div className="graph-container">
          <div className="graph">
            <div className="radar-chart">
              <video
                controls
                width="80%" // 비디오의 크기를 100%로 설정
                height="auto" // 자동으로 세로 비율을 맞춰 크기를 조정
                autoPlay loop muted controlsList="nodownload nofullscreen noremoteplayback">
                <source 
                  src={`${process.env.PUBLIC_URL}/video/challenge/radarchart.mp4`} 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
                {/* 비디오를 지원하지 않는 브라우저입니다. */}
              </video>
            </div>
            <h3 className="radar-chart-title">AI COMMENT</h3>
            <div className="ai-comment">
              "Great energy and rhythm! Keep practicing to improve your precision and timing."
            </div>
          </div>

          {/* 업로드 및 세이브 스코어 버튼 */}
          <div className="button-container">
            <button className="upload-btn" /* onClick={handleUploadClick} */>
              UPLOAD
            </button>
            <button className="save-btn" /* onClick={handleSaveClick} */>
              SAVE SCORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;

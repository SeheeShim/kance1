import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./Community.scss";

const Community = () => {
  const [videos, setVideos] = useState([]);

  // 테스트용 더미 데이터
  useEffect(() => {
    const dummyVideos = Array.from({ length: 11 }, (_, i) => ({
      id: { videoId: i },
      snippet: {
        title: `Video ${i + 1}`,
        thumbnails: { medium: { url: "https://via.placeholder.com/300x169?text=Video+" + (i+1) } }
      }
    }));
    setVideos(dummyVideos);
  }, []);

  return (
    <div className="challenge-section">
      <h2 className="title">K-pop Dance Community</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        slidesPerView={11}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        speed={6000}
        breakpoints={{
          1920: { slidesPerView: 11 },
          1440: { slidesPerView: 9 },
          1024: { slidesPerView: 7 },
          768: { slidesPerView: 5 },
          0: { slidesPerView: 3 },
        }}
        className="challenge-slider"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id.videoId} className="slide-item">
            <div className="video-card">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Community;

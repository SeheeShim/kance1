






import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./Challenge.scss";

const Challenge = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = ""; // 발급받은 키
      
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
  "안무shorts"
)}&type=video&maxResults=20&videoDuration=any&key=${API_KEY}`;
      const response = await axios.get(url);
      setVideos(response.data.items);
    };

    fetchVideos();
  }, []);

  return (
    <div className="challenge-section">
      <h2 className="title">K-pop Dance Challenge</h2>
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
        {videos
            .filter(video => video.id.kind === "youtube#video")
            .map((video) => (
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

export default Challenge;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./Challenge.scss";

const Challenge = () => {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = ""; // YouTube API 키 넣기

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        "kpop Dance tuto Shorts"
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
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        speed={9000}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        breakpoints={{
          1920: { slidesPerView: 9 },
          1440: { slidesPerView: 7 },
          1024: { slidesPerView: 5 },
          768: { slidesPerView: 4 },
          0: { slidesPerView: 3 },
        }}
        className="challenge-slider"
      >
        {videos
          .filter((video) => video.id.kind === "youtube#video")
          .map((video, index) => (
            <SwiperSlide key={video.id.videoId} className="slide-item">
              <div className="video-card">
                {index === activeIndex ? (
                  <iframe
                    width="180"
                    height="320"
                    src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={
                      video.snippet.thumbnails.high?.url ||
                      video.snippet.thumbnails.medium.url
                    }
                    alt={video.snippet.title}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Challenge;


import React, { useState, useMemo } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Community.scss";

const MAPBOX_TOKEN = "";

const countryCoords = {
  KR: [127.7669, 35.9078],
  US: [-95.7129, 37.0902],
  JP: [138.2529, 36.2048],
  BR: [-51.9253, -14.2350],
  FR: [2.2137, 46.2276],
  IN: [78.9629, 20.5937],
  AU: [133.7751, -25.2744],
  DE: [10.4515, 51.1657],
  CN: [104.1954, 35.8617],
};

const generateParticipants = (count = 50) => {
  const countries = Object.keys(countryCoords);
  return Array.from({ length: count }, (_, i) => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const videoNum = Math.floor(Math.random() * 35) + 1;
    return {
      id: i + 1,
      name: `User${i + 1}`,
      country,
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      score: Math.floor(Math.random() * 100),
      change: Math.floor(Math.random() * 11) - 5,
      video: `/video/shorts/shorts${videoNum}.mp4`,
    };
  });
};

export default function Community() {
  const participants = useMemo(() => generateParticipants(50), []);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [filterCountry, setFilterCountry] = useState("ALL");

  const perPage = 7;

  // 필터링된 참가자
  const filtered = participants.filter(
    (p) => filterCountry === "ALL" || p.country === filterCountry
  );

  const paginated = filtered.slice(page * perPage, page * perPage + perPage);

  const handleRankClick = (p) => setSelected(p);

  return (
    <div className="community-container">
      {/* 좌측 */}
      <div className="sidebar">
        {/* Top7 */}
        <div className="top-list">
          <h3>Top 7</h3>
          {filtered.slice(0, 7).map((p) => (
            <div
              key={p.id}
              className={`top-item ${selected?.id === p.id ? "active" : ""}`}
              onClick={() => handleRankClick(p)}
            >
              <video src={p.video} muted />
              <div className="info">
                <strong>{p.name}</strong> ({p.country})
              </div>
              <div className="stats">
                👍 {p.likes} | 👀 {p.views} | 점수 {p.score} |{" "}
                {p.change > 0 ? `▲${p.change}` : `▼${Math.abs(p.change)}`}
              </div>
            </div>
          ))}
        </div>

        {/* 국가 필터 + 8위 이후 */}
        <div className="bottom-rank">
          <div className="country-filter">
            <label>Country</label>
            <select
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setPage(0); // 페이지 리셋
              }}
            >
              <option value="ALL">ALL</option>
              {Object.keys(countryCoords).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div className="rankTable">
            <div className="rank-header">
              <h3>Ranking</h3>
              <div className="pagination">
                <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
                  Prev
                </button>
                <button
                  onClick={() =>
                    setPage((p) =>
                      (p + 1) * perPage < filtered.length ? p + 1 : p
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>이름</th>
                  <th>국가</th>
                  <th>좋아요</th>
                  <th>조회수</th>
                  <th>점수</th>
                  <th>변화</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((p, i) => (
                  <tr
                    key={p.id}
                    className={selected?.id === p.id ? "active" : ""}
                    onClick={() => handleRankClick(p)}
                  >
                    <td>{page * perPage + i + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.country}</td>
                    <td>{p.likes}</td>
                    <td>{p.views}</td>
                    <td>{p.score}</td>
                    <td>
                      {p.change > 0
                        ? `▲${p.change}`
                        : p.change < 0
                        ? `▼${Math.abs(p.change)}`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 우측 지도 + 영상 */}
      <div className="Right">
        <div className="map-wrapper">
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: 0,
              latitude: 20,
              zoom: 1.5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
          >
            {filtered.map((p) => {
              const coords = countryCoords[p.country];
              if (!coords) return null;
              return (
                <Marker
                  key={p.id}
                  longitude={coords[0]}
                  latitude={coords[1]}
                  anchor="center"
                >
                  <div
                    className={`marker ${
                      selected?.id === p.id ? "selected" : ""
                    }`}
                  />
                </Marker>
              );
            })}
          </Map>
        </div>

        <div className="video-player">
          {selected ? (
            <video src={selected.video} controls autoPlay />
          ) : (
            <p style={{ textAlign: "center", padding: "2rem" }}>
              랭킹을 선택하면 영상이 표시됩니다 🎬
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

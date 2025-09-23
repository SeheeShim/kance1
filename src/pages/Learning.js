import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "./Learning.scss";

/** --------------------------
 *  데모 데이터 (필요 경로 가이드)
 *  - 튜터 프로필:  /img/tutors/{id}.jpg
 *  - 스튜디오 사진: /img/studio/{id}_1.jpg ... _N.jpg
 *  - 유튜브는 id만 넣으면 됨(예: "E5ONTXHS2mM")
 * -------------------------- */
const TUTORS = [
  {
    id: "lia",
    name: "리아 킴",
    profile: "/img/Tutor/Tutor1.jpg",

    // --- 요약/소개 ---
    summary: "1MILLION 공동창립·총괄 안무가, 스우파2 출연",
    career: [
      "댄스 시작: 2005",
      "원밀리언 스튜디오 오픈: 2014–현재",
    ],
    bio: ['K-POP 안무가/디렉터. 원밀리언 스튜디오 대표',
          '스타일: Urban/Choreography.',
    ],
    // --- 경력/수상: UI에서 목록으로 뿌리기 쉬운 배열 형태 권장 ---
    awards: [
      { year: 2007, title: "World Dance Competition 4DA NEXT LEVEL", result: "관객 우승" },
      { year: 2008, title: "4DA NEXT LEVEL", result: "판정 우승 및 랭킹 준우승" },
      { year: 2009, title: "POP LOCK LAIDIES 팝핑", result: "우승자" },
      { year: 2012, title: "JAPAN Dance Delight vol.12", result: "FINAL 3위" },
      { year: 2013, title: "도시 힙합 페스티벌", result: "우승" },
      { year: 2016, title: "Soul Party 팝핑 부문", result: "우승" },
      { year: 2018, title: "가온차트 뮤직어워즈", result: "올해의 스타일상 커리어그라피 부문 수상" },
      { year: 2019, title: "제10회 대한민국 대중문화예술상", result: "문화체육관광부장관 표창" },
      { year: 2019, title: " MGMA 퍼포먼스 크리에이터", result: "수상" },
    ],

    // --- 스튜디오/사진/슬라이드 ---
    studio: {
      name: "Main Studio",
      address: "서울특별시 성동구 뚝섬로13길 33",
      photos: ["/img/studio/lia_1.jpg", "/img/studio/lia_2.jpg", "/img/studio/lia_3.jpg"]
    },

    // --- 안무 리스트(오른쪽 버튼 + TV 연동) ---
    choreos: [
      { title: "가시나", youtubeId: "2yepkSVeVsM" },
      { title: "HIP", youtubeId: "US2B33WeIak" },
      { title: "24시간이 모자라", youtubeId: "L65eFdY9RRI" },
      { title: "딩가딩가", youtubeId: "X6Brmaf27Tg" },
      { title: "사이렌", youtubeId: "MEQrAsB-2lY" },
      { title: "우아하게", youtubeId: "cszZgUUwLjE" },
      { title: "너무너무너무", youtubeId: "dpdwX9TVO8s" },
      { title: "WANNABE", youtubeId: "Vp9I_m6znMM" },
    ],
    // --- 예약 시간표 ---
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", location: "Main Studio", cap: 10, reserved: 8 },
      { date: "2025-09-16", time: "16:00 - 18:00", location: "Main Studio", cap: 10, reserved: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", location: "Main Studio", cap: 10, reserved: 6 },
      { date: "2025-09-19", time: "15:00 - 17:00", location: "Main Studio", cap: 10, reserved: 5 },
      { date: "2025-09-20", time: "12:00 - 14:30", location: "Main Studio", cap: 10, reserved: 10 }
    ],

    // 필요 시 태그/장르 등
    tags: ["K-pop", "Urban", "Choreo"]
  },
  // 나머지 9명은 같은 형식으로 추가 (임시 샘플)
  { 
    id: "leejung",
    name: "리정",
    profile: "/img/Tutor/Tutor2.jpg",
    studioPhotos: ["/img/studio/leejung_1.jpg"],
    choreos: [
      { title: "치맛바람", youtubeId: "sZ1q4b9m9t8" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "choi",
    name: "최영준",
    profile: "/img/Tutor/Tutor3.jpg",
    studioPhotos: ["/img/studio/choi_1.jpg"],
    choreos: [
      { title: "Nxde", youtubeId: "fCO7f0SmrDc" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
    { 
    id: "gabee",
    name: "가비",
    profile: "/img/Tutor/Tutor4.jpg",
    studioPhotos: ["/img/studio/gabee_1.jpg"],
    choreos: [
      { title: "Rollin'", youtubeId: "1dN3rP2qL6o" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "bailey",
    name: "Bailey",
    profile: "/img/Tutor/Tutor5.jpg",
    studioPhotos: ["/img/studio/bailey_1.jpg"],
    choreos: [
      { title: "Positions", youtubeId: "tcYodQoapMg" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "mina",
    name: "미나명",
    profile: "/img/Tutor/Tutor6.jpg",
    studioPhotos: ["/img/studio/mina_1.jpg"],
    choreos: [
      { title: "Dance The Night", youtubeId: "OiC1rgCPmUQ" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "bada",
    name: "이바다",
    profile: "/img/Tutor/Tutor7.jpg",
    studioPhotos: ["/img/studio/bada_1.jpg"],
    choreos: [
      { title: "Vibe", youtubeId: "Nn_TG2pF8PM" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "byj",
    name: "배윤정",
    profile: "/img/Tutor/Tutor8.jpg",
    studioPhotos: ["/img/studio/byj.jpg"],
    choreos: [
      { title: "Positions", youtubeId: "" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
  { 
    id: "bgy",
    name: "백구영",
    profile: "/img/Tutor/Tutor9.jpg",
    studioPhotos: ["/img/studio/bgy.jpg"],
    choreos: [
      { title: "Positions", youtubeId: "" },
    ],
    timetable: [
      { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8, cap: 10 },
      { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10 },
      { date: "2025-09-19", time: "12:00 - 14:00", reserved: 6, cap: 10 },
      { date: "2025-09-19", time: "15:00 - 17:00", reserved: 5, cap: 10 },
      { date: "2025-09-20", time: "12:00 - 14:30", reserved: 10, cap: 10 },
    ]
  },
];

export default function Learning() {
  const [view, setView] = useState("list"); // 'list' | 'detail' | 'booking'
  const [selectedTutor, setSelectedTutor] = useState(TUTORS[0]);
  const [activeChoreo, setActiveChoreo] = useState(TUTORS[0].choreos[0]);
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' | 'kpop'
  const [showTop, setShowTop] = useState(false);

  // scrollTop 버튼 표시
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openTutor = (t) => {
    setSelectedTutor(t);
    setActiveChoreo(t.choreos[0] || null);
    setActiveTab("kpop"); // 상세 진입 시 How to Dance 보이도록
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="learning">
      {view === "list" && <TutorList tutors={TUTORS} onOpen={openTutor} />}
      {view === "detail" && (
        <TutorDetail
          tutor={selectedTutor}
          activeChoreo={activeChoreo}
          setActiveChoreo={setActiveChoreo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBook={() => setView("booking")}
          onBack={() => setView("list")}
        />
      )}
      {view === "booking" && (
        <Booking
          tutor={selectedTutor}
          onBack={() => setView("detail")}
        />
      )}

      {showTop && (
        <button
          className="to-top"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ▲
        </button>
      )}
    </div>
  );
}

/* ---------- 1) 튜터 목록 페이지 ---------- */
function TutorList({ tutors, onOpen }) {
  return (
    <section className="tutor-list container">
      <h1>DANCE TUTORS</h1>
      <ul className="grid">
        {tutors.map((t) => (
          <li key={t.id} className="tutor-card" onClick={() => onOpen(t)}>
            <div className="avatar" style={{ backgroundImage: `url(${t.profile})` }} />
            <span className="name">{t.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 2) 튜터 상세 + How to Dance ---------- */
function TutorDetail({ tutor, activeChoreo, setActiveChoreo, activeTab, setActiveTab, onBook, onBack }) {
  return (
    <section className="tutor-detail container">
      <button className="back" onClick={onBack}>← 목록으로</button>

      <div className="hero">
        <div className="portrait" style={{ backgroundImage: `url(${tutor.profile})` }} />
        <div className="bio">
          <h2>Tutor - {tutor.name}</h2>
          <p className="muted">{tutor.summary}</p>
          <br></br>
          <section className="about">
          <h3>경력</h3>
          <ul>{tutor.career.map((c,i)=><li key={i}>{c}</li>)}</ul>
          
          {/* TV 프레임 + 오른쪽 안무 리스트 */}
          <div className="tv-row">
            <div className="tv">
              <i className="ant ant-left"  aria-hidden="true" />
              <i className="ant ant-right" aria-hidden="true" />
              {/* <i className="ant-tab"      aria-hidden="true" /> */}
              {activeChoreo ? (
                <iframe
                  title={activeChoreo.title}
                  src={`https://www.youtube.com/embed/${activeChoreo.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="tv-empty">영상 선택</div>
              )}
            </div>

            <ul className="choreo-list">
              {tutor.choreos.map((c) => {
                const active = activeChoreo && c.title === activeChoreo.title;
                return (
                  <li
                    key={c.title}
                    className={active ? "active" : ""}
                    onClick={() => setActiveChoreo(c)}
                  >
                    {c.title}
                  </li>
                );
              })}
            </ul>
          </div>

          <h3>수상 내역</h3>
          <ul>{tutor.awards.map((a,i)=><li key={i}>
            {a.year} · {a.title} {a.result && `– ${a.result}`}
          </li>)}</ul>

          {tutor.bio && (<>
            <h3>소개</h3>
            <p className="muted" style={{whiteSpace:"pre-line"}}>{tutor.bio}</p>
          </>)}
        </section>

          <div className="line" />

          {/* How to Dance (책갈피) */}
          <div className="howto">
            <h3>How to Dance</h3>

            <div className="tabs">
              <button
                className={`tab ${activeTab === "basic" ? "front" : "back"}`}
                onClick={() => setActiveTab("basic")}
              >
                기본기
              </button>
              <button
                className={`tab ${activeTab === "kpop" ? "front" : "back"}`}
                onClick={() => setActiveTab("kpop")}
              >
                K-pop
              </button>
            </div>

            <div className="tab-panel">
              {activeTab === "basic" ? (
                <div className="panel-inner">
                  <p className="muted">기본 리듬·아이솔레이션·스텝을 차근차근!</p>
                  <div className="video-cover">
                    <iframe
                      title="기본기"
                      src="https://www.youtube.com/embed/0qisGSwZym4"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="panel-inner">
                  <p className="muted">K-pop 콤비네이션을 루틴으로 익혀요.</p>
                  <div className="video-cover">
                    <iframe
                      title="K-pop"
                      src={`https://www.youtube.com/embed/${(activeChoreo && activeChoreo.youtubeId) || "E5ONTXHS2mM"}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="cta-row">
              <button className="book" onClick={onBook}>예약하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ---------- 3) 예약 페이지 (필터 드롭다운 + 스크롤) ---------- */
function Booking({ tutor, onBack }) {
  // 슬라이드
  const defaultPhotos = (tutor.studioPhotos?.length ? tutor.studioPhotos : [tutor.profile]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  // ---- 필터 데이터 소스 ----
  const allTutors = TUTORS;
    const allLocations = useMemo(() => {
    const s = new Set();
    allTutors.forEach(t => (t.locations || ["Main Studio"]).forEach(l => s.add(l)));
    return Array.from(s);
  }, [allTutors]);

  // ---- 필터 상태 ----
  const [locOpen, setLocOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const [location, setLocation] = useState(allLocations[0] || "Seoul");
  // 'all'이면 전체 강사 가용성 조회
  const [tutorId, setTutorId] = useState(tutor?.id || "all");
  const currentTutor = useMemo(
    () => allTutors.find(t => t.id === tutorId) || tutor,
    [tutorId, tutor, allTutors]
  );

  const [date, setDate] = useState("");           // YYYY-MM-DD
  const [start, setStart] = useState("00:00");    // HH:mm
  const [end, setEnd]     = useState("23:59");    // HH:mm

  // ---- 바깥 클릭 닫기 ----
  useEffect(() => {
    const onClick = (e) => {
      const sel = (cls) => e.target.closest(cls);
      if (!sel(".dd")) { setLocOpen(false); setTutorOpen(false); setTimeOpen(false); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // ---- 3초 자동 슬라이드 (현재 선택 튜터 사진) ----
  const photos = (currentTutor?.studioPhotos?.length ? currentTutor.studioPhotos : defaultPhotos);
  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % photos.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [photos.length]);
  const pause = () => clearInterval(timerRef.current);
  const play  = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % photos.length), 3000);
  };

  // ---- 시간 겹침 체크 ----
  const toMin = useCallback((hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
   return (h || 0) * 60 + (m || 0);
 }, []);
 const overlap = useCallback((slot, s, e) => {
    const m = slot.match(/^\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\s*$/);
    if (!m) return true;
    const A=toMin(m[1]), B=toMin(m[2]), S=toMin(s), E=toMin(e);
    return !(B < S || E < A);
  }, [toMin]);

  // ---- 시간표 합치기(‘All Tutors’ 지원) + 필터링 ----
  const rows = useMemo(() => {
    // 원본 행에 tutor 정보 주입
    const mkRows = (t) => (t.timetable?.length ? t.timetable : demoTimetable())
      .map(r => ({ ...r, _tutorId: t.id, _tutorName: t.name, _photos: t.studioPhotos }));
    const pool = tutorId === "all" ? allTutors.flatMap(mkRows) : mkRows(currentTutor);

    return pool.filter(r => {
      const matchLoc  = r.location ? r.location === location : true;
      const matchDate = date ? r.date === date : true;
      const matchTime = overlap(r.time, start, end);
      return matchLoc && matchDate && matchTime;
    });
  }, [allTutors, currentTutor, tutorId, location, date, start, end, overlap]);

  // ---- 예약 버튼 ----
  const onBookClick = (r) => {
    if (r.reserved >= r.cap) return;
    alert(`${r._tutorName} / ${r.date} ${r.time} / ${r.location || location} 예약 요청되었습니다!`);
  };

  return (
    <section className="booking container">
      <button className="back" onClick={onBack}>← 튜터 상세로</button>

      {/* 상단 드롭다운 필터 */}
      <div className="book-controls">
        {/* Location */}
        <div className="control dd" onClick={(e)=>e.stopPropagation()}>
          <label>Location</label>
          <button className="dd-toggle" onClick={()=>{ setLocOpen(!locOpen); setTutorOpen(false); setTimeOpen(false);}}>
            <span>{location}</span><i>▾</i>
          </button>
          {locOpen && (
            <div className="dd-menu scroll">
              {/* 3~4개 보이도록, 나머지는 스크롤 */}
              {allLocations.map(loc => (
                <div
                  key={loc}
                  className={`dd-item ${loc===location ? "active":""}`}
                  onClick={()=>{ setLocation(loc); setLocOpen(false); }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tutor */}
        <div className="control dd" onClick={(e)=>e.stopPropagation()}>
          <label>Tutor</label>
          <button className="dd-toggle" onClick={()=>{ setTutorOpen(!tutorOpen); setLocOpen(false); setTimeOpen(false);}}>
            <span>{tutorId === "all" ? "All Tutors" : (currentTutor?.name || "Tutor")}</span><i>▾</i>
          </button>
          {tutorOpen && (
            <div className="dd-menu scroll">
              <div
                className={`dd-item ${tutorId==="all"?"active":""}`}
                onClick={()=>{ setTutorId("all"); setTutorOpen(false); }}
              >All Tutors</div>
              {allTutors.map(t => (
                <div
                  key={t.id}
                  className={`dd-item ${t.id===tutorId ? "active":""}`}
                  onClick={()=>{ setTutorId(t.id); setTutorOpen(false); }}
                >
                  {t.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time (YMD + 시간범위) */}
        <div className="control dd" onClick={(e)=>e.stopPropagation()}>
          <label>Time</label>
          <button className="dd-toggle" onClick={()=>{ setTimeOpen(!timeOpen); setLocOpen(false); setTutorOpen(false);}}>
            <span>{date || "YYYY-MM-DD"} · {start} ~ {end}</span><i>▾</i>
          </button>
          {timeOpen && (
            <div className="dd-menu timebox" onClick={(e)=>e.stopPropagation()}>
              <div className="row">
                <span>YMD</span>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              </div>
              <div className="row">
                <span>Time</span>
                <div className="time-range">
                  <input type="time" value={start} onChange={(e)=>setStart(e.target.value)} />
                  <em>–</em>
                  <input type="time" value={end} onChange={(e)=>setEnd(e.target.value)} />
                </div>
              </div>
              <div className="row actions">
                <button className="ghost" onClick={()=>{ setDate(""); setStart("00:00"); setEnd("23:59"); setTimeOpen(false); }}>초기화</button>
                <button className="apply" onClick={()=>setTimeOpen(false)}>적용</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`book-grid ${tutorId==="all" ? "all" : ""}`}>
        {/* 좌: 3초 슬라이드 (선택 튜터 기준) */}
        <div className="left" onMouseEnter={pause} onMouseLeave={play}>
          <div className="photo" style={{ backgroundImage: `url(${photos[idx]})` }} />
          <div className="dots">
            {photos.map((_, i) => (
              <button key={i} className={i===idx ? "dot active" : "dot"} onClick={()=>setIdx(i)} />
            ))}
          </div>
        </div>

        {/* 우: 시간표 */}
        <div className="right">
        <h2>{tutorId === "all" ? "All Tutors — Availability" : `${currentTutor?.name}’s Dancing Class`}</h2>

        {/* 단일 튜터 = compact / 전체 튜터 = all */}
        <div className={`table ${tutorId === "all" ? "all" : "compact"}`}>
            {/* 헤더: 2번 디자인처럼 3개만 노출 (Date / Time / Reservation) */}
            <div className="thead">
            {tutorId === "all" && <span className="hcol tutor">Tutor</span>}
            <span className="hcol date">Date</span>
            <span className="hcol time">Time</span>
            {tutorId === "all" && <span className="hcol location">Location</span>}
            <span className="hcol resv">Reservation</span>
            <span className="hcol book" aria-hidden="true"><FontAwesomeIcon icon={faCheck} /></span>
            </div>

            <div className="tbody">
            {rows.length === 0 && (
                <div className="row empty"><span>조건에 맞는 수업이 없습니다.</span></div>
            )}

            {rows.map((r, i) => {
                const full = r.reserved >= r.cap;
                return (
                <div key={i} className="row">
                    {tutorId === "all" && <span className="tutor">{r._tutorName}</span>}
                    <span className="date">{r.date}</span>
                    <span className="time">{r.time}</span>
                    {tutorId === "all" && <span className="location">{r.location || location}</span>}
                    <span className="resv">{r.reserved}/{r.cap}</span>
                    <span className="book">
                    <button
                        className={`pill ${full ? "disabled" : "ok"}`}
                        disabled={full}
                        onClick={() => onBookClick(r)}
                    >
                        {full ? "X" : "O"}
                    </button>
                    </span>
                </div>
                );
            })}
            </div>
        </div>
        </div>
      </div>
    </section>
  );
}
function demoTimetable() {
  return [
    { date: "2025-09-16", time: "13:00 - 15:00", reserved: 8,  cap: 10, location: "Seoul" },
    { date: "2025-09-16", time: "16:00 - 18:00", reserved: 10, cap: 10, location: "Gangnam" },
    { date: "2025-09-19", time: "12:00 - 14:00", reserved: 5,  cap: 10, location: "Hongdae" },
    { date: "2025-09-19", time: "15:00 - 17:00", reserved: 7,  cap: 10, location: "Seoul" },
  ];
}



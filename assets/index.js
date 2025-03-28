
import React from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import { BrowserRouter, Routes, Route, Link } from "https://esm.sh/react-router-dom@6";

const NavBar = () => (
  <div style={{ background: '#1e3a8a', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    <strong>ECUST 电竞部</strong>
    <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
      <Link to="/news" style={{ color: 'white' }}>公告</Link>
      <Link to="/games" style={{ color: 'white' }}>比赛</Link>
      <Link to="/schedule" style={{ color: 'white' }}>赛程查询</Link>
      <Link to="/ranking" style={{ color: 'white' }}>实时积分榜</Link>
      <Link to="/events" style={{ color: 'white' }}>活动</Link>
      <Link to="/contact" style={{ color: 'white' }}>联系我们</Link>
    </nav>
  </div>
);

const news = [
  "🔥 校内英雄联盟联赛即将开战！",
  "📢 2025春季赛报名已开启！",
  "🎉 电竞部荣获市级最佳组织奖！"
];

const Home = () => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % news.length), 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
      padding: '2rem',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>ECUST 电竞部</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['/news','/games','/schedule','/ranking','/events','/contact'].map((path, i) => (
          <Link key={i} to={path} style={{
            background: 'white', color: '#2563eb', padding: '0.5rem 1rem',
            borderRadius: '999px', fontWeight: 'bold'
          }}>{['公告','比赛','赛程查询','实时积分榜','活动','联系我们'][i]}</Link>
        ))}
      </div>
      <div style={{ background: 'white', color: '#2563eb', borderRadius: '1rem', padding: '1rem', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
        <p>{news[index]}</p>
      </div>
    </div>
  );
};

const SchedulePage = () => {
  const [query, setQuery] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);
  React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/hearthewind9/ecustegame-website/schedule.json")
      .then(res => res.json()).then(data => setSchedule(data));
  }, []);
  const filtered = schedule.filter(row =>
    query === "" || Object.values(row).some(cell =>
      cell && cell.toString().replace(/\s+/g, '').toLowerCase()
        .includes(query.replace(/\s+/g, '').toLowerCase())
    )
  );
  return (
    <div style={{ background: '#eff6ff', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>赛程查询</h2>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <input type="text" placeholder="搜索队伍、裁判、时间…" value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: '0.75rem', width: '100%', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #93c5fd' }} />
        <table style={{ width: '100%', background: 'white', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#bfdbfe' }}>
            <tr>{['组别','阶段','日期','时间','队伍1','队伍2','裁判'].map(h =>
              <th key={h} style={{ padding: '0.5rem' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} style={{ background: idx % 2 ? '#ffffff' : '#eff6ff' }}>
                {['组别','阶段','日期','时间','队伍1','队伍2','裁判'].map(k =>
                  <td key={k} style={{ textAlign: 'center', padding: '0.5rem' }}>{row[k]}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Page = ({ title }) => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
    <h2 style={{ fontSize: '2rem', color: '#334155' }}>{title}</h2>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/news" element={<Page title="公告页面（待建设）" />} />
        <Route path="/games" element={<Page title="比赛页面（待建设）" />} />
        <Route path="/ranking" element={<Page title="实时积分榜页面（开发中）" />} />
        <Route path="/events" element={<Page title="活动页面（待填充）" />} />
        <Route path="/contact" element={<Page title="联系我们页面" />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);

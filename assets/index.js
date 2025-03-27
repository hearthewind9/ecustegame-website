
import React from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

const App = () => {
  const [query, setQuery] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);

  React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/hearthewind9/ecustegame-website/schedule.json")
      .then(res => res.json())
      .then(data => setSchedule(data));
  }, []);

  const filtered = schedule.filter(row =>
    query === "" || Object.values(row).some(cell =>
      cell && cell.toString().replace(/\s+/g, '').toLowerCase()
        .includes(query.replace(/\s+/g, '').toLowerCase())
    )
  );

  return (
    React.createElement("div", { style: {
      background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
      minHeight: '100vh',
      padding: '2rem',
      color: 'white',
      fontFamily: 'sans-serif'
    }},
      React.createElement("div", { style: { maxWidth: '1000px', margin: '0 auto' }},
        React.createElement("header", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }},
          React.createElement("h1", { style: { fontSize: '2rem', fontWeight: 'bold' } }, "🎮 ECUST 电竞部官网"),
          React.createElement("a", { href: "https://ecustegame.top", style: { color: '#6aa0ff', textDecoration: 'underline' } }, "访问主页")
        ),
        React.createElement("div", { style: { backgroundColor: '#222', borderRadius: '1rem', padding: '1rem' }},
          React.createElement("input", {
            type: "text",
            placeholder: "🔍 搜索日期、队伍、裁判...",
            value: query,
            onChange: e => setQuery(e.target.value),
            style: {
              padding: '0.75rem',
              marginBottom: '1rem',
              width: '100%',
              borderRadius: '0.5rem',
              border: 'none'
            }
          }),
          React.createElement("div", { style: { overflowX: 'auto' }},
            React.createElement("table", { border: 1, cellPadding: 6, style: { width: '100%', borderCollapse: 'collapse', background: '#111' }},
              React.createElement("thead", null,
                React.createElement("tr", null,
                  ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(h =>
                    React.createElement("th", { key: h, style: { background: '#333', padding: '0.5rem' } }, h)
                  )
                )
              ),
              React.createElement("tbody", null,
                filtered.map((row, idx) =>
                  React.createElement("tr", {
                    key: idx,
                    style: { background: idx % 2 === 0 ? '#1a1a1a' : '#111' }
                  },
                    ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(k =>
                      React.createElement("td", { key: k, style: { textAlign: 'center', padding: '0.5rem' } }, row[k])
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement("footer", { style: { textAlign: 'center', color: '#aaa', marginTop: '2rem', fontSize: '0.875rem' } },
          "© 2025 华东理工大学 电竞部 | Made by Hearthewind"
        )
      )
    )
  );
};

createRoot(document.getElementById("root")).render(React.createElement(App));

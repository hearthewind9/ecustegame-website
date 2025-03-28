
import React from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "https://esm.sh/react-router-dom@6";

const NavBar = () => React.createElement(
  "div",
  {
    style: {
      background: "#1e3a8a",
      color: "white",
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }
  },
  React.createElement("strong", null, "ECUST 电竞部"),
  React.createElement(
    "nav",
    { style: { display: "flex", gap: "1rem", fontSize: "0.9rem" } },
    ["/news", "/games", "/schedule", "/ranking", "/events", "/contact"].map((to, i) =>
      React.createElement(
        Link,
        { to, style: { color: "white" }, key: i },
        ["公告", "比赛", "赛程查询", "实时积分榜", "活动", "联系我们"][i]
      )
    )
  )
);

const news = [
  "🔥 校内英雄联盟联赛即将开战！",
  "📢 2025春季赛报名已开启！",
  "🎉 电竞部荣获市级最佳组织奖！"
];

const Home = () => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % news.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #60a5fa, #3b82f6)",
        padding: "2rem",
        color: "white"
      }
    },
    React.createElement(
      "h1",
      { style: { fontSize: "2rem", textAlign: "center", marginBottom: "1.5rem" } },
      "ECUST 电竞部"
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem"
        }
      },
      ["/news", "/games", "/schedule", "/ranking", "/events", "/contact"].map((to, i) =>
        React.createElement(
          Link,
          {
            to,
            key: i,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          },
          ["公告", "比赛", "赛程查询", "实时积分榜", "活动", "联系我们"][i]
        )
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          background: "white",
          color: "#2563eb",
          borderRadius: "1rem",
          padding: "1rem",
          textAlign: "center",
          maxWidth: 500,
          margin: "0 auto"
        }
      },
      React.createElement("p", null, news[index])
    )
  );
};

const SchedulePage = () => {
  const [query, setQuery] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);
  React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/hearthewind9/ecustegame-website/schedule.json")
      .then(res => res.json())
      .then(data => setSchedule(data));
  }, []);
  const filtered = schedule.filter(row =>
    query === "" || Object.values(row).some(cell =>
      cell && cell.toString().replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
    )
  );
  return React.createElement(
    "div",
    { style: { background: "#eff6ff", minHeight: "100vh", padding: "2rem" } },
    React.createElement("h2", { style: { textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" } }, "赛程查询"),
    React.createElement(
      "div",
      { style: { maxWidth: 800, margin: "0 auto" } },
      React.createElement("input", {
        type: "text",
        placeholder: "搜索队伍、裁判、时间…",
        value: query,
        onChange: e => setQuery(e.target.value),
        style: {
          padding: "0.75rem",
          width: "100%",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #93c5fd"
        }
      }),
      React.createElement(
        "table",
        { style: { width: "100%", background: "white", borderCollapse: "collapse" } },
        React.createElement(
          "thead",
          { style: { background: "#bfdbfe" } },
          React.createElement(
            "tr",
            null,
            ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(h =>
              React.createElement("th", { key: h, style: { padding: "0.5rem" } }, h)
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          filtered.map((row, idx) =>
            React.createElement(
              "tr",
              { key: idx, style: { background: idx % 2 ? "#ffffff" : "#eff6ff" } },
              ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(k =>
                React.createElement("td", { key: k, style: { textAlign: "center", padding: "0.5rem" } }, row[k])
              )
            )
          )
        )
      )
    )
  );
};

const Page = ({ title }) =>
  React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9"
      }
    },
    React.createElement("h2", { style: { fontSize: "2rem", color: "#334155" } }, title)
  );

const App = () =>
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(NavBar),
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/", element: React.createElement(Home) }),
      React.createElement(Route, { path: "/schedule", element: React.createElement(SchedulePage) }),
      React.createElement(Route, { path: "/news", element: React.createElement(Page, { title: "公告页面（待建设）" }) }),
      React.createElement(Route, { path: "/games", element: React.createElement(Page, { title: "比赛页面（待建设）" }) }),
      React.createElement(Route, { path: "/ranking", element: React.createElement(Page, { title: "实时积分榜页面（开发中）" }) }),
      React.createElement(Route, { path: "/events", element: React.createElement(Page, { title: "活动页面（待填充）" }) }),
      React.createElement(Route, { path: "/contact", element: React.createElement(Page, { title: "联系我们页面" }) })
    )
  );

createRoot(document.getElementById("root")).render(React.createElement(App));


const { createElement, useEffect, useState } = React;
const { createRoot } = ReactDOM;
const {
  BrowserRouter,
  Route,
  Switch,
  Link
} = ReactRouterDOM;

const NavBar = () => createElement(
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
  createElement(
    Link,
    { to: "/", style: { color: "white", fontWeight: "bold", fontSize: "1.1rem", textDecoration: "none" } },
    "ECUST 电竞部"
  ),
  createElement(
    "nav",
    { style: { display: "flex", gap: "1rem", fontSize: "0.9rem" } },
    ["/news", "/games", "/schedule", "/ranking", "/events", "/contact"].map((to, i) =>
      createElement(
        Link,
        { to, style: { color: "white" }, key: i },
        ["公告", "比赛", "赛程查询", "实时积分榜", "活动", "联系我们"][i]
      )
    )
  )
);

const Footer = () =>
  createElement("footer", null, "© 2025 电竞部 ｜ 技术支持：Hearthewind");

const PageWrapper = (children) =>
  createElement(React.Fragment, null, children, createElement(Footer));

const games = [
  { year: 2025, name: "无畏契约 神将杯", path: "valorant-shenjiang" },
  { year: 2025, name: "云顶之弈 弈理杯", path: "yunding-yili" },
  { year: 2024, name: "无畏契约 瓦理杯 S1", path: "valorant-wali" },
  { year: 2024, name: "英雄联盟 明德杯 S2", path: "lol-mingde-s2" },
  { year: 2023, name: "第二届华理SOLO赛", path: "lol-solo-2nd" },
  { year: 2023, name: "英雄联盟 明德杯 S1", path: "lol-mingde-s1" },
  { year: 2022, name: "第一届华理SOLO赛", path: "lol-solo-1st" }
];

const GamesPage = () => PageWrapper(
  createElement("div", {
    style: {
      background: "#eff6ff",
      minHeight: "100vh",
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto"
    }
  },
    createElement("h2", { style: { textAlign: "center", marginBottom: "1.5rem" } }, "历届比赛"),
    games.map(game =>
      createElement(Link, {
        key: game.path,
        to: `/games/${game.path}`,
        className: "game-button"
      }, `【${game.year}】${game.name}`)
    )
  )
);

const GamePlaceholder = ({ title }) => PageWrapper(
  createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9"
    }
  }, createElement("h2", { style: { fontSize: "1.8rem", color: "#334155" } }, `${title} 页面建设中...`))
);

const App = () => createElement(
  BrowserRouter,
  null,
  createElement(NavBar),
  createElement(
    Switch,
    null,
    createElement(Route, { exact: true, path: "/", component: () => GamePlaceholder({ title: "首页" }) }),
    createElement(Route, { exact: true, path: "/schedule", component: () => GamePlaceholder({ title: "赛程查询" }) }),
    createElement(Route, { exact: true, path: "/contact", component: () => GamePlaceholder({ title: "联系我们" }) }),
    createElement(Route, { exact: true, path: "/games", component: GamesPage }),
    ...games.map(game =>
      createElement(Route, {
        key: game.path,
        path: `/games/${game.path}`,
        component: () => GamePlaceholder({ title: game.name })
      })
    )
  )
);

createRoot(document.getElementById("root")).render(createElement(App));


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

const Home = () => {
  const [index, setIndex] = useState(0);
  const news = [
    "🔥 校内英雄联盟联赛即将开战！",
    "📢 2025春季赛报名已开启！",
    "🎉 电竞部荣获市级最佳组织奖！"
  ];
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % news.length), 3000);
    return () => clearInterval(interval);
  }, []);
  return PageWrapper(
    createElement(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #60a5fa, #3b82f6)",
          padding: "2rem",
          color: "white"
        }
      },
      createElement(
        "h1",
        { style: { fontSize: "2rem", textAlign: "center", marginBottom: "1.5rem" } },
        "ECUST 电竞部"
      ),
      createElement(
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
          createElement(
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
      createElement(
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
        createElement("p", null, news[index])
      ),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2rem"
          }
        },
        ["/lol", "/valorant", "/cs2", "/ow"].map((to, i) =>
          createElement(
            Link,
            {
              to,
              key: i,
              style: {
                background: "#1e3a8a",
                color: "white",
                padding: "0.75rem 1.25rem",
                borderRadius: "0.75rem",
                fontWeight: "bold"
              }
            },
            ["英雄联盟", "无畏契约", "CS2", "守望先锋"][i]
          )
        )
      )
    )
  );
};

const Page = ({ title }) =>
  PageWrapper(
    createElement(
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
      createElement("h2", { style: { fontSize: "2rem", color: "#334155" } }, title)
    )
  );

const App = () => createElement(
  BrowserRouter,
  null,
  createElement(NavBar),
  createElement(
    Switch,
    null,
    createElement(Route, { exact: true, path: "/", component: Home }),
    createElement(Route, { path: "/lol", component: () => Page({ title: "英雄联盟页面（开发中）" }) }),
    createElement(Route, { path: "/valorant", component: () => Page({ title: "无畏契约页面（开发中）" }) }),
    createElement(Route, { path: "/cs2", component: () => Page({ title: "CS2 页面（开发中）" }) }),
    createElement(Route, { path: "/ow", component: () => Page({ title: "守望先锋页面（开发中）" }) }),
    createElement(Route, { path: "/schedule", component: () => Page({ title: "赛程查询页面" }) }),
    createElement(Route, { path: "/news", component: () => Page({ title: "公告页面（待建设）" }) }),
    createElement(Route, { path: "/games", component: () => Page({ title: "比赛页面（待建设）" }) }),
    createElement(Route, { path: "/ranking", component: () => Page({ title: "实时积分榜页面（开发中）" }) }),
    createElement(Route, { path: "/events", component: () => Page({ title: "活动页面（待填充）" }) }),
    createElement(Route, { path: "/contact", component: () => Page({ title: "联系我们页面" }) })
  )
);

createRoot(document.getElementById("root")).render(createElement(App));

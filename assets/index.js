
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

const groupData = [
  ["微信公众号", "花梨电竞"],
  ["英勇之地", "926265440"], ["三角洲行动", "552750103"], ["Apex", "619091353"],
  ["绝地求生", "343683662"], ["最终幻想14", "659946675"], ["MC", "484506558"],
  ["星际", "581341861"], ["LOL", "532365245"], ["DOTA2", "547342217"],
  ["炉石（新）", "658783577"], ["炉石（老）", "372511770"], ["CSGO", "312064523"],
  ["王者荣耀", "626314374"], ["war3", "104049397"], ["CFM", "563277221"],
  ["QQ飞车", "694464743"], ["战舰世界工会", "ECUST"], ["OW", "626180600"],
  ["R6", "115950211"], ["命运2公会", "941699421"], ["永劫无间振刀", "1017681895"],
  ["瓦洛兰特", "639366489"], ["战地", "764552791"], ["死锁DeadLock", "826542331"],
  ["lolm", "604345565"], ["COD（双端均可）", "862900842"]
];

const ContactPage = () => PageWrapper(
  createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#eff6ff",
      padding: "2rem",
      color: "#1e3a8a"
    }
  },
    createElement("h2", { style: { textAlign: "center" } }, "各大游戏群请参考以下群号，大家玩的开心！"),
    createElement("p", { style: { maxWidth: 700, margin: "1rem auto", fontSize: "0.9rem", textAlign: "center" } },
      "首先，各位要清楚，这些群不知道还活没活着，活着可能也是些老登，电竞部只做宣传。
各位如有需求，可以找到同好，拉建新群，联系我来改公告宣传哝！"
    ),
    createElement("div", { className: "group-list" },
      groupData.map(([name, id], idx) =>
        createElement("div", { className: "group-item", key: idx },
          createElement("strong", null, name),
          createElement("div", null, id)
        )
      )
    )
  )
);

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
    createElement(Route, { exact: true, path: "/", component: () => Page({ title: "首页（开发中）" }) }),
    createElement(Route, { path: "/contact", component: ContactPage }),
    createElement(Route, { path: "/news", component: () => Page({ title: "公告页面（开发中）" }) }),
    createElement(Route, { path: "/games", component: () => Page({ title: "比赛页面（开发中）" }) }),
    createElement(Route, { path: "/schedule", component: () => Page({ title: "赛程页面（开发中）" }) }),
    createElement(Route, { path: "/ranking", component: () => Page({ title: "积分榜页面（开发中）" }) }),
    createElement(Route, { path: "/events", component: () => Page({ title: "活动页面（开发中）" }) })
  )
);

createRoot(document.getElementById("root")).render(createElement(App));

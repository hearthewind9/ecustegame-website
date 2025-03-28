
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
      )
    )
  );
};

const SchedulePage = () => {
  const [query, setQuery] = useState("");
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/hearthewind9/ecustegame-website/schedule.json")
      .then(res => res.json()).then(data => setSchedule(data));
  }, []);
  const filtered = schedule.filter(row =>
    query === "" || Object.values(row).some(cell =>
      cell && cell.toString().replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
    )
  );
  return PageWrapper(
    createElement(
      "div",
      { style: { background: "#eff6ff", minHeight: "100vh", padding: "2rem" } },
      createElement("h2", { style: { textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" } }, "赛程查询"),
      createElement(
        "div",
        { style: { maxWidth: 800, margin: "0 auto" } },
        createElement("input", {
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
        createElement(
          "table",
          { style: { width: "100%", background: "white", borderCollapse: "collapse" } },
          createElement(
            "thead",
            { style: { background: "#bfdbfe" } },
            createElement(
              "tr",
              null,
              ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(h =>
                createElement("th", { key: h, style: { padding: "0.5rem" } }, h)
              )
            )
          ),
          createElement(
            "tbody",
            null,
            filtered.map((row, idx) =>
              createElement(
                "tr",
                { key: idx, style: { background: idx % 2 ? "#ffffff" : "#eff6ff" } },
                ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(k =>
                  createElement("td", { key: k, style: { textAlign: "center", padding: "0.5rem" } }, row[k])
                )
              )
            )
          )
        )
      )
    )
  );
};

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
    createElement("p", {
      style: { maxWidth: 700, margin: "1rem auto", fontSize: "0.9rem", textAlign: "center" }
    }, "首先，各位要清楚，这些群不知道还活没活着，活着可能也是些老登，电竞部只做宣传。"),
    createElement("p", {
      style: { maxWidth: 700, margin: "-0.5rem auto 1rem", fontSize: "0.9rem", textAlign: "center" }
    }, "各位如有需求，可以找到同好，拉建新群，联系我来改公告宣传哝！"),
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

const App = () => createElement(
  BrowserRouter,
  null,
  createElement(NavBar),
  createElement(
    Switch,
    null,
    createElement(Route, { exact: true, path: "/", component: Home }),
    createElement(Route, { path: "/schedule", component: SchedulePage }),
    createElement(Route, { path: "/contact", component: ContactPage })
  )
);

createRoot(document.getElementById("root")).render(createElement(App));

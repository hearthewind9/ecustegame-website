function toBase64Unicode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

async function submitToGitHub(filename, data) {
  const res = await fetch("https://api.github.com/repos/hearthewind9/ecustegame-website/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github.everest-preview+json",
      "Content-Type": "application/json",
      // "Authorization": "Bearer ghp_..." // 本地测试写，部署时一定要删除
    },
    body: JSON.stringify({
      event_type: "submit-form",
      client_payload: {
        secret: "shenj!ang2025-secret", // 要与 GitHub Actions 校验一致
        filename: filename,
        data: JSON.stringify(data, null, 2)
      }
    })
  });

  if (!res.ok) {
    alert("❌ 提交失败，请稍后再试");
    console.error(await res.json());
  } else {
    alert("✅ 提交成功，感谢你的反馈！");
  }
}


const { createElement, useEffect, useState } = React;
const { createRoot } = ReactDOM;
const {
  HashRouter,
  Route,
  Switch,
  Link,
  useParams
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
    [
      createElement(Link, { to: "/news", key: 0, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "公告"),
      createElement("a", { href: "games.html", key: 1, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "比赛"),
      createElement(Link, { to: "/schedule", key: 2, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "赛程查询"),
      createElement(Link, { to: "/ranking", key: 3, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "实时积分榜"),
      createElement(Link, { to: "/events", key: 4, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "活动"),
      createElement(Link, { to: "/contact", key: 5, style: { color: "white", textDecoration: "none", padding: "0 0.5rem" } }, "联系我们")
    ]
  )
);
const Footer = () =>
  createElement("footer", null, "© 2025 电竞部 ｜ 技术支持：Hearthewind");

const PageWrapper = (children) =>
  createElement(React.Fragment, null, children, createElement(Footer));

const Home = () => {
  const [index, setIndex] = useState(0);
  const news = [
    "🔥 校内无畏契约“神将杯”即将开战！",
    "📢 电竞部2025春季招新已开启！",
    "🎉 恭喜BGDK获得瓦理杯S1冠军！"
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
        [
          createElement(Link, {
            to: "/news",
            key: 0,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          }, "公告"),
          createElement("a", {
            href: "games.html",
            key: 1,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none"
            }
          }, "比赛"),
          createElement(Link, {
            to: "/schedule",
            key: 2,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          }, "赛程查询"),
          createElement(Link, {
            to: "/ranking",
            key: 3,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          }, "实时积分榜"),
          createElement(Link, {
            to: "/events",
            key: 4,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          }, "活动"),
          createElement(Link, {
            to: "/contact",
            key: 5,
            style: {
              background: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: "bold"
            }
          }, "联系我们")
        ]
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

const RankingPage = () => {
  const [group, setGroup] = useState("A组");
  const data = {
    "A组": [
      { rank: 1, team: "我是奶龙", win: 0, loss: 0, score: 0 },
      { rank: 2, team: "第一五妹队", win: 0, loss: 0, score: 0 },
      { rank: 3, team: "玖幺传媒", win: 0, loss: 0, score: 0 },
      { rank: 4, team: "练枪不如烧香", win: 0, loss: 0, score: 0 },
      { rank: 5, team: "少年先锋队",win: 0, loss: 0,score: 0}
    ],
    "B组": [
      { rank: 1, team: "不叫妈妈队", win: 0, loss: 0, score: 0 },
      { rank: 2, team: "把饭拼好给你", win: 0, loss: 0, score: 0 },
      { rank: 3, team: "糖豆人队", win: 0, loss: 0, score: 0 },
      { rank: 4, team: "绝对是坤坤队", win: 0, loss: 0, score: 0 },
      { rank: 5, team: "GWG", win: 0, loss: 0, score: 0 }
    ],
    "C组": [
      { rank: 1, team: "采一朵莲", win: 0, loss: 0, score: 0 },
      { rank: 2, team: "跑打队", win: 0, loss: 0, score: 0 },
      { rank: 3, team: "别卷", win: 0, loss: 0, score: 0 },
      { rank: 4, team: "T-star", win: 0, loss: 0, score: 0 },
      { rank: 5, team: "上海major队", win: 0, loss: 0, score: 0 }
    ],
    "D组": [
      { rank: 1, team: "LOL", win: 0, loss: 0, score: 0 },
      { rank: 2, team: "蛇皮走位", win: 0, loss: 0, score: 0 },
      { rank: 3, team: "谁的啤儿茶爽", win: 0, loss: 0, score: 0 },
      { rank: 4, team: "最糖特工队", win: 0, loss: 0, score: 0 },
      { rank: 5, team: "魔王c+队", win: 0, loss: 0, score: 0 }
    ]
  };
  const groups = Object.keys(data);
  const current = data[group].sort((a, b) => b.score - a.score);

  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#1e3a8a",
        padding: "2rem",
        color: "white"
      }
    },
      createElement("h2", {
        style: {
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem"
        }
      }, "实时积分榜"),
      createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem"
        }
      },
        groups.map(g =>
          createElement("button", {
            key: g,
            onClick: () => setGroup(g),
            style: {
              background: g === group ? "#fcd34d" : "#3b82f6",
              color: g === group ? "#1e3a8a" : "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer"
            }
          }, g)
        )
      ),
      createElement("table", {
        style: {
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          background: "#3b82f6",
          borderCollapse: "collapse",
          borderRadius: "0.75rem",
          overflow: "hidden"
        }
      },
        createElement("thead", null,
          createElement("tr", null,
            ["排名", "战队", "胜", "负", "积分"].map(h =>
              createElement("th", {
                key: h,
                style: {
                  padding: "0.75rem",
                  borderBottom: "2px solid #1e40af",
                  fontWeight: "bold"
                }
              }, h)
            )
          )
        ),
        createElement("tbody", null,
          current.map((row, idx) =>
            createElement("tr", { key: idx },
              ["rank", "team", "win", "loss", "score"].map(k =>
                createElement("td", {
                  key: k,
                  style: {
                    textAlign: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #60a5fa"
                  }
                }, row[k])
              )
            )
          )
        )
      )
    )
  );
};
const newsData = [
  {
    id: "valorant-2025-shenjiang",
    title: "2025无畏契约“神将杯”比赛公告",
    date: "2025-03-15",
    content: "2025年度无畏契约“神将杯”即将火热开启！本次赛事面向全校热爱FPS竞技的同学，小组赛采用BO1双循环制，淘汰赛采用BO5淘汰赛制，冠军将获得荣耀奖杯与官方发放到vp。报名截止时间为3月25日，比赛将在4月5日打响，欢迎各大选手与自由战队踊跃参与！"
  },
  {
    id: "recruit-2025-spring",
    title: "2025电竞部春季招新公告",
    date: "2025-03-15",
    content: "想加入热血与荣耀并存的电竞大家庭？2025春季招新正式启动！电竞部现面向全校招募运营、解说、赛事策划、视频剪辑、校队选手等多个方向的新成员。不限年级与经验，只要你热爱电竞、有想法有干劲，我们都欢迎你！截止日期：2025年5月1日。报名方式:本网站首页-活动-2025电竞部招新，填写你的手机号，姓名，年级，学院，还有个人简历和申请理由，想要申请的职位，后续会通过短信通知面试时间地点。"
  },
  {
    id: "valorant-2024-wali",
    title: "2024无畏契约第一届“瓦理杯”比赛公告",
    date: "2024-12-10",
    content: "首届“瓦理杯”无畏契约赛事由电竞部联合信息学院共同举办，将于10月7日正式开赛！本赛事旨在推动VALORANT校内发展，增进院系交流，欢迎各战队积极报名参赛。赛事奖励丰富，报名截至9月30日，详情见群公告。"
  },
  {
    id: "tft-2025-yili",
    title: "2025云顶之弈“弈理杯”比赛公告",
    date: "2025-02-20",
    content: "策略博弈，群雄逐鹿！2025“弈理杯”云顶之弈赛事即日起开启报名，欢迎全校云玩家前来一展棋艺。本届比赛采用八人积分淘汰制，设有冠军奖金与荣誉勋章，比赛预计于3月中旬举办。报名截止：2025年2月28日。"
  },
  {
    id: "recruit-2024-autumn",
    title: "2024电竞部秋季招新公告",
    date: "2024-09-01",
    content: "2024年秋季学期招新火热进行中！电竞部欢迎所有对电子竞技有热情、有能力的小伙伴加入我们，无论你是想打比赛，还是参与幕后制作，我们都欢迎！加入方式详见QQ群及报名表，截止时间：9月10日。"
  },
  {
    id: "lol-2023-lcl-runnerup",
    title: "恭喜我校英雄联盟校队在2023年LCL选拔赛中获得亚军！",
    date: "2023-12-01",
    content: "2023年全国高校英雄联盟联赛（LCL）华东赛区选拔赛圆满落幕，我校LOL校队表现出色，成功晋级决赛并斩获亚军！感谢所有选手的拼搏与支持者的呐喊，让我们期待明年更进一步！"
  },
  {
    id: "lol-2023-tcl-runnerup",
    title: "恭喜我校英雄联盟校队在2023年TCL天选杯中获得亚军！",
    date: "2023-10-18",
    content: "在2023年TCL天选杯全国高校邀请赛中，我校英雄联盟校队一路过关斩将，最终荣获亚军，展现出卓越的团队协作与竞技水平。感谢所有参赛队员的努力付出！"
  },
  {
    id: "lol-2023-rog-champion",
    title: "恭喜我校英雄联盟校队在2023年ROG圣诞杯中获得冠军！",
    date: "2023-12-26",
    content: "圣诞狂欢战火重燃！我校LOL校队于2023年ROG圣诞杯赛事中一路高歌猛进，力克劲敌，最终夺得冠军，成功为本年度画上圆满句号！恭喜队员们！"
  },
  {
    id: "valorant-2023-rog-runnerup",
    title: "恭喜我校无畏契约校队在2023年ROG圣诞杯中获得亚军！",
    date: "2023-12-26",
    content: "在刚刚结束的2023 ROG圣诞杯无畏契约赛道中，我校VALORANT校队首次亮相即闯入总决赛，最终荣获亚军，展现出惊人的潜力与团队配合。期待他们来年再创辉煌！"
  }
];
const NewsPage = () => {
  const sorted = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "2rem",
        color: "#1e3a8a"
      }
    },
      createElement("h2", {
        style: {
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1.5rem"
        }
      }, "公告通知"),
      createElement("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          background: "white",
          border: "1px solid #cbd5e1",
          borderRadius: "0.5rem"
        }
      },
        createElement("div", {
          style: {
            background: "#e2e8f0",
            padding: "0.75rem 1rem",
            fontWeight: "bold",
            borderBottom: "1px solid #cbd5e1"
          }
        }, "管理"),
        sorted.map((item, idx) =>
          createElement("div", {
            key: idx,
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: idx === sorted.length - 1 ? "none" : "1px solid #e5e7eb",
              fontSize: "0.95rem"
            }
          },
            createElement(Link, { to: `/news/${item.id}`, style: { color: "#1e3a8a", textDecoration: "none" } }, item.title),
            createElement("span", null, item.date)
          )
        )
      )
    )
  );
};
const NewsDetailPage = () => {
  const { id } = useParams();
  const item = newsData.find(n => n.id === id);
  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "2rem",
        color: "#1e3a8a"
      }
    },
      item ? createElement("div", { style: { maxWidth: 800, margin: "0 auto" } },
        createElement("h2", { style: { fontSize: "1.5rem", marginBottom: "1rem" } }, item.title),
        createElement("p", { style: { marginBottom: "1rem", color: "#64748b" } }, item.date),
        createElement("div", { style: { fontSize: "1rem", lineHeight: "1.6" } }, item.content)
      ) :
        createElement("p", null, "找不到对应的公告。")
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

const Page = ({ title }) => PageWrapper(
  createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f1f5f9"
    }
  }, createElement("h2", { style: { fontSize: "2rem", color: "#334155" } }, title))
);
const EventsPage = () => {
  const events = [
    {
      id: "shenjiang-report",
      title: "“神将杯”炸鱼举报入口",
      date: "2025-03-28",
      description: "举报选手疑似炸鱼、消极比赛或使用外挂行为，我们将及时跟进处理。",
      path: "/events/shenjiang-report"
    },
    {
      id: "recruit-2025",
      title: "2025电竞社春季招新",
      date: "2025-03-15",
      description: "欢迎热爱电竞的你加入我们，成为赛事选手、解说主播或幕后运营的一员！",
      path: "/events/recruit-2025"
    }
  ];
  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "2rem",
        color: "#1e3a8a"
      }
    },
      createElement("h2", {
        style: {
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1.5rem"
        }
      }, "活动页面"),
      createElement("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          background: "white",
          border: "1px solid #cbd5e1",
          borderRadius: "0.5rem"
        }
      },
        createElement("div", {
          style: {
            background: "#e2e8f0",
            padding: "0.75rem 1rem",
            fontWeight: "bold",
            borderBottom: "1px solid #cbd5e1"
          }
        }, "活动列表"),
        events.map((item, idx) =>
          createElement("div", {
            key: idx,
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: idx === events.length - 1 ? "none" : "1px solid #e5e7eb",
              fontSize: "0.95rem"
            }
          },
            createElement(Link, { to: item.path, style: { color: "#1e3a8a", textDecoration: "none" } }, item.title),
            createElement("span", null, item.date)
          )
        )
      )
    )
  );
};

const ShenjiangReportPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      id: form[0].value,
      hero: form[1].value,
      reason: form[2].value,
      email: form[3].value,
      time: new Date().toISOString()
    };

    const filename = `shenjiang-${Date.now()}.json`;
    await submitToGitHub(filename, formData);
    form.reset();
  };

  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "2rem",
        color: "#1e3a8a"
      }
    },
      createElement("h2", { style: { textAlign: "center", marginBottom: "1rem" } }, "神将杯炸鱼举报表单"),
      createElement("form", {
        style: { maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" },
        onSubmit: handleSubmit
      },
        createElement("input", {
          type: "text",
          required: true,
          placeholder: "举报选手ID",
          style: baseInputStyle
        }),
        createElement("input", {
          type: "text",
          required: true,
          placeholder: "该选手本场比赛选用英雄",
          style: baseInputStyle
        }),
        createElement("textarea", {
          required: true,
          placeholder: "举报理由，如：第3回合穿墙，第5回合道具异常使用",
          rows: 4,
          style: { ...baseInputStyle, resize: "vertical" }
        }),
        createElement("input", {
          type: "email",
          required: true,
          placeholder: "你的邮箱（用于反馈）",
          style: baseInputStyle
        }),
        createElement("button", {
          type: "submit",
          style: {
            background: "#1e3a8a",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer"
          }
        }, "提交举报")
      )
    )
  );
};



  return PageWrapper(
    createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "2rem",
        color: "#1e3a8a"
      }
    },
      createElement("h2", { style: { textAlign: "center", marginBottom: "1rem" } }, "神将杯炸鱼举报表单"),
      createElement("form", {
        style: { maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" },
        onSubmit: handleSubmit
      },
        createElement("input", {
          type: "text",
          required: true,
          placeholder: "举报选手ID",
          style: baseInputStyle
        }),
        createElement("input", {
          type: "text",
          required: true,
          placeholder: "该选手本场比赛选用英雄",
          style: baseInputStyle
        }),
        createElement("textarea", {
          required: true,
          placeholder: "举报理由，如：第3回合穿墙，第5回合道具异常使用",
          rows: 4,
          style: { ...baseInputStyle, resize: "vertical" }
        }),
        createElement("input", {
          type: "email",
          required: true,
          placeholder: "你的邮箱（用于反馈）",
          style: baseInputStyle
        }),
        createElement("button", {
          type: "submit",
          style: {
            background: "#1e3a8a",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer"
          }
        }, "提交举报")
      )
    )
  );
};
const Recruit2025Page = () => PageWrapper(
  createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#f9fafb",
      padding: "2rem",
      color: "#1e3a8a"
    }
  },
    createElement("div", { style: { maxWidth: 800, margin: "0 auto" } },
      createElement("h2", { style: { fontSize: "1.5rem", marginBottom: "1rem" } }, "2025电竞部春季招新"),
      createElement("p", { style: { fontSize: "1rem", lineHeight: "1.6" } },
        "想加入热血与荣耀并存的电竞大家庭？2025春季招新正式启动！电竞部现面向全校招募运营、解说、赛事策划、视频剪辑、赛事选手等多个方向的新成员。不限年级与经验，只要你热爱电竞、有想法有干劲，我们都欢迎你！",
        "报名截止日期：2025年3月25日。具体报名方式见群公告或线下宣传展位。"
      )
    )
  )
);

const baseInputStyle = {
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #cbd5e1",
  fontSize: "1rem"
};

const App = () => createElement(
  HashRouter,
  null,
  createElement(NavBar),
  createElement(
    Switch,
    null,
    createElement(Route, { exact: true, path: "/", component: Home }),
    createElement(Route, { path: "/schedule", component: SchedulePage }),
    createElement(Route, { path: "/events/shenjiang-report", component: ShenjiangReportPage }),
    createElement(Route, { path: "/events/recruit-2025", component: Recruit2025Page }),
    createElement(Route, { path: "/news/:id", component: NewsDetailPage }),
    createElement(Route, { path: "/events",component : EventsPage}),
    createElement(Route, { path: "/news" , component : NewsPage}),
    createElement(Route, { path: "/contact", component: ContactPage }),
    createElement(Route, { path: "/ranking", component: RankingPage }),
    createElement(Route, { path: "/lol", component: () => Page({ title: "英雄联盟页面（开发中）" }) }),
    createElement(Route, { path: "/valorant", component: () => Page({ title: "无畏契约页面（开发中）" }) }),
    createElement(Route, { path: "/cs2", component: () => Page({ title: "CS2 页面（开发中）" }) }),
    createElement(Route, { path: "/ow", component: () => Page({ title: "守望先锋页面（开发中）" }) })
  )
);

createRoot(document.getElementById("root")).render(createElement(App));

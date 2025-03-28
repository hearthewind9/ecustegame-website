
const games = [
  {
    year: 2025,
    title: "无畏契约 神将杯",
    game: "无畏契约",
    desc: "一场汇聚精英特工的巅峰对决！",
    link: "#"
  },
  {
    year: 2025,
    title: "云顶之弈 弈理杯",
    game: "云顶之弈",
    desc: "头脑博弈，智者为王！",
    link: "#"
  },
  {
    year: 2024,
    title: "无畏契约 瓦理杯 S1",
    game: "无畏契约",
    desc: "首次举办，燃爆校园！",
    link: "#"
  },
  {
    year: 2024,
    title: "英雄联盟 明德杯 S2",
    game: "英雄联盟",
    desc: "荣耀传承，精彩继续。",
    link: "#"
  },
  {
    year: 2023,
    title: "第二届华理SOLO赛",
    game: "英雄联盟 SOLO",
    desc: "操作与意识的极限对抗。",
    link: "#"
  },
  {
    year: 2023,
    title: "英雄联盟 明德杯 S1",
    game: "英雄联盟",
    desc: "明德杯首次开赛，青春热血！",
    link: "#"
  },
  {
    year: 2022,
    title: "第一届华理SOLO赛",
    game: "英雄联盟 SOLO",
    desc: "历史起点，传奇初始。",
    link: "#"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-list');
  if (!container) return;

  games.forEach(g => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>📅【${g.year}】${g.title}</h2>
      <p>🎮 项目：${g.game}</p>
      <p>${g.desc}</p>
      <a href="${g.link}" target="_blank">查看详情</a>
    `;
    container.appendChild(div);
  });
});

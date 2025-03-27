
import React from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

const App = () => {
  const [query, setQuery] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);

  React.useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/1dU6gkMES1pgjEki_rIqby5FXPTBh4nZab9gsCEGlIeE/gviz/tq?tqx=out:json")
      .then(res => res.text())
      .then(data => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows.map(r => r.c.map(cell => (cell ? cell.v : "")));
        setSchedule(rows);
      });
  }, []);

  const filtered = schedule.filter(row =>
    query === "" || row.some(cell => cell.toString().toLowerCase().includes(query.toLowerCase()))
  );

  return (
    React.createElement("div", { style: { fontFamily: 'sans-serif', padding: '1rem', color: 'white', background: 'black', minHeight: '100vh' } },
      React.createElement("h1", null, "ECUST 电竞部赛程查询"),
      React.createElement("input", {
        type: "text",
        placeholder: "搜索日期或队伍名...",
        value: query,
        onChange: e => setQuery(e.target.value),
        style: { margin: '1rem 0', padding: '0.5rem', width: '100%', maxWidth: '300px' }
      }),
      React.createElement("table", { border: 1, cellPadding: 6, style: { width: '100%', background: '#111', borderCollapse: 'collapse' } },
        React.createElement("thead", null,
          React.createElement("tr", null,
            ["组别", "阶段", "日期", "时间", "队伍1", "队伍2", "裁判"].map(h =>
              React.createElement("th", { key: h, style: { background: "#222", color: "white" } }, h)
            )
          )
        ),
        React.createElement("tbody", null,
          filtered.map((row, idx) =>
            React.createElement("tr", { key: idx },
              row.map((cell, i) =>
                React.createElement("td", { key: i, style: { color: "white", textAlign: "center" } }, cell)
              )
            )
          )
        )
      )
    )
  );
};

createRoot(document.getElementById("root")).render(React.createElement(App));

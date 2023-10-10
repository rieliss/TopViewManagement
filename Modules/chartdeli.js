const InHouseStock = document.getElementById("CurrentLossInHouseStock");
const doughnutInHouseStock = {
  id: "doughnutInHouseStock",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#08BDBA";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${datafilltext}B`, xCoor, yCoor);
  },
};

const CurrentLossInHouseStock = new Chart(InHouseStock, {
  type: "doughnut",
  data: {
    labels: ["ASSY", "SUB-ASSY", "PART"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#087976", "#9EF0F0", "#08BDBA"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 1.5,
    cutout: "65%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      labels: {
        render: "label",
        fontColor: "white", //set your desired color
      },
    },
    title: {},
    scales: {},
    plugins: {
      legend: {
        display: false,
        color: "white",
        position: "bottom",
      },
    },
  },
  plugins: [doughnutInHouseStock],
});

/*----------------------------------------------------------------*/
const LossRiskStock = document.getElementById("CurrentLossRiskStock");

const CurrentLossRiskStock = new Chart(LossRiskStock, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#1A9A98",
        borderWidth: 1,
      },
    ],
  },
  options: {
    fontColor: "rgba(255, 255, 255,1)",
    barPercentage: 5,
    barThickness: 30,
    catrgoryPercentage: 5,
    aspectRatio: 1.7,
    indexAxis: "x",
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
          // beginAtZero: true,
          callback: function (value) {
            var ranges = [
              { divider: 1e12, suffix: "T" },
              { divider: 1e9, suffix: "B" },
              { divider: 1e6, suffix: "M" },
              { divider: 1e3, suffix: "K" },
              { divider: 1, suffix: "" },
            ];
            function formatNumber(n) {
              for (var i = 0; i < ranges.length; i++) {
                if (n >= ranges[i].divider) {
                  return (n / ranges[i].divider).toString() + ranges[i].suffix;
                }
              }
              return n;
            }
            return formatNumber(value);
          },
        },
      },
    },
    plugins: {
      legend: {
        // position: 'left',
        // align: 'center',
        display: false,
      },
    },
    labels: {
      fontColor: "rgba(255, 255, 255,1)",
    },
  },
});
/*----------------------------------------------------------------*/
Chart.register(ChartjsPluginStacked100.default);
var AbnormalProdchart = document.getElementById("AbnormalProd");

const getOrCreateTooltipStock = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.style.margin = "0px";
    table.style.width = "250px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  return tooltipEl;
};

const externalTooltipHandlerStock = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltipStock(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;

      const th = document.createElement("th");
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";
      // span.style.top = "10px";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + (tooltip.caretY - 150) + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 5 + "px " + (tooltip.options.padding + 5) + "px";
};

const AbnormalProd = new Chart(AbnormalProdchart, {
  type: "bar",
  data: {
    labels: ["Bar"],
    datasets: [
      {
        data: [1],
        backgroundColor: "#FBB537",
      },
      {
        data: [1],
        backgroundColor: "#F48C06",
      },
      {
        data: [1],
        backgroundColor: "#E85D04",
      },
      {
        data: [1],
        backgroundColor: "#D00000",
      },
      {
        data: [1],
        backgroundColor: "#C00000",
      },
    ],
  },
  options: {
    barPercentage: 5,
    catrgoryPercentage: 1,
    aspectRatio: 20,
    indexAxis: "y",
    plugins: {
      stacked100: {
        enable: true,
      },
      legend: {
        display: false,
        position: "left",
        align: "center",
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandlerStock,
      },
    },
    scales: {
      title: {
        display: false,
      },
      y: {
        display: false,
      },
      x: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
});

/*----------------------------------------------------------------*/
/*----------------------------------------------------------------*/
// const RiskStock = document.getElementById("CurrentRiskStock").getContext("2d");

// const CurrentRiskStock = new Chart(RiskStock, {
//   type: "bar",
//   data: {
//     labels: ["TYT", "JHO", "RFO", "MKO", "NGF", "RFT"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: "#CDF7F6",
//         borderWidth: 1,
//       },
//       {
//         label: "# of Points",
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: "#1A9A98",
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     fontColor: "rgba(255, 255, 255,1)",
//     barPercentage: 5,
//     barThickness: 12,
//     catrgoryPercentage: 2,
//     aspectRatio: 1.4,
//     indexAxis: "y",
//     scales: {
//       x: {
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//       y: {
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         // position: 'left',
//         // align: 'center',
//         display: false,
//       },
//     },
//     labels: {
//       fontColor: "rgba(255, 255, 255,1)",
//     },
//   },
// });
/*----------------------------------------------------------------*/
// const SubRiskStock = document.getElementById("SubCurrentRiskStock");

// const SubCurrentRiskStock = new Chart(SubRiskStock, {
//   type: "bar",
//   data: {
//     labels: ["TYT", "JHO", "RFO", "MKO", "NGF", "RFT"],
//     datasets: [
//       {
//         label: "American Express",
//         backgroundColor: "#CDF7F6",
//         // borderColor: "#CDF7F6",
//         borderWidth: 1,
//         data: [3, 5, 6, 7, 3, 5, 6, 7],
//       },
//       {
//         label: "Mastercard",
//         backgroundColor: "#1A9A98",
//         // borderColor: "#1A9A98",
//         borderWidth: 1,
//         data: [4, 7, 3, 6, 10, 7, 4, 6],
//       },
//     ],
//   },
//   options: {
//     fontColor: "rgba(255, 255, 255,1)",
//     barPercentage: 5,
//     barThickness: 12,
//     catrgoryPercentage: 2,
//     aspectRatio: 1.4,
//     indexAxis: "y",
//     scales: {
//       x: {
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//       y: {
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         // position: 'left',
//         // align: 'center',
//         display: false,
//       },
//     },
//     labels: {
//       fontColor: "rgba(255, 255, 255,1)",
//     },
//   },
// });

/*----------------------------------------------------------------*/
Chart.register(ChartjsPluginStacked100.default);
var Shipment = document.getElementById("ShipmentChart");

const ShipmentChart = new Chart(Shipment, {
  type: "bar",
  data: {
    labels: ["Bar"],
    datasets: [
      { label: "On Plan", data: [80], backgroundColor: "#1A9A98" },
      { label: "Delay", data: [20], backgroundColor: "#DC0032" },
    ],
  },
  options: {
    barPercentage: 4,
    catrgoryPercentage: 2,
    aspectRatio: 10,
    indexAxis: "y",
    plugins: {
      stacked100: {
        enable: true,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
    },
    scales: {
      title: {
        display: false,
      },
      y: {
        display: false,
      },
      x: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
});
/*----------------------------------------------------------------*/
const DelayCount = document.getElementById("DelayCountChart");

const DelayCountChart = new Chart(DelayCount, {
  type: "bar",
  data: {
    labels: ["S", "N", "I", "A", "S", "T", "TS"],
    datasets: [
      {
        borderWidth: 1,
        data: [3, 5, 6, 7, 3, 5, 6, 7, 7],
        backgroundColor: [
          "#C00000",
          "#DC0032",
          "#FD8800",
          "#FF9933",
          "#FF9933",
          "#FFC000",
          "#FFD866",
        ],
      },
    ],
  },
  options: {
    fontColor: "rgba(255, 255, 255,1)",
    barThickness: 30,
    catrgoryPercentage: 1,
    aspectRatio: 2.7,
    indexAxis: "x",
    scales: {
      x: {
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        // position: 'left',
        // align: 'center',
        display: false,
      },
    },
    labels: {
      fontColor: "rgba(255, 255, 255,1)",
    },
  },
});

/*----------------------------------------------------------------*/
const DelayedRatio = document.getElementById("DelayedRatioChart");
const doughnutDelayedRatioChart = {
  id: "doughnutDelayedRatioChart",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#08BDBA";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("5.19BB", xCoor, yCoor);
  },
};

const DelayedRatioChart = new Chart(DelayedRatio, {
  type: "doughnut",
  data: {
    labels: ["36%", "22%", "14%", "7%", "7%", "7%", "7%"],

    datasets: [
      {
        data: [35, 22, 14, 7, 7, 7, 7],
        backgroundColor: [
          "#C00000",
          "#DC0032",
          "#FD8800",
          "#FF9933",
          "#FF9933",
          "#FFC000",
          "#FFD866",
        ],
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2,
    cutout: "65%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      labels: {
        render: "label",
        fontColor: "white", //set your desired color
      },
    },
    title: {},
    scales: {},
    plugins: {
      legend: {
        display: false,
        color: "white",
        position: "bottom",
      },
    },
  },
  plugins: [doughnutDelayedRatioChart],
});

/*----------------------------------------------------------------*/

const CurrentRiskStockChart = document.getElementById("CurrentRiskStock");

const CurrentRiskStock = new Chart(CurrentRiskStockChart, {
  type: "bar",
  data: {
    labels: ["DDC", "In-House", "K-Line"],
    datasets: [
      {
        label: "Min Risk Stock",
        data: [1, 1, 1],
        backgroundColor: "#CDF7F6",
        borderColor: "#CDF7F6",
        type: "line",
        tension: 0.5,
      },
      {
        label: "Max Risk Stock",
        data: [3, 3, 3],
        backgroundColor: ["#1A9A98"],
        borderColor: ["#1A9A98"],
        type: "line",
        tension: 0.5,
      },
      {
        label: "Ware House",
        data: [2, 2, 2],
        backgroundColor: ["#087976"],
        borderColor: ["#087976"],
      },
    ],
  },
  options: {
    barPercentage: 1,
    aspectRatio: 1.4,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
        position: "left",
        align: "center",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          color: "white",
          callback: function (value) {
            var ranges = [
              { divider: 1e12, suffix: "T" },
              { divider: 1e9, suffix: "B" },
              { divider: 1e6, suffix: "M" },
              { divider: 1e3, suffix: "K" },
              { divider: 1, suffix: "" },
            ];
            function formatNumber(n) {
              for (var i = 0; i < ranges.length; i++) {
                if (n >= ranges[i].divider) {
                  return (n / ranges[i].divider).toString() + ranges[i].suffix;
                }
              }
              return n;
            }
            return formatNumber(value);
          },
        },
      },
    },
  },
});
/*----------------------------------------------------------------*/

const SubCurrentRiskStockChart = document.getElementById("SubCurrentRiskStock");

const SubCurrentRiskStock = new Chart(SubCurrentRiskStockChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Min Risk Stock",
        data: [1, 1, 1],
        backgroundColor: "#CDF7F6",
        borderColor: "#CDF7F6",
        type: "line",
        tension: 0.5,
      },
      {
        label: "Max Risk Stock",
        data: [3, 3, 3],
        backgroundColor: ["#1A9A98"],
        borderColor: ["#1A9A98"],
        type: "line",
        tension: 0.5,
      },
      {
        label: "Order QTY.",
        data: [2, 2, 2],
        backgroundColor: ["#087976"],
        borderColor: ["#087976"],
      },
    ],
  },
  options: {
    barPercentage: 1,
    aspectRatio: 1.4,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
        position: "left",
        align: "center",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          color: "white",
          callback: function (value) {
            var ranges = [
              { divider: 1e12, suffix: "T" },
              { divider: 1e9, suffix: "B" },
              { divider: 1e6, suffix: "M" },
              { divider: 1e3, suffix: "K" },
              { divider: 1, suffix: "" },
            ];
            function formatNumber(n) {
              for (var i = 0; i < ranges.length; i++) {
                if (n >= ranges[i].divider) {
                  return (n / ranges[i].divider).toString() + ranges[i].suffix;
                }
              }
              return n;
            }
            return formatNumber(value);
          },
        },
      },
    },
  },
});
/*----------------------------------------------------------------*/

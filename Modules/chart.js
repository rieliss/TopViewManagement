/*----------------------------------------------------------------*/

Chart.register(ChartjsPluginStacked100.default);
var CurrentPordchart = document.getElementById("CurrentPord");

const getOrCreateTooltip = (chart) => {
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
    table.style.width = "180px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

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
  tooltipEl.style.top = positionY + (tooltip.caretY - 120) + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 5 + "px " + (tooltip.options.padding + 5) + "px";
};

const CurrentPord = new Chart(CurrentPordchart, {
  type: "bar",
  data: {
    labels: ["Bar"],
    datasets: [
      { data: [10], backgroundColor: "rgba(0, 204, 153, 1)" },
      { data: [10], backgroundColor: "rgba(217, 217, 217, 1)" },
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
var chrtMFG1 = document.getElementById("chartIdMFG1");
const doughnutLabelMFG1 = {
  id: "doughnutLabelMFG1",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#42e684";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(chrtMFG1_value, xCoor, yCoor);
  },
};

const chartIdMFG1 = new Chart(chrtMFG1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 0],
        backgroundColor: ["rgba(217,217,217,0.2)", "mediumaquamarine"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 3,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelMFG1],
});

/*----------------------------------------------------------------*/

var chrtMFG2 = document.getElementById("chartIdMFG2");
const doughnutLabelMFG2 = {
  id: "doughnutLabelMFG2",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#42e684";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(chrtMFG2_value, xCoor, yCoor);
  },
};

const chartIdMFG2 = new Chart(chrtMFG2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 0],
        backgroundColor: ["rgba(217,217,217,0.2)", "mediumaquamarine"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 3,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelMFG2],
});

/*----------------------------------------------------------------*/

var chrtMFG3 = document.getElementById("chartIdMFG3");
const doughnutLabelMFG3 = {
  id: "doughnutLabelMFG3",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#42e684";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(chrtMFG3_value, xCoor, yCoor);
  },
};

const chartIdMFG3 = new Chart(chrtMFG3, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 0],
        backgroundColor: ["rgba(217,217,217,0.2)", "mediumaquamarine"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 3,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelMFG3],
});

/*----------------------------------------------------------------*/

var chrtPART1 = document.getElementById("chartIdPART1");
const doughnutLabelPART1 = {
  id: "doughnutLabelPART1",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#42e684";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(chrtPART1_value, xCoor, yCoor);
  },
};

const chartIdPART1 = new Chart(chrtPART1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 0],
        backgroundColor: ["rgba(217,217,217,0.2)", "mediumaquamarine"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 3,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelPART1],
});

/*----------------------------------------------------------------*/

var chrtPART2 = document.getElementById("chartIdPART2");
const doughnutLabelPART2 = {
  id: "doughnutLabelPART2",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#42e684";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(chrtPART2_value, xCoor, yCoor);
  },
};

const chartIdPART2 = new Chart(chrtPART2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 0],
        backgroundColor: ["rgba(217,217,217,0.2)", "mediumaquamarine"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 3,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelPART2],
});
/*----------------------------------------------------------------*/

Chart.register(ChartjsPluginStacked100.default);

var chrtLoss = document.getElementById("CurrentLoss");

var CurrentLoss = new Chart(chrtLoss, {
  type: "bar",
  data: {
    labels: ["MFG.1 Alt", "MFG.2 Sta", "MFG.3 ECC", "Part MFG.1", "Part MFG.2"],
    datasets: [
      {
        label: "1.M/C DOWN TIME LOSS",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(157, 1, 6, 1)",
      },
      {
        label: "2.QUALITY",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(208, 0, 0, 1)",
      },
      {
        label: "3.MAT & Part Loss",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(232, 93, 4, 1)",
      },
      {
        label: "4.WAITTING KANBAN",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(244, 140, 6, 1)",
      },
      {
        label: "5.Daily Loss",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#fbb537",
      },
    ],
  },
  options: {
    fontColor: "rgba(255, 255, 255,1)",
    barPercentage: 5,
    barThickness: 50,
    catrgoryPercentage: 5,
    aspectRatio: 3.5,
    indexAxis: "x",
    scales: {
      // pcs: {
      //     beginAtZero: true,
      //     type: 'linear',
      //     position: 'left'
      // },
      y: {
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
      x: {
        ticks: {
          color: "white",
          beginAtZero: true,
        },
      },
    },
    plugins: {
      stacked100: {
        enable: true,
      },
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
var CrtActiveWorker = document.getElementById("ActiveWorker");

var ActiveWorker = new Chart(CrtActiveWorker, {
  type: "bar",
  data: {
    labels: ["MFG.1 Alt", "MFG.2 Sta", "MFG.3 ECC", "Part MFG.1", "Part MFG.2"],
    datasets: [
      {
        label: "1.TL",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#003f5c",
      },
      {
        label: "2.LL",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#2f6b85",
      },
      {
        label: "3.Mizusumashi",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#599aad",
      },
      {
        label: "4.Out Line",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#88ccd6",
      },
      {
        label: "5.In Line",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#bbffff",
      },
      // { data: [65, 240, 80, 200, 244], backgroundColor: "rgba(0, 204, 153, 1)" },
      // { data: [5, 29, 8, 29, 40], backgroundColor: "rgba(255, 37, 37, 1)" }
    ],
  },
  options: {
    barThickness: 40,
    aspectRatio: 2.3,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
    },
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
          beginAtZero: true,
        },
      },
    },
  },
});

/*----------------------------------------------------------------*/
new Chart(document.getElementById("Investment"), {
  type: "bar",
  data: {
    labels: ["Bar"],
    datasets: [
      { data: [75], backgroundColor: "rgba(69, 188, 213, 1)" },
      { data: [35], backgroundColor: "rgba(217, 217, 217, 1)" },
    ],
  },
  options: {
    barPercentage: 5,
    catrgoryPercentage: 1,
    aspectRatio: 30,
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
var chrtCostMFG1 = document.getElementById("chartIdCostMFG1");
const doughnutLabelCostMFG1 = {
  id: "doughnutLabelCostMFG1",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgb(75, 186, 194)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("70%", xCoor, yCoor);
  },
};

const chartIdCostMFG1 = new Chart(chrtCostMFG1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2.5,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelCostMFG1],
});
/*----------------------------------------------------------------*/
var chrtCostMFG2 = document.getElementById("chartIdCostMFG2");
const doughnutLabelCostMFG2 = {
  id: "doughnutLabelCostMFG2",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgb(75, 186, 194)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("70%", xCoor, yCoor);
  },
};

const chartIdCostMFG2 = new Chart(chrtCostMFG2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2.5,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelCostMFG2],
});

/*----------------------------------------------------------------*/
var chrtCostMFG3 = document.getElementById("chartIdCostMFG3");
const doughnutLabelCostMFG3 = {
  id: "doughnutLabelCostMFG3",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgb(75, 186, 194)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("70%", xCoor, yCoor);
  },
};

const chartIdCostMFG3 = new Chart(chrtCostMFG3, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2.5,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelCostMFG3],
});
/*----------------------------------------------------------------*/
var chrtCostPart1 = document.getElementById("chartIdCostPart1");
const doughnutLabelCostPart1 = {
  id: "doughnutLabelCostPart1",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgb(75, 186, 194)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("70%", xCoor, yCoor);
  },
};

const chartIdCostPart1 = new Chart(chrtCostPart1, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2.5,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelCostPart1],
});
/*----------------------------------------------------------------*/
var chrtCostPart2 = document.getElementById("chartIdCostPart2");
const doughnutLabelCostPart2 = {
  id: "doughnutLabelCostPart2",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgb(75, 186, 194)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("70%", xCoor, yCoor);
  },
};

const chartIdCostPart2 = new Chart(chrtCostPart2, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2.5,
    cutout: "70%",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  plugins: [doughnutLabelCostPart2],
});

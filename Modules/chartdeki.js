/*----------------------------------------------------------------*/
Chart.register(ChartjsPluginStacked100.default);
var OALossSumChart = document.getElementById("OALossSum");
// var OALossSum = new Chart(OALossSumChart, {
//   type: "bar",
//   data: {
//     labels: ["Target", "Actual"],
//     datasets: [
//       {
//         label: "%OA",
//         data: [90, 90],
//         backgroundColor: "rgba(0, 204, 153, 1)",
//       },
//       {
//         label: "Loss",
//         data: [10, 10],
//         backgroundColor: "rgba(255, 37, 37, 1)",
//       },
//     ],
//   },
//   options: {
//     barThickness: 50,
//     aspectRatio: 1.9,
//     plugins: {
//       stacked100: {
//         enable: true,
//       },
//       legend: {
//         // display: false
//       },
//     },
//     scales: {
//       x: {
//         stacked: true,
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//       y: {
//         stacked: true,
//         ticks: {
//           color: "white",
//           beginAtZero: true,
//         },
//       },
//     },
//   },
// });

// var CurrentLoss = new Chart(chrtLoss, {
var OALossSum = new Chart(OALossSumChart, {
  type: "bar",
  data: {
    labels: ["Target", "Actual"],
    datasets: [
      {
        label: "%OA",
        data: [0, 0],
        backgroundColor: "rgba(0, 204, 153, 1)",
      },
      {
        label: "Loss",
        data: [0, 0],
        backgroundColor: "rgba(255, 37, 37, 1)",
      },
    ],
  },
  options: {
    fontColor: "rgba(255, 255, 255,1)",
    barPercentage: 5,
    barThickness: 70,
    catrgoryPercentage: 5,
    aspectRatio: 1.9,
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
const ctx = document.getElementById("CurrentLossDetailSum");

const CurrentLossDetailSum = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    datasets: [
      {
        label: "Plan",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ],
        backgroundColor: ["rgba(91, 120, 255, 1)"],
        borderColor: ["rgba(91, 120, 255, 1)"],
        type: "line",
        tension: 0.5,
        // yAxisID: 'Actual'
      },
      {
        label: "",
        data: [],
        backgroundColor: "transparent",
        borderColor: "transparent",
        type: "line",
        tension: 0.5,
        // yAxisID: 'Plan'
      },
      {
        label: "Actual",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ],
        backgroundColor: ["rgba(0, 204, 153,1)"],
        borderColor: ["rgba(255, 255, 255, 1)"],
        // yAxisID: 'Date'
      },
    ],
  },
  options: {
    barPercentage: 1,
    // catrgoryPercentage: 10,
    aspectRatio: 3.5,
    scales: {
      // pcs: {
      //     beginAtZero: true,
      //     type: 'linear',
      //     position: 'left'
      // },
      y: {
        beginAtZero: true,
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
  },
});
/*----------------------------------------------------------------*/
var chrtLossClar = document.getElementById("chartIdLossClar");
const doughnutLabelLossClar = {
  id: "doughnutLabelLossClar",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgba(255,224,181,1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Loss(mins.)", xCoor, yCoor);
  },
};

const chartIdLossClar = new Chart(chrtLossClar, {
  type: "doughnut",
  data: {
    labels: [
      "1.M/C DOWN TIME LOSS",
      "2.QUALITY",
      "3.MAT & Part Loss",
      "4.WAITTING KANBAN",
      "5.Daily Loss",
    ],

    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(157, 1, 6, 1)",
          "rgba(208, 0, 0, 1)",
          "rgba(232, 93, 4, 1)",
          "rgba(244, 140, 6, 1)",
          "#fbb537",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: false,
    aspectRatio: 2,
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
      labels: {
        render: "label",
        fontColor: "white", //set your desired color
      },
    },
    title: {},
    scales: {},
    plugins: {
      legend: {
        color: "white",
        position: "right",
      },
    },
  },
  plugins: [doughnutLabelLossClar],
});
/*----------------------------------------------------------------*/
var DekidakaChart = document.getElementById("CurrentLossDekidaka");
var CurrentLossDekidaka = new Chart(DekidakaChart, {
  type: "bar",
  data: {
    labels: [
      "Hour 1",
      "Hour 2",
      "Hour 3",
      "Hour 4",
      "Hour 5",
      "Hour 6",
      "Hour 7",
      "Hour 8",
      "Hour 9",
      "Hour 10",
    ],
    datasets: [
      {
        label: "Actual",
        data: [],
        parsing: {
          yAxisKey: "Value",
        },
        backgroundColor: ["rgba(0, 204, 153,1)", "rgba(0, 204, 153,1)"],
        borderColor: ["rgba(255, 255, 255, 1)"],
      },
      {
        label: "Plan",
        data: [0, 0, 0],
        parsing: {
          yAxisKey: "CTAvg",
        },
        backgroundColor: "rgba(91, 120, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  },
  options: {
    barPercentage: 0.7,
    aspectRatio: 4.5,
    scales: {
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
      datalabels: {
        color: "white",
      },
    },
  },
});

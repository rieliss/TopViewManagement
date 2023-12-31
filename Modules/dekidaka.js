// var socket = io("http://localhost:4040");
// var socket = io("http://172.23.36.47:4040");
var socket = io("http://10.122.77.1:4040");

const objectDate = new Date();
// const objectDate = new Date("2023-09-21");
let day = objectDate.getDate();
let month = objectDate.getMonth() + 1;
let year = objectDate.getFullYear();
if (day < 10) {
  day = "01";
}
if (month < 10) {
  month = `0${month}`;
}
let format = `${year}${month}01`;

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}
console.log(getPreviousDay());

function calculateSum(array, property) {
  let sum = 0;

  array.forEach((element) => {
    sum += element[property];
  });

  return sum;
}

function decimals(n, d) {
  if (typeof n !== "number" || typeof d !== "number") return false;
  n = parseFloat(n) || 0;
  return n.toFixed(d);
}

function formatNumber(num, precision = 2) {
  const map = [
    { suffix: " T", threshold: 1e12 },
    { suffix: " B", threshold: 1e9 },
    { suffix: " M", threshold: 1e6 },
    { suffix: " K", threshold: 1e3 },
    { suffix: " ", threshold: 1 },
  ];
  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }
  return num;
}

// var MonthValue;
var LineSummary = [];
var Prod_Actual_Value = [];
var Prod_Actual_Value2 = [];
var ProdActual = {};
var mergedArrayAct_LineSummary;
var mergedArrayAct = [];
const unique = [];
const sum = [];
var holder = {};

const unique1 = [];
const arr = [];

const today = getPreviousDay();

const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);

function Date_Modify(date) {
  if (date < 10) {
    date = "0" + date;
  }

  if (new Date().getDate() === 1) {
    let Date_Modify = `${year}-${month - 1}-` + date + `T00:00:00.000Z`;
    return Date_Modify;
  } else {
    let Date_Modify = `${year}-${month}-` + date + `T00:00:00.000Z`;
    return Date_Modify;
  }
}

const firstdate = "'" + monthDate_result + "-01 00:00:00.000'";
const lastdate = "'" + monthDate_result + "-31 00:00:00.000'";

function calculateSum(array, property) {
  let sum = 0;

  array.forEach((element) => {
    sum += element[property];
  });

  return sum;
}

var perOA = 0;
function Update_Deki() {
  socket.on("req_message_OALossSum", (data) => {
    data.recordset.filter((e) => {
      OALossSum.data.datasets[0].data[0] = 90;
      OALossSum.update();
      OALossSum.data.datasets[0].data[1] = parseFloat(e.perOA.toFixed(1));
      OALossSum.update();
      OALossSum.data.datasets[1].data[0] = 10;
      OALossSum.update();
      OALossSum.data.datasets[1].data[1] = parseFloat(
        (100 - e.perOA).toFixed(1)
      );
      OALossSum.update();
    });
  });
}

let dayLoss = objectDate.getDate();
let monthLoss = objectDate.getMonth() + 1;
let yearLoss = objectDate.getFullYear();
if (dayLoss < 10) {
  dayLoss = "01";
}
if (monthLoss < 10) {
  monthLoss = `0${monthLoss}`;
}
let formatLoss = `${yearLoss}${monthLoss}01`;

function dataWorkingDay_deki() {
  socket.on("CommonDay", (data) => {
    data.recordset.filter((e) => {
      if (e.DataCode == formatLoss) {
        MonthValueLoss = e.DataValue;
      }
      return MonthValueLoss;
    });
  });
}

var sim = 0;
var check_sim = 0;
var res = [];

function check(check_sim, e, x) {
  if (e.Value <= 0) {
    CurrentLossDetailSum.data.datasets[0].data[x - 1] = 0;
    CurrentLossDetailSum.update();
    //   CurrentLossDetailSum.data.datasets[1].data[x - 1] = 0;
    //   CurrentLossDetailSum.update();
  } else {
    check_sim = check_sim;
    CurrentLossDetailSum.data.datasets[0].data[x - 1] = check_sim.toFixed(0);
    CurrentLossDetailSum.update();
    // sim = check_sim - e.Value;
    // if (sim > 0) {
    //   // CurrentLossDetailSum.data.datasets[1].data[x - 1] = sim;
    //   // CurrentLossDetailSum.update();
    // } else {
    //   // CurrentLossDetailSum.data.datasets[1].data[x - 1] = 0;
    //   // CurrentLossDetailSum.update();
    // }
  }
  x = 0;
  e = 0;
  check_sim = 0;
  e.Value = 0;
  return check_sim;
}
updateprodActDeki();
Update_Deki();
dataWorkingDay_deki();

var SumAct_deki = 0;
var SumPlan_deki = 0;
var SumDiff_deki = 0;

function twoGreaterThanZero(arr) {
  let counter = 0;
  for (let x of arr) {
    console.log(x);
    if (x != 0 && ++counter > 1) return counter++;
  }
  return true;
}

var Prod_Actual_ValueDeki = [];
var Prod_Actual_ValueDeki2 = [];
var holderLoss = [];
var ValueLoss = [];
var sumLossClar = [];
var uniqueLoss = [];

var mergedArrayLoss;

var MonthValueLoss = 0;
var ProdPlanDeki = 0;
var sumProdPlanDeki = 0;

function updateprodActDeki() {
  socket.on("Manpower_Daily", (data) => {
    // console.log(data.recordset);
    sumProdPlanDeki = 0;
    data.recordset.map((e) => {
      sumProdPlanDeki += e.ProdPlan;
    });
  });
  socket.on("req_message_ProdAct_per_date", (data) => {
    res = [];
    CurrentLossDetailSum.data.datasets[0].data = 0;
    CurrentLossDetailSum.update();
    // CurrentLossDetailSum.data.datasets[1].data = 0;
    // CurrentLossDetailSum.update();
    CurrentLossDetailSum.data.datasets[2].data = 0;
    CurrentLossDetailSum.update();
    for (let i = 0; i < data.recordset.length; i++) {
      const ind = res.findIndex(
        (el) => el.ProductionDate === data.recordset[i].ProductionDate
      );
      // console.log(ind);
      if (ind === -1) {
        res.push(data.recordset[i]);
      } else {
        res[ind].Value += data.recordset[i].Value;
      }
    }
    res.sort((p1, p2) => {
      if (p1.ProductionDate < p2.ProductionDate) return -1;
      if (p1.ProductionDate > p2.ProductionDate) return 1;
      return 0;
    });
    ACC_plan.forEach((item) => {
      SumDiff_deki = 0;
      SumPlan_deki = sumProdPlanDeki * res.length;
      item.innerHTML = `<b>${formatNumber(SumPlan_deki, 2)}</b>`;
    });
    ACC_Act.forEach((item) => {
      SumAct_deki = 0;
      res.map((e) => {
        SumAct_deki += e.Value;
      });
      item.innerHTML = `<b>${formatNumber(SumAct_deki, 2)}</b>`;
    });
    ACC_Diff.forEach((item) => {
      SumDiff_deki = 0;
      SumDiff_deki = SumPlan_deki - SumAct_deki;
      item.innerHTML = `<b>${formatNumber(SumDiff_deki, 2)}</b>`;
    });
    // console.log(res);
    res.forEach((e, index) => {
      // console.log(e.ProductionDate);
      // console.log(Date_Modify(1), "eeee");

      if (e.ProductionDate === Date_Modify(1)) {
        CurrentLossDetailSum.data.datasets[2].data[0] = e.Value;
        check(sumProdPlanDeki, e, 1);
      } else if (e.ProductionDate === Date_Modify(2)) {
        CurrentLossDetailSum.data.datasets[2].data[1] = e.Value;
        check(sumProdPlanDeki, e, 2);
      } else if (e.ProductionDate === Date_Modify(3)) {
        CurrentLossDetailSum.data.datasets[2].data[2] = e.Value;
        check(sumProdPlanDeki, e, 3);
      } else if (e.ProductionDate === Date_Modify(4)) {
        CurrentLossDetailSum.data.datasets[2].data[3] = e.Value;
        check(sumProdPlanDeki, e, 4);
      } else if (e.ProductionDate === Date_Modify(5)) {
        CurrentLossDetailSum.data.datasets[2].data[4] = e.Value;
        check(sumProdPlanDeki, e, 5);
      } else if (e.ProductionDate === Date_Modify(6)) {
        CurrentLossDetailSum.data.datasets[2].data[5] = e.Value;
        check(sumProdPlanDeki, e, 6);
      } else if (e.ProductionDate === Date_Modify(7)) {
        CurrentLossDetailSum.data.datasets[2].data[6] = e.Value;
        check(sumProdPlanDeki, e, 7);
      } else if (e.ProductionDate === Date_Modify(8)) {
        CurrentLossDetailSum.data.datasets[2].data[7] = e.Value;
        check(sumProdPlanDeki, e, 8);
      } else if (e.ProductionDate === Date_Modify(9)) {
        CurrentLossDetailSum.data.datasets[2].data[8] = e.Value;
        check(sumProdPlanDeki, e, 9);
      } else if (e.ProductionDate === Date_Modify(10)) {
        CurrentLossDetailSum.data.datasets[2].data[9] = e.Value;
        check(sumProdPlanDeki, e, 10);
      } else if (e.ProductionDate === Date_Modify(11)) {
        CurrentLossDetailSum.data.datasets[2].data[10] = e.Value;
        check(sumProdPlanDeki, e, 11);
      } else if (e.ProductionDate === Date_Modify(12)) {
        CurrentLossDetailSum.data.datasets[2].data[11] = e.Value;
        check(sumProdPlanDeki, e, 12);
      } else if (e.ProductionDate === Date_Modify(13)) {
        CurrentLossDetailSum.data.datasets[2].data[12] = e.Value;
        check(sumProdPlanDeki, e, 13);
      } else if (e.ProductionDate === Date_Modify(14)) {
        CurrentLossDetailSum.data.datasets[2].data[13] = e.Value;
        check(sumProdPlanDeki, e, 14);
      } else if (e.ProductionDate === Date_Modify(15)) {
        CurrentLossDetailSum.data.datasets[2].data[14] = e.Value;
        check(sumProdPlanDeki, e, 15);
      } else if (e.ProductionDate === Date_Modify(16)) {
        CurrentLossDetailSum.data.datasets[2].data[15] = e.Value;
        check(sumProdPlanDeki, e, 16);
      } else if (e.ProductionDate === Date_Modify(17)) {
        CurrentLossDetailSum.data.datasets[2].data[16] = e.Value;
        check(sumProdPlanDeki, e, 17);
      } else if (e.ProductionDate === Date_Modify(18)) {
        CurrentLossDetailSum.data.datasets[2].data[17] = e.Value;
        check(sumProdPlanDeki, e, 18);
      } else if (e.ProductionDate === Date_Modify(19)) {
        CurrentLossDetailSum.data.datasets[2].data[18] = e.Value;
        check(sumProdPlanDeki, e, 19);
      } else if (e.ProductionDate === Date_Modify(20)) {
        CurrentLossDetailSum.data.datasets[2].data[19] = e.Value;
        check(sumProdPlanDeki, e, 20);
      } else if (e.ProductionDate === Date_Modify(21)) {
        CurrentLossDetailSum.data.datasets[2].data[20] = e.Value;
        check(sumProdPlanDeki, e, 21);
      } else if (e.ProductionDate === Date_Modify(22)) {
        CurrentLossDetailSum.data.datasets[2].data[21] = e.Value;
        check(sumProdPlanDeki, e, 22);
      } else if (e.ProductionDate === Date_Modify(23)) {
        CurrentLossDetailSum.data.datasets[2].data[22] = e.Value;
        check(sumProdPlanDeki, e, 23);
      } else if (e.ProductionDate === Date_Modify(24)) {
        CurrentLossDetailSum.data.datasets[2].data[23] = e.Value;
        check(sumProdPlanDeki, e, 24);
      } else if (e.ProductionDate === Date_Modify(25)) {
        CurrentLossDetailSum.data.datasets[2].data[24] = e.Value;
        check(sumProdPlanDeki, e, 25);
      } else if (e.ProductionDate === Date_Modify(26)) {
        CurrentLossDetailSum.data.datasets[2].data[25] = e.Value;
        check(sumProdPlanDeki, e, 26);
      } else if (e.ProductionDate === Date_Modify(27)) {
        CurrentLossDetailSum.data.datasets[2].data[26] = e.Value;
        check(sumProdPlanDeki, e, 27);
      } else if (e.ProductionDate === Date_Modify(28)) {
        CurrentLossDetailSum.data.datasets[2].data[27] = e.Value;
        check(sumProdPlanDeki, e, 28);
      } else if (e.ProductionDate === Date_Modify(29)) {
        CurrentLossDetailSum.data.datasets[2].data[28] = e.Value;
        check(sumProdPlanDeki, e, 29);
      } else if (e.ProductionDate === Date_Modify(30)) {
        CurrentLossDetailSum.data.datasets[2].data[29] = e.Value;
        check(sumProdPlanDeki, e, 30);
      } else if (e.ProductionDate === Date_Modify(31)) {
        CurrentLossDetailSum.data.datasets[2].data[30] = e.Value;
        check(sumProdPlanDeki, e, 31);
      }
    });
  });
}

const ACC_plan = document.querySelectorAll(".deki-5-2-number");
const ACC_Act = document.querySelectorAll(".deki-5-3-number");
const ACC_Diff = document.querySelectorAll(".deki-5-4-number");
const ChartLossClar = document.querySelectorAll(".chartIdLossClar");
const LossPerMonth = document.querySelectorAll(".deki-9-2-number");
const LossPerDay = document.querySelectorAll(".deki-9-3-number");

var LossRecorderClar = [];
var uniqueLossClar = [];
var holderLossClar = {};
var mergedArrayLossClar = [];
var sumLossClar = [];

var sum_code1 = 0;
var sum_code2 = 0;
var sum_code3 = 0;
var sum_code4 = 0;
var sum_code5 = 0;

updateLoss();
function updateLoss() {
  socket.on("req_message_Losss", (data) => {
    chartIdLossClar.data.datasets[0].data[0] = 0;
    chartIdLossClar.update();
    chartIdLossClar.data.datasets[0].data[1] = 0;
    chartIdLossClar.update();
    chartIdLossClar.data.datasets[0].data[2] = 0;
    chartIdLossClar.update();
    chartIdLossClar.data.datasets[0].data[3] = 0;
    chartIdLossClar.update();
    chartIdLossClar.data.datasets[0].data[4] = 0;
    chartIdLossClar.update();
    sum_code1 = 0;
    sum_code2 = 0;
    sum_code3 = 0;
    sum_code4 = 0;
    sum_code5 = 0;
    data.recordset.forEach((item) => {
      // console.log(item);
      if (
        item.Code === "1.2" ||
        item.Code === "1.4" ||
        item.Code === "1.1.1" ||
        item.Code === "1.1.2" ||
        item.Code === "1.3.1" ||
        item.Code === "1.3.2" ||
        item.Code === "1.5.1" ||
        item.Code === "1.5.2" ||
        item.Code === "1.6" ||
        item.Code === "1.7.1" ||
        item.Code === "1.7.2"
      ) {
        item.Code = "1";
        item.Description = "M/C DOWN TIME LOSS";
        sum_code1 += item.Minute;
        // console.log(sum_code1)
        chartIdLossClar.data.datasets[0].data[0] = sum_code1.toFixed(1);
        chartIdLossClar.update();
      } else if (item.Code === "2.1") {
        item.Code = "2";
        item.Description = "QUALITY";
        sum_code2 += item.Minute;
        chartIdLossClar.data.datasets[0].data[1] = sum_code2.toFixed(1);
        chartIdLossClar.update();
        // console.log(item)
      } else if (item.Code === "3.1" || item.Code === "3.2") {
        item.Code = "3";
        item.Description = "MAT & Part Loss";
        sum_code3 += item.Minute;
        chartIdLossClar.data.datasets[0].data[2] = sum_code3.toFixed(1);
        chartIdLossClar.update();
        // console.log(item)
      } else if (item.Code === "4.1" || item.Code === "4.2") {
        // console.log(item);
        item.Code = "4";
        item.Description = "WAITTING KANBAN";
        sum_code4 += item.Minute;
        chartIdLossClar.data.datasets[0].data[3] = sum_code4.toFixed(1);
        chartIdLossClar.update();
        // console.log(item);
      } else if (
        item.Code === "5.1" ||
        item.Code === "5.2" ||
        item.Code === "5.3"
      ) {
        item.Code = "5";
        item.Description = "Daily Loss";
        sum_code5 += item.Minute;
        chartIdLossClar.data.datasets[0].data[4] = sum_code5.toFixed(1);
        chartIdLossClar.update();
      }
    });
    return mergedArrayLoss;
  });
}

function addDataLoss(chart, label, newData, Description) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
    dataset.Description.push(Description);
  });

  chart.update();
  // console.log(chart.data);
}

function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
  chart.update();
}

LossRanking_month();
var SumLossPerMonth = 0;
function LossRanking_month() {
  socket.on("req_message_LossRanking_month", (data) => {
    data.recordset.filter((e) => {
      LossPerMonth.forEach((item) => {
        data.recordset.forEach((e) => {
          SumLossPerMonth += e.Minute;
          item.innerHTML = `<b>${formatNumber(SumLossPerMonth, 2)}</b>`;
        });
      });
    });
  });
}

const footer = (tooltipItems) => {
  let sum = "";

  tooltipItems.forEach(function (tooltipItem) {
    console.log(tooltipItem);
    if (tooltipItem.dataIndex === 0) {
      sum = tooltipItem.dataset.Description[0];
    } else if (tooltipItem.dataIndex === 1) {
      sum = tooltipItem.dataset.Description[1];
    } else if (tooltipItem.dataIndex === 2) {
      sum = tooltipItem.dataset.Description[2];
    } else if (tooltipItem.dataIndex === 3) {
      sum = tooltipItem.dataset.Description[3];
    } else if (tooltipItem.dataIndex === 4) {
      sum = tooltipItem.dataset.Description[4];
    } else if (tooltipItem.dataIndex === 5) {
      sum = tooltipItem.dataset.Description[5];
    } else if (tooltipItem.dataIndex === 6) {
      sum = tooltipItem.dataset.Description[6];
    } else if (tooltipItem.dataIndex === 7) {
      sum = tooltipItem.dataset.Description[7];
    } else if (tooltipItem.dataIndex === 8) {
      sum = tooltipItem.dataset.Description[8];
    } else if (tooltipItem.dataIndex === 9) {
      sum = tooltipItem.dataset.Description[9];
    } else if (tooltipItem.dataIndex === 10) {
      sum = tooltipItem.dataset.Description[10];
    } else if (tooltipItem.dataIndex === 11) {
      sum = tooltipItem.dataset.Description[11];
    } else if (tooltipItem.dataIndex === 12) {
      sum = tooltipItem.dataset.Description[12];
    } else if (tooltipItem.dataIndex === 13) {
      sum = tooltipItem.dataset.Description[13];
    } else if (tooltipItem.dataIndex === 14) {
      sum = tooltipItem.dataset.Description[14];
    } else if (tooltipItem.dataIndex === 15) {
      sum = tooltipItem.dataset.Description[15];
    } else if (tooltipItem.dataIndex === 16) {
      sum = tooltipItem.dataset.Description[16];
    } else if (tooltipItem.dataIndex === 17) {
      sum = tooltipItem.dataset.Description[17];
    } else if (tooltipItem.dataIndex === 18) {
      sum = tooltipItem.dataset.Description[18];
    }
  });
  return sum;
};

var RakingLoss_Chart = document.getElementById("RakingLossChart");
var RakingLossChart = new Chart(RakingLoss_Chart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        Description: [],
        backgroundColor: "rgba(255,224,181,1)",
        borderColor: "rgba(255,224,181,1)",
      },
    ],
  },
  options: {
    barThickness: 30,
    aspectRatio: 3.5,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer: footer,
        },
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
}); //

var count = 0;
Loss_Raking();
function Loss_Raking() {
  socket.on("req_message_LossRanking", (data) => {
    // console.log(data.recordset);
    // console.log(RakingLossChart.data);
    while (RakingLossChart.data.labels.length) {
      RakingLossChart.data.labels.pop();
      RakingLossChart.update();
      RakingLossChart.data.datasets[0].data.pop();
      RakingLossChart.update();
    }
    var SumLossPerDay = 0;
    data.recordset.map((e) => {
      addDataLoss(RakingLossChart, e.x, e.Minute, e.CodeName);
    });
    LossPerDay.forEach((item) => {
      data.recordset.forEach((e) => {
        SumLossPerDay += e.Minute;
        item.innerHTML = `<b>${formatNumber(SumLossPerDay, 2)}</b>`;
      });
    });
  });
}

const AccPlan = document.querySelectorAll(".deki-8-2-number");
const AccActual = document.querySelectorAll(".deki-8-3-number");
var AccPlan_Deki = 0;
var AccActual_Deki = 0;
var AccPlan_Deki = 0;
var CountDeki = 0;

var AccActual_Deki_1 = 0;
var AccActual_Deki_2 = 0;
var AccActual_Deki_3 = 0;
var AccActual_Deki_4 = 0;
var AccActual_Deki_5 = 0;
var AccActual_Deki_6 = 0;
var AccActual_Deki_7 = 0;
var AccActual_Deki_8 = 0;
var AccActual_Deki_9 = 0;
var AccActual_Deki_10 = 0;

var AccActual_PlanDeki_1 = 0;
var AccActual_PlanDeki_2 = 0;
var AccActual_PlanDeki_3 = 0;
var AccActual_PlanDeki_4 = 0;
var AccActual_PlanDeki_5 = 0;
var AccActual_PlanDeki_6 = 0;
var AccActual_PlanDeki_7 = 0;
var AccActual_PlanDeki_8 = 0;
var AccActual_PlanDeki_9 = 0;
var AccActual_PlanDeki_10 = 0;

var CS = [];

Houly_Dekidaka();
function Houly_Dekidaka() {
  socket.on("req_message_Dekidaka", (data) => {
    CurrentLossDekidaka.data.datasets[0].data = 0;
    CurrentLossDekidaka.update();
    CurrentLossDekidaka.data.datasets[1].data = 0;
    CurrentLossDekidaka.update();
    AccActual_Deki_1 = 0;
    AccActual_Deki_2 = 0;
    AccActual_Deki_3 = 0;
    AccActual_Deki_4 = 0;
    AccActual_Deki_5 = 0;
    AccActual_Deki_6 = 0;
    AccActual_Deki_7 = 0;
    AccActual_Deki_8 = 0;
    AccActual_Deki_9 = 0;
    AccActual_Deki_10 = 0;

    AccActual_PlanDeki_1 = 0;
    AccActual_PlanDeki_2 = 0;
    AccActual_PlanDeki_3 = 0;
    AccActual_PlanDeki_4 = 0;
    AccActual_PlanDeki_5 = 0;
    AccActual_PlanDeki_6 = 0;
    AccActual_PlanDeki_7 = 0;
    AccActual_PlanDeki_8 = 0;
    AccActual_PlanDeki_9 = 0;
    AccActual_PlanDeki_10 = 0;

    AccActual_Deki = 0;

    AccActual.forEach((item) => {
      data.recordset.forEach((e) => {
        AccActual_Deki += e.Value;
        item.innerHTML = `<b>${formatNumber(AccActual_Deki, 2)}</b>`;
      });
    });
    AccPlan.forEach((item) => {
      data.recordset.forEach((e) => {
        const duplicate = CS.find((obj) => obj.RxNo === e.RxNo);
        console.log(duplicate);
        AccPlan_Deki = 36300 / e.CT;
        item.innerHTML = `<b>${formatNumber(AccPlan_Deki, 0)}</b>`;
      });
    });

    data.recordset.forEach((e) => {
      if (e.HourNo === 1) {
        // console.log(e);
        AccActual_Deki_1 += e.Value;
        AccActual_PlanDeki_1 = 3300 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[0] = AccActual_Deki_1;
        CurrentLossDekidaka.data.datasets[1].data[0] =
          AccActual_PlanDeki_1.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 2) {
        AccActual_Deki_2 += e.Value;
        AccActual_PlanDeki_2 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[1] = AccActual_Deki_2;
        CurrentLossDekidaka.data.datasets[1].data[1] =
          AccActual_PlanDeki_2.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 3) {
        AccActual_Deki_3 += e.Value;
        AccActual_PlanDeki_3 = 3000 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[2] = AccActual_Deki_3;
        CurrentLossDekidaka.data.datasets[1].data[2] =
          AccActual_PlanDeki_3.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 4) {
        AccActual_Deki_4 += e.Value;
        AccActual_PlanDeki_4 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[3] = AccActual_Deki_4;
        CurrentLossDekidaka.data.datasets[1].data[3] =
          AccActual_PlanDeki_4.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 5) {
        AccActual_Deki_5 += e.Value;
        AccActual_PlanDeki_5 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[4] = AccActual_Deki_5;
        CurrentLossDekidaka.data.datasets[1].data[4] =
          AccActual_PlanDeki_5.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 6) {
        AccActual_Deki_6 += e.Value;
        AccActual_PlanDeki_6 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[5] = AccActual_Deki_6;
        CurrentLossDekidaka.data.datasets[1].data[5] =
          AccActual_PlanDeki_6.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 7) {
        AccActual_Deki_7 += e.Value;
        AccActual_PlanDeki_7 = 3000 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[6] = AccActual_Deki_7;
        CurrentLossDekidaka.data.datasets[1].data[6] =
          AccActual_PlanDeki_7.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 8) {
        AccActual_Deki_8 += e.Value;
        AccActual_PlanDeki_8 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[7] = AccActual_Deki_8;
        CurrentLossDekidaka.data.datasets[1].data[7] =
          AccActual_PlanDeki_8.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 9) {
        AccActual_Deki_9 += e.Value;
        AccActual_PlanDeki_9 = 3600 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[8] = AccActual_Deki_9;
        CurrentLossDekidaka.data.datasets[1].data[8] =
          AccActual_PlanDeki_9.toFixed(0);
        CurrentLossDekidaka.update();
      } else if (e.HourNo === 10) {
        AccActual_Deki_10 += e.Value;
        AccActual_PlanDeki_10 = 5400 / e.CT;
        CurrentLossDekidaka.data.datasets[0].data[9] = AccActual_Deki_10;
        CurrentLossDekidaka.data.datasets[1].data[9] =
          AccActual_PlanDeki_10.toFixed(0);
        CurrentLossDekidaka.update();
      }
    });
  });
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

LD = [];
Loss_Detail();
function Loss_Detail() {
  var tableContainer = document.getElementById("table-container");
  socket.on("req_message_LossSum", (data) => {
    LD = [];
    document.querySelectorAll("table tr").forEach(function (e) {
      e.remove();
    });
    // table.remove(0);
    data.recordset.filter((e) => {
      LD.push(e);
    });
    // console.log(LD);
    // console.log(tableContainer);
    var table = createTableFromObjects(LD);
    tableContainer.appendChild(table);
    // console.log(tableContainer);
  });
}

function createTableFromObjects(data) {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  // const dataRow = document.createElement("tr");
  const keys = Object.keys(data[0]);
  for (const key of keys) {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);
  for (const obj of data) {
    const dataRow = document.createElement("tr");
    for (const key of keys) {
      const dataCell = document.createElement("td");
      dataRow.setAttribute("id", "elementid");
      dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);
    }
    table.appendChild(dataRow);
  }
  return table;
}

var SC = [];
AddOption();
function AddOption() {
  var SectionCode = document.getElementById("filterBySectionCode");
  socket.on("req_message_Data", (data) => {
    // console.log(data.recordset);
    removeAll(SectionCode);
    data.recordset.filter((e) => {
      var optionSectionCode = document.createElement("option");
      const duplicate = SC.find((obj) => obj.SectionName === e.SectionName);
      if (!duplicate) {
        SC.push(e);
        SC.filter((sc) => {
          optionSectionCode.text = sc.SectionName;
          SectionCode.add(optionSectionCode);
        });
      }
    });
  });
}

function removeAll(selectBox) {
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
}

LN = [];
AddOptionLine();
function AddOptionLine() {
  var LineName = document.getElementById("filterByLineName");
  socket.on("req_message_Data_Line", (data) => {
    // console.log(data);
    data.recordset.unshift({
      SectionName: "Select All",
      LineName: "Select All",
      sumCode: "Select All",
    });
    removeAll(LineName);
    data.recordset.filter((e) => {
      // console.log(e);
      var optionLineName = document.createElement("option");
      optionLineName.text = e.sumCode;
      LineName.add(optionLineName);
      return e.LineName;
    });
  });
}

var searchFilter = () => {
  let selectedSectionCode = document.getElementById(
    "filterBySectionCode"
  ).value;
  console.log(selectedSectionCode);
  socket.emit("filterdata", selectedSectionCode);
};

var searchFilterLineCode = () => {
  let selectedLineName = document.getElementById("filterByLineName").value;

  const selected = selectedLineName.slice(7);
  console.log(selected);
  socket.emit("filterdataLineName", selected);
};

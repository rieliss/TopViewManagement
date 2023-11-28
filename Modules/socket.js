// var socket = io("http://localhost:4040");
// var socket = io("http://172.23.36.47:4040");
var socket = io("http://10.122.77.1:4040");

const objectDate = new Date();
// const objectDate = new Date("2023-10-05");
const today = getPreviousDay();

const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);

const x = "'" + todayDate_result + " 00:00:00.000'";
const y = "'" + monthDate_result + "-01 00:00:00.000'";

const firstdate = "'" + monthDate_result + "-01 00:00:00.000'";
const lastdate = "'" + monthDate_result + "-31 00:00:00.000'";

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

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

function calculateSum(array, property) {
  let sum = 0;

  array.forEach((element) => {
    sum += element[property];
  });
  // console.log(sum);
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

var MonthValue;
var LineSummary = [];
var Prod_Actual_Value = [];
var Prod_Actual_Value2 = [];
var ProdActual = {};
var mergedArrayAct_LineSummary;
var mergedArrayAct = [];
const unique = [];
const sum = [];

var ProdActualAlt;
var ProdActualSta;
var ProdActualECC;
var ProdActualPart1;
var ProdActualPart2;
var ProdActualAct = 0;
var ProdActualAct_chart = 0;

var ProdPlanAlt;
var ProdPlanSta;
var ProdPlanECC;
var ProdPlanPart1;
var ProdPlanPart2;

var holder = {};
const Sumupdate_prodAct = 0;

const update_prodActCurrent = document.querySelectorAll(".Prod_Modal_6");

const update_prodActCurrentAlt = document.querySelectorAll(".Prod_Modal_15");
const update_prodActCurrentSta = document.querySelectorAll(".Prod_Modal_57");
const update_prodActCurrentECC = document.querySelectorAll(".Prod_Modal_60");
const update_prodActCurrentPart1 = document.querySelectorAll(".Prod_Modal_63");
const update_prodActCurrentPart2 = document.querySelectorAll(".Prod_Modal_66");

const update_prodActAlt = document.querySelectorAll(".Prod_Modal_20");
const update_prodActSta = document.querySelectorAll(".Prod_Modal_28");
const update_prodActECC = document.querySelectorAll(".Prod_Modal_36");
const update_prodActPart1 = document.querySelectorAll(".Prod_Modal_44");
const update_prodActPart2 = document.querySelectorAll(".Prod_Modal_52");

const update_prodPlanAlt = document.querySelectorAll(".Prod_Modal_18");
const update_prodPlanSta = document.querySelectorAll(".Prod_Modal_26");
const update_prodPlanECC = document.querySelectorAll(".Prod_Modal_34");
const update_prodPlanPart1 = document.querySelectorAll(".Prod_Modal_42");
const update_prodPlanPart2 = document.querySelectorAll(".Prod_Modal_50");

const update_prodOAAlt = document.querySelectorAll(".Prod_Modal_22");
const update_prodOASta = document.querySelectorAll(".Prod_Modal_30");
const update_prodOAECC = document.querySelectorAll(".Prod_Modal_38");
const update_prodOAPart1 = document.querySelectorAll(".Prod_Modal_46");
const update_prodOAPart2 = document.querySelectorAll(".Prod_Modal_54");

var ProdPlanAct = 0;
var SumCurrent = 0;
var PerSumCurrent = 0;

var ProdActualAlt_value = 0;
var ProdActualSta_value = 0;
var ProdActualECC_value = 0;
var ProdActualPart1_value = 0;
var ProdActualPart2_value = 0;

var ProdPlanAlt_value = 0;
var ProdPlanSta_value = 0;
var ProdPlanECC_value = 0;
var ProdPlanPart1_value = 0;
var ProdPlanPart2_value = 0;

var sumProdPlanAlt;
var sumProdPlanAlt_chart;

var sumProdPlanSta;
var sumProdPlanSta_chart;

var sumProdPlanECC;
var sumProdPlanECC_chart;

var sumProdPlanPart1;
var sumProdPlanPart1_chart;

var sumProdPlanPart2;
var sumProdPlanPart2_chart;

var sumProdPlan;

var OA_sumProdPlanAlt;
var OA_sumProdPlanSta;
var OA_sumProdPlanECC;
var OA_sumProdPlanPart1;
var OA_sumProdPlanPart2;

const update_prodAct = document.querySelectorAll(".update_prodA");
const update_prodPlan = document.querySelectorAll(".update_prodP");

var chrtMFG1_value = "0%";
var chrtMFG2_value = "0%";
var chrtMFG3_value = "0%";
var chrtPART1_value = "0%";
var chrtPART2_value = "0%";

function Transfer_data(data, Value, holder, sum) {
  Value.push(data);
  Value.forEach(function (d) {
    if (holder.hasOwnProperty(d.Department)) {
      holder[d.Department] = holder[d.Department] + d.Value;
    } else {
      holder[d.Department] = d.Value;
    }
  });
  for (var prop in holder) {
    Value.push({ RxNo_Line: prop, Value: holder[prop], Department: prop });
  }
  for (const item of Value) {
    const duplicate = sum.find((obj) => obj.RxNo_Line === item.RxNo_Line);
    const duplicate2 = sum.find((obj) => obj.Department === item.RxNo_Line);
    // console.log(duplicate)
    if (!duplicate && !duplicate2) {
      sum.push(item);
    }
  }
  return sum;
}

var OA_Alt = 0;
var OA_Sta = 0;
var OA_ECC = 0;
var OA_Part1 = 0;
var OA_Part2 = 0;

updateprodAct();
async function updateprodAct() {
  await socket.on("Manpower_Daily", (data) => {
    data.recordset.filter((e) => {
      if (e.Department === "Alternator Product") {
        ProdPlanAlt_value += e.ProdPlan;
        return ProdPlanAlt_value;
      } else if (e.Department === "Starter Product") {
        ProdPlanSta_value += e.ProdPlan;
        return ProdPlanSta;
      } else if (e.Department === "ECC, ABS & Asmo Product") {
        ProdPlanECC_value += e.ProdPlan;
        return ProdPlanECC;
      } else if (e.Department === "Parts Mfg.1") {
        ProdPlanPart1_value += e.ProdPlan;
        return ProdPlanPart1;
      } else if (e.Department === "Parts Mfg.2") {
        ProdPlanPart2_value += e.ProdPlan;
        return ProdPlanPart2;
      }
    });
    update_prodPlan.forEach((item) => {
      data.recordset.filter((e) => {
        ProdPlanAct += e.ProdPlan;
        item.innerHTML = `<b>${formatNumber(ProdPlanAct)}</b>`;
        return ProdPlanAct;
      });
    });
  });
  await socket.on("req_message_ProdAct_s", (data) => {
    update_prodActAlt.forEach((item) => {
      data.recordset.filter((data) => {
        if (data.Department === "Alternator Product") {
          ProdActualAlt_value += data.Value;
          chartIdMFG1.data.datasets[0].data[1] = ProdActualAlt_value;
          chartIdMFG1.update();
          ProdActualAlt = formatNumber(ProdActualAlt_value);
          item.innerHTML = `<b>${ProdActualAlt}</b>`;
          // return ProdActualAlt_value;
          // console.log(ProdPlanAlt_value);
          // console.log(ProdActualAlt_value);
          sumProdPlanAlt_chart = ProdPlanAlt_value - ProdActualAlt_value;
          if (!(sumProdPlanAlt_chart > 0)) sumProdPlanAlt_chart = 0;
          chartIdMFG1.data.datasets[0].data[0] = sumProdPlanAlt_chart;
          chartIdMFG1.update();
          ProdPlanAlt = formatNumber(sumProdPlanAlt_chart);
          OA_Alt = (ProdActualAlt_value / ProdPlanAlt_value) * 100;
          update_prodPlanAlt.forEach((item) => {
            item.innerHTML = `<b>${formatNumber(ProdPlanAlt_value)}</b>`;
          });
          update_prodOAAlt.forEach((item) => {
            item.innerHTML = `<b>${OA_Alt.toFixed(1)}%</b>`;
          });
          chrtMFG1_value = `${OA_Alt.toFixed(1)}%`;
        }
        return ProdActualAlt_value, chartIdMFG1;
      });
    });
    update_prodActSta.forEach((item) => {
      data.recordset.filter((data) => {
        if (data.Department === "Starter Product") {
          ProdActualSta_value += data.Value;
          chartIdMFG2.data.datasets[0].data[1] = ProdActualSta_value;
          chartIdMFG2.update();
          ProdActualSta = formatNumber(ProdActualSta_value);
          item.innerHTML = `<b>${ProdActualSta}</b>`;
          // return ProdActualSta_value;
          sumProdPlanSta_chart = ProdPlanSta_value - ProdActualSta_value;
          if (!(sumProdPlanSta_chart > 0)) sumProdPlanSta_chart = 0;
          chartIdMFG2.data.datasets[0].data[0] = sumProdPlanSta_chart;
          chartIdMFG2.update();
          ProdPlanSta = formatNumber(parseFloat(sumProdPlanSta_chart), 2);
          update_prodPlanSta.forEach((item) => {
            item.innerHTML = `<b>${formatNumber(ProdPlanSta_value)}</b>`;
          });
          OA_Sta = (ProdActualSta_value / ProdPlanSta_value) * 100;
          update_prodOASta.forEach((item) => {
            item.innerHTML = `<b>${OA_Sta.toFixed(1)}%</b>`;
          });
          chrtMFG2_value = `${(
            (ProdActualSta_value / ProdPlanSta_value) *
            100
          ).toFixed(1)}%`;
        }
        return ProdActualSta_value, chartIdMFG2;
      });
    });
    update_prodActECC.forEach((item) => {
      data.recordset.forEach((data) => {
        if (data.Department === "ECC, ABS & Asmo Product") {
          ProdActualECC_value += data.Value;
          chartIdMFG3.data.datasets[0].data[1] = ProdActualECC_value;
          chartIdMFG3.update();
          ProdActualECC = formatNumber(ProdActualECC_value);
          item.innerHTML = `<b>${ProdActualECC}</b>`;
          // return ProdActualECC_value;
          sumProdPlanECC_chart = ProdPlanECC_value - ProdActualECC_value;
          if (!(sumProdPlanECC_chart > 0)) sumProdPlanECC_chart = 0;
          chartIdMFG3.data.datasets[0].data[0] = sumProdPlanECC_chart;
          chartIdMFG3.update();
          ProdPlanECC = formatNumber(parseFloat(sumProdPlanECC_chart), 2);
          update_prodPlanECC.forEach((item) => {
            item.innerHTML = `<b>${formatNumber(ProdPlanECC_value)}</b>`;
          });
          update_prodOAECC.forEach((item) => {
            item.innerHTML = `<b>${(
              (ProdActualECC_value / ProdPlanECC_value) *
              100
            ).toFixed(1)}%</b>`;
          });
          chrtMFG3_value = `${(
            (ProdActualECC_value / ProdPlanECC_value) *
            100
          ).toFixed(1)}%`;
        }
        return ProdActualECC_value, chartIdMFG3;
      });
    });
    update_prodActPart1.forEach((item) => {
      data.recordset.forEach((data) => {
        if (data.Department === "Parts Mfg.1") {
          ProdActualPart1_value += data.Value;
          chartIdPART1.data.datasets[0].data[1] = ProdActualPart1_value;
          chartIdPART1.update();
          ProdActualPart1 = formatNumber(ProdActualPart1_value);
          item.innerHTML = `<b>${ProdActualPart1}</b>`;
          // return ProdActualPart1_value;
          sumProdPlanPart1_chart = ProdPlanPart1_value - ProdActualPart1_value;
          if (!(sumProdPlanPart1_chart > 0)) sumProdPlanPart1_chart = 0;
          chartIdPART1.data.datasets[0].data[0] = sumProdPlanPart1_chart;
          chartIdPART1.update();
          ProdPlanPart1 = formatNumber(parseFloat(sumProdPlanPart1_chart), 2);
          update_prodPlanPart1.forEach((item) => {
            item.innerHTML = `<b>${formatNumber(ProdPlanPart1_value)}</b>`;
          });
          update_prodOAPart1.forEach((item) => {
            item.innerHTML = `<b>${(
              (ProdActualPart1_value / ProdPlanPart1_value) *
              100
            ).toFixed(1)}%</b>`;
          });
          chrtPART1_value = `${(
            (ProdActualPart1_value / ProdPlanPart1_value) *
            100
          ).toFixed(1)}%`;
        }
        return ProdActualPart1_value, ProdPlanPart1;
      });
    });
    update_prodActPart2.forEach((item) => {
      data.recordset.forEach((data) => {
        if (data.Department === "Parts Mfg.2") {
          ProdActualPart2_value += data.Value;
          chartIdPART2.data.datasets[0].data[1] = ProdActualPart2_value;
          chartIdPART2.update();
          ProdActualPart2 = formatNumber(ProdActualPart2_value);
          item.innerHTML = `<b>${ProdActualPart2}</b>`;
          // return ProdActualPart2_value;
          sumProdPlanPart2_chart = ProdPlanPart2_value - ProdActualPart2_value;
          if (!(sumProdPlanPart2_chart > 0)) sumProdPlanPart2_chart = 0;
          chartIdPART2.data.datasets[0].data[0] = sumProdPlanPart2_chart;
          chartIdPART2.update();
          ProdPlanPart2 = formatNumber(parseFloat(sumProdPlanPart2_chart), 2);
          update_prodPlanPart2.forEach((item) => {
            item.innerHTML = `<b>${formatNumber(ProdPlanPart2_value)}</b>`;
          });
          update_prodOAPart2.forEach((item) => {
            item.innerHTML = `<b>${(
              (ProdActualPart2_value / ProdPlanPart2_value) *
              100
            ).toFixed(1)}%</b>`;
          });
          chrtPART2_value = `${(
            (ProdActualPart2_value / ProdPlanPart2_value) *
            100
          ).toFixed(1)}%`;
        }
        return ProdActualPart2_value, chartIdPART2;
      });
    });
    update_prodAct.forEach((item) => {
      data.recordset.forEach((data) => {
        // console.log(data.Value);
        ProdActualAct += data.Value;
        item.innerHTML = `<b>${formatNumber(ProdActualAct)}</b>`;
        // console.log(ProdActualAct);
        CurrentPord.data.datasets[0].data[0] = ProdActualAct.toFixed(2);
        CurrentPord.update();
        SumCurrent = ProdPlanAct - ProdActualAct;
        CurrentPord.data.datasets[1].data[0] = SumCurrent.toFixed(2);
        CurrentPord.update();
        PerSumCurrent = (ProdActualAct / ProdPlanAct) * 100;
      });
      update_prodActCurrent.forEach((item) => {
        item.innerHTML = `<b>${PerSumCurrent.toFixed(2)}%</b>`;
      });
    });
  });
}
// update_prodAct.forEach((item) => {
//   mergedArrayAct.forEach((data) => {
//     if (data.Department != undefined) {
//       // ProdActualAct = Transfer_data(data, ValueAct, holderAct, sumAct)
//       // console.log(ProdActualAct)
//       ProdActualAct_chart = calculateSum(
//         Transfer_data(data, ValueAct, holderAct, sumAct),
//         "Value"
//       );
//       ProdActualAct = formatNumber(
//         calculateSum(
//           Transfer_data(data, ValueAct, holderAct, sumAct),
//           "Value"
//         )
//       );
//       // console.log(CurrentPord.data.datasets[0].data[0])
//       CurrentPord.data.datasets[0].data[0] = ProdActualAct_chart;
//       CurrentPord.update();
//       item.innerHTML = `${ProdActualAct}`;
//       // console.log(ProdActualAct)
//       return ProdActualAct_chart;
//     }
//   });
// });

var LossRecorder = [];
var uniqueLoss = [];
var holderLoss = {};
var mergedArrayLoss = [];
const sumLoss = [];

var ProdLossAlt_value = 0;
var ValueLossAlt = [];
var holderLossAlt = [];
var sumLossAlt = [];

var ProdLossSta_value = 0;
var ValueLossSta = [];
var holderLossSta = [];
var sumLossSta = [];

var ProdLossECC_value = 0;
var ValueLossECC = [];
var holderLossECC = [];
var sumLossECC = [];

var ProdLossPart1_value = 0;
var ValueLossPart1 = [];
var holderLossPart1 = [];
var sumLossPart1 = [];

var ProdLossPart2_value = 0;
var ValueLossPart2 = [];
var holderLossPart2 = [];
var sumLossPart2 = [];

var Alt_Loss_st = 0;
var Alt_Loss_nd = 0;
var Alt_Loss_rd = 0;
var Alt_Loss_th = 0;
var Alt_Loss_fth = 0;

var Sta_Loss_st = 0;
var Sta_Loss_nd = 0;
var Sta_Loss_rd = 0;
var Sta_Loss_th = 0;
var Sta_Loss_fth = 0;

var ECC_Loss_st = 0;
var ECC_Loss_nd = 0;
var ECC_Loss_rd = 0;
var ECC_Loss_th = 0;
var ECC_Loss_fth = 0;

var Part1_Loss_st = 0;
var Part1_Loss_nd = 0;
var Part1_Loss_rd = 0;
var Part1_Loss_th = 0;
var Part1_Loss_fth = 0;

var Part2_Loss_st = 0;
var Part2_Loss_nd = 0;
var Part2_Loss_rd = 0;
var Part2_Loss_th = 0;
var Part2_Loss_fth = 0;

updateLoss();
function updateLoss() {
  socket.on("req_message_Losss", (data) => {
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
        // console.log(item);
        if (item.Department === "Alternator Product") {
          // console.log(item);
          Alt_Loss_st += item.Minute;
          CurrentLoss.data.datasets[0].data[0] = Alt_Loss_st.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Starter Product") {
          Sta_Loss_st += item.Minute;
          CurrentLoss.data.datasets[0].data[1] = Sta_Loss_st.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "ECC, ABS & Asmo Product") {
          ECC_Loss_st += item.Minute;
          CurrentLoss.data.datasets[0].data[2] = ECC_Loss_st.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.1") {
          Part1_Loss_st += item.Minute;
          CurrentLoss.data.datasets[0].data[3] = Part1_Loss_st.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.2") {
          Part2_Loss_st += item.Minute;
          CurrentLoss.data.datasets[0].data[4] = Part2_Loss_st.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        }
      } else if (item.Code === "2.1") {
        item.Code = "2";
        item.Description = "QUALITY";
        // console.log(item)
        if (item.Department === "Alternator Product") {
          // console.log(item)
          Alt_Loss_nd += item.Minute;
          CurrentLoss.data.datasets[1].data[0] = Alt_Loss_nd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Starter Product") {
          Sta_Loss_nd += item.Minute;
          CurrentLoss.data.datasets[1].data[1] = Sta_Loss_nd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "ECC, ABS & Asmo Product") {
          ECC_Loss_nd += item.Minute;
          CurrentLoss.data.datasets[1].data[2] = ECC_Loss_nd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.1") {
          Part1_Loss_nd += item.Minute;
          CurrentLoss.data.datasets[1].data[3] = Part1_Loss_nd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.2") {
          Part2_Loss_nd += item.Minute;
          CurrentLoss.data.datasets[1].data[4] = Part2_Loss_nd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        }
      } else if (item.Code === "3.1" || item.Code === "3.2") {
        item.Code = "3";
        item.Description = "MAT & Part Loss";
        // console.log(item)
        if (item.Department === "Alternator Product") {
          // console.log(item)
          Alt_Loss_rd += item.Minute;
          CurrentLoss.data.datasets[2].data[0] = Alt_Loss_rd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Starter Product") {
          Sta_Loss_rd += item.Minute;
          CurrentLoss.data.datasets[2].data[1] = Sta_Loss_rd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "ECC, ABS & Asmo Product") {
          ECC_Loss_rd += item.Minute;
          CurrentLoss.data.datasets[2].data[2] = ECC_Loss_rd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.1") {
          Part1_Loss_rd += item.Minute;
          CurrentLoss.data.datasets[2].data[3] = Part1_Loss_rd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.2") {
          Part2_Loss_rd += item.Minute;
          CurrentLoss.data.datasets[2].data[4] = Part2_Loss_rd.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        }
      } else if (item.Code === "4.1" || item.Code === "4.2") {
        item.Code = "4";
        item.Description = "WAITTING KANBAN";
        if (item.Department === "Alternator Product") {
          Alt_Loss_th += item.Minute;
          CurrentLoss.data.datasets[3].data[0] = Alt_Loss_th.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Starter Product") {
          Sta_Loss_th += item.Minute;
          CurrentLoss.data.datasets[3].data[1] = Sta_Loss_th.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "ECC, ABS & Asmo Product") {
          ECC_Loss_th += item.Minute;
          CurrentLoss.data.datasets[3].data[2] = ECC_Loss_th.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.1") {
          Part1_Loss_th += item.Minute;
          CurrentLoss.data.datasets[3].data[3] = Part1_Loss_th.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        } else if (item.Department === "Parts Mfg.2") {
          Part2_Loss_th += item.Minute;
          CurrentLoss.data.datasets[3].data[4] = Part2_Loss_th.toFixed(1);
          CurrentLoss.update();
          // console.log(item)
        }
      } else if (
        item.Code === "5.1" ||
        item.Code === "5.2" ||
        item.Code === "5.3"
      ) {
        item.Code = "5";
        item.Description = "Daily Loss";
        // console.log(item)
        if (item.Department === "Alternator Product") {
          Alt_Loss_fth += item.Minute;
          CurrentLoss.data.datasets[4].data[0] = Alt_Loss_fth.toFixed(1);
          CurrentLoss.update();
        } else if (item.Department === "Starter Product") {
          Sta_Loss_fth += item.Minute;
          CurrentLoss.data.datasets[4].data[1] = Sta_Loss_fth.toFixed(1);
          CurrentLoss.update();
        } else if (item.Department === "ECC, ABS & Asmo Product") {
          ECC_Loss_fth += item.Minute;
          CurrentLoss.data.datasets[4].data[2] = ECC_Loss_fth.toFixed(1);
          CurrentLoss.update();
        } else if (item.Department === "Parts Mfg.1") {
          Part1_Loss_fth += item.Minute;
          CurrentLoss.data.datasets[4].data[3] = Part1_Loss_fth.toFixed(1);
          CurrentLoss.update();
        } else if (item.Department === "Parts Mfg.2") {
          Part2_Loss_fth += item.Minute;
          CurrentLoss.data.datasets[4].data[4] = Part2_Loss_fth.toFixed(1);
          CurrentLoss.update();
        }
      }
    });
    return mergedArrayLoss;
  });
  // setInterval(function () {
  // }, 5000);
}

Loss_time();
function Loss_time() {
  socket.on("req_message_Losss", (data) => {
    data.recordset.map((data) => {
      // console.log(data);
      update_prodActCurrentAlt.forEach((item) => {
        if (data.Department === "Alternator Product") {
          ProdLossAlt_value += data.Minute;
          // console.log(ProdLossAlt_value);
          item.innerHTML = `<b>${ProdLossAlt_value.toFixed(1)}</b>`;
        }
      });
      update_prodActCurrentSta.forEach((item) => {
        if (data.Department === "Starter Product") {
          ProdLossSta_value += data.Minute;
          item.innerHTML = `<b>${ProdLossSta_value.toFixed(1)}</b>`;
        }
      });
      update_prodActCurrentECC.forEach((item) => {
        if (data.Department === "ECC, ABS & Asmo Product") {
          ProdLossECC_value += data.Minute;
          item.innerHTML = `<b>${ProdLossECC_value.toFixed(1)}</b>`;
        }
      });
      update_prodActCurrentPart1.forEach((item) => {
        if (data.Department === "Parts Mfg.1") {
          ProdLossPart1_value += data.Minute;
          item.innerHTML = `<b>${ProdLossPart1_value.toFixed(1)}</b>`;
        }
      });
      update_prodActCurrentPart2.forEach((item) => {
        if (data.Department === "Parts Mfg.2") {
          ProdLossPart2_value += data.Minute;
          item.innerHTML = `<b>${ProdLossPart2_value.toFixed(1)}</b>`;
        }
      });
    });
  });
}

function dataWorkingDay() {
  socket.on("CommonDay", (data) => {
    data.recordset.filter((e) => {
      if (e.DataCode == format) {
        MonthValue = e.DataValue;
      }
      return MonthValue;
    });
  });
}

function Date_Modify(date) {
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let Date_Modify = `${year}-${month}-` + date + `T00:00:00.000Z`;
  // console.log(Date_Modify)
  return Date_Modify;
}

var MPRecorder = [];
var sumMP = [];
var mergedArrayMP = [];
var uniqueMP = [];

var sumMPIL_Alt = 0;
var sumMPOL_Alt = 0;
var sumMPMS_Alt = 0;
var sumMPLL_Alt = 0;
var sumMPTL_Alt = 0;

var sumMPIL_Sta = 0;
var sumMPOL_Sta = 0;
var sumMPMS_Sta = 0;
var sumMPLL_Sta = 0;
var sumMPTL_Sta = 0;

var sumMPIL_ECC = 0;
var sumMPOL_ECC = 0;
var sumMPMS_ECC = 0;
var sumMPLL_ECC = 0;
var sumMPTL_ECC = 0;

var sumMPIL_Part1 = 0;
var sumMPOL_Part1 = 0;
var sumMPMS_Part1 = 0;
var sumMPLL_Part1 = 0;
var sumMPTL_Part1 = 0;

var sumMPIL_Part2 = 0;
var sumMPOL_Part2 = 0;
var sumMPMS_Part2 = 0;
var sumMPLL_Part2 = 0;
var sumMPTL_Part2 = 0;

const first_MP = document.querySelectorAll("#first_MP");
const second_MP = document.querySelectorAll("#second_MP");
const main_MP = document.querySelectorAll(".item-14-3-8");

Manpower_Attendance();
function Manpower_Attendance() {
  socket.on("req_message_DLMP", (data) => {
    data.recordset.map((item) => {
      // console.log(item.ProductionDate)
      // if (item.ProductionDate === Date_Modify(1)) {
      // console.log(item)
      if (item.Department === "Alternator Product") {
        ActiveWorker.data.datasets[4].data[0] = sumMPIL_Alt += item.InLine_WT;
        ActiveWorker.data.datasets[3].data[0] = sumMPOL_Alt += item.OutLine_WT;
        ActiveWorker.data.datasets[2].data[0] = sumMPMS_Alt +=
          item.Mizusumashi_WT;
        ActiveWorker.data.datasets[1].data[0] = sumMPLL_Alt +=
          item.LineLeader_WT;
        ActiveWorker.data.datasets[0].data[0] = sumMPTL_Alt +=
          item.TeamLeader_WT;
        ActiveWorker.update();
        // console.log(item);
      } else if (item.Department === "Starter Product") {
        ActiveWorker.data.datasets[4].data[1] = sumMPIL_Sta += item.InLine_WT;
        ActiveWorker.data.datasets[3].data[1] = sumMPOL_Sta += item.OutLine_WT;
        ActiveWorker.data.datasets[2].data[1] = sumMPMS_Sta +=
          item.Mizusumashi_WT;
        ActiveWorker.data.datasets[1].data[1] = sumMPLL_Sta +=
          item.LineLeader_WT;
        ActiveWorker.data.datasets[0].data[1] = sumMPTL_Sta +=
          item.TeamLeader_WT;
        ActiveWorker.update();
      } else if (item.Department === "ECC, ABS & Asmo Product") {
        ActiveWorker.data.datasets[4].data[2] = sumMPIL_ECC += item.InLine_WT;
        ActiveWorker.data.datasets[3].data[2] = sumMPOL_ECC += item.OutLine_WT;
        ActiveWorker.data.datasets[2].data[2] = sumMPMS_ECC +=
          item.Mizusumashi_WT;
        ActiveWorker.data.datasets[1].data[2] = sumMPLL_ECC +=
          item.LineLeader_WT;
        ActiveWorker.data.datasets[0].data[2] = sumMPTL_ECC +=
          item.TeamLeader_WT;
      } else if (item.Department === "Parts Mfg.1") {
        ActiveWorker.data.datasets[4].data[3] = sumMPIL_Part1 += item.InLine_WT;
        ActiveWorker.data.datasets[3].data[3] = sumMPOL_Part1 +=
          item.OutLine_WT;
        ActiveWorker.data.datasets[2].data[3] = sumMPMS_Part1 +=
          item.Mizusumashi_WT;
        ActiveWorker.data.datasets[1].data[3] = sumMPLL_Part1 +=
          item.LineLeader_WT;
        ActiveWorker.data.datasets[0].data[3] = sumMPTL_Part1 +=
          item.TeamLeader_WT;
      } else if (item.Department === "Parts Mfg.2") {
        ActiveWorker.data.datasets[4].data[4] = sumMPIL_Part2 += item.InLine_WT;
        ActiveWorker.data.datasets[3].data[4] = sumMPOL_Part2 +=
          item.OutLine_WT;
        ActiveWorker.data.datasets[2].data[4] = sumMPMS_Part2 +=
          item.Mizusumashi_WT;
        ActiveWorker.data.datasets[1].data[4] = sumMPLL_Part2 +=
          item.LineLeader_WT;
        ActiveWorker.data.datasets[0].data[4] = sumMPTL_Part2 +=
          item.TeamLeader_WT;
      }
      const sumMP =
        sumMPIL_Alt +
        sumMPOL_Alt +
        sumMPLL_Alt +
        sumMPLL_Alt +
        sumMPIL_Sta +
        sumMPOL_Sta +
        sumMPLL_Sta +
        sumMPLL_Sta +
        sumMPIL_ECC +
        sumMPOL_ECC +
        sumMPLL_ECC +
        sumMPLL_ECC +
        sumMPIL_Part1 +
        sumMPOL_Part1 +
        sumMPLL_Part1 +
        sumMPLL_Part1 +
        sumMPIL_Part2 +
        sumMPOL_Part2 +
        sumMPLL_Part2 +
        sumMPLL_Part2;
      first_MP.forEach((item) => {
        item.innerHTML = `<b>${sumMP.toFixed(1)}</b>`;
      });
      second_MP.forEach((item) => {
        item.innerHTML = `/ ${sumMP.toFixed(1)}`;
      });
      main_MP.forEach((item) => {
        item.innerHTML = `<b>${sumMP.toFixed(1)} / ${sumMP.toFixed(1)}</b>`;
      });
    });
  });
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
}

const tooltiptext = document.querySelectorAll(".tooltiptext");
AddColorToolTip();
function AddColorToolTip() {
  tooltiptext.forEach((item) => {
    socket.on("req_message_for_point", (data) => {
      // console.log(data.recordset);
      data.recordset.filter((e) => {
        if (item.innerHTML.includes("2nd SE Alt.Assy")) {
          if (e.LineCode == "A104" || e.RxNo_Line === "PRS0000000000489") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("3rd SE Alt.Assy")) {
          if (e.LineCode == "A105" || e.RxNo_Line === "PRS0000000000490") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Alternator Assy General")) {
          if (e.LineCode == "A100" || e.RxNo_Line === "PRS0000000000488") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Alt. SE Service Kit (STATOR,ROTOR)")
        ) {
          if (e.LineCode == "A181" || e.RxNo_Line === "PRS0000000000492") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("2nd SE Rectifier Assy")) {
          if (e.LineCode == "A215" || e.RxNo_Line === "PRS0000000000498") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("3rd SE Rectifier Assy")) {
          if (e.LineCode == "A219" || e.RxNo_Line === "PRS0000000000497") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("SE Rotor Coil Winding")) {
          if (e.LineCode == "A221" || e.RxNo_Line === "PRS0000000000503") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("2nd SE Rotor Assy")) {
          if (e.LineCode == "A214" || e.RxNo_Line === "PRS0000000000496") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("3rd SE Rotor Assy")) {
          if (e.LineCode == "A218" || e.RxNo_Line === "PRS0000000000501") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("1st SE Slip Ring")) {
          if (e.LineCode == "A209" || e.RxNo_Line === "PRS0000000000494") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("2nd SE Slip Ring")) {
          if (e.LineCode == "A217" || e.RxNo_Line === "PRS0000000000500") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("1st & 2nd SE Stator Assy")) {
          if (e.LineCode == "A213" || e.RxNo_Line === "PRS0000000000495") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("3rd SE Stator Assy")) {
          if (e.LineCode == "A220" || e.RxNo_Line === "PRS0000000000502") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("4th SE Stator Assy")) {
          if (e.LineCode == "A222" || e.RxNo_Line === "PRS0000000000504") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Assy General")) {
          if (e.LineCode == "S100" || e.RxNo_Line === "PRS0000000000520") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Mag.Sw.G")) {
          if (e.LineCode == "S200" || e.RxNo_Line === "PRS0000000000530") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Assy RA")) {
          if (e.LineCode == "S101" || e.RxNo_Line === "PRS0000000000521") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Mag.Sw.RA")) {
          if (e.LineCode == "S201" || e.RxNo_Line === "PRS0000000000531") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Assy R5.0")) {
          if (e.LineCode == "S102" || e.RxNo_Line === "PRS0000000000522") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Mag.Sw.R2.7")) {
          if (e.LineCode == "S203" || e.RxNo_Line === "PRS0000000000533") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Mag.Sw.PA")) {
          if (e.LineCode == "S202" || e.RxNo_Line === "PRS0000000000532") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Assy PA70")) {
          if (e.LineCode == "S103" || e.RxNo_Line === "PRS0000000000523") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Clutch Assy P,GA")) {
          if (e.LineCode == "S251" || e.RxNo_Line === "PRS0000000000538") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Armature R5.0")) {
          if (e.LineCode == "S232" || e.RxNo_Line === "PRS0000000000537") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Starter Armature PA70 P Type")) {
          if (e.LineCode == "S230S231" || e.RxNo_Line === "PRS0000000000525") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Commutator sub assy")) {
          if (e.LineCode == "Y276" || e.RxNo_Line === "PRS0000000000625") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Shaft B-Type & R-Large")) {
          if (e.LineCode == "Y360" || e.RxNo_Line === "PRS0000000000641") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Air bag sensor line1")) {
          if (e.LineCode == "B1001" || e.RxNo_Line === "PRS0000000000506") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Air bag sensor line2")) {
          if (e.LineCode == "B1002" || e.RxNo_Line === "PRS0000000000508") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Air bag sensor line3")) {
          if (e.LineCode == "B1003" || e.RxNo_Line === "PRS0000000000507") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Air bag sensor line4")) {
          if (e.LineCode == "B1004" || e.RxNo_Line === "PRS0000000000505") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Air bag sensor molding")) {
          if (e.LineCode == "B200" || e.RxNo_Line === "PRS0000000000509") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GCU Assy1")) {
          if (e.LineCode == "H1001" || e.RxNo_Line === "PRS0000000000513") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GCU Assy2")) {
          if (e.LineCode == "H1002" || e.RxNo_Line === "PRS0000000000514") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GCU Molding")) {
          if (e.LineCode == "H200" || e.RxNo_Line === "PRS0000000000515") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("1st SE.Holder Regulator")) {
          if (e.LineCode == "A208" || e.RxNo_Line === "PRS0000000000493") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("2nd SE  Regulator Line")) {
          if (e.LineCode == "A216" || e.RxNo_Line === "PRS0000000000499") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Re-Packing")) {
          if (e.LineCode == "Y100" || e.RxNo_Line === "PRS2301000000009") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Glow Plug Assy")) {
          if (e.LineCode == "Z100" || e.RxNo_Line === "PRS0000000000644") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Tube Sub Assy Glow Plug")) {
          if (e.LineCode == "Z1001" || e.RxNo_Line === "PRS2211000000001") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Wiper & Link Assy (IMV)")) {
          if (e.LineCode == "V102" || e.RxNo_Line === "PRS0000000000545") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Tank Motor Assy")) {
          if (e.LineCode == "W100" || e.RxNo_Line === "PRS0000000000546") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Hose Assy & Nozzle Assy Washer")) {
          if (e.LineCode == "W103W104" || e.RxNo_Line === "PRS0000000000547") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Magneto Molding")) {
          if (e.LineCode == "M202" || e.RxNo_Line === "PRS0000000000517") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Magneto Sensor")) {
          if (e.LineCode == "M203" || e.RxNo_Line === "PRS0000000000518") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Magneto Armature")) {
          if (e.LineCode == "M220" || e.RxNo_Line === "PRS0000000000519") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Plunger RA-Type")) {
          if (
            e.LineCode == "S203Plunge" ||
            e.RxNo_Line === "PRS2301000000045"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Center case powder")) {
          if (e.LineCode == "S204" || e.RxNo_Line === "PRS0000000000534") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Magneto Assy")) {
          if (e.LineCode == "M100" || e.RxNo_Line === "PRS0000000000516") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Clutch Assy PA70")) {
          if (e.LineCode == "S254S255" || e.RxNo_Line === "PRS2301000000046") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Brush & Yoke PA70")) {
          if (e.LineCode == "S212S222" || e.RxNo_Line === "PRS2301000000054") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Sub Regulator Line")) {
          if (e.LineCode == "A202" || e.RxNo_Line === "PRS2211000000002") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Conveyance Centralized")) {
          if (e.LineCode == "Converyan" || e.RxNo_Line === "PRS2308000000002") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pregnant Room")) {
          if (e.LineCode == "Pregnant" || e.RxNo_Line === "PRS2308000000003") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Stamping 2AC")) {
          if (e.LineCode == "Y301" || e.RxNo_Line === "PRS0000000000628") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Stamping 2G")) {
          if (e.LineCode == "Y309" || e.RxNo_Line === "PRS0000000000631") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Stamping 3")) {
          if (e.LineCode == "Y302" || e.RxNo_Line === "PRS0000000000629") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Stamping 500T")) {
          if (e.LineCode == "Y309500T" || e.RxNo_Line === "PRS2301000000007") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Washing Yoke (WS-66)")) {
          if (e.LineCode == "Y231" || e.RxNo_Line === "PRS0000000000597") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Washing Gen.(WS-39)")) {
          if (e.LineCode == "Y216" || e.RxNo_Line === "PRS0000000000583") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Stamping Fin Rectifier Finishing")
        ) {
          if (e.LineCode == "Y311Fin" || e.RxNo_Line === "PRS2301000000052") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion & Barrel Finishing")) {
          if (e.LineCode == "Y270" || e.RxNo_Line === "PRS2301000000051") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("100% PA64 <br />Prod.Plan")) {
          if (e.LineCode == "Y311PA64" || e.RxNo_Line === "PRS2301000000053") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("1st SE.Stator Core")) {
          if (e.LineCode == "Y306" || e.RxNo_Line === "PRS0000000000630") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("2nd SE.Stator Core")) {
          if (e.LineCode == "Y312" || e.RxNo_Line === "PRS0000000000632") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("cSE0 Stator Core")) {
          if (e.LineCode == "Y313" || e.RxNo_Line === "PRS0000000000633") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pole Core 1/N")) {
          if (e.LineCode == "Y266" || e.RxNo_Line === "PRS2301000000027") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Bonderite Treatment & Cold Forging")
        ) {
          if (e.LineCode == "Y252CF" || e.RxNo_Line === "PRS2301000000050") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Cold Forge 2 (400T,250T,630T)")) {
          if (e.LineCode == "CF0002" || e.RxNo_Line === "PRS2301000000055") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Cold Forge 3 (Former, Orbital, Annealing)")
        ) {
          if (e.LineCode == "CF0003" || e.RxNo_Line === "PRS2301000000058") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("(2000T1, 2, Magnetic & App.)")) {
          if (e.LineCode == "Y258" || e.RxNo_Line === "PRS0000000000549") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Warm Forge 2000T1 M/C")) {
          if (e.LineCode == "Y258_1" || e.RxNo_Line === "PRS2309000000002") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Warm Forge 2000T2 M/C")) {
          if (e.LineCode == "Y258_2" || e.RxNo_Line === "PRS0000000000558") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Warm Forge Finishing GD-P3,HP5,HP3")
        ) {
          if (
            e.LineCode == "Y258WF_FIN" ||
            e.RxNo_Line === "PRS2210000000029"
          ) {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Warm Forge Magnetic check creack M/C No.1")
        ) {
          if (
            e.LineCode == "Y258_Mag_1" ||
            e.RxNo_Line === "PRS0000000000557"
          ) {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Warm Forge Magnetic check creack M/C No.2")
        ) {
          if (
            e.LineCode == "Y258_Mag_2" ||
            e.RxNo_Line === "PRS2304000000001"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Die Casting 3 (HP5)")) {
          if (
            e.LineCode == "Y352DC_HP5" ||
            e.RxNo_Line === "PRS2210000000010"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Die Casting 1 (HP3)")) {
          if (
            e.LineCode == "Y350DC_HP3" ||
            e.RxNo_Line === "PRS2210000000012"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion lathing P")) {
          if (e.LineCode == "Y254P" || e.RxNo_Line === "PRS2301000000063") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Pinion lathing PA64 (Before Heat)")
        ) {
          if (
            e.LineCode == "Y254Before" ||
            e.RxNo_Line === "PRS2301000000064"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion lathing RA")) {
          if (e.LineCode == "Y254RA" || e.RxNo_Line === "PRS2301000000065") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Y255RA")) {
          if (e.LineCode == "Y255RA" || e.RxNo_Line === "PRS2301000000068") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Barrel lathing P,GA")) {
          if (e.LineCode == "Y255PGA" || e.RxNo_Line === "PRS2301000000069") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Barrel lathing PA70")) {
          if (e.LineCode == "Y255PA70" || e.RxNo_Line === "PRS2301000000070") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion lathing PA70")) {
          if (e.LineCode == "Y254PA70" || e.RxNo_Line === "PRS2301000000066") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Pinion lathing PA64 (After Heat)")
        ) {
          if (e.LineCode == "Y254After" || e.RxNo_Line === "PRS2301000000067") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Frame Starter Lathing")) {
          if (e.LineCode == "Y253Lathe" || e.RxNo_Line === "PRS2301000000072") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Barrel B-Type lathing")) {
          if (e.LineCode == "Y277" || e.RxNo_Line === "PRS0000000000626") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Frame Starter Welding")) {
          if (e.LineCode == "Y253Weld" || e.RxNo_Line === "PRS2301000000071") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion Bar Cutting")) {
          if (e.LineCode == "Y278" || e.RxNo_Line === "PRS0000000000627") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion R-Large G1 Lathing")) {
          if (e.LineCode == "Y278-1" || e.RxNo_Line === "PRS2210000000017") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion R-Large G2 Lathing")) {
          if (e.LineCode == "Y278-2" || e.RxNo_Line === "PRS2210000000018") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Barrel R-Large Lathing")) {
          if (e.LineCode == "Y278-3" || e.RxNo_Line === "PRS2210000000019") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Pinion & Barrel R-Large Lathing")) {
          if (e.LineCode === "Y278-4" || e.RxNo_Line === "PRS2210000000020") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("FCC lathing & finishing")) {
          if (e.LineCode == "Y222" || e.RxNo_Line === "PRS0000000000584") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Boss Clutch lathing")) {
          if (e.LineCode == "Y227" || e.RxNo_Line === "PRS0000000000585") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Boss rotor lathing")) {
          if (e.LineCode == "Y261" || e.RxNo_Line === "PRS0000000000621") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Sta.Housing Lathe")) {
          if (e.LineCode == "Y233" || e.RxNo_Line === "PRS0000000000603") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Sta.Frame Lathe")) {
          if (e.LineCode == "Y232" || e.RxNo_Line === "PRS0000000000598") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Center case Lathe")) {
          if (e.LineCode == "Y200" || e.RxNo_Line === "PRS2301000000033") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Tube Sub Assy RA & R-large")) {
          if (e.LineCode == "Y214" || e.RxNo_Line === "PRS0000000000581") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Shaft Arm. P-Drive & Run out")) {
          if (e.LineCode == "Y362" || e.RxNo_Line === "PRS0000000000643") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Tube PA70")) {
          if (e.LineCode == "Y215" || e.RxNo_Line === "PRS0000000000582") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Shaft PA70")) {
          if (e.LineCode == "Y234" || e.RxNo_Line === "PRS0000000000614") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("SE Frame Drive lathing")) {
          if (e.LineCode == "Y229" || e.RxNo_Line === "PRS2301000000013") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("SE Frame Rear lathing")) {
          if (e.LineCode == "Y228" || e.RxNo_Line === "PRS2301000000012") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Shaft SE0")) {
          if (e.LineCode == "Y361" || e.RxNo_Line === "PRS0000000000642") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing")) {
          if (e.LineCode == "4134GDP" || e.RxNo_Line === "PRS0000000000567") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Tool Presetter")) {
          if (e.LineCode == "Tool0011" || e.RxNo_Line === "PRS2301000000029") {
            PointChange(item, e);
          }
        } else if (
          item.innerHTML.includes("Housing starter sv 1,2,3 & Nozzle body")
        ) {
          if (e.LineCode == "4132Lathe" || e.RxNo_Line === "PRS0000000000550") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing Line 1-2")) {
          if (
            e.LineCode == "Y282_GDP_1" ||
            e.RxNo_Line === "PRS2309000000011"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing Line 3-4")) {
          if (
            e.LineCode == "Y282_GDP_2" ||
            e.RxNo_Line === "PRS0000000000568"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing Line 5-6")) {
          if (
            e.LineCode == "Y282_GDP_3" ||
            e.RxNo_Line === "PRS0000000000569"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing Line 7-8")) {
          if (
            e.LineCode == "Y282_GDP_4" ||
            e.RxNo_Line === "PRS0000000000570"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Lathing Line 9-10")) {
          if (
            e.LineCode == "Y282_GDP_5" ||
            e.RxNo_Line === "PRS0000000000571"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("GD-P3 Finishing")) {
          if (
            e.LineCode == "Y282_GDP_6" ||
            e.RxNo_Line === "PRS2210000000016"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Shaft & Core sub Arm.")) {
          if (e.LineCode == "Y354Y357" || e.RxNo_Line === "PRS2301000000049") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Die Casting VCT")) {
          if (
            e.LineCode == "Y350DC_VCT" ||
            e.RxNo_Line === "PRS2309000000012"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("BODY Nozzle")) {
          if (e.LineCode == "Y262_BODY" || e.RxNo_Line === "PRS2309000000003") {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line A")) {
          if (
            e.LineCode == "Y262SV1-3A" ||
            e.RxNo_Line === "PRS2309000000005"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line B")) {
          if (
            e.LineCode == "Y262SV1-3B" ||
            e.RxNo_Line === "PRS2309000000006"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line C")) {
          if (
            e.LineCode == "Y262SV1-3C" ||
            e.RxNo_Line === "PRS2309000000007"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line D")) {
          if (
            e.LineCode == "Y262SV1-3D" ||
            e.RxNo_Line === "PRS2309000000008"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line E")) {
          if (
            e.LineCode == "Y262SV1-3E" ||
            e.RxNo_Line === "PRS2309000000009"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("Housing SV1-SV3 Line F")) {
          if (
            e.LineCode == "Y262SV1-3F" ||
            e.RxNo_Line === "PRS23090000000010"
          ) {
            PointChange(item, e);
          }
        } else if (item.innerHTML.includes("SCV Housing Stator")) {
          if (e.LineCode == "Y262_SCV" || e.RxNo_Line === "PRS2309000000004") {
            PointChange(item, e);
          }
        }
      });
    });
  });
}

function PointChange(item, e) {
  // console.log(e.perOA);
  if (e.perOA >= 90) {
    ChangePoint(item, e, "42e684", "o");
  } else if (e.perOA >= 85 && e.perOA < 90) {
    // item.parentNode.style.backgroundColor = "#ffc000";
    ChangePoint(item, e, "ff0000", "x");
  } else if (e.perOA < 85 && e.perOA >= 0) {
    // item.parentNode.style.backgroundColor = "#ffc000";
    ChangePoint(item, e, "ff0000", "x");
  } else {
    // item.parentNode.style.backgroundColor = "#ff0000";
    ChangePoint(item, e, "ff0000", "-");
  }
}

function ChangePoint(item, e, color, Judge) {
  var date = new Date(e.UpdateDate);
  // console.log(date);
  // console.log(formatDate(date));
  item.parentNode.style.backgroundColor = `#${color}`;
  item.innerHTML = `LineCode : ${e.LineCode} <br> Name : ${
    e.LineName
  } <br>Prod.Plan ${e.ProdPlanPerDay.toFixed(0)} <br>Actual Prod. : ${
    e.Value
  } <br> Judge : ${Judge}<br> OA : ${e.perOA.toFixed(
    1
  )} <br> Record Time : ${formatDate(date)}`;
}

const stock_data = document.querySelectorAll(".item-14-2-5");
Stock();
var datafilltext = 0;
function Stock() {
  socket.on("req_message_Stock_donut", (data) => {
    data.filter((e) => {
      addData(CurrentLossInHouseStock, e.Process_type, e.Stock_Cost);
      datafilltext = formatNumber(e.Stock_Cost);
      stock_data.forEach((item) => {
        item.innerHTML = `<b>${formatNumber(e.Stock_Cost)}B</b>`;
      });
    });
  });
}

function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
  });
  chart.update();
}

StockBar();
function StockBar() {
  socket.on("req_message_Stock_bar", (data) => {
    // console.log(data);
    // console.log(CurrentLossRiskStock);
    data.filter((e) => {
      // console.log(e);
      addData(CurrentLossRiskStock, e.Customer_name, e.Stock_Cost);
    });
  });
}
var sumReq = 0;
var ValStock1 = 0;
var ValStock2 = 0;
var ValStock3 = 0;
var ValStock4 = 0;
var ValStock5 = 0;

var TxtStock1 = 0;
var TxtStock2 = 0;
var TxtStock3 = 0;
var TxtStock4 = 0;
var TxtStock5 = 0;

const point1 = document.querySelectorAll(".delivery_Modal_6-box2");
const point2 = document.querySelectorAll(".delivery_Modal_6-box4");
const point3 = document.querySelectorAll(".delivery_Modal_6-box6");
const point4 = document.querySelectorAll(".delivery_Modal_6-box8");
const point5 = document.querySelectorAll(".delivery_Modal_6-box10");
AbnormalBar();
function AbnormalBar() {
  socket.on("req_message_Abnormal_bar", (data) => {
    // console.log(data[0].Required_stock);
    // console.log(AbnormalProd.data);
    data.filter((e) => {
      ValStock1 = parseInt(data[0].Required_stock);
      ValStock2 = parseInt(data[1].Required_stock);
      ValStock3 = parseInt(data[2].Required_stock);
      ValStock4 = parseInt(data[3].Required_stock);
      ValStock5 = parseInt(data[4].Required_stock);
      TxtStock1 = data[0].Line_Name;
      TxtStock2 = data[1].Line_Name;
      TxtStock3 = data[2].Line_Name;
      TxtStock4 = data[3].Line_Name;
      TxtStock5 = data[4].Line_Name;
      sumReq = sumReq + parseInt(e.Required_stock);
    });
    AbnormalProd.data.datasets[0].label = data[0].Line_Name;
    AbnormalProd.update();
    AbnormalProd.data.datasets[1].label = data[1].Line_Name;
    AbnormalProd.update();
    AbnormalProd.data.datasets[2].label = data[2].Line_Name;
    AbnormalProd.update();
    AbnormalProd.data.datasets[3].label = data[3].Line_Name;
    AbnormalProd.update();
    AbnormalProd.data.datasets[4].label = data[4].Line_Name;
    AbnormalProd.update();
    AbnormalProd.data.datasets[0].data[0] = ValStock1;
    AbnormalProd.update();
    AbnormalProd.data.datasets[1].data[0] = ValStock2;
    AbnormalProd.update();
    AbnormalProd.data.datasets[2].data[0] = ValStock3;
    AbnormalProd.update();
    AbnormalProd.data.datasets[3].data[0] = ValStock4;
    AbnormalProd.update();
    AbnormalProd.data.datasets[4].data[0] = ValStock5;
    AbnormalProd.update();
    point1.forEach((item) => {
      item.innerHTML = `${data[0].Line_Name}`;
    });
    point2.forEach((item) => {
      item.innerHTML = `${data[1].Line_Name}`;
    });
    point3.forEach((item) => {
      item.innerHTML = `${data[2].Line_Name}`;
    });
    point4.forEach((item) => {
      item.innerHTML = `${data[3].Line_Name}`;
    });
    point5.forEach((item) => {
      item.innerHTML = `${data[4].Line_Name}`;
    });
  });
}

const req_wh = document.querySelectorAll(".delivery_Modal_box2-number");
const req_bp = document.querySelectorAll(".delivery_Modal_box22-number");
var RiskStock_wh = 0;
var Summin_wh = 0;
var RiskStock_pb = 0;
var Summin_bp = 0;

var RiskStock_sum = 0;

RiskStock();
const risk_stock_data = document.querySelectorAll(".item-14-2-11");
function RiskStock() {
  socket.on("req_message_riskstockbyWH", (data) => {
    data.filter((e) => {
      // console.log(e);
      if (e.WH === "DDC") {
        // console.log(CurrentRiskStock.data.datasets);
        CurrentRiskStock.data.datasets[0].data[0] = parseInt(e.Sum_Min);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[1].data[0] = parseInt(e.Sum_Max);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[2].data[0] = parseInt(e.Risk_Stock);
        CurrentRiskStock.update();
      } else if (e.WH === "In-House") {
        CurrentRiskStock.data.datasets[0].data[1] = parseInt(e.Sum_Min);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[1].data[1] = parseInt(e.Sum_Max);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[2].data[1] = parseInt(e.Risk_Stock);
        CurrentRiskStock.update();
      } else if (e.WH === "K-Line") {
        CurrentRiskStock.data.datasets[0].data[2] = parseInt(e.Sum_Min);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[1].data[2] = parseInt(e.Sum_Max);
        CurrentRiskStock.update();
        CurrentRiskStock.data.datasets[2].data[2] = parseInt(e.Risk_Stock);
        CurrentRiskStock.update();
      }
      req_wh.forEach((item) => {
        RiskStock_wh = RiskStock_wh + parseInt(e.Risk_Stock);
        Summin_wh = Summin_wh + parseInt(e.Sum_Min);
        // console.log(RiskStock_wh, Summin_wh);
        const sum = RiskStock_wh - Summin_wh;
        item.innerHTML = `<b>${formatNumber(sum)}</b>`;
      });
      risk_stock_data.forEach((item) => {
        RiskStock_sum = RiskStock_sum + parseInt(e.Risk_Stock);
        item.innerHTML = `<b>${formatNumber(RiskStock_sum)}</b>`;
      });
    });
  });
  socket.on("req_message_riskstockbyprocess", (data) => {
    data.filter((e) => {
      req_bp.forEach((item) => {
        // console.log(e);
        if (e.Sum_Min != null) {
          RiskStock_pb = RiskStock_pb + parseInt(e.Risk_Stock);
          Summin_bp = Summin_bp + parseInt(e.Sum_Min);
          const sum_pb = RiskStock_pb - Summin_bp;
          item.innerHTML = `<b>${formatNumber(sum_pb)}</b>`;
        }
      });
    });
  });
}

function addDataRisk(chart, label, x, y, z) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    if (dataset.label === "Min Risk Stock") {
      dataset.data.push(x);
    } else if (dataset.label === "Max Risk Stock") {
      dataset.data.push(y);
    } else if (dataset.label === "Order QTY.") {
      dataset.data.push(z);
    }
  });
  chart.update();
}

RiskStockByProcess();
function RiskStockByProcess() {
  socket.on("req_message_riskstock", (data) => {
    data.filter((e) => {
      addDataRisk(
        SubCurrentRiskStock,
        e.PROCS,
        e.Sum_Min * 21,
        e.Sum_Max * 21,
        e.Risk_Stock
      );
    });
  });
}

const tpm_value = document.querySelectorAll(".item-14-3-11");
TPM_Data();
function TPM_Data() {
  socket.on("req_message_tpm", (data) => {
    data.filter((e) => {
      tpm_value.forEach((item) => {
        item.innerHTML = `<b>${e.Count}</b>`;
      });
    });
  });
}

expenses();
const expenses_value = document.querySelectorAll(".item-8-8");
function expenses() {
  socket.on("req_message_expense", (data) => {
    data.filter((e) => {
      expenses_value.forEach((item) => {
        item.innerHTML = `<b>${formatNumber(e.Actual)} / ${formatNumber(
          e.Target
        )}</b>`;
      });
    });
  });
}

investment();
const investment_value = document.querySelectorAll(".item-8-5");
function investment() {
  socket.on("req_message_invest", (data) => {
    data.filter((e) => {
      investment_value.forEach((item) => {
        item.innerHTML = `<b>${formatNumber(e.Actual)} / ${formatNumber(
          e.Target
        )}</b>`;
      });
    });
  });
}

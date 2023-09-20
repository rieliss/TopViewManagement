var socket = io("http://172.23.36.47:5000");

const objectDate = new Date();
// const objectDate = new Date("2023-09-16");
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
function updateprodAct() {
  socket.on("Manpower_Daily", (data) => {
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
  socket.on("req_message_ProdAct_s", (data) => {
    update_prodActAlt.forEach((item) => {
      data.recordset.filter((data) => {
        if (data.Department === "Alternator Product") {
          ProdActualAlt_value += data.Value;
          chartIdMFG1.data.datasets[0].data[1] = ProdActualAlt_value;
          chartIdMFG1.update();
          ProdActualAlt = formatNumber(ProdActualAlt_value);
          item.innerHTML = `<b>${ProdActualAlt}</b>`;
          // return ProdActualAlt_value;
          console.log(ProdPlanAlt_value);
          console.log(ProdActualAlt_value);
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
      });
      update_prodActCurrent.forEach((item) => {
        item.innerHTML = `<b>${formatNumber(SumCurrent)}</b>`;
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
      // console.log(item)
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
      // console.log(sumMP)
      first_MP.forEach((item) => {
        item.innerHTML = `<b>${sumMP.toFixed(1)}</b>`;
        // console.log(first_MP)
      });
      second_MP.forEach((item) => {
        item.innerHTML = `/ ${sumMP.toFixed(1)}`;
        // console.log(second_MP)
      });
      // }
    });
    // mergedArrayMP.forEach((item) => {
    // console.log(item)
    // })
  });
}

function point() {}

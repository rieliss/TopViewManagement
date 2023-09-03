var socket = io("http://172.23.36.47:4040");

const objectDate = new Date();
const today = getPreviousDay()

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
    day = '01';
}
if (month < 10) {
    month = `0${month}`;
}
let format = `${year}${month}01`;

function calculateSum(array, property) {
    let sum = 0;

    array.forEach(element => {
        sum += element[property];
    });
    // console.log(sum);
    return sum;
}

function decimals(n, d) {
    if ((typeof n !== 'number') || (typeof d !== 'number'))
        return false;
    n = parseFloat(n) || 0;
    return n.toFixed(d);
}

function formatNumber(num, precision = 2) {
    const map = [
        { suffix: ' T', threshold: 1e12 },
        { suffix: ' B', threshold: 1e9 },
        { suffix: ' M', threshold: 1e6 },
        { suffix: ' K', threshold: 1e3 },
        { suffix: ' ', threshold: 1 },
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

var ValueAlt = [];
var holderAlt = {};
const sumAlt = [];
var ProdActualAlt;

var ValueSta = [];
var holderSta = {};
const sumSta = [];
var ProdActualSta;

var ValueECC = [];
var holderECC = {};
const sumECC = [];
var ProdActualECC;

var ValuePart1 = [];
var holderPart1 = {};
const sumPart1 = [];
var ProdActualPart1;

var ValuePart2 = [];
var holderPart2 = {};
const sumPart2 = [];
var ProdActualPart2;

var ValueAct = [];
var holderAct = {};
const sumAct = [];
var ProdActualAct;
var ProdActualAct_chart;

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

var ValuePlanAlt = [];
var holderPlanAlt = {};
const sumPlanAlt = [];
var ProdActualAlt;

var ValuePlanSta = [];
var holderPlanSta = {};
const sumPlanSta = [];
var ProdPlanSta;

var ValuePlanECC = [];
var holderPlanECC = {};
const sumPlanECC = [];
var ProdPlanECC;

var ValuePlanPart1 = [];
var holderPlanPart1 = {};
const sumPlanPart1 = [];
var ProdPlanPart1;

var ValuePlanPart2 = [];
var holderPlanPart2 = {};
const sumPlanPart2 = [];
var ProdPlanPart2;

var ValuePlanAct = [];
var holderPlanAct = {};
const sumPlanAct = [];
var ProdPlanAct;

var ProdActualAlt_value;
var ProdActualSta_value;
var ProdActualECC_value;
var ProdActualPart1_value;
var ProdActualPart2_value;

// var ProdPlanAlt_value;
// var ProdPlanSta_value;
// var ProdPlanECC_value;
// var ProdPlanPart1_value;
// var ProdPlanPart2_value;

var ProdPlanAlt_value;
var ProdPlanSta_value;
var ProdPlanECC_value;
var ProdPlanPart1_value;
var ProdPlanPart2_value;

var Prod_Plan_Value = [];
var Prod_Plan_Value2 = [];
var mergedArrayPlan = [];
var LineSummaryPlan = [];
const uniquePlan = [];
const sumPlan = [];
var holderPlan = {};

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
var sumProdPlan_from;
var sumProdPlan_chart;
var sumcurrent;

var OA_sumProdPlanAlt;
var OA_sumProdPlanSta;
var OA_sumProdPlanECC;
var OA_sumProdPlanPart1;
var OA_sumProdPlanPart2;

var IntProdPlan;

const update_prodAct = document.querySelectorAll(".update_prodA");
const update_prodPlan = document.querySelectorAll(".update_prodP");

var chrtMFG1_value = '0%';
var chrtMFG2_value = '0%';
var chrtMFG3_value = '0%';
var chrtPART1_value = '0%';
var chrtPART2_value = '0%';

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
        const duplicate = sum.find(
            (obj) => obj.RxNo_Line === item.RxNo_Line);
        const duplicate2 = sum.find(
            (obj) => obj.Department === item.RxNo_Line);
        // console.log(duplicate)
        if (!duplicate && !duplicate2) {
            sum.push(item);
        }
    }
    return sum
}


// function getData() {
//     socket.on("update", (data) => {
//         data.recordset.filter((e) => {
//             const ProdActual = calculateSum(data.recordset, 'Value');
//             return ProdActual;
//         });
//     });
//     socket.on("send", (data) => {
//         data.recordset.filter((e) => {
//             const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
//             return ProdPlan;
//         });
//     });
// }

function updateprodAct() {
    socket.on("LineSummary", (data) => {
        data.filter((e) => {
            if (e.RxNo_Line != null) {
                LineSummary.push(e)
                return LineSummary
            }
            for (const item of LineSummary) {
                // 👇 "name" and "location" used for duplicate check
                const duplicate = unique.find(
                    (obj) => obj.RxNo_Line === item.RxNo_Line);
                if (!duplicate) {
                    unique.push(item);
                }
            }
            return unique;
        });
    });
    socket.on("ProdAct", (data) => {
        data.recordset.forEach((e) => {
            // console.log(e)
            Prod_Actual_Value.push(e);
        });
        // console.log(Prod_Actual_Value)
        Prod_Actual_Value.forEach(function (d) {
            if (holder.hasOwnProperty(d.RxNo_Line)) {
                holder[d.RxNo_Line] = holder[d.RxNo_Line] + d.Value;
            } else {
                holder[d.RxNo_Line] = d.Value;
            }
        });
        // console.log(holder)
        for (var prop in holder) {
            Prod_Actual_Value2.push({ RxNo_Line: prop, Value: holder[prop] });
        }
        // console.log(Prod_Actual_Value2)
        for (const item of Prod_Actual_Value2) {
            const duplicate = sum.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            if (!duplicate) {
                sum.push(item);
            }
        }
        // console.log(sum)
        mergedArrayAct = sum.map((item) => {
            const matchedObject = unique.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            return { ...item, ...matchedObject };
        });
        // console.log(mergedArrayAct, ' -> Act');
        return mergedArrayAct;
    });
    setInterval(function () {
        update_prodActAlt.forEach((item) => {
            // console.log(mergedArrayAct)
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Alternator Product') {
                    ProdActualAlt_value = calculateSum(Transfer_data(data, ValueAlt, holderAlt, sumAlt), 'Value');
                    chartIdMFG1.data.datasets[0].data[1] = ProdActualAlt_value;
                    chartIdMFG1.update();
                    ProdActualAlt = formatNumber(ProdActualAlt_value);
                    item.innerHTML = `<b>${ProdActualAlt}</b>`;
                    return ProdActualAlt_value;
                } else {
                }
            })
        })
        update_prodActSta.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Starter Product') {
                    ProdActualSta_value = calculateSum(Transfer_data(data, ValueSta, holderSta, sumSta), 'Value');
                    chartIdMFG2.data.datasets[0].data[1] = ProdActualSta_value;
                    chartIdMFG2.update();
                    ProdActualSta = formatNumber(ProdActualSta_value);
                    item.innerHTML = `<b>${ProdActualSta}</b>`;
                    return ProdActualSta_value;
                } else {
                }
            })
        })
        update_prodActECC.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'ECC, ABS & Asmo Product') {
                    ProdActualECC_value = calculateSum(Transfer_data(data, ValueECC, holderECC, sumECC), 'Value');
                    chartIdMFG3.data.datasets[0].data[1] = ProdActualECC_value;
                    chartIdMFG3.update();
                    ProdActualECC = formatNumber(ProdActualECC_value);
                    item.innerHTML = `<b>${ProdActualECC}</b>`;
                    return ProdActualECC_value;
                } else {
                }
            })
        })
        update_prodActPart1.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Parts Mfg.1') {
                    ProdActualPart1_value = Transfer_data(data, ValuePart1, holderPart1, sumPart1)
                    // console.log(ProdActualPart1_value)
                    ProdActualPart1_value = calculateSum(Transfer_data(data, ValuePart1, holderPart1, sumPart1), 'Value');
                    chartIdPART1.data.datasets[0].data[1] = ProdActualPart1_value;
                    chartIdPART1.update();
                    ProdActualPart1 = formatNumber(ProdActualPart1_value);
                    item.innerHTML = `<b>${ProdActualPart1}</b>`;
                    return ProdActualPart1_value;
                } else {
                }
            })
        })
        update_prodActPart2.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Parts Mfg.2') {
                    // ProdActualPart2_value = Transfer_data(data, ValuePart2, holderPart2, sumPart2)
                    // console.log(ProdActualPart2_value)
                    ProdActualPart2_value = calculateSum(Transfer_data(data, ValuePart2, holderPart2, sumPart2), 'Value');
                    chartIdPART2.data.datasets[0].data[1] = ProdActualPart2_value;
                    chartIdPART2.update();
                    ProdActualPart2 = formatNumber(ProdActualPart2_value);
                    item.innerHTML = `<b>${ProdActualPart2}</b>`;
                    // console.log(ProdActualPart2_value)
                    return ProdActualPart2_value;
                } else {
                }
            })
        })
        update_prodAct.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department != undefined) {
                    // ProdActualAct = Transfer_data(data, ValueAct, holderAct, sumAct)
                    // console.log(ProdActualAct)
                    ProdActualAct_chart = calculateSum(Transfer_data(data, ValueAct, holderAct, sumAct), 'Value');
                    ProdActualAct = formatNumber(calculateSum(Transfer_data(data, ValueAct, holderAct, sumAct), 'Value'));
                    // console.log(CurrentPord.data.datasets[0].data[0])
                    CurrentPord.data.datasets[0].data[0] = ProdActualAct_chart;
                    CurrentPord.update();
                    item.innerHTML = `${ProdActualAct}`;
                    // console.log(ProdActualAct)
                    return ProdActualAct_chart
                }
            })
        })
    }, 10000)
}

// function updateprodPlanAs() {
//     update_prodPlan.forEach((item) => {
//         socket.on("MasterPlan", (data) => {
//             // console.log(data)
//             data.recordset.filter((e) => {
//                 Prod_Actual_Value.push(e);
//                 // console.log(Prod_Actual_Value)
//                 const ProdPlan = calculateSum(data.recordset, 'ProdPlanPerMonth');
//                 // console.log(ProdPlan)
//                 const sumProdPlan = ProdPlan / MonthValue
//                 IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
//                 // console.log(IntProdPlan)
//                 item.innerHTML = `${IntProdPlan}`;
//                 return IntProdPlan
//             })
//         })
//     })
// }
function updateprodPlan() {
    socket.on("LineSummary", (data) => {
        data.filter((e) => {
            if (e.RxNo_Line != null) {
                LineSummaryPlan.push(e)
                return LineSummaryPlan
            }
            for (const item of LineSummaryPlan) {
                // 👇 "name" and "location" used for duplicate check
                const duplicate = uniquePlan.find(
                    (obj) => obj.RxNo_Line === item.RxNo_Line);
                if (!duplicate) {
                    uniquePlan.push(item);
                }
            }
            return uniquePlan;
        });
    });

    socket.on("MasterPlan", (data) => {
        data.recordset.filter((e) => {
            Prod_Plan_Value.push(e);
        })
        // console.log(Prod_Plan_Value)
        Prod_Plan_Value.forEach(function (d) {
            if (holderPlan.hasOwnProperty(d.RxNo_Line)) {
                holderPlan[d.RxNo_Line] = holderPlan[d.RxNo_Line] + d.ProdPlanPerMonth;
            } else {
                holderPlan[d.RxNo_Line] = d.ProdPlanPerMonth;
            }
        });

        for (var prop in holderPlan) {
            Prod_Plan_Value2.push({ RxNo_Line: prop, Value: holderPlan[prop] });
        }
        // console.log(Prod_Plan_Value2)
        for (const item of Prod_Plan_Value2) {
            const duplicate = sumPlan.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            if (!duplicate) {
                sumPlan.push(item);
            }
        }
        mergedArrayPlan = sumPlan.map((item) => {
            const matchedObjectPlan = uniquePlan.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            return { ...item, ...matchedObjectPlan };
        });
        // console.log(mergedArrayPlan, ' -> Plan');
        return mergedArrayPlan;
    })
    setInterval(function () {
        update_prodPlanAlt.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department === 'Alternator Product') {
                    // ProdPlanAlt_value = Transfer_data(data, ValuePlanAlt, holderPlanAlt, sumPlanAlt)
                    // console.log(ProdPlanAlt_value)
                    ProdPlanAlt_value = calculateSum(Transfer_data(data, ValuePlanAlt, holderPlanAlt, sumPlanAlt), 'Value');
                    sumProdPlanAlt = ProdPlanAlt_value / MonthValue
                    sumProdPlanAlt_chart = sumProdPlanAlt - ProdActualAlt_value;
                    // console.log(ProdActualAlt_value)
                    if (!(sumProdPlanAlt_chart > 0))
                        sumProdPlanAlt_chart = 0;
                    chartIdMFG1.data.datasets[0].data[0] = sumProdPlanAlt_chart;
                    chartIdMFG1.update();
                    ProdPlanAlt = formatNumber((parseFloat(sumProdPlanAlt)), 2)
                    item.innerHTML = `<b>${ProdPlanAlt}</b>`;
                    // chrtMFG1_value = (ProdActualAlt_value / sumProdPlanAlt) * 100
                    // chrtMFG1_value = formatNumber(chrtMFG1_value, 2)
                    // chrtMFG1_value = `${chrtMFG1_value}%`
                    return sumProdPlanAlt
                } else {

                }
            })
        })
        update_prodPlanSta.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department === 'Starter Product') {
                    // ProdPlanSta_value = Transfer_data(data, ValuePlanSta, holderPlanSta, sumPlanSta)
                    // console.log(ProdPlanSta_value)
                    ProdPlanSta_value = calculateSum(Transfer_data(data, ValuePlanSta, holderPlanSta, sumPlanSta), 'Value');
                    sumProdPlanSta = ProdPlanSta_value / MonthValue
                    sumProdPlanSta_chart = sumProdPlanSta - ProdActualSta_value;
                    // console.log(ProdActualSta_value)
                    if (!(sumProdPlanSta_chart >= 0) && ProdActualSta_value != 0)
                        sumProdPlanSta_chart = 0;
                    chartIdMFG2.data.datasets[0].data[0] = sumProdPlanSta_chart;
                    chartIdMFG2.update();
                    // console.log(chartIdMFG2)
                    ProdPlanSta = formatNumber((parseFloat(sumProdPlanSta)), 2)
                    item.innerHTML = `<b>${ProdPlanSta}</b>`;
                    return sumProdPlanSta
                } else {

                }
            })
        })
        update_prodPlanECC.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department === 'ECC, ABS & Asmo Product') {
                    ProdPlanECC_value = calculateSum(Transfer_data(data, ValuePlanECC, holderPlanECC, sumPlanECC), 'Value');
                    sumProdPlanECC = ProdPlanECC_value / MonthValue
                    sumProdPlanECC_chart = sumProdPlanECC - ProdActualECC_value;
                    // console.log(ProdActualECC_value)
                    if (!(sumProdPlanECC_chart > 0))
                        sumProdPlanECC_chart = 0;
                    chartIdMFG3.data.datasets[0].data[0] = sumProdPlanECC_chart;
                    chartIdMFG3.update();
                    ProdPlanECC = formatNumber((parseFloat(sumProdPlanECC)), 2)
                    item.innerHTML = `<b>${ProdPlanECC}</b>`;
                    return sumProdPlanECC
                }
            })
        })
        update_prodPlanPart1.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department === 'Parts Mfg.1') {
                    ProdPlanPart1_value = calculateSum(Transfer_data(data, ValuePlanPart1, holderPlanPart1, sumPlanPart1), 'Value');
                    sumProdPlanPart1 = ProdPlanPart1_value / MonthValue
                    sumProdPlanPart1_chart = sumProdPlanPart1 - ProdActualPart1_value;
                    // console.log(ProdActualPart1_value)
                    if (!(sumProdPlanPart1_chart > 0))
                        sumProdPlanPart1_chart = 0;
                    chartIdPART1.data.datasets[0].data[0] = sumProdPlanPart1_chart;
                    chartIdPART1.update();
                    ProdPlanPart1 = formatNumber((parseFloat(sumProdPlanPart1)), 2)
                    item.innerHTML = `<b>${ProdPlanPart1}</b>`;
                    return sumProdPlanPart1
                }
            })
        })
        update_prodPlanPart2.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department === 'Parts Mfg.2') {
                    ProdPlanPart2_value = calculateSum(Transfer_data(data, ValuePlanPart2, holderPlanPart2, sumPlanPart2), 'Value');
                    sumProdPlanPart2 = ProdPlanPart2_value / MonthValue
                    sumProdPlanPart2_chart = sumProdPlanPart2 - ProdActualPart2_value;
                    // console.log(ProdActualPart2_value)
                    if (!(sumProdPlanPart2_chart > 0))
                        sumProdPlanPart2_chart = 0;
                    chartIdPART2.data.datasets[0].data[0] = sumProdPlanPart2_chart;
                    chartIdPART2.update();
                    ProdPlanPart2 = formatNumber((parseFloat(sumProdPlanPart2)), 2)
                    item.innerHTML = `<b>${ProdPlanPart2}</b>`;
                    return sumProdPlanPart2
                }
            })
        })
        update_prodPlan.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department != undefined) {
                    ProdPlanAct = calculateSum(Transfer_data(data, ValuePlanAct, holderPlanAct, sumPlanAct), 'Value')
                    sumProdPlan = ProdPlanAct / MonthValue
                    sumProdPlan_from = formatNumber((parseFloat(sumProdPlan)), 2)
                    // console.log(sumProdPlan)
                    // console.log(ProdActualAct_chart)
                    sumcurrent = sumProdPlan - ProdActualAct_chart;
                    // console.log(sumcurrent)
                    // console.log(CurrentPord.data.datasets[1].data[0])
                    CurrentPord.data.datasets[1].data[0] = sumcurrent.toFixed(2);
                    CurrentPord.update();
                    update_prodActCurrent.innerHTML = `<b>${sumcurrent.toFixed(2)}</b>`;
                    item.innerHTML = `<b>${sumProdPlan_from}</b>`;
                    return sumcurrent
                }
            })
        })
        update_prodActCurrent.forEach((item) => {
            const current = (ProdActualAct_chart / sumProdPlan) * 100
            item.innerHTML = `<b>${formatNumber(current)}%</b> `
        })
        update_prodOAAlt.forEach((item) => {
            // console.log(ProdActualAlt_value)
            // console.log(sumProdPlanAlt)
            OA_sumProdPlanAlt = (ProdActualAlt_value / sumProdPlanAlt) * 100
            // console.log(OA_sumProdPlanAlt)
            ProdPlanAlt = parseFloat(OA_sumProdPlanAlt)
            if (ProdPlanAlt == NaN || ProdPlanAlt == Infinity)
                ProdPlanAlt = 0;
            item.innerHTML = `<b>${ProdPlanAlt.toFixed(1)}% </b>`;
            chrtMFG1_value = `${ProdPlanAlt.toFixed(1)}%`;
            return ProdPlanAlt, chrtMFG1_value
        })
        update_prodOASta.forEach((item) => {
            // console.log(ProdActualSta_value)
            // console.log(sumProdPlanSta)
            OA_sumProdPlanSta = (ProdActualSta_value / sumProdPlanSta) * 100
            // console.log(OA_sumProdPlanSta)
            ProdPlanSta = parseFloat(OA_sumProdPlanSta)
            if (ProdPlanSta == NaN || ProdPlanSta == Infinity)
                ProdPlanSta = 0;
            item.innerHTML = `<b>${ProdPlanSta.toFixed(1)}% </b>`;
            chrtMFG2_value = `${ProdPlanSta.toFixed(1)}%`;
            return ProdPlanSta, chrtMFG2_value
        })
        update_prodOAECC.forEach((item) => {
            // console.log(ProdActualECC_value)
            // console.log(sumProdPlanECC)
            OA_sumProdPlanECC = (ProdActualECC_value / sumProdPlanECC) * 100
            // console.log(OA_sumProdPlanECC)
            ProdPlanECC = parseFloat(OA_sumProdPlanECC)
            if (ProdPlanECC == NaN || ProdPlanECC == Infinity)
                ProdPlanECC = 0;
            item.innerHTML = `<b>${ProdPlanECC.toFixed(1)}% </b>`;
            chrtMFG3_value = `${ProdPlanECC.toFixed(1)}%`;
            return ProdPlanECC, chrtMFG3_value
        })
        update_prodOAPart1.forEach((item) => {
            // console.log(ProdActualPart1_value)
            // console.log(sumProdPlanPart1)
            OA_sumProdPlanPart1 = (ProdActualPart1_value / sumProdPlanPart1) * 100
            // console.log(OA_sumProdPlanPart1)
            ProdPlanPart1 = parseFloat(OA_sumProdPlanPart1)
            if (ProdPlanPart1 == NaN || ProdPlanPart1 == Infinity)
                ProdPlanPart1 = 0;
            item.innerHTML = `<b>${ProdPlanPart1.toFixed(1)}%</b> `;
            chrtPART1_value = `${ProdPlanPart1.toFixed(1)}%`;
            return ProdPlanPart1, chrtPART1_value
        })
        update_prodOAPart2.forEach((item) => {
            // console.log(ProdActualPart2_value)
            // console.log(sumProdPlanPart2_chart)
            OA_sumProdPlanPart2 = (ProdActualPart2_value / sumProdPlanPart2) * 100
            // console.log(OA_sumProdPlanPart2)
            ProdPlanPart2 = parseFloat(OA_sumProdPlanPart2)
            if (ProdPlanPart2 == NaN || ProdPlanPart2 == Infinity)
                ProdPlanPart2 = 0;
            item.innerHTML = `<b>${ProdPlanPart2.toFixed(1)}% </b>`;
            chrtPART2_value = `${ProdPlanPart2.toFixed(1)}%`;
            return ProdPlanPart2, chrtPART2_value
        })
    }, 10000)
}

var LossRecorder = [];
var uniqueLoss = [];
var holderLoss = {};
var mergedArrayLoss = [];
const sumLoss = [];

var ProdLossAlt_value = [];
var ValueLossAlt = [];
var holderLossAlt = [];
var sumLossAlt = [];

var ProdLossSta_value = [];
var ValueLossSta = [];
var holderLossSta = [];
var sumLossSta = [];

var ProdLossECC_value = [];
var ValueLossECC = [];
var holderLossECC = [];
var sumLossECC = [];

var ProdLossPart1_value = [];
var ValueLossPart1 = [];
var holderLossPart1 = [];
var sumLossPart1 = [];

var ProdLossPart2_value = [];
var ValueLossPart2 = [];
var holderLossPart2 = [];
var sumLossPart2 = [];

var Alt_Loss_st = 0
var Alt_Loss_nd = 0
var Alt_Loss_rd = 0
var Alt_Loss_th = 0
var Alt_Loss_fth = 0

var Sta_Loss_st = 0
var Sta_Loss_nd = 0
var Sta_Loss_rd = 0
var Sta_Loss_th = 0
var Sta_Loss_fth = 0

var ECC_Loss_st = 0
var ECC_Loss_nd = 0
var ECC_Loss_rd = 0
var ECC_Loss_th = 0
var ECC_Loss_fth = 0

var Part1_Loss_st = 0
var Part1_Loss_nd = 0
var Part1_Loss_rd = 0
var Part1_Loss_th = 0
var Part1_Loss_fth = 0

var Part2_Loss_st = 0
var Part2_Loss_nd = 0
var Part2_Loss_rd = 0
var Part2_Loss_th = 0
var Part2_Loss_fth = 0

function updateLoss() {
    socket.on("LineSummary", (data) => {
        data.filter((e) => {
            if (e.RxNo_Line != null) {
                LineSummary.push(e)
                return LineSummary
            }
            for (const item of LineSummary) {
                // 👇 "name" and "location" used for duplicate check
                const duplicate = uniqueLoss.find(
                    (obj) => obj.RxNo_Line === item.RxNo_Line);
                if (!duplicate) {
                    uniqueLoss.push(item);
                }
            }
            // console.log(uniqueLoss)
            return uniqueLoss;
        });
    });
    socket.on("Loss", (data) => {
        data.recordset.filter((e) => {
            LossRecorder.push(e)
            // console.log(LossRecorder)ห
        })
        for (const item of LossRecorder) {
            const duplicate = sumLoss.find((obj) => obj.RxNo === item.RxNo);
            if (!duplicate) {
                sumLoss.push(item);
                // console.log(sumLoss)
            }
        }
        mergedArrayLoss = sumLoss.map((item) => {
            const matchedObjectLoss = uniqueLoss.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            return { ...item, ...matchedObjectLoss };
        });
        // console.log(mergedArrayLoss)
        // console.log(CurrentLoss.data.datasets)
        mergedArrayLoss.forEach((item) => {
            // console.log(item)
            if (item.Code === '1.2' || item.Code === '1.4' || item.Code === '1.1.1' || item.Code === '1.1.2' || item.Code === '1.3.1' || item.Code === '1.3.2' || item.Code === '1.5.1' || item.Code === '1.5.2' || item.Code === '1.6' || item.Code === '1.7.1' || item.Code === '1.7.2') {
                item.Code = '1'
                item.Description = 'M/C DOWN TIME LOSS'
                // console.log(item)
                if (item.Department === 'Alternator Product') {
                    // console.log(item)
                    CurrentLoss.data.datasets[1].data[0] = Alt_Loss_st += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Starter Product') {
                    CurrentLoss.data.datasets[1].data[1] = Sta_Loss_st += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'ECC, ABS & Asmo Product') {
                    CurrentLoss.data.datasets[1].data[2] = ECC_Loss_st += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.1') {
                    CurrentLoss.data.datasets[1].data[3] = Part1_Loss_st += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.2') {
                    CurrentLoss.data.datasets[1].data[4] = Part2_Loss_st += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                }
            } else if (item.Code === '2.1') {
                item.Code = '2'
                item.Description = 'QUALITY'
                // console.log(item)
                if (item.Department === 'Alternator Product') {
                    // console.log(item)
                    CurrentLoss.data.datasets[1].data[0] = Alt_Loss_nd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Starter Product') {
                    CurrentLoss.data.datasets[1].data[1] = Sta_Loss_nd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'ECC, ABS & Asmo Product') {
                    CurrentLoss.data.datasets[1].data[2] = ECC_Loss_nd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.1') {
                    CurrentLoss.data.datasets[1].data[3] = Part1_Loss_nd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.2') {
                    CurrentLoss.data.datasets[1].data[4] = Part2_Loss_nd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                }
            } else if (item.Code === '3.1' || item.Code === '3.2') {
                item.Code = '3'
                item.Description = 'MAT & Part Loss'
                // console.log(item)
                if (item.Department === 'Alternator Product') {
                    // console.log(item)
                    CurrentLoss.data.datasets[2].data[0] = Alt_Loss_rd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Starter Product') {
                    CurrentLoss.data.datasets[2].data[1] = Sta_Loss_rd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'ECC, ABS & Asmo Product') {
                    CurrentLoss.data.datasets[2].data[2] = ECC_Loss_rd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.1') {
                    CurrentLoss.data.datasets[2].data[3] = Part1_Loss_rd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.2') {
                    CurrentLoss.data.datasets[2].data[4] = Part2_Loss_rd += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                }
            } else if (item.Code === '4.1' || item.Code === '4.2') {
                item.Code = '4'
                item.Description = 'WAITTING KANBAN'
                // console.log(item)
                if (item.Department === 'Alternator Product') {
                    // console.log(item)
                    CurrentLoss.data.datasets[3].data[0] = Alt_Loss_th += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Starter Product') {
                    CurrentLoss.data.datasets[3].data[1] = Sta_Loss_th += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'ECC, ABS & Asmo Product') {
                    CurrentLoss.data.datasets[3].data[2] = ECC_Loss_th += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.1') {
                    CurrentLoss.data.datasets[3].data[3] = Part1_Loss_th += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.2') {
                    CurrentLoss.data.datasets[3].data[4] = Part2_Loss_th += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                }
            } else if (item.Code === '5.1' || item.Code === '5.2' || item.Code === '5.3') {
                item.Code = '5'
                item.Description = 'Daily Loss'
                // console.log(item)
                if (item.Department === 'Alternator Product') {
                    // console.log(item)
                    CurrentLoss.data.datasets[4].data[0] = Alt_Loss_fth += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Starter Product') {
                    CurrentLoss.data.datasets[4].data[1] = Sta_Loss_fth += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'ECC, ABS & Asmo Product') {
                    CurrentLoss.data.datasets[4].data[2] = ECC_Loss_fth += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.1') {
                    CurrentLoss.data.datasets[4].data[3] = Part1_Loss_fth += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                } else if (item.Department === 'Parts Mfg.2') {
                    CurrentLoss.data.datasets[4].data[4] = Part2_Loss_fth += item.Minute
                    CurrentLoss.update()
                    // console.log(item)
                }
            }
            // console.log(item)
            // console.log(CurrentLoss.data.datasets[4].data)
        })
        // CurrentLoss.data.datasets = mergedArrayLoss
        return mergedArrayLoss;
    })
    setInterval(function () {
        update_prodActCurrentAlt.forEach((item) => {
            mergedArrayLoss.forEach((data) => {
                if (data.Department === 'Alternator Product') {
                    // console.log(data)
                    ProdLossAlt_value = calculateSum(Transfer_data(data, ValueLossAlt, holderLossAlt, sumLossAlt), 'Minute');
                    // console.log(ProdLossAlt_value)
                    item.innerHTML = `<b>${ProdLossAlt_value}</b>`
                }
            })
        })
        update_prodActCurrentSta.forEach((item) => {
            mergedArrayLoss.forEach((data) => {
                if (data.Department === 'Starter Product') {
                    // console.log(data)
                    ProdLossSta_value = calculateSum(Transfer_data(data, ValueLossSta, holderLossSta, sumLossSta), 'Minute');
                    // console.log(ProdLossSta_value)
                    item.innerHTML = `<b>${ProdLossSta_value}</b>`
                }
            })
        })
        update_prodActCurrentECC.forEach((item) => {
            mergedArrayLoss.forEach((data) => {
                if (data.Department === 'ECC, ABS & Asmo Product') {
                    // console.log(data)
                    ProdLossECC_value = calculateSum(Transfer_data(data, ValueLossECC, holderLossECC, sumLossECC), 'Minute');
                    // console.log(ProdLossECC_value)
                    item.innerHTML = `<b>${ProdLossECC_value}</b>`
                }
            })
        })
        update_prodActCurrentPart1.forEach((item) => {
            mergedArrayLoss.forEach((data) => {
                if (data.Department === 'Parts Mfg.1') {
                    // console.log(data)
                    ProdLossPart1_value = calculateSum(Transfer_data(data, ValueLossPart1, holderLossPart1, sumLossPart1), 'Minute');
                    // console.log(ProdLossPart1_value)
                    item.innerHTML = `<b>${ProdLossPart1_value}</b>`
                }
            })
        })
        update_prodActCurrentPart2.forEach((item) => {
            mergedArrayLoss.forEach((data) => {
                if (data.Department === 'Parts Mfg.2') {
                    // console.log(data)
                    ProdLossPart2_value = calculateSum(Transfer_data(data, ValueLossPart2, holderLossPart2, sumLossPart2), 'Minute');
                    // console.log(ProdLossPart2_value)
                    item.innerHTML = `<b>${ProdLossPart2_value}</b>`
                }
            })
        })
    }, 10000)
}

function dataWorkingDay() {
    socket.on("CommonDay", (data) => {
        data.recordset.filter((e) => {
            if (e.DataCode == format) {
                MonthValue = e.DataValue;
            }
            return MonthValue;
        });
    })
}

function Date_Modify(date) {
    if (date < 10) {
        date = '0' + date;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let Date_Modify = `${year}-${month}-` + date + `T00:00:00.000Z`
    // console.log(Date_Modify)
    return Date_Modify
}

var MPRecorder = []
var sumMP = []
var mergedArrayMP = []
var uniqueMP = []

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

const first_MP = document.querySelectorAll("#first_MP")
const second_MP = document.querySelectorAll("#second_MP")

function Manpower_Attendance() {
    socket.on("Manpower", (data) => {
        // console.log(data)
        data.recordset.filter((e) => {
            MPRecorder.push(e)
            // console.log(MPRecorder)ห
        })
        for (const item of MPRecorder) {
            const duplicate = sumMP.find((obj) => obj.RxNo === item.RxNo);
            if (!duplicate) {
                sumMP.push(item);
                // console.log(sumMP)
            }
        }
        // console.log(uniqueLoss)
        mergedArrayMP = sumMP.map((item) => {
            const matchedObjectMP = uniqueLoss.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            return { ...item, ...matchedObjectMP };
        });
        console.log(mergedArrayMP)
        mergedArrayMP.map((item) => {
            // console.log(item.ProductionDate)
            // if (item.ProductionDate === Date_Modify(1)) {
            // console.log(item)
            if (item.Department === 'Alternator Product') {
                ActiveWorker.data.datasets[4].data[0] = sumMPIL_Alt += item.InLine_WT
                ActiveWorker.data.datasets[3].data[0] = sumMPOL_Alt += item.OutLine_WT
                ActiveWorker.data.datasets[2].data[0] = sumMPMS_Alt += item.Mizusumashi_WT
                ActiveWorker.data.datasets[2].data[0] = sumMPLL_Alt += item.LineLeader_WT
                ActiveWorker.data.datasets[0].data[0] = sumMPTL_Alt += item.TeamLeader_WT
                ActiveWorker.update()
                console.log(item)
            } else if (item.Department === 'Starter Product') {
                ActiveWorker.data.datasets[4].data[1] = sumMPIL_Sta += item.InLine_WT
                ActiveWorker.data.datasets[3].data[1] = sumMPOL_Sta += item.OutLine_WT
                ActiveWorker.data.datasets[2].data[1] = sumMPMS_Sta += item.Mizusumashi_WT
                ActiveWorker.data.datasets[1].data[1] = sumMPLL_Sta += item.LineLeader_WT
                ActiveWorker.data.datasets[0].data[1] = sumMPTL_Sta += item.TeamLeader_WT
                ActiveWorker.update()
            } else if (item.Department === 'ECC, ABS & Asmo Product') {
                ActiveWorker.data.datasets[4].data[2] = sumMPIL_ECC += item.InLine_WT
                ActiveWorker.data.datasets[3].data[2] = sumMPOL_ECC += item.OutLine_WT
                ActiveWorker.data.datasets[2].data[2] = sumMPMS_ECC += item.Mizusumashi_WT
                ActiveWorker.data.datasets[1].data[2] = sumMPLL_ECC += item.LineLeader_WT
                ActiveWorker.data.datasets[0].data[2] = sumMPTL_ECC += item.TeamLeader_WT
            } else if (item.Department === 'Parts Mfg.1') {
                ActiveWorker.data.datasets[4].data[3] = sumMPIL_Part1 += item.InLine_WT
                ActiveWorker.data.datasets[3].data[3] = sumMPOL_Part1 += item.OutLine_WT
                ActiveWorker.data.datasets[2].data[3] = sumMPMS_Part1 += item.Mizusumashi_WT
                ActiveWorker.data.datasets[1].data[3] = sumMPLL_Part1 += item.LineLeader_WT
                ActiveWorker.data.datasets[0].data[3] = sumMPTL_Part1 += item.TeamLeader_WT
            } else if (item.Department === 'Parts Mfg.2') {
                ActiveWorker.data.datasets[4].data[4] = sumMPIL_Part1 += item.InLine_WT
                ActiveWorker.data.datasets[3].data[4] = sumMPOL_Part1 += item.OutLine_WT
                ActiveWorker.data.datasets[2].data[4] = sumMPMS_Part1 += item.Mizusumashi_WT
                ActiveWorker.data.datasets[1].data[4] = sumMPLL_Part1 += item.LineLeader_WT
                ActiveWorker.data.datasets[0].data[4] = sumMPTL_Part1 += item.TeamLeader_WT
            }
            // console.log(item)
            const sumMP = sumMPIL_Alt + sumMPOL_Alt + sumMPLL_Alt + sumMPLL_Alt + sumMPIL_Sta + sumMPOL_Sta + sumMPLL_Sta + sumMPLL_Sta + sumMPIL_ECC + sumMPOL_ECC + sumMPLL_ECC + sumMPLL_ECC + sumMPIL_Part1 + sumMPOL_Part1 + sumMPLL_Part1 + sumMPLL_Part1 + sumMPIL_Part2 + sumMPOL_Part2 + sumMPLL_Part2 + sumMPLL_Part2
            // console.log(sumMP)
            first_MP.forEach(item => {
                item.innerHTML = `<b>${sumMP.toFixed(1)}</b>`
                // console.log(first_MP)
            })
            second_MP.forEach(item => {
                item.innerHTML = `/ ${sumMP.toFixed(1)}`
                // console.log(second_MP)
            })
            // }
        })
        // mergedArrayMP.forEach((item) => {
        // console.log(item)
        // })
    })
}
// socket.on("vwstock_by_cust", (data) => {
//     console.log(data)
// })

dataWorkingDay()
updateprodAct()
updateprodPlan()
// updateprodPlanAs()
updateLoss()
Manpower_Attendance()
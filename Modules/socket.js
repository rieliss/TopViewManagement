var socket = io("http://172.23.36.47:4040");
const objectDate = new Date();
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
// let format = `20230801`;

function calculateSum(array, property) {
    let sum = 0;

    array.forEach(element => {
        sum += element[property];
    });

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

var ProdPlanAlt;
var ProdPlanSta;
var ProdPlanECC;
var ProdPlanPart1;
var ProdPlanPart2;

var holder = {};
const Sumupdate_prodAct = 0;

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
var sumProdPlan_chart;

var OA_sumProdPlanAlt;
var OA_sumProdPlanSta;
var OA_sumProdPlanECC;
var OA_sumProdPlanPart1;
var OA_sumProdPlanPart2;

const update_prodAct = document.querySelectorAll(".update_prodA");
const update_prodPlan = document.querySelectorAll(".update_prodP");

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
            Prod_Actual_Value.push(e);
        });
        Prod_Actual_Value.forEach(function (d) {
            if (holder.hasOwnProperty(d.RxNo_Line)) {
                holder[d.RxNo_Line] = holder[d.RxNo_Line] + d.Value;
            } else {
                holder[d.RxNo_Line] = d.Value;
            }
        });

        for (var prop in holder) {
            Prod_Actual_Value2.push({ RxNo_Line: prop, Value: holder[prop] });
        }

        for (const item of Prod_Actual_Value2) {
            const duplicate = sum.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            if (!duplicate) {
                sum.push(item);
            }
        }
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
                    chartIdMFG1.data.datasets[0].data[0] = ProdActualAlt_value;
                    chartIdMFG1.update();
                    ProdActualAlt = formatNumber(ProdActualAlt_value);
                    item.innerHTML = `${ProdActualAlt}`;
                    return ProdActualAlt_value;
                } else {
                }
            })
        })
        update_prodActSta.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Starter Product') {
                    ProdActualSta_value = calculateSum(Transfer_data(data, ValueSta, holderSta, sumSta), 'Value');
                    chartIdMFG2.data.datasets[0].data[0] = ProdActualSta_value;
                    chartIdMFG2.update();
                    ProdActualSta = formatNumber(ProdActualSta_value);
                    item.innerHTML = `${ProdActualSta}`;
                    return ProdActualSta_value;
                } else {
                }
            })
        })
        update_prodActECC.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'ECC, ABS & Asmo Product') {
                    ProdActualECC_value = calculateSum(Transfer_data(data, ValueECC, holderECC, sumECC), 'Value');
                    chartIdMFG3.data.datasets[0].data[0] = ProdActualECC_value;
                    chartIdMFG3.update();
                    ProdActualECC = formatNumber(ProdActualECC_value);
                    item.innerHTML = `${ProdActualECC}`;
                    return ProdActualECC_value;
                } else {
                }
            })
        })
        update_prodActPart1.forEach((item) => {
            mergedArrayAct.forEach((data) => {
                if (data.Department === 'Parts Mfg.1') {
                    ProdActualPart1_value = Transfer_data(data, ValuePart1, holderPart1, sumPart1)
                    console.log(ProdActualPart1_value)
                    ProdActualPart1_value = calculateSum(Transfer_data(data, ValuePart1, holderPart1, sumPart1), 'Value');
                    chartIdPART1.data.datasets[0].data[0] = ProdActualPart1_value;
                    chartIdPART1.update();
                    ProdActualPart1 = formatNumber(ProdActualPart1_value);
                    item.innerHTML = `${ProdActualPart1}`;
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
                    chartIdPART2.data.datasets[0].data[0] = ProdActualPart2_value;
                    chartIdPART2.update();
                    ProdActualPart2 = formatNumber(ProdActualPart2_value);
                    item.innerHTML = `${ProdActualPart2}`;
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
                    ProdActualAct = formatNumber(calculateSum(Transfer_data(data, ValueAct, holderAct, sumAct), 'Value'));
                    item.innerHTML = `${ProdActualAct}`;
                    return ProdActualAct
                }
            })
        })
    }, 10000)
}

function updateprodPlan() {
    update_prodPlan.forEach((item) => {
        socket.on("MasterPlan", (data) => {
            data.recordset.filter((e) => {
                Prod_Actual_Value.push(e);
                const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
                const sumProdPlan = ProdPlan / MonthValue
                const IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
                item.innerHTML = `${IntProdPlan}`;
            })
        })
    })
}
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
            // const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
            // const sumProdPlan = ProdPlan / MonthValue
            // const IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
            // item.innerHTML = `${IntProdPlan}`;
        })
        Prod_Plan_Value.forEach(function (d) {
            if (holderPlan.hasOwnProperty(d.RxNo_Line)) {
                holderPlan[d.RxNo_Line] = holderPlan[d.RxNo_Line] + d.Value;
            } else {
                holderPlan[d.RxNo_Line] = d.Value;
            }
        });

        for (var prop in holderPlan) {
            Prod_Plan_Value2.push({ RxNo_Line: prop, Value: holderPlan[prop] });
        }

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
                    chartIdMFG1.data.datasets[0].data[1] = sumProdPlanAlt_chart;
                    chartIdMFG1.update();
                    ProdPlanAlt = formatNumber((parseFloat(sumProdPlanAlt)), 2)
                    item.innerHTML = `${ProdPlanAlt}`;
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
                    chartIdMFG2.data.datasets[0].data[1] = sumProdPlanSta_chart;
                    chartIdMFG2.update();
                    // console.log(chartIdMFG2)
                    ProdPlanSta = formatNumber((parseFloat(sumProdPlanSta)), 2)
                    item.innerHTML = `${ProdPlanSta}`;
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
                    chartIdMFG3.data.datasets[0].data[1] = sumProdPlanECC_chart;
                    chartIdMFG3.update();
                    ProdPlanECC = formatNumber((parseFloat(sumProdPlanECC)), 2)
                    item.innerHTML = `${ProdPlanECC}`;
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
                    chartIdPART1.data.datasets[0].data[1] = sumProdPlanPart1_chart;
                    chartIdPART1.update();
                    console.log(chartIdPART1)
                    ProdPlanPart1 = formatNumber((parseFloat(sumProdPlanPart1)), 2)
                    item.innerHTML = `${ProdPlanPart1}`;
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
                    chartIdPART2.data.datasets[0].data[1] = sumProdPlanPart2_chart;
                    chartIdPART2.update();
                    ProdPlanPart2 = formatNumber((parseFloat(sumProdPlanPart2)), 2)
                    item.innerHTML = `${ProdPlanPart2}`;
                    return sumProdPlanPart2
                }
            })
        })
        update_prodPlan.forEach((item) => {
            mergedArrayPlan.forEach((data) => {
                if (data.Department != undefined) {
                    ProdPlanAct = calculateSum(Transfer_data(data, ValuePlanAct, holderPlanAct, sumPlanAct), 'Value')
                    sumProdPlan = ProdPlanAct / MonthValue
                    sumProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
                    item.innerHTML = `${sumProdPlan}`;
                    return sumProdPlan
                }
            })
        })
        update_prodOAAlt.forEach((item) => {
            // console.log(ProdActualAlt_value)
            // console.log(sumProdPlanAlt)
            OA_sumProdPlanAlt = (ProdActualAlt_value / sumProdPlanAlt) * 100
            // console.log(OA_sumProdPlanAlt)
            ProdPlanAlt = parseFloat(OA_sumProdPlanAlt)
            if (ProdPlanAlt == NaN || ProdPlanAlt == Infinity)
                ProdPlanAlt = 0;
            item.innerHTML = `${ProdPlanAlt.toFixed(1)}%`;
            return ProdPlanAlt
        })
        update_prodOASta.forEach((item) => {
            // console.log(ProdActualSta_value)
            // console.log(sumProdPlanSta)
            OA_sumProdPlanSta = (ProdActualSta_value / sumProdPlanSta) * 100
            // console.log(OA_sumProdPlanSta)
            ProdPlanSta = parseFloat(OA_sumProdPlanSta)
            if (ProdPlanSta == NaN || ProdPlanSta == Infinity)
                ProdPlanSta = 0;
            item.innerHTML = `${ProdPlanSta.toFixed(1)}%`;
            return ProdPlanSta
        })
        update_prodOAECC.forEach((item) => {
            // console.log(ProdActualECC_value)
            // console.log(sumProdPlanECC)
            OA_sumProdPlanECC = (ProdActualECC_value / sumProdPlanECC) * 100
            // console.log(OA_sumProdPlanECC)
            ProdPlanECC = parseFloat(OA_sumProdPlanECC)
            if (ProdPlanECC == NaN || ProdPlanECC == Infinity)
                ProdPlanECC = 0;
            item.innerHTML = `${ProdPlanECC.toFixed(1)}%`;
            return ProdPlanECC
        })
        update_prodOAPart1.forEach((item) => {
            // console.log(ProdActualPart1_value)
            // console.log(sumProdPlanPart1)
            OA_sumProdPlanPart1 = (ProdActualPart1_value / sumProdPlanPart1) * 100
            // console.log(OA_sumProdPlanPart1)
            ProdPlanPart1 = parseFloat(OA_sumProdPlanPart1)
            if (ProdPlanPart1 == NaN || ProdPlanPart1 == Infinity)
                ProdPlanPart1 = 0;
            item.innerHTML = `${ProdPlanPart1.toFixed(1)}%`;
            return ProdPlanPart1
        })
        update_prodOAPart2.forEach((item) => {
            // console.log(ProdActualPart2_value)
            // console.log(sumProdPlanPart2_chart)
            OA_sumProdPlanPart2 = (ProdActualPart2_value / sumProdPlanPart2) * 100
            // console.log(OA_sumProdPlanPart2)
            ProdPlanPart2 = parseFloat(OA_sumProdPlanPart2)
            if (ProdPlanPart2 == NaN || ProdPlanPart2 == Infinity)
                ProdPlanPart2 = 0;
            item.innerHTML = `${ProdPlanPart2.toFixed(1)}%`;
            return ProdPlanPart2
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

dataWorkingDay()
updateprodAct()
updateprodPlan()



var socket = io("http://172.23.36.47:4040");

const objectDate = new Date();
// const objectDate = new Date('2023-08-31');
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

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}

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
var holder = {};

const unique1 = [];
const arr = [];

const today = getPreviousDay()
// const today = new Date()
const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);

// console.log(todayDate)
// console.log(todayDate_result)
// console.log(monthDate_result)

function Date_Modify(date) {
    if (date < 10) {
        date = '0' + date;
    }
    let Date_Modify = `${year}-${month}-` + date + `T00:00:00.000Z`
    // console.log(Date_Modify)
    return Date_Modify
}

// Date_Modify(6)

const firstdate = "'" + monthDate_result + "-01 00:00:00.000'";
const lastdate = "'" + monthDate_result + "-31 00:00:00.000'";

var Prod_Actual_ValueDeki = [];
var holderLoss = [];
var ValueLoss = [];
var sumLossClar = [];

var MonthValue;
var ProdPlanDeki;
var sumProdPlanDeki = 0;

function calculateSum(array, property) {
    let sum = 0;

    array.forEach(element => {
        sum += element[property];
    });

    return sum;
}

function Update_Deki() {
    socket.on("ProdActPPA", (data) => {
        data.recordset.forEach((e) => {
            // console.log(e, ' -> Act');
            return e;
        });
    })
}

function dataWorkingDay_deki() {
    socket.on("CommonDay", (data) => {
        data.recordset.filter((e) => {
            if (e.DataCode == format) {
                MonthValue = e.DataValue;
            }
            // console.log(MonthValue)
            return MonthValue;
        });
    })
}

var sim = 0;
var check_sim = 0;
var res = [];

function check(check_sim, e, x) {
    if (e.Value <= 0) {
        CurrentLossDetailSum.data.datasets[0].data[x - 1] = 0;
        CurrentLossDetailSum.update();
        CurrentLossDetailSum.data.datasets[1].data[x - 1] = 0;
        CurrentLossDetailSum.update();
    } else {
        check_sim = check_sim;
        CurrentLossDetailSum.data.datasets[0].data[x - 1] = check_sim;
        CurrentLossDetailSum.update();
        sim = check_sim - e.Value
        if (sim > 0) {
            CurrentLossDetailSum.data.datasets[1].data[x - 1] = sim;
            CurrentLossDetailSum.update();
        } else {
            CurrentLossDetailSum.data.datasets[1].data[x - 1] = 0;
            CurrentLossDetailSum.update();
        }
    }
    return check_sim
}

Update_Deki()
dataWorkingDay_deki()
updateprodActDeki()

var SumAct_deki = 0;
var SumPlan_deki = 0;

function Update_PlanDeki() {
    socket.on("MasterPlan", (data) => {
        data.recordset.map((e) => {
            // console.log(e)
            // Prod_Actual_ValueDeki.push(e);
            Prod_Actual_ValueDeki.push(e);
            ProdPlanDeki = calculateSum(data.recordset, 'ProdPlanPerMonth');
            // console.log(ProdPlanDeki)
            // console.log(ProdPlan)
            // console.log(MonthValue)
            sumProdPlanDeki = ProdPlanDeki / MonthValue
            // console.log(sumProdPlanDeki)
            // IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
        })
        // console.log(sumProdPlanDeki)
        return sumProdPlanDeki
    })
}
Update_PlanDeki()

function updateprodActDeki() {
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
    socket.on('ProdActPerDay', (data) => {
        // console.log(data)
        for (let i = 0; i < data.recordset.length; i++) {
            const ind = res.findIndex(el => el.ProductionDate === data.recordset[i].ProductionDate);
            if (ind === -1) {
                res.push(data.recordset[i]);
            } else {
                res[ind].Value += data.recordset[i].Value;
            };
        };
        // console.log(res)
        res.sort((p1, p2) => {
            if (p1.ProductionDate < p2.ProductionDate) return -1;
            if (p1.ProductionDate > p2.ProductionDate) return 1;
            return 0;
        });
        // console.log(res)
        ACC_Act.forEach((item) => {
            res.map((e) => {
                SumAct_deki += e.Value;
                // console.log(SumAct_deki)
            })
            item.innerHTML = `<b>${formatNumber(SumAct_deki, 2)}</b>`;
        })
        ACC_plan.forEach((item) => {
            console.log(sumProdPlanDeki)
            SumPlan_deki += sumProdPlanDeki
            item.innerHTML = `<b>${formatNumber(SumPlan_deki, 2)}</b>`;
        })
        ACC_Diff.forEach((item) => {
            // SumPlan_deki - SumAct_deki
            item.innerHTML = `<b>${formatNumber(SumPlan_deki - SumAct_deki, 2)}</b>`;
        })
        res.map((e) => {
            // console.log(sumProdPlanDeki)
            // console.log(e.ProductionDate)
            // console.log(Date_Modify(1))
            if (e.ProductionDate === Date_Modify(1)) {
                // console.log(e)
                CurrentLossDetailSum.data.datasets[2].data[0] = e.Value;
                check(sumProdPlanDeki, e, 1)
                // CurrentLossDetailSum.data.datasets[0].data[0] = sumProdPlanDeki;
            } else if (e.ProductionDate === Date_Modify(2)) {
                console.log(e)
                CurrentLossDetailSum.data.datasets[2].data[1] = e.Value;
                check(sumProdPlanDeki, e, 2)
                // CurrentLossDetailSum.data.datasets[0].data[1] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[1] = sim;
            } else if (e.ProductionDate === Date_Modify(3)) {
                CurrentLossDetailSum.data.datasets[2].data[2] = e.Value;
                check(sumProdPlanDeki, e, 3)
                // CurrentLossDetailSum.data.datasets[0].data[2] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[2] = sim;
            } else if (e.ProductionDate === Date_Modify(4)) {
                CurrentLossDetailSum.data.datasets[2].data[3] = e.Value;
                check(sumProdPlanDeki, e, 4)
                // CurrentLossDetailSum.data.datasets[0].data[3] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[3] = sim;
            } else if (e.ProductionDate === Date_Modify(5)) {
                CurrentLossDetailSum.data.datasets[2].data[4] = e.Value;
                check(sumProdPlanDeki, e, 5)
                // CurrentLossDetailSum.data.datasets[0].data[4] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[4] = sim;
            } else if (e.ProductionDate === Date_Modify(6)) {
                CurrentLossDetailSum.data.datasets[2].data[5] = e.Value;
                check(sumProdPlanDeki, e, 6)
                // CurrentLossDetailSum.data.datasets[0].data[5] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[5] = sim;
            } else if (e.ProductionDate === Date_Modify(7)) {
                CurrentLossDetailSum.data.datasets[2].data[6] = e.Value;
                check(sumProdPlanDeki, e, 7)
                // CurrentLossDetailSum.data.datasets[0].data[6] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[6] = sim;
            } else if (e.ProductionDate === Date_Modify(8)) {
                CurrentLossDetailSum.data.datasets[2].data[7] = e.Value;
                check(sumProdPlanDeki, e, 8)
                // CurrentLossDetailSum.data.datasets[0].data[7] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[7] = sim;
            } else if (e.ProductionDate === Date_Modify(9)) {
                CurrentLossDetailSum.data.datasets[2].data[8] = e.Value;
                check(sumProdPlanDeki, e, 9)
                // CurrentLossDetailSum.data.datasets[0].data[8] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[8] = sim;
            } else if (e.ProductionDate === Date_Modify(10)) {
                CurrentLossDetailSum.data.datasets[2].data[9] = e.Value;
                check(sumProdPlanDeki, e, 10)
                // CurrentLossDetailSum.data.datasets[0].data[9] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[9] = sim;
            } else if (e.ProductionDate === Date_Modify(11)) {
                CurrentLossDetailSum.data.datasets[2].data[10] = e.Value;
                check(sumProdPlanDeki, e, 11)
                // CurrentLossDetailSum.data.datasets[0].data[10] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[10] = sim;
            } else if (e.ProductionDate === Date_Modify(12)) {
                CurrentLossDetailSum.data.datasets[2].data[11] = e.Value;
                check(sumProdPlanDeki, e, 12)
                // CurrentLossDetailSum.data.datasets[0].data[11] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[11] = sim;
            } else if (e.ProductionDate === Date_Modify(13)) {
                CurrentLossDetailSum.data.datasets[2].data[12] = e.Value;
                check(sumProdPlanDeki, e, 13)
                // CurrentLossDetailSum.data.datasets[0].data[12] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[12] = sim;
            } else if (e.ProductionDate === Date_Modify(14)) {
                CurrentLossDetailSum.data.datasets[2].data[13] = e.Value;
                check(sumProdPlanDeki, e, 14)
                // CurrentLossDetailSum.data.datasets[0].data[13] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[13] = sim;
            } else if (e.ProductionDate === Date_Modify(15)) {
                CurrentLossDetailSum.data.datasets[2].data[14] = e.Value;
                check(sumProdPlanDeki, e, 15)
                // CurrentLossDetailSum.data.datasets[0].data[14] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[14] = sim;
            } else if (e.ProductionDate === Date_Modify(16)) {
                CurrentLossDetailSum.data.datasets[2].data[15] = e.Value;
                check(sumProdPlanDeki, e, 16)
                // CurrentLossDetailSum.data.datasets[0].data[15] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[15] = sim;
            } else if (e.ProductionDate === Date_Modify(17)) {
                CurrentLossDetailSum.data.datasets[2].data[16] = e.Value;
                check(sumProdPlanDeki, e, 17)
                // CurrentLossDetailSum.data.datasets[0].data[16] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[16] = sim;
            } else if (e.ProductionDate === Date_Modify(18)) {
                CurrentLossDetailSum.data.datasets[2].data[17] = e.Value;
                check(sumProdPlanDeki, e, 18)
                // CurrentLossDetailSum.data.datasets[0].data[17] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[17] = sim;
            } else if (e.ProductionDate === Date_Modify(19)) {
                CurrentLossDetailSum.data.datasets[2].data[18] = e.Value;
                check(sumProdPlanDeki, e, 19)
                // CurrentLossDetailSum.data.datasets[0].data[18] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[18] = sim;
            } else if (e.ProductionDate === Date_Modify(20)) {
                CurrentLossDetailSum.data.datasets[2].data[19] = e.Value;
                check(sumProdPlanDeki, e, 20)
                // CurrentLossDetailSum.data.datasets[0].data[19] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[19] = sim;
            } else if (e.ProductionDate === Date_Modify(21)) {
                CurrentLossDetailSum.data.datasets[2].data[20] = e.Value;
                check(sumProdPlanDeki, e, 21)
                // CurrentLossDetailSum.data.datasets[0].data[20] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[20] = sim;
            } else if (e.ProductionDate === Date_Modify(22)) {
                CurrentLossDetailSum.data.datasets[2].data[21] = e.Value;
                check(sumProdPlanDeki, e, 22)
                // CurrentLossDetailSum.data.datasets[0].data[21] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[21] = sim;
            } else if (e.ProductionDate === Date_Modify(23)) {
                CurrentLossDetailSum.data.datasets[2].data[22] = e.Value;
                check(sumProdPlanDeki, e, 23)
                // CurrentLossDetailSum.data.datasets[0].data[22] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[22] = sim;
            } else if (e.ProductionDate === Date_Modify(24)) {
                CurrentLossDetailSum.data.datasets[2].data[23] = e.Value;
                check(sumProdPlanDeki, e, 24)
                // CurrentLossDetailSum.data.datasets[0].data[23] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[23] = sim;
            } else if (e.ProductionDate === Date_Modify(25)) {
                CurrentLossDetailSum.data.datasets[2].data[24] = e.Value;
                check(sumProdPlanDeki, e, 25)
                // CurrentLossDetailSum.data.datasets[0].data[24] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[24] = sim;
            } else if (e.ProductionDate === Date_Modify(26)) {
                CurrentLossDetailSum.data.datasets[2].data[25] = e.Value;
                check(sumProdPlanDeki, e, 26)
                // CurrentLossDetailSum.data.datasets[0].data[25] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[25] = sim;
            } else if (e.ProductionDate === Date_Modify(27)) {
                CurrentLossDetailSum.data.datasets[2].data[26] = e.Value;
                check(sumProdPlanDeki, e, 27)
                // CurrentLossDetailSum.data.datasets[0].data[26] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[26] = sim;
            } else if (e.ProductionDate === Date_Modify(28)) {
                CurrentLossDetailSum.data.datasets[2].data[27] = e.Value;
                check(sumProdPlanDeki, e, 28)
                // CurrentLossDetailSum.data.datasets[0].data[27] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[27] = sim;
            } else if (e.ProductionDate === Date_Modify(29)) {
                CurrentLossDetailSum.data.datasets[2].data[28] = e.Value;
                check(sumProdPlanDeki, e, 29)
                // CurrentLossDetailSum.data.datasets[0].data[28] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[28] = sim;
            } else if (e.ProductionDate === Date_Modify(30)) {
                CurrentLossDetailSum.data.datasets[2].data[29] = e.Value;
                check(sumProdPlanDeki, e, 30)
                // CurrentLossDetailSum.data.datasets[0].data[29] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[29] = sim;
            } else if (e.ProductionDate === Date_Modify(31)) {
                CurrentLossDetailSum.data.datasets[2].data[30] = e.Value;
                check(sumProdPlanDeki, e, 31)
                // CurrentLossDetailSum.data.datasets[0].data[30] = sumProdPlanDeki;
                // CurrentLossDetailSum.data.datasets[1].data[30] = sim;
            }
        })
        return res;
    })
}

const ACC_plan = document.querySelectorAll(".deki-5-2-number");
const ACC_Act = document.querySelectorAll(".deki-5-3-number");
const ACC_Diff = document.querySelectorAll(".deki-5-4-number");
const ChartLossClar = document.querySelectorAll(".chartIdLossClar");

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

updateLoss()
function updateLoss() {
    socket.on("LineSummary", (data) => {
        data.filter((e) => {
            if (e.RxNo_Line != null) {
                LineSummary.push(e)
                return LineSummary
            }
            for (const item of LineSummary) {
                // 👇 "name" and "location" used for duplicate check
                const duplicate = uniqueLossClar.find(
                    (obj) => obj.RxNo_Line === item.RxNo_Line);
                if (!duplicate) {
                    uniqueLossClar.push(item);
                }
            }
            // console.log(uniqueLossClar)
            return uniqueLossClar;
        });
    });
    socket.on("Loss", (data) => {
        data.recordset.filter((e) => {
            LossRecorderClar.push(e)
            // console.log(LossRecorderClar)
        })
        for (const item of LossRecorderClar) {
            const duplicate = sumLossClar.find((obj) => obj.RxNo === item.RxNo);
            if (!duplicate) {
                sumLossClar.push(item);
                // console.log(sumLossClar)
            }
        }
        mergedArrayLoss = sumLossClar.map((item) => {
            const matchedObjectLoss = uniqueLossClar.find(
                (obj) => obj.RxNo_Line === item.RxNo_Line);
            return { ...item, ...matchedObjectLoss };
        });
        // console.log(mergedArrayLoss)
        // console.log(CurrentLoss.data.datasets)
        // console.log(chartIdLossClar.data.datasets[0])
        mergedArrayLoss.forEach((item) => {
            // console.log(item)
            if (item.Code === '1.2' || item.Code === '1.4' || item.Code === '1.1.1' || item.Code === '1.1.2' || item.Code === '1.3.1' || item.Code === '1.3.2' || item.Code === '1.5.1' || item.Code === '1.5.2' || item.Code === '1.6' || item.Code === '1.7.1' || item.Code === '1.7.2') {
                item.Code = '1'
                item.Description = 'M/C DOWN TIME LOSS'
                sum_code1 += item.Minute;
                // console.log(sum_code1)
                chartIdLossClar.data.datasets[0].data[0] = sum_code1
                chartIdLossClar.update()
            } else if (item.Code === '2.1') {
                item.Code = '2'
                item.Description = 'QUALITY'
                sum_code2 += item.Minute;
                chartIdLossClar.data.datasets[0].data[1] = sum_code2
                chartIdLossClar.update()
                // console.log(item)
            } else if (item.Code === '3.1' || item.Code === '3.2') {
                item.Code = '3'
                item.Description = 'MAT & Part Loss'
                sum_code3 += item.Minute;
                chartIdLossClar.data.datasets[0].data[2] = sum_code3
                chartIdLossClar.update()
                // console.log(item)
            } else if (item.Code === '4.1' || item.Code === '4.2') {
                item.Code = '4'
                item.Description = 'WAITTING KANBAN'
                sum_code4 += item.Minute;
                chartIdLossClar.data.datasets[0].data[3] = sum_code4
                chartIdLossClar.update()
                console.log(item)
            } else if (item.Code === '5.1' || item.Code === '5.2' || item.Code === '5.3') {
                item.Code = '5'
                item.Description = 'Daily Loss'
                sum_code5 += item.Minute;
                chartIdLossClar.data.datasets[0].data[4] = sum_code5
                chartIdLossClar.update()
                // console.log(item)
            }
            console.log(item)
            // console.log(CurrentLoss.data.datasets[4].data)
        })
        // CurrentLoss.data.datasets = mergedArrayLoss
        return mergedArrayLoss;
    })
}
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
const mergedArray_LineSummary = [];
const mergedArray = [];
const unique = [];
const sum = [];

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

// function Mysql() {
//     socket.on("LineSummary", (data) => {
//         data.filter((e) => {
//             if (e.RxNo_Line != null) {
//                 LineSummary.push(e)
//                 return LineSummary
//             }
//             for (const item of LineSummary) {
//                 // 👇 "name" and "location" used for duplicate check
//                 const duplicate = unique.find(
//                     (obj) => obj.RxNo_Line === item.RxNo_Line);
//                 if (!duplicate) {
//                     unique.push(item);
//                 }
//             }
//             return unique;
//         });
//     });
//     socket.on("ProdAct", (data) => {
//         data.recordset.forEach((e) => {
//             // Prod_Actual_Value = Object.assign({}, e);
//             Prod_Actual_Value.push(e);
//             // console.log(unique);
//             for (const item of Prod_Actual_Value) {
//                 const duplicate = sum.find(
//                     // (obj) => obj.RxNo_Line === item.RxNo_Line);
//                     (obj) => obj.RxNo_Line === null);
//                 if (!duplicate) {
//                     sum.push(item);
//                 }
//             }
//             // console.log(sum);
//             return sum
//         });
//         const mergedArray = sum.map((item) => {
//             const matchedObject = unique.find((obj) => obj.RxNo_Line === item.RxNo_Line);
//             return { ...item, ...matchedObject };
//         });
//         console.log(mergedArray);
//     });
// }

// function Prod_Actual() {
//     socket.on("ProdAct", (data) => {
//         data.recordset.filter((e) => {
//             Prod_Actual_Value = e;
//             return Prod_Actual_Value
//         });
//     });
// }

function merge(array1, array2) {
    for (let i = 0; i < array2.length; i++) {
        console.log(Prod_Actual_Value)
        console.log(array2.length)
        console.log(i)
        console.log(array2[i])
        if (array1.indexOf(array2[i]) == -1) {
            array1.push(array2[i]);
            console.log(array1)
        }
        return array1;
    }
}

// const Merge_data = document.querySelectorAll(".Merge");
// function Merge() {
//     Merge_data.forEach((item) => {
//         const mergedMap = LineSummary.reduce((acc, item) => {
//             console.log(item)
//             acc[item.RxNo_Line] = { ...item };
//             return acc;
//         }, {});

//         Prod_Actual_Value.forEach((item) => {
//             if (mergedMap[item.RxNo_Line]) {
//                 Object.assign(mergedMap[item.RxNo_Line], item);
//             } else {
//                 mergedMap[item.RxNo_Line] = { ...item };
//             }
//         });
//         const mergedArray = Object.values(mergedMap);
//         console.log(mergedArray);
//     })
// }

const update_prodAct = document.querySelectorAll(".update_prodA");
function updateprodAct() {
    update_prodAct.forEach((item) => {
        socket.on("ProdAct", (data) => {
            data.recordset.filter((e) => {
                const ProdActual = formatNumber(calculateSum(data.recordset, 'Value'));
                item.innerHTML = `${ProdActual}`;
            })
        })
    })
}

const update_prodPlan = document.querySelectorAll(".update_prodP");
function updateprodPlan() {
    update_prodPlan.forEach((item) => {
        socket.on("MasterPlan", (data) => {
            data.recordset.filter((e) => {
                const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
                const sumProdPlan = ProdPlan / MonthValue
                const IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
                item.innerHTML = `${IntProdPlan}`;
            })
        })
    })
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
// Prod_Actual()
Mysql()
// Merge()


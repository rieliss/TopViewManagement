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
let format = `${year}${month}${day}`;

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

function getData() {
    socket.on("update", (data) => {
        data.recordset.filter((e) => {
            const ProdActual = calculateSum(data.recordset, 'Value');
            return ProdActual;
        });
    });
    socket.on("send", (data) => {
        data.recordset.filter((e) => {
            const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
            return ProdPlan;
        });
    });
}

const update_prodAct = document.querySelectorAll(".update_prodA");
function updateprodAct() {
    update_prodAct.forEach((item) => {
        socket.on("ProdAct", (data) => {
            data.recordset.filter((e) => {
                const ProdActual = formatNumber(calculateSum(data.recordset, 'Value'));
                item.innerHTML = `${ProdActual}B`;
            })
        })
    })
}

const update_prodPlan = document.querySelectorAll(".update_prodP");
function updateprodPlan() {
    update_prodPlan.forEach((item) => {
        socket.on("MasterPlan", (data) => {
            data.recordset.filter((e) => {
                console.log(e)
                const ProdPlan = calculateSum(data.recordset, 'PlanValue_Total');
                console.log(ProdPlan)
                console.log(typeof (ProdPlan))
                const sumProdPlan = ProdPlan / MonthValue
                console.log(MonthValue)
                console.log(sumProdPlan)
                const IntProdPlan = formatNumber((parseFloat(sumProdPlan)), 2)
                console.log(IntProdPlan)
                item.innerHTML = `${IntProdPlan}B`;
            })
        })
    })
}

var MonthValue;
function dataWorkingDay() {
    socket.on("CommonDay", (data) => {
        console.log(data)
        data.recordset.filter((e) => {
            if (e.DataCode == format) {
                MonthValue = e.DataValue;
                console.log(MonthValue)
            }
            console.log(MonthValue)
            return MonthValue;
        });
    })
}
dataWorkingDay()
setInterval(updateprodAct, 5000)
setInterval(updateprodPlan, 5000)



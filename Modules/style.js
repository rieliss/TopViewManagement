const socket = io('http://172.23.36.47:4885')
var chrtProd =
    document.getElementById("chartIdProd");
const doughnutLabelProd = {
    id: 'doughnutLabelProd',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#42e684';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1.83M', xCoor, yCoor);
    }
}
const doughnutLabelProdPlan = {
    id: 'doughnutLabelProdPlan',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#42e684';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('122M', xCoor, yCoor);
    }
}


const chartIdProd = new Chart(chrtProd,
    {
        type: 'doughnut',
        data: {
            label: 'Prod.Volume',
            datasets: [{
                data: [0, 3900],
                backgroundColor: ['mediumaquamarine', 'rgba(217,217,217,0.2)'],
                borderWidth: 0,
            }],
        },
        options: {
            responsive: false,
            aspectRatio: 1,
            cutout: '80%',
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 10,
                }
            },
            legend: {
                display: false,
            },
            title: {
                display: false,
            }
        },
        plugins: [doughnutLabelProd],
    });

setInterval(updateChartProd, 5000);
function updateChartProd() {
    socket.on('update', (data) => {
        data.filter((e) => {
            const time = Date.now()
            const today = new Date(time).toISOString().slice(0, 17)
            const SQLTime = e.RecordTime.slice(0, 17)
            //console.log(e)
            if (e.LineCode == 'A216' && SQLTime === today) {
                const newValueProd = e.ActualVal;
                console.log(newValueProd, 'Prod');
                chartIdProd.data.datasets[0].data[0] = newValueProd;
                chartIdProd.update();
            }
        })
    })
}

setInterval(updateChartOA, 5000);
function updateChartOA() {
    socket.on('update', (data) => {
        data.filter((e) => {
            const time = Date.now()
            const today = new Date(time).toISOString().slice(0, 17)
            const SQLTime = e.RecordTime.slice(0, 17)
            //console.log(e)
            if (e.LineCode == 'B1001' && SQLTime === today) {
                const newValueOA = e.ActualVal;
                console.log(newValueOA, 'OA');
                chartIdOA.data.datasets[0].data[0] = newValueOA;
                chartIdOA.update();
            }
        })
    })
}

console.log(new Date().toLocaleString('th-TH'));

const tooltiptext = document.querySelectorAll('.tooltiptext')
console.log(tooltiptext)
function AddColorToolTip() {
    tooltiptext.forEach((item) => {
        console.log(item.textContent)
        socket.on('update', (data) => {
            data.filter((e) => {
                const time = Date.now()
                const today = new Date(time).toISOString().slice(0, 17)
                const SQLTime = e.RecordTime.slice(0, 17)
                //console.log(e)
                if (e.LineCode == 'B201' && item.innerHTML.includes('ABS Mold 2Pin') && SQLTime === today) {
                    item.innerHTML = `LineCode : ${e.LineCode} <br> Name : ABS Mold 2Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.LineCode} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)} <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 > 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 2Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 2Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 2Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                }
                else if (e.LineCode == 'B202' && item.innerHTML.includes('ABS Mold X1') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold X1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                     <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 > 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold X1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold X1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold X1 <br>Prod.Plan ${e.PlanVal == 'B200'} <br>Actual Prod. : ${e.ActualVal == 'B200'} <br> Judge : X <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}  <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }

                } else if (e.LineCode == 'B200' && item.innerHTML.includes('ABS Mold 4Pin') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 4Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 > 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 4Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 4Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS Mold 4Pin <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'B1001' && item.innerHTML.includes('ABS 1') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 > 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'B1002' && item.innerHTML.includes('ABS 2') && SQLTime === today) {
                    item.innerHTML = ""
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 > 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'B1003' && item.innerHTML.includes('ABS 3') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 3 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 3 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 3 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 3 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'B1004' && item.innerHTML.includes('ABS 4') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 4 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 4 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 4 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : ABS 4 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'H1001' && item.innerHTML.includes('GCU 1') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 1' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 1' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 1' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 1' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'H1002' && item.innerHTML.includes('GCU 2') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 2' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X <br> Record Time : ${(new Date().toLocaleString('th-TH'))}
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 2' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 2' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU 2' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'A208' && item.innerHTML.includes('Regulator 1') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 1' <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 1 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'A216' && item.innerHTML.includes('Regulator 2') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
      <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 <= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : Regulator 2 <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                } else if (e.LineCode == 'H200' && item.innerHTML.includes('GCU Molding') && SQLTime === today) {
                    item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU Molding <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
         <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    if ((e.ActualVal / e.PlanVal) * 100 >= 90) {
                        item.parentNode.style.backgroundColor = '#42e684'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU Molding <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : O
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else if ((e.ActualVal / e.PlanVal) * 100 >= 85 && (e.ActualVal / e.PlanVal) * 100 < 90) {
                        item.parentNode.style.backgroundColor = '#ffc000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU Molding <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    } else {
                        item.parentNode.style.backgroundColor = '#ff0000'
                        item.innerHTML = ` LineCode : ${e.LineCode} <br> Name : GCU Molding <br>Prod.Plan ${e.PlanVal} <br>Actual Prod. : ${e.ActualVal} <br> Judge : X
                                <br> OA : ${((e.ActualVal / e.PlanVal) * 100).toFixed(1)}% <br> Record Time : ${(new Date().toLocaleString('th-TH'))}`
                    }
                }

            })
        })
    })
}

AddColorToolTip()






var chrtOA =
    document.getElementById("chartIdOA");
const doughnutLabelOA = {
    id: 'doughnutLabelOA',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#ffc000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('93%', xCoor, yCoor);
    }
}
var chartIdOA = new Chart(chrtOA, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 3900],
            backgroundColor: ['#ffc000', 'rgba(217,217,217,0.2)'],
            borderWidth: 0,
        }],
    },
    options: {
        responsive: false,
        cutout: '80%',
        // rotation: -90,
        aspectRatio: 1,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,
            }
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },
    plugins: [doughnutLabelOA]
});



var chartassy =
    document.getElementById("chartIdassy");
const doughnutLabelassy = {
    id: 'doughnutLabelassy',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#42e684';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('0.66M', xCoor, yCoor);
    }
}
var chartIdassy = new Chart(chartassy, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [100, 9.13],
            backgroundColor: ['#42e684', 'rgba(217,217,217,0.2)'],
            borderWidth: 0
        }],
    },
    options: {
        responsive: false,
        circumference: 180,
        rotation: 270,
        aspectRatio: 1,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,
            }
        },
        cutout: '80%',
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },
    plugins: [doughnutLabelassy]
});


var chrtpart =
    document.getElementById("chartIdpart");
const doughnutLabelpart = {
    id: 'doughnutLabelpart',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('0.44M', xCoor, yCoor);
    }
}
var chartIdpart = new Chart(chrtpart, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [100, 79.3],
            backgroundColor: ['red', 'rgba(217,217,217,0.2)'],
            borderWidth: 0,
        }],
    },
    options: {
        responsive: false,
        circumference: 180,
        rotation: 270,
        aspectRatio: 1,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,
            }
        },
        cutout: '80%',
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },
    plugins: [doughnutLabelpart]
});
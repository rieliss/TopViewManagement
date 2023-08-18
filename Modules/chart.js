/*----------------------------------------------------------------*/

Chart.register(ChartjsPluginStacked100.default);
new Chart(document.getElementById("CurrentPord"), {
    type: "bar",
    data: {
        labels: ["Bar"],
        datasets: [
            { data: [75], backgroundColor: "rgba(0, 204, 153, 1)" },
            { data: [35], backgroundColor: "rgba(217, 217, 217, 1)" },
        ],
    },
    options: {
        barPercentage: 5,
        catrgoryPercentage: 1,
        aspectRatio: 20,
        indexAxis: "y",
        plugins: {
            stacked100: {
                enable: true
            },
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            title: {
                display: false
            },
            y: {
                display: false
            },
            x: {
                display: false,
            },
            grid: {
                display: false
            }
        }
    },
});

/*----------------------------------------------------------------*/
var chrtMFG1 = document.getElementById("chartIdMFG1");
const doughnutLabelMFG1 = {
    id: "doughnutLabelMFG1",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#42e684";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdMFG1 = new Chart(chrtMFG1, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [0, 3900],
                backgroundColor: ["mediumaquamarine", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 3,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelMFG1],
});

/*----------------------------------------------------------------*/

var chrtMFG2 = document.getElementById("chartIdMFG2");
const doughnutLabelMFG2 = {
    id: "doughnutLabelMFG2",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#42e684";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdMFG2 = new Chart(chrtMFG2, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [0, 3900],
                backgroundColor: ["mediumaquamarine", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 3,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelMFG2],
});

/*----------------------------------------------------------------*/

var chrtMFG3 = document.getElementById("chartIdMFG3");
const doughnutLabelMFG3 = {
    id: "doughnutLabelMFG3",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#42e684";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdMFG3 = new Chart(chrtMFG3, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [0, 3900],
                backgroundColor: ["mediumaquamarine", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 3,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelMFG3],
});

/*----------------------------------------------------------------*/

var chrtPART1 = document.getElementById("chartIdPART1");
const doughnutLabelPART1 = {
    id: "doughnutLabelPART1",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#42e684";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdPART1 = new Chart(chrtPART1, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [0, 3900],
                backgroundColor: ["mediumaquamarine", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 3,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelPART1],
});

/*----------------------------------------------------------------*/

var chrtPART2 = document.getElementById("chartIdPART2");
const doughnutLabelPART2 = {
    id: "doughnutLabelPART2",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#42e684";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdPART2 = new Chart(chrtPART2, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [0, 3900],
                backgroundColor: ["mediumaquamarine", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 3,
        cutout: "70%",
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelPART2],
});
/*----------------------------------------------------------------*/

const data = {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        label: 'My First Dataset',
        datasets: [
            { data: [75], backgroundColor: "rgba(255, 205, 86, 1)" },
            { data: [35], backgroundColor: "rgba(255, 159, 64, 1)" },
            { data: [75], backgroundColor: "rgba(255, 205, 86, 1)" },
            { data: [35], backgroundColor: "rgba(255, 159, 64, 1)" },
            { data: [75], backgroundColor: "rgba(255, 205, 86, 1)" },
        ],
        borderWidth: 1
    }]
};

Chart.register(ChartjsPluginStacked100.default);
new Chart(document.getElementById("CurrentLoss"), {
    type: "bar",
    data: {
        labels: ["MFG.1 Alt", "MFG.2 Sta", "MFG.3 ECC", "Part MFG.1", "Part MFG.2"],
        datasets: [
            {
                label: "Loss1",
                data: [5, 25, 5, 25, 46],
                backgroundColor: "rgba(251, 181, 55, 1)",
            },
            {
                label: "Loss2",
                data: [5, 25, 5, 25, 46],
                backgroundColor: "rgba(244, 140, 6, 1)"
            },
            {
                label: "Loss3",
                data: [5, 25, 5, 25, 46],
                backgroundColor: "rgba(232, 93, 4, 1)"
            },
            {
                label: "Loss4",
                data: [5, 25, 5, 25, 46],
                backgroundColor: "rgba(208, 0, 0, 1)"
            },
            {
                label: "Loss5",
                data: [5, 25, 5, 25, 46],
                backgroundColor: "rgba(157, 1, 6, 1)"
            },
        ],
    },
    options: {
        fontColor: "rgba(255, 255, 255,1)",
        barPercentage: 1,
        barThickness: 30,
        catrgoryPercentage: 1,
        aspectRatio: 3.5,
        indexAxis: "x",
        plugins: {
            stacked100: {
                enable: true
            },
            legend: {
                position: 'left',
                align: 'center',
            },
        },
        labels: {
            fontColor: "rgba(255, 255, 255,1)",
        }
    },
});

/*----------------------------------------------------------------*/
new Chart(document.getElementById("ActiveWorker"), {
    type: "bar",
    data: {
        labels: ["MFG.1 Alt", "MFG.2 Sta", "MFG.3 ECC", "Part MFG.1", "Part MFG.2"],
        datasets:
            [
                { data: [65, 240, 80, 200, 244], backgroundColor: "rgba(0, 204, 153, 1)" },
                { data: [5, 29, 8, 29, 40], backgroundColor: "rgba(255, 37, 37, 1)" }
            ]
    },
    options: {
        barThickness: 40,
        aspectRatio: 2.3,
        indexAxis: "x",
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    },
});

/*----------------------------------------------------------------*/
new Chart(document.getElementById("Investment"), {
    type: "bar",
    data: {
        labels: ["Bar"],
        datasets: [
            { data: [75], backgroundColor: "rgba(69, 188, 213, 1)" },
            { data: [35], backgroundColor: "rgba(217, 217, 217, 1)" },
        ],
    },
    options: {
        barPercentage: 5,
        catrgoryPercentage: 1,
        aspectRatio: 30,
        indexAxis: "y",
        plugins: {
            stacked100: {
                enable: true
            },
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            title: {
                display: false
            },
            y: {
                display: false
            },
            x: {
                display: false,
            },
            grid: {
                display: false
            }
        }
    },
});

/*----------------------------------------------------------------*/
var chrtCostMFG1 = document.getElementById("chartIdCostMFG1");
const doughnutLabelCostMFG1 = {
    id: "doughnutLabelCostMFG1",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgb(75, 186, 194)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdCostMFG1 = new Chart(chrtCostMFG1, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [3000, 1000],
                backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 2.5,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelCostMFG1],
});
/*----------------------------------------------------------------*/
var chrtCostMFG2 = document.getElementById("chartIdCostMFG2");
const doughnutLabelCostMFG2 = {
    id: "doughnutLabelCostMFG2",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgb(75, 186, 194)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdCostMFG2 = new Chart(chrtCostMFG2, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [3000, 1000],
                backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 2.5,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelCostMFG2],
});

/*----------------------------------------------------------------*/
var chrtCostMFG3 = document.getElementById("chartIdCostMFG3");
const doughnutLabelCostMFG3 = {
    id: "doughnutLabelCostMFG3",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgb(75, 186, 194)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdCostMFG3 = new Chart(chrtCostMFG3, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [3000, 1000],
                backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 2.5,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelCostMFG3],
});
/*----------------------------------------------------------------*/
var chrtCostPart1 = document.getElementById("chartIdCostPart1");
const doughnutLabelCostPart1 = {
    id: "doughnutLabelCostPart1",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgb(75, 186, 194)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdCostPart1 = new Chart(chrtCostPart1, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [3000, 1000],
                backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 2.5,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelCostPart1],
});
/*----------------------------------------------------------------*/
var chrtCostPart2 = document.getElementById("chartIdCostPart2");
const doughnutLabelCostPart2 = {
    id: "doughnutLabelCostPart2",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgb(75, 186, 194)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("70%", xCoor, yCoor);
    },
};


const chartIdCostPart2 = new Chart(chrtCostPart2, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [3000, 1000],
                backgroundColor: ["rgb(75, 186, 194)", "rgba(217,217,217,0.2)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 2.5,
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
            display: false,
        },
        title: {
            display: false,
        },
    },
    plugins: [doughnutLabelCostPart2],
});
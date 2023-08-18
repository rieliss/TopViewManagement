const InHouseStock = document.getElementById('CurrentLossInHouseStock');
new Chart(InHouseStock, {
    type: 'bar',
    data: {
        labels: ["Wiper", "Sta R-large", "Sta PA70", "Sta P,Ga,RA2.0,RA2.2", "Sta-Frame", "GCU-Case", "GCU", "Alt Line 3", "Alt Line 2", "Air Bag Sensor"],
        datasets: [
            {
                label: 'Target',
                data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
                backgroundColor: 'rgba(253, 136, 0, 1)',
                borderColor: 'rgba(253, 136, 0, 1)',
                type: 'line'
            },
            {
                label: '',
                data: [12, 19, 13, 15, 12, 13, 36, 18, 13, 15, 14, 18, 23, 12, 24, 25, 12, 24, 24, 24, 24, 24, 24, 24, 24, 14, 16],
                backgroundColor: ['rgba(0, 204, 153,1)', 'rgba(0, 204, 153,1)'],
                borderColor: ['rgba(255, 255, 255, 1)'],
            },
            // {
            //     label: 'Diff',
            //     data: [11, 12, 13, 14, 16, 17, 18, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 33, 37, 39, 40, 41, 42, 43, 44, 45, 46],
            //     backgroundColor: 'rgba(91, 120, 255, 1)',
            //     borderColor: 'rgba(255, 255, 255, 1)',
            // },
        ]
    },
    options: {
        barPercentage: 0.7,
        aspectRatio: 1.6,
        indexAxis: "y",
        scales: {
            // pcs: {
            //     beginAtZero: true,
            //     type: 'linear',
            //     position: 'left'
            // },
            y: {
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    beginAtZero: true
                },
                display: false
            }
        },
        // plugins: {
        //     datalabels: {
        //         color: 'white'
        //         // color: ((context, args) => {
        //         //     const datasetIndex = context.datasetIndex;
        //         //     const colorMap = ['rgba(91, 120, 255, 1)', 'rgba(0, 204, 153,1)'];
        //         //     return colorMap[datasetIndex] || 'write';
        //         // })
        //     }
        // }
    },
    // plugins: [ChartDataLabels],
});

/*----------------------------------------------------------------*/
const RiskStock = document.getElementById('CurrentLossRiskStock');
new Chart(RiskStock, {
    type: 'bar',
    data: {
        labels: ["Wiper", "Sta R-large", "Sta PA70", "Sta P,Ga,RA2.0,RA2.2", "Sta-Frame", "GCU-Case", "GCU", "Alt Line 3", "Alt Line 2", "Air Bag Sensor"],
        datasets: [
            {
                label: 'Target',
                data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
                backgroundColor: 'rgba(253, 136, 0, 1)',
                borderColor: 'rgba(253, 136, 0, 1)',
                type: 'line'
            },
            {
                label: '',
                data: [24, 27, 28, 29, 28, 25, 31, 33, 26, 33, 27, 24, 27, 28, 29, 28, 25, 31, 33, 26, 33, 27, 24, 27],
                backgroundColor: ['rgba(0, 204, 153,1)', 'rgba(0, 204, 153,1)'],
                borderColor: ['rgba(255, 255, 255, 1)'],
            },
            // {
            //     label: 'Diff',
            //     data: [11, 12, 13, 14, 16, 17, 18, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 33, 37, 39, 40, 41, 42, 43, 44, 45, 46],
            //     backgroundColor: 'rgba(91, 120, 255, 1)',
            //     borderColor: 'rgba(255, 255, 255, 1)',
            // },
        ]
    },
    options: {
        barPercentage: 0.7,
        aspectRatio: 1.6,
        indexAxis: "y",

        scales: {
            // pcs: {
            //     beginAtZero: true,
            //     type: 'linear',
            //     position: 'left'
            // },
            y: {
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    beginAtZero: true,
                },
                display: false
            }
        },
        // plugins: {
        //     datalabels: {
        //         color: 'white'
        //         // color: ((context, args) => {
        //         //     const datasetIndex = context.datasetIndex;
        //         //     const colorMap = ['rgba(91, 120, 255, 1)', 'rgba(0, 204, 153,1)'];
        //         //     return colorMap[datasetIndex] || 'write';
        //         // })
        //     }
        // }
    },
    // plugins: [ChartDataLabelsRiskStock],
});

/*----------------------------------------------------------------*/

var chrtShipment = document.getElementById("chartIdShipment");
const doughnutLabelShipment = {
    id: "doughnutLabelShipment",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "rgba(255,37,37,1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("11.2%", xCoor, yCoor);
    },
};


const chartIdShipment = new Chart(chrtShipment, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [1000, 200, 3300,],
                backgroundColor: ["rgba(217,217,217,1)", "rgba(255,37,37,1)", "rgba(0, 204, 153,1)"],
                borderWidth: 0,
            },
        ],
    },
    options: {
        responsive: false,
        aspectRatio: 1.5,
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
    plugins: [doughnutLabelShipment],
});
/*----------------------------------------------------------------*/
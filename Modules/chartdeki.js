/*----------------------------------------------------------------*/
Chart.register(ChartjsPluginStacked100.default);
new Chart(document.getElementById("OALossSum"), {
    type: "bar",
    data: {
        labels: ["Target", "Actual"],
        datasets:
            [
                { label: '%OA', data: [90, 88.8], backgroundColor: "rgba(0, 204, 153, 1)" },
                { label: 'Loss', data: [10, 11.2], backgroundColor: "rgba(255, 37, 37, 1)" }
            ]
    },
    options: {
        barThickness: 50,
        aspectRatio: 1.9,
        plugins: {
            stacked100: {
                enable: true
            },
            legend: {
                // display: false
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            }
        }
    },
});

/*----------------------------------------------------------------*/
const ctx = document.getElementById('CurrentLossDetailSum');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        datasets: [
            {
                label: 'Actual',
                data: [12, 19, 3, 5, 2, 3, 36, 8, 3, 15, 14, 18, 23, 12, 24, 25, 12, 24, 24, 24, 24, 24, 24, 24, 24, 14, 16],
                backgroundColor: ['rgba(0, 204, 153,1)'],
                borderColor: ['rgba(255, 255, 255, 1)'],
                // yAxisID: 'Actual'
            },
            {
                label: 'Diff',
                data: [1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 33, 37, 39, 40, 41, 42, 43, 44, 45, 46],
                backgroundColor: 'rgba(255, 192, 0, 1)',
                borderColor: 'rgba(255, 192, 0, 1)',
                type: 'line',
                // yAxisID: 'Plan'
            },
            {
                label: 'Plan',
                data: [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
                backgroundColor: ['rgba(91, 120, 255, 1)'],
                borderColor: ['rgba(91, 120, 255, 1)'],
                type: 'line',
                // yAxisID: 'Date'
            }]
    },
    options: {
        barPercentage: 1,
        // catrgoryPercentage: 10,
        aspectRatio: 3.5,
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
                }
            }
        }
    }
});
/*----------------------------------------------------------------*/
var chrtLossClar = document.getElementById("chartIdLossClar");
const doughnutLabelLossClar = {
    id: "doughnutLabelLossClar",
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


const chartIdLossClar = new Chart(chrtLossClar, {
    type: "doughnut",
    data: {
        labels: ["Loss 1", "Loss 2", "Loss 3", "Loss 4", "Loss 5"],
        datasets: [
            {

                data: [3100, 2500, 3300, 3900, 3800],
                backgroundColor: ["rgba(192,144,0,1)", "rgba(226,170,0,1)", "rgba(255,192,0,1)", "rgba(255,209,132,1)", "rgba(255,224,181,1)"],
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
            // display: false,
        },
        title: {
            // display: false,
        },
        scales: {
            // labels: {
            //     type: "linear",
            //     position: "right"
            // }
        }
    },
    plugins: [doughnutLabelLossClar],
});
/*----------------------------------------------------------------*/
const Dekidaka = document.getElementById('CurrentLossDekidaka');
new Chart(Dekidaka, {
    type: 'bar',
    data: {
        labels: ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6", "Hour 7", "Hour 8", "Hour 9", "Hour 10"],
        datasets: [
            {
                label: 'Actual',
                data: [12, 19, 13, 15, 12, 13, 36, 18, 13, 15, 14, 18, 23, 12, 24, 25, 12, 24, 24, 24, 24, 24, 24, 24, 24, 14, 16],
                backgroundColor: ['rgba(0, 204, 153,1)', 'rgba(0, 204, 153,1)'],
                borderColor: ['rgba(255, 255, 255, 1)'],
            },
            {
                label: 'Diff',
                data: [11, 12, 13, 14, 16, 17, 18, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 33, 37, 39, 40, 41, 42, 43, 44, 45, 46],
                backgroundColor: 'rgba(91, 120, 255, 1)',
                borderColor: 'rgba(255, 255, 255, 1)',
            },
            {
                label: 'Diff',
                data: [11, 12, 13, 14, 16, 17, 18, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 33, 37, 39, 40, 41, 42, 43, 44, 45, 46],
                backgroundColor: 'rgba(91, 120, 255, 1)',
                borderColor: 'rgba(91, 120, 255, 1)',
                type: 'line'
            }
        ]
    },
    options: {
        barPercentage: 0.7,
        aspectRatio: 4.5,
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
                }
            }
        },
        plugins: {
            datalabels: {
                color: 'white'
                // color: ((context, args) => {
                //     const datasetIndex = context.datasetIndex;
                //     const colorMap = ['rgba(91, 120, 255, 1)', 'rgba(0, 204, 153,1)'];
                //     return colorMap[datasetIndex] || 'write';
                // })
            }
        }
    },
    plugins: [ChartDataLabels],
});
/*----------------------------------------------------------------*/
new Chart(document.getElementById("RakingLoss"), {
    type: "bar",
    data: {
        labels: ["1.5.2", "2.5.2", "3.5.2", "1.5.2", "2.5.2", "3.5", "1.5", "2.2", "1.6.6", "1.7.2", "1.4", "1.2"],
        datasets:
            [
                {
                    data: [222, 200, 124, 96, 62, 42, 40, 31, 25, 21, 11, 8, 5, 2],
                    backgroundColor: "rgba(255,224,181,1)",
                    borderColor: "rgba(255,224,181,1)"
                }
            ]
    },
    options: {
        barThickness: 40,
        aspectRatio: 3.5,
        indexAxis: "x",
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'white',
                    beginAtZero: true
                }
            }
        }
    },
});

/*----------------------------------------------------------------*/
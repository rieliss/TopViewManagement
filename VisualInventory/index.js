var optionsDonut = {
  series: [1100, 1300, 0],
  labels: ["Assy Products", "Sub-Assy Products", "Part Products"],
  chart: {
    type: "donut",
    // foreColor:'rgb(0,0,0,1.0)',
  },

  dataLabels: {
    enabled: true,
    enabledOnSeries: true,
    formatter: function (val, opt) {
      return val.toFixed(1) + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "16px",
      colors: ["white"],
    },
    background: {
      enabled: true,
      foreColor: "rgb(0,0,0)",
      borderRadius: 4,
      opacity: 0.8,
    },
    dropShadow: {
      enabled: false,
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      customScale: 1,
      donut: {
        size: "70%",
        borderWidth: 0,
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: "36px",
            color: "yellow",
            fontFamily: "myFirstFont",
            offsetY: 6,
            offsetX: 0,
            formatter: function (value) {
              var val = Math.abs(value);
              if (val >= 1000) {
                val = (val / 1000).toFixed(1);
              }
              return val + " K";
            },
          },
          total: {
            show: true,
            showAlways: true,
            textAlign: "bottom",
            label: "TOTAL",
            fontSize: "12px",
            color: "white",
            offsetY: -50,
            offsetX: 0,
            formatter: function (w) {
              var x = w.globals.seriesTotals;
              let val = 0;
              for (var i = 0; i <= x.length - 1; i++) {
                val = val + x[i];
              }
              val = Math.abs(val);
              if (val >= 1000) {
                val = (val / 1000).toFixed(2) + " K";
              }
              return val;
            },
          },
        },
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (value, opt) {
        var val = Math.abs(value);
        if (val >= 1000) {
          val = (val / 1000).toFixed(1) + " K";
        }
        return val;
      },
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "bottom",
    horizontalAlign: "left",
    fontSize: "12px",
    labels: {
      colors: "white",
      useSeriesColors: false,
    },
  },
  stroke: {
    show: false,
    colors: ["#fff"],
  },
  theme: {
    palette: "palette1", // upto palette10
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var chartDonut = new ApexCharts(
  document.querySelector("#chartDonut"),
  optionsDonut
);
chartDonut.render();

/*New column chart of stock by customer*/
var optionsStockBar = {
  series: [
    {
      name: "FGs",
      data: [12, 19, 3, 5, 2, 3, 5],
    },
  ],
  chart: {
    height: 300,
    type: "bar",
  },
  fill: {
    type: "solid",
    colors: "rgb(64,224,208)",
  },
  // fill: {
  //   type: "gradient",
  //   gradient: {
  //     // colors: '#05ad7e',
  //     shadeIntensity: 1,
  //     opacityFrom: 0.4,
  //     opacityTo: 0.5,
  //     stops: [0, 90, 100]
  //   }
  // },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val;
    },
    offsetY: -30,
    style: {
      fontSize: "14px",
      colors: ["white"],
    },
    background: {
      enabled: true,
      foreColor: "rgb(0,0,0)",
      borderRadius: 4,
      opacity: 0.7,
    },
  },

  xaxis: {
    show: true,
    categories: [
      "TOYOTA",
      "SUZUKI",
      "ISUZU",
      "KAWASAKI",
      "MAZDA",
      "HONDA",
      "SDM",
    ],
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: undefined,
      style: {
        fontSize: "9pt",
        colors: "white",
      },
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      formatter: function (val) {
        return val;
      },
      style: {
        fontSize: "12px",
        colors: ["white"],
      },
    },
  },
  grid: {
    // show: false,
    // borderColor: '#90A4AE',
    // strokeDashArray: 0,
    // position: 'back',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 20,
    },
  },
  title: {
    show: false,
    text: "Stock by Customer",
    floating: true,
    offsetY: 330,
    align: "center",
    style: {
      color: "#444",
    },
  },
};

var chartStockBar = new ApexCharts(
  document.querySelector("#chartStockbar"),
  optionsStockBar
);
chartStockBar.render();
/*End New*/

/*New Bar chart of Abnormal stock*/
var optionsAbnormal = {
  series: [
    {
      name: "Required Quantity",
      data: [12, 19, 3, 5, 2, 3, 5],
    },
  ],
  chart: {
    height: 330,
    type: "bar",
  },
  // fill:{ type: "solid",
  // colors: '#ff0037'},
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      inverseColors: true,
      shadeIntensity: 0.1,
      opacityFrom: 1,
      gradientToColors: ["white"],
      opacityTo: 1,
      stops: [0, 60, 100],
    },
  },
  theme: {
    mode: "light",
    palette: "palette7",
    monochrome: {
      enabled: false,
      color: "#ffffff",
      shadeTo: "light",
      shadeIntensity: 0.65,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      // barHeight: '100%',
      // distributed: true,
      dataLabels: {
        position: "end",
        offsetY: 0,
        // offsetX: -100,
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: 0,
    style: {
      fontSize: "16pt",
      colors: ["#fff"],
    },
    formatter: function (val) {
      return val;
    },
    background: {
      enabled: true,
      foreColor: "rgb(255,0,55)",
      borderRadius: 4,
      opacity: 0.8,
    },

    dropShadow: {
      enabled: false,
    },
  },
  xaxis: {
    show: true,
    categories: [
      "TOYOTA",
      "SUZUKI",
      "ISUZU",
      "KAWASAKI",
      "MAZDA",
      "HONDA",
      "SDM",
    ],
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: undefined,
      style: {
        fontSize: "12pt",
        colors: "white",
      },
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      formatter: function (val) {
        return val;
      },
      style: {
        fontSize: "12px",
        colors: "white",
      },
    },
  },
  grid: {
    // show: false,
    // borderColor: '#90A4AE',
    // strokeDashArray: 0,
    // position: 'back',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 20,
    },
  },
};

var chartAbnormal = new ApexCharts(
  document.querySelector("#chartAbnormal"),
  optionsAbnormal
);
chartAbnormal.render();
/*End New*/

// var ChartProd = document.getElementById("chartid").getContext('2d');
var optionsAchieve = {
  chart: {
    height: 330,
    width: 800,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Plan Production",
      data: [20000, 20000, 20000, 20000, 21000, 22000, 20000],
    },
    {
      name: "Actual Production ",
      data: [20000, 14000, 12000, 15000, 18000, 19000, 22000],
    },
  ],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: ["Hour1", "Hour2", "Hour3", "Hour4", "Hour5", "Hour6", "Hour7"],
    tickAmount: undefined,
    tickPlacement: "on",
    min: undefined,
    max: undefined,
    range: undefined,
    floating: false,
    decimalsInFloat: undefined,
    overwriteCategories: undefined,
    position: "bottom",
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: undefined,
      style: {
        colors: "white",
        fontSize: "12px",
        fontFamily: "myFirstFont",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      format: undefined,
      formatter: undefined,
      datetimeUTC: true,
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
    // group: {
    //   groups: [],
    //   style: {
    //     colors: [],
    //     fontSize: '12px',
    //     fontWeight: 400,
    //     fontFamily: undefined,
    //     cssClass: ''
    //   }
    // },
    axisBorder: {
      show: true,
      color: "#78909C",
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "#78909C",
      height: 5,
      offsetX: 0,
      offsetY: 0,
    },

    title: {
      text: undefined,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "12px",
        fontFamily: "myFirstFont",
        fontWeight: 600,
        cssClass: "apexcharts-xaxis-title",
      },
    },
  },
  yaxis: {
    show: true,
    showAlways: true,
    showForNullSeries: true,
    seriesName: undefined,
    opposite: false,
    reversed: false,
    logarithmic: false,
    logBase: 10,
    tickAmount: undefined,
    min: 0,
    max: function (max) {
      return max;
    },
    forceNiceScale: true,
    floating: false,
    decimalsInFloat: undefined,
    labels: {
      show: true,
      align: "right",
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: "white",
        fontSize: "12px",
        fontFamily: "myFirstFont",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      // formatter: (value) => { return val },
    },
    axisBorder: {
      show: true,
      color: "#78909C",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: false,
      borderType: "solid",
      color: "#78909C",
      width: 6,
      offsetX: 0,
      offsetY: 0,
    },
    title: {
      text: undefined,
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "12px",
        fontFamily: "myFirstFont",
        fontWeight: 600,
        cssClass: "apexcharts-yaxis-title",
      },
    },
  },
  grid: {
    // show: false,
    // borderColor: '#90A4AE',
    // strokeDashArray: 0,
    // position: 'back',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 13,
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "top",
    horizontalAlign: "left",
    floating: false,
    fontSize: "12px",
    fontFamily: "myFirstFont",
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: "white",
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: "#fff",
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },

  theme: {
    mode: "light",
    palette: "palette1",
    monochrome: {
      enabled: false,
      color: "#ffffff",
      shadeTo: "light",
      shadeIntensity: 0.65,
    },
  },
};

var chartAchieve = new ApexCharts(
  document.querySelector("#chartAchieve"),
  optionsAchieve
);
chartAchieve.render();

$(".dropdown").dropdown({
  action: "combo",
});

$("#multi-select").dropdown();

$(".dropdown").dropdown({
  action: function (text, value) {
    // nothing built in occurs
  },
});

$(".dropdown").dropdown({
  action: "hide",
  onChange: function (value, text, $selectedItem) {
    // custom action
  },
});

$("#search-select").dropdown();

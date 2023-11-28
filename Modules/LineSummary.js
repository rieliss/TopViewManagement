var socket = io("http://localhost:4040");

// var socket = io("http://172.23.36.47:5000");

var sum = [];
var STOCK_QTY = 0;

socket.on("LineSummary", (data) => {
  data.forEach((e) => {
    // console.log(typeof e.STOCK_QTY);
    if (e.STOCK_QTY === "number") {
      e.STOCK_QTY = e.STOCK_QTY.toLocaleString();
    } else {
      STOCK_QTY = parseInt(e.STOCK_QTY);
    }
    // console.log(STOCK_QTY);
    STOCK_QTY.toLocaleString();
    console.log(STOCK_QTY);
  });
});

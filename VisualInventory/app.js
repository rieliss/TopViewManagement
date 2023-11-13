const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "10.122.77.1",
  port: "3306",
  user: "iot_admin",
  password: "1234",
  database: "info_board_line5_center",
  // database: 'inventory_db'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});
app.get("/stock", function (req, res) {
  connection.query(
    // "SELECT * FROM actual_part WHERE LineCode = 'B1002' AND LineCode = 'B1003' ORDER BY RecordTime DESC LIMIT 1",
    // "SELECT DISTINCT LineCode, ActualVal, PlanVal, RecordTime FROM actual_part ORDER BY RecordTime DESC LIMIT 100",
    "SELECT * FROM master_data LIMIT 20",
    // "SELECT DISTINCT LineCode, ActualVal, PlanVal, RecordTime FROM actual_part ORDER BY RecordTime DESC LIMIT 100",
    // "SELECT TOP 3 * FROM actual_part;",
    // "SELECT * FROM (SELECT TOP 1 * FROM actual_part ORDER BY RecordTime DESC) last"
    // "SELECT * FROM actual_part WHERE LineCode = 'B1002' ORDER BY RecordTime DESC LIMIT 10",
    // "SELECT FORMAT(RecordTime, 'dd/MM/yyyy', 'zh-cn') AS 'Date' FROM actual_part ORDER BY RecordTime DESC LIMIT 10",
    // (SELECT DISTINCT LineCode FROM Customers)
    function (err, result, fields) {
      res.json(result);
    }
  );
});

io.on("connection", (socket) => {
  console.log("user connected");
  //   setInterval(() => {
  //     connection.query(
  //       // "SELECT * FROM actual_part WHERE LineCode = 'B1002' AND LineCode = 'B1003' ORDER BY RecordTime DESC LIMIT 1",
  //       "SELECT DISTINCT LineCode, ActualVal, PlanVal, RecordTime FROM actual_part ORDER BY RecordTime DESC LIMIT 100",
  //       // "SELECT * FROM actual_part ORDER BY RecordTime DESC LIMIT 20",
  //       // "SELECT * FROM actual_part WHERE LineCode = 'B1002' ORDER BY RecordTime DESC LIMIT 10",
  //       // "SELECT FORMAT(RecordTime, 'dd/MM/yyyy', 'zh-cn') AS 'Date' FROM actual_part ORDER BY RecordTime DESC LIMIT 10",
  //       function (err, result, fields) {
  //         io.emit("update", result);
  //         console.log("Sent!");
  //       }
  //     );
  //   }, 10000);
});
http.listen(3000, () => {
  console.log("Server start in port 3000");
});
